/**
 * Tests whether a question about data is true above a probability threshold.
 * @param {*} data A single cell or literal value.
 * @param {string} question A yes/no question about the value.
 * @param {number} threshold Optional threshold, default 0.5; equality returns FALSE.
 * @return {boolean} TRUE when probability is strictly greater than threshold.
 * @customfunction
 */
function JEV_NOUL(data, question, threshold) {
  var req = JevCore.request('noul', data, question, []);
  if (!req) return '';
  var cutoff = JevCore.threshold(threshold);
  return jevFetch_(req, jevConnectedKey_()).answers.result.noul > cutoff;
}
/**
 * Selects the most likely label from choices.
 * @param {*} data A single cell or literal value.
 * @param {string} question What to classify.
 * @param {...*} choices Choice labels or vertical single-column ranges.
 * @return {string} The selected label.
 * @customfunction
 */
function JEV_CHOICE(data, question, choices) {
  var req = JevCore.request('choice', data, question, Array.prototype.slice.call(arguments, 2));
  return req ? jevFetch_(req, jevConnectedKey_()).answers.result.choice : '';
}
/**
 * Scores data on 2–10 ordered levels, numbered from zero.
 * @param {*} data A single cell or literal value.
 * @param {string} question The dimension to score.
 * @param {...*} levels Level descriptions or vertical single-column ranges.
 * @return {number} Unrounded probability-weighted level position.
 * @customfunction
 */
function JEV_SCORE(data, question, levels) {
  var req = JevCore.request('score', data, question, Array.prototype.slice.call(arguments, 2));
  return req ? jevFetch_(req, jevConnectedKey_()).answers.result.score : '';
}
/**
 * Evaluates JSON state against a JSON question map with the TypeSafe API.
 * @param {string} state_json JSON string, object, or array encoded as text.
 * @param {string} questions_json JSON object keyed by question ID.
 * @param {string} model Optional model; defaults to jev-latest.
 * @return {string} Complete API response as JSON text.
 * @customfunction
 */
