function jevAddSamples() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var suffix = '', n = 1;
  while (['Examples', 'Rubrics', 'Tests'].some(function (name) { return !!ss.getSheetByName(name + suffix); })) suffix = ' ' + (++n);
  var examples = ss.insertSheet('Examples' + suffix), rubrics = ss.insertSheet('Rubrics' + suffix), tests = ss.insertSheet('Tests' + suffix);
  var r = "'" + rubrics.getName() + "'";
  rubrics.getRange('A1:E8').setValues([
    ['Jev • Reusable rubrics', '', '', '', ''],
    ['Use labels or level descriptions in formulas. Score positions start at zero.', '', '', '', ''],
    ['Animal choices', '', 'Score position', 'Frustration level', ''],
    ['Mammal', '', 0, 'Calm and neutral', ''],
    ['Bird', '', 1, 'Concerned but civil', ''],
    ['Other', '', 2, 'Very angry or using strong language', ''],
    ['', '', '', '', ''],
    ['Source: synthetic examples; https://docs.typesafe.ai/primitives', '', '', '', '']
  ]);
  examples.getRange('A1:E12').setValues([
    ['Jev for Sheets', '', '', '', ''],
    ['Connect a key from Extensions → Jev. Edit the blue inputs to see formulas recalculate.', '', '', '', ''],
    ['Example', 'Editable input', 'Question', 'Result', 'What to try'],
    ['Noul', 'dog', 'Is it a mammal?', '', 'Change dog to sparrow; TRUE should become FALSE.'],
    ['Choice / range', 'sparrow', 'What kind of animal is it?', '', 'Choices come from the Rubrics tab.'],
    ['Choice / inline', 'dog', 'What kind of animal is it?', '', 'Labels are supplied directly in the formula.'],
    ['Score / range', 'Thank you. Everything works perfectly.', 'How frustrated is the customer?', '', 'Three levels give a score from 0 to 2.'],
    ['Score / inline', 'I am furious! This is completely unacceptable!', 'How frustrated is the customer?', '', 'Compare with the calm message above.'],
    ['Noul / 80%', 'Please refund my order.', 'Does it request a refund?', '', 'Requires probability strictly greater than 80%.'],
    ['Blank input', '', 'Is it a mammal?', '', 'Returns blank without an API call.'],
    ['', '', '', '', ''],
    ['Raw JSON • multiple questions over one state', '', '', '', '']
  ]);
  var formulas = [
    '=JEV_NOUL(B4,C4)', '=JEV_CHOICE(B5,C5,' + r + '!$A$4:$A$6)',
    '=JEV_CHOICE(B6,C6,"Mammal","Bird","Other")', '=JEV_SCORE(B7,C7,' + r + '!$D$4:$D$6)',
    '=JEV_SCORE(B8,C8,"Calm and neutral","Concerned but civil","Very angry or using strong language")',
    '=JEV_NOUL(B9,C9,80%)', '=JEV_NOUL(B10,C10)'
  ];
  examples.getRange('D4:D10').setFormulas(formulas.map(function (f) { return [f]; }));
  examples.getRange('A13:B15').setValues([
    ['State JSON', JSON.stringify({data: 'dog'})],
    ['Questions JSON', JSON.stringify({mammal: {type:'noul',instructions:'Is the animal in `data` a mammal?'}, animal: {type:'choice',instructions:'What kind of animal is in `data`?',criteria:{Mammal:null,Bird:null,Other:null}}})],
    ['Response JSON', '']
  ]);
  examples.getRange('B15').setFormula('=JEV(B13,B14)');
  examples.getRange('B13:E13').merge(); examples.getRange('B14:E14').merge(); examples.getRange('B15:E15').merge();
  examples.setRowHeight(14, 95); examples.setRowHeight(15, 130);
  examples.getRange('A17:E17').merge().setValue('Synthetic data only. Scores are model judgments; exact probabilities can change. Documentation: https://docs.typesafe.ai/primitives');
  tests.getRange('A1:F3').setValues([
    ['Jev • Live formula tests', '', '', '', '', ''],
    ['Intentional errors are isolated below. PASS checks types, clear cases, and bounds—not exact probabilities.', '', '', '', '', ''],
    ['Case', 'Input', 'Expected condition', 'Actual result', 'Check', 'Purpose']
  ]);
  var cases = [
    ['N01','dog','TRUE','=JEV_NOUL(B4,"Is it a mammal?")','=IF(AND(ISLOGICAL(D4),D4=TRUE),"PASS","FAIL")','Clear positive'],
    ['N02','sparrow','FALSE','=JEV_NOUL(B5,"Is it a mammal?")','=IF(AND(ISLOGICAL(D5),D5=FALSE),"PASS","FAIL")','Clear negative'],
    ['N03','dog','FALSE','=JEV_NOUL(B6,"Is it a mammal?",1)','=IF(AND(ISLOGICAL(D6),D6=FALSE),"PASS","FAIL")','Strict threshold at 1'],
    ['C01','sparrow','Bird','=JEV_CHOICE(B7,"What kind of animal is it?",'+r+'!$A$4:$A$6)','=IF(AND(ISTEXT(D7),D7="Bird"),"PASS","FAIL")','Range choices'],
    ['C02','dog','Mammal','=JEV_CHOICE(B8,"What kind of animal is it?","Mammal","Bird","Other")','=IF(D8="Mammal","PASS","FAIL")','Inline choices'],
    ['S01','Thanks, everything is working well.','Number between 0 and 2','=JEV_SCORE(B9,"How frustrated is the customer?",'+r+'!$D$4:$D$6)','=IF(AND(ISNUMBER(D9),D9>=0,D9<=2),"PASS","FAIL")','Calm message'],
    ['S02','I am furious! This is completely unacceptable!','Number between 0 and 2','=JEV_SCORE(B10,"How frustrated is the customer?",'+r+'!$D$4:$D$6)','=IF(AND(ISNUMBER(D10),D10>=0,D10<=2,D10>D9),"PASS","FAIL")','Angry scores above calm'],
    ['B01','','Blank','=JEV_NOUL(B11,"Is it a mammal?")','=IF(D11="","PASS","FAIL")','No network request'],
    ['D01',0,'TRUE','=JEV_NOUL(B12,"Is it the number zero?")','=IF(D12=TRUE,"PASS","FAIL")','Zero is not blank'],
    ['D02',false,'TRUE','=JEV_NOUL(B13,"Is it the boolean false?")','=IF(D13=TRUE,"PASS","FAIL")','FALSE is not blank'],
    ['J01','{"data":"dog"}','JSON text','=JEV(B14,"{""q"":{""type"":""noul"",""instructions"":""Is the animal in `data` a mammal?""}}")','=IF(AND(ISTEXT(D14),LEFT(D14,1)="{"),"PASS","FAIL")','Full response'],
    ['E01','dog','Error: invalid threshold','=JEV_NOUL(B15,"Is it a mammal?",2)','=IF(ISERROR(D15),"PASS","FAIL")','Intentional validation error'],
    ['E02','dog','Error: duplicate choices','=JEV_CHOICE(B16,"Classify it","Mammal","Mammal")','=IF(ISERROR(D16),"PASS","FAIL")','Intentional validation error'],
    ['E03','dog','Error: too few levels','=JEV_SCORE(B17,"How frustrated?","Calm")','=IF(ISERROR(D17),"PASS","FAIL")','Intentional validation error'],
    ['E04','not JSON','Error: invalid JSON','=JEV(B18,"{}")','=IF(ISERROR(D18),"PASS","FAIL")','Intentional validation error'],
    ['E05','dog','Error: multiple data cells','=JEV_NOUL(B18:B19,"Is it a mammal?")','=IF(ISERROR(D19),"PASS","FAIL")','Intentional validation error']
  ];
  tests.getRange(4,1,cases.length,6).setValues(cases);
  tests.getRange('A21:C21').merge().setValue('Passing tests');
  tests.getRange('D21').setFormula('=COUNTIF(E4:E19,"PASS")');
  tests.getRange('E21').setValue('of 16');
  [examples,rubrics,tests].forEach(function (sheet) {
    var range = sheet.getDataRange();
    range.setFontFamily('Arial').setFontSize(11).setVerticalAlignment('top').setWrap(true);
    sheet.setHiddenGridlines(true); sheet.setFrozenRows(3);
    var cols = range.getNumColumns();
    sheet.getRange(1,1,1,cols).merge().setBackground('#173b49').setFontColor('#ffffff').setFontSize(18).setFontWeight('bold');
    sheet.getRange(2,1,1,cols).merge().setFontColor('#506b7a');
    sheet.getRange(3,1,1,cols).setBackground('#dcebea').setFontWeight('bold');
    sheet.setRowHeight(1,42); sheet.setRowHeight(2,48); sheet.setRowHeight(3,32);
    sheet.setColumnWidth(1,150); sheet.setColumnWidth(2,260); sheet.setColumnWidth(3,240); sheet.setColumnWidth(4,230); sheet.setColumnWidth(5,240);
    if (cols >= 6) sheet.setColumnWidth(6,230);
  });
  examples.getRange('B4:C10').setFontColor('#1859a0').setBackground('#f1f6fc');
  examples.getRange('B13:B14').setFontColor('#1859a0');
  examples.getRange('D7:D8').setNumberFormat('0.000');
  examples.setRowHeights(4,7,64);
  rubrics.setColumnWidth(2,30); rubrics.setColumnWidth(3,130); rubrics.setColumnWidth(4,360);
  rubrics.getRange('A4:A6').setFontColor('#1859a0'); rubrics.getRange('D4:D6').setFontColor('#1859a0');
  tests.setRowHeights(4,16,70); tests.setRowHeight(14,140); tests.getRange('D9:D10').setNumberFormat('0.000');
  tests.getRange('A15:F19').setBackground('#fff3e8');
  ss.setActiveSheet(examples); ss.toast('Added Examples, Rubrics, and Tests' + suffix + '.', 'Jev');
}
