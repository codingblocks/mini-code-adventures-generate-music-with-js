var tracery = require('tracery-grammar');
var chordGrammar = tracery.createGrammar({
  //'definition': ['6','7','maj','min','sus2','sus4','maj7','min7','dom7','dim','dim7','aug','sixth','Maj','m','Min','Dim','Dim7','Maj7','Min7','m7','Dom7','Sus2','Sus4','Aug','6th','Sixth'],
  'sadDefinition': ['min','min7'],
  'happyDefinition': ['maj','maj7','sus4'],
  'sassyDefinition': ['dom7','dim','dim7'],
  'sadNote': ['A','E','D'],
  'happyNote': ['C','F','G'],
  'sassyNote': ['B','G'],
  'chordType': ['#sadNote##sadDefinition#','#happyNote##happyDefinition#','#sassyNote##sassyDefinition#'],
  'text':['#chordType#'],
});

var rhythmGrammar = tracery.createGrammar({
  'groove': ['x__x__x-','x--x__x-','x--x--x_'],
  'text':['#groove#'],
});

var getRandomText = function(grammar) {
  return grammar.flatten('#text#');
}

var getText = function(grammar, textCount) {
  var textItems = [];
  for(var i = 0; i < textCount; i++) {
    var text = getRandomText(grammar);
    textItems.push(text);
  }
  return textItems;
}

var chordList = getText(chordGrammar, 8);
console.log('chordList:',chordList);

var rhythmList = getText(rhythmGrammar, 8);
console.log('rhythmList:',rhythmList);

const scribble = require('scribbletune');
let chords = scribble.clip({
    notes: chordList,
    pattern: rhythmList.join(''),
    sizzle: true
});  
scribble.midi(chords, 'random-music.mid');