function JEV(state_json, questions_json, model) {
  var req = JevCore.raw(state_json, questions_json, model);
  var result = JSON.stringify(jevFetch_(req, jevConnectedKey_()));
  if (result.length > 49000) JevCore.fail('Response is too large for one cell. Request fewer questions.');
  return result;
}
function jevFetch_(request, key) {
  var response;
  try {
    response = UrlFetchApp.fetch('https://api.typesafe.ai/v1/systemone', {
      method: 'post', contentType: 'application/json', headers: {Authorization: 'Bearer ' + key},
      payload: JSON.stringify(request), muteHttpExceptions: true, followRedirects: false
    });
  } catch (_) { JevCore.fail('Could not reach TypeSafe. Try again using Refresh Jev formulas.'); }
  var code = response.getResponseCode();
  if (code < 200 || code >= 300) JevCore.fail(JevCore.httpError(code));
  var parsed;
  try { parsed = JSON.parse(response.getContentText()); } catch (_) { JevCore.fail('TypeSafe returned invalid JSON.'); }
  return JevCore.validate(parsed, request);
}
function jevDocument_() {
  var store = PropertiesService.getDocumentProperties();
  if (!store) JevCore.fail('Open Jev through its Sheets add-on test deployment or installation.');
  return store;
}
function jevConnection_() {
  var value = jevDocument_().getProperty('JEV_CONNECTION');
  if (!value) return null;
  try { return JSON.parse(value); } catch (_) { return null; }
}
function jevConnectedKey_() {
  var connection = jevConnection_();
  if (!connection || connection.spreadsheetId !== SpreadsheetApp.getActiveSpreadsheet().getId() || !connection.key) JevCore.fail('No account connected. Open Extensions → Jev → API key & connection.');
  return connection.key;
}
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('API key & connection', 'jevShowSettings')
    .addItem('Refresh Jev formulas', 'jevRefresh')
    .addSeparator().addItem('Add sample worksheets', 'jevAddSamples')
    .addItem('Help', 'jevHelp').addToUi();
}
function onInstall(e) { onOpen(e); }
function jevShowSettings() {
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutput(JEV_SETTINGS_HTML).setTitle('Jev • API key & connection'));
}
function jevSettingsStatus() {
  var user = PropertiesService.getUserProperties(), c = jevConnection_();
  var connected = !!(c && c.spreadsheetId === SpreadsheetApp.getActiveSpreadsheet().getId());
  return {saved: !!user.getProperty('JEV_PERSONAL_KEY'), label: user.getProperty('JEV_PERSONAL_LABEL') || '', connected: connected, connectionLabel: connected ? c.label : ''};
}
function jevSaveKey(key, label) {
  if (typeof key !== 'string' || !key.trim() || /\s/.test(key.trim()) || key.length > 2000) JevCore.fail('Enter a valid API key.');
  label = JevCore.text(label, 'Account label').trim();
  if (label.length > 80) JevCore.fail('Account label must be 80 characters or fewer.');
  PropertiesService.getUserProperties().setProperties({JEV_PERSONAL_KEY: key.trim(), JEV_PERSONAL_LABEL: label});
  return jevSettingsStatus();
}
function jevTestKey() {
  var key = PropertiesService.getUserProperties().getProperty('JEV_PERSONAL_KEY');
  if (!key) JevCore.fail('Save your API key first.');
  jevFetch_(JevCore.request('noul', 'dog', 'Is it a mammal?', []), key);
  return 'Connection successful. This test made one TypeSafe request.';
}
function jevConnect() {
  var user = PropertiesService.getUserProperties(), key = user.getProperty('JEV_PERSONAL_KEY');
  if (!key) JevCore.fail('Save your API key first.');
  jevDocument_().setProperty('JEV_CONNECTION', JSON.stringify({spreadsheetId: SpreadsheetApp.getActiveSpreadsheet().getId(), key: key, label: user.getProperty('JEV_PERSONAL_LABEL') || 'Connected account'}));
  return jevSettingsStatus();
}
function jevDisconnect() { jevDocument_().deleteProperty('JEV_CONNECTION'); return jevSettingsStatus(); }
function jevRemoveKey() {
  var user = PropertiesService.getUserProperties();
  user.deleteProperty('JEV_PERSONAL_KEY'); user.deleteProperty('JEV_PERSONAL_LABEL');
  return jevSettingsStatus();
}
function jevRefresh() {
  var count = 0, ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheets().forEach(function (sheet) {
    var cells = sheet.createTextFinder('^=\\s*JEV(_NOUL|_CHOICE|_SCORE)?\\s*\\(').useRegularExpression(true).matchFormulaText(true).findAll();
    var original = cells.map(function (cell) { return {cell: cell, formula: cell.getFormula()}; });
    // Clearing then restoring actually forces recalculation, unlike setting identical text.
    try { original.forEach(function (entry) { entry.cell.clearContent(); }); SpreadsheetApp.flush(); }
    finally { original.forEach(function (entry) { entry.cell.setFormula(entry.formula); }); }
    count += original.length;
  });
  ss.toast('Refreshed ' + count + ' direct Jev formulas.', 'Jev');
  return count;
}
function jevHelp() {
  SpreadsheetApp.getUi().alert('Jev for Sheets',
    'JEV_NOUL(data, question, [threshold]): TRUE when probability > threshold (default 0.5).\n\n' +
    'JEV_CHOICE(data, question, choice1, …): 2–255 distinct labels or vertical ranges.\n\n' +
    'JEV_SCORE(data, question, level1, level2, …): 2–10 levels; results range from 0 to N−1.\n\n' +
    'JEV(state_json, questions_json, [model]): complete response JSON. Default model: jev-latest.\n\n' +
    'Each formula sends its supplied data to TypeSafe. All collaborators use the account connected to this spreadsheet. Keys are not written to cells. Blank data returns blank. Dates are sent as ISO timestamps; cell formatting is not included.\n\n' +
    'After changing a connection, choose Refresh Jev formulas. Nested Jev formulas must be re-entered manually. Previously calculated values can remain visible until recalculation.\n\n' +
    'Documentation: https://docs.typesafe.ai/primitives', SpreadsheetApp.getUi().ButtonSet.OK);
}
