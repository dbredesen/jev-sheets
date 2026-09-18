/* Pure logic shared by Apps Script and Node tests. */
var JevCore = (function () {
  'use strict';
  function fail(message) { throw new Error('Jev: ' + message); }
  function scalar(value, name) {
    if (Array.isArray(value)) {
      if (value.length !== 1 || !Array.isArray(value[0]) || value[0].length !== 1) fail(name + ' must be a single cell or value.');
      return value[0][0];
    }
    return value;
  }
  function text(value, name) {
    value = scalar(value, name);
    if (typeof value !== 'string' || !value.trim()) fail(name + ' must be nonempty text.');
    return value;
  }
  function data(value) {
    value = scalar(value, 'Data');
    if (value === '' || value === null || value === undefined) return { blank: true };
    if (Object.prototype.toString.call(value) === '[object Date]') {
      if (!Number.isFinite(value.getTime())) fail('Invalid date.');
      value = value.toISOString();
    }
    if (!['string', 'number', 'boolean'].includes(typeof value) || (typeof value === 'number' && !Number.isFinite(value))) fail('Unsupported data value.');
    return { blank: false, value: value };
  }
  function threshold(value) {
    if (value === undefined) return 0.5;
    value = scalar(value, 'Threshold');
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1) fail('Threshold must be between 0 and 1 (for example, 80%).');
    return value;
  }
  function list(args, type) {
    var items = [];
    args.forEach(function (arg) {
      if (Array.isArray(arg)) {
        arg.forEach(function (row) {
          if (!Array.isArray(row) || row.length !== 1) fail('Use a vertical, single-column ' + type + ' range.');
          items.push(row[0]);
        });
      } else items.push(arg);
    });
    items = items.map(function (v) { return text(v, type === 'choice' ? 'Choice label' : 'Score level').trim(); });
    var max = type === 'choice' ? 255 : 10;
    if (items.length < 2 || items.length > max) fail('Provide 2–' + max + ' ' + (type === 'choice' ? 'choices.' : 'score levels.'));
    if (type === 'choice' && new Set(items).size !== items.length) fail('Choice labels must be distinct.');
    return items;
  }
  function request(type, value, question, args) {
    var input = data(value);
    if (input.blank) return null;
    var q = {type: type, instructions: "Evaluate the value in `data`. References to 'it' or 'this' refer to that value. " + text(question, 'Question')};
    if (type === 'choice') {
      q.criteria = Object.create(null);
      list(args, type).forEach(function (label) { q.criteria[label] = null; });
    } else if (type === 'score') q.criteria = list(args, type);
    else if (type !== 'noul') fail('Unsupported question type.');
    return {model: 'jev-latest', state: {data: input.value}, questions: {result: q}};
  }
  function parse(value, name) {
    text(value, name);
    try { return JSON.parse(scalar(value, name)); } catch (_) { fail(name + ' must contain valid JSON.'); }
  }
  function structured(value) { return typeof value === 'string' || (value !== null && typeof value === 'object'); }
  function raw(stateJson, questionsJson, model) {
    var state = parse(stateJson, 'State'), questions = parse(questionsJson, 'Questions');
    if (!structured(state)) fail('State JSON must represent a string, object, or array.');
    if (!questions || typeof questions !== 'object' || Array.isArray(questions) || !Object.keys(questions).length) fail('Questions JSON must be a nonempty object keyed by question ID.');
    Object.keys(questions).forEach(function (id) {
      var q = questions[id];
      if (!q || !['noul', 'choice', 'score'].includes(q.type) || !structured(q.instructions)) fail('Each question needs a valid type and instructions.');
      if (typeof q.instructions === 'string' && !q.instructions.trim()) fail('Question instructions cannot be empty.');
      if (q.type === 'choice' && (!q.criteria || Array.isArray(q.criteria) || typeof q.criteria !== 'object' || Object.keys(q.criteria).length < 2 || Object.keys(q.criteria).length > 255)) fail('Choice criteria must be an object with 2–255 options.');
      if (q.type === 'score' && (!Array.isArray(q.criteria) || q.criteria.length < 2 || q.criteria.length > 10)) fail('Score criteria must have 2–10 ordered levels.');
    });
    return {model: model === undefined ? 'jev-latest' : text(model, 'Model'), state: state, questions: questions};
  }
  function probability(v) { return typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1; }
  function validate(response, req) {
    if (!response || typeof response.model !== 'string' || !response.answers || !response.usage || !Number.isInteger(response.usage.input_tokens) || !Number.isInteger(response.usage.output_tokens)) fail('Invalid API response.');
    Object.keys(req.questions).forEach(function (id) {
      var q = req.questions[id], a = response.answers[id];
      if (!a || a.type !== q.type) fail('API response is missing a matching answer.');
      if (q.type === 'noul') { if (!probability(a.noul)) fail('Invalid Noul probability.'); return; }
      var keys = q.type === 'choice' ? Object.keys(q.criteria) : q.criteria.map(function (_, i) { return String(i); });
      if (!probability(a.confidence) || !a.probabilities || Array.isArray(a.probabilities) || Object.keys(a.probabilities).length !== keys.length || keys.some(function (k) { return !Object.prototype.hasOwnProperty.call(a.probabilities, k) || !probability(a.probabilities[k]); })) fail('Invalid answer distribution.');
      if (Math.abs(keys.reduce(function (sum, k) { return sum + a.probabilities[k]; }, 0) - 1) > 0.02) fail('Invalid answer probability total.');
      if (q.type === 'choice' && !keys.includes(a.choice)) fail('API selected an unknown choice.');
      if (q.type === 'score' && (typeof a.score !== 'number' || !Number.isFinite(a.score) || a.score < 0 || a.score > q.criteria.length - 1 || !a.legend)) fail('Invalid score.');
    });
    return response;
  }
  function httpError(code) {
    if (code === 401 || code === 403) return 'API authentication failed. Check your key and reconnect this spreadsheet from the Jev menu.';
    if (code === 429) return 'TypeSafe rate limit reached. Wait, then use Refresh Jev formulas.';
    if (code >= 500) return 'TypeSafe is temporarily unavailable. Try again later.';
    return 'TypeSafe rejected the request (HTTP ' + code + '). Check the question and model.';
  }
  return {fail: fail, scalar: scalar, data: data, text: text, threshold: threshold, request: request, raw: raw, validate: validate, httpError: httpError};
})();
if (typeof module !== 'undefined') module.exports = JevCore;
