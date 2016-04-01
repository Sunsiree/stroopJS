var colorVals = {
  "red": [255, 0, 0],
  "green": [0, 220, 0],
  "blue": [50, 50, 255],
  "purple": [150, 0, 200]
};

var numberVals = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five"
};

var dirVals = {
  "up": [0, -125],
  "down": [0, 125],
  "left": [-125, 0],
  "right": [125, 0]
};

var keyVals = {
  82: "red", 
  71: "green",
  66: "blue",
  80: "purple",
  38: "up",
  40: "down",
  37: "left",
  39: "right",
  49: "1",
  50: "2",
  51: "3",
  52: "4", 
  53: "5"
};

// Game logic

var getRandomProperty = function(obj) {
  var keys = Object.keys(obj);
  return keys[ keys.length * Math.random() << 0];
};

var repaint = function() {
  fill(255,255,255);
  rect(0,0,400,400);
  noFill();
};

var setWord = function(mode) {
  var f = createFont(mode, 48);
  textFont(f);
  textAlign(CENTER, CENTER);

  var wordColor = getRandomProperty(colorVals);
  var wordText = getRandomProperty(colorVals);
  var colorVar = color(colorVals[wordColor][0], colorVals[wordColor][1], colorVals[wordColor][2]);

  fill(colorVar);
  text(wordText, 200, 200);
  noFill();

  return wordColor;
};

var setNumber = function() {
  var randNum = random(20, 36);
  var f = createFont("sans-serif", randNum);
  textFont(f);
  textAlign(CENTER, CENTER);

  var numberText = numberVals[getRandomProperty(numberVals)];
  var numberCount = getRandomProperty(numberVals);

  fill(0, 0, 0);
  for (var i = 1; i <= numberCount; ++i) {
    text(numberText, 200, 200 + randNum*numberCount/2 - randNum*i);
  }
  noFill();

  return numberCount;
};

var setDirection = function() {
  var f = createFont("sans-serif", 48);
  textFont(f);
  textAlign(CENTER, CENTER);

  var dirText = getRandomProperty(dirVals);
  var dirLoc = getRandomProperty(dirVals);
  var coords = dirVals[dirLoc];

  fill(0, 0, 0);
  text(dirText, 200 + coords[0] + random(-25, 25), 200 + coords[1] + random(-25, 25));
  noFill();
  
  return dirText;
};

// Set up

var answer; 
var currMode;

var makeButtons = function() {
  noStroke();
  fill(255, 200, 200);
  rect(10, 350, 80, 40, 10);
  fill(200, 255, 200);
  rect(110, 350, 80, 40, 10);
  fill(200, 200, 255);
  rect(210, 350, 80, 40, 10);
  fill(200, 255, 255);
  rect(310, 350, 80, 40, 10);

  var f = createFont("sans-serif", 14);
  textFont(f);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  text("Words", 50, 370);
  text("Fancy", 150, 370);
  text("Numbers", 250, 370);
  text("Directions", 350, 370);
  noFill();
};

var playWords = function() {
  var f = createFont("sans-serif", 14);
  textFont(f);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  text("STROOP TASK: WORDS", 200, 20);
  text("Identify the COLOR OF THE WORD.", 200, 40);
  text("Press 'r', 'b', 'g', or 'p'.", 200, 60);
  answer = setWord("sans-serif");
  noFill();
};

var playFancyWords = function() {
  var f = createFont("sans-serif", 14);
  textFont(f);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  text("STROOP TASK: FANCY WORDS", 200, 20);
  text("Identify the COLOR OF THE FANCY WORD.", 200, 40);
  text("Press 'r', 'b', 'g', or 'p'.", 200, 60);
  answer = setWord("cursive");
  noFill();
};

var playNumbers = function() {
  var f = createFont("sans-serif", 14);
  textFont(f);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  text("STROOP TASK: COUNTS", 200, 20);
  text("COUNT THE NUMBER of words.", 200, 40);
  text("Press '1', '2', '3', '4', or '5'.", 200, 60);
  answer = setNumber();
  noFill();
};

var playDirections = function() {
  var f = createFont("sans-serif", 14);
  textFont(f);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  text("STROOP TASK: DIRECTIONS", 200, 20);
  text("PRESS THE DIRECTION the word says.", 200, 40);
  text("Press up, down, left, and right on the keypad.", 200, 60);
  answer = setDirection();
  noFill();
};

var checkWin = function(input, answer) {
  if (input === answer) {
    playSound(getSound("retro/coin"));
  } else {
    playSound(getSound("rpg/giant-no"));
  }
  repaint();
  makeButtons();
  switch(currMode) {
    case "words":
      playWords();
      break;
    case "fancy":
      playFancyWords();
      break;
    case "numbers":
      playNumbers();
      break;
    case "directions":
      playDirections();
      break;
  }
};

var f = createFont("sans-serif", 14);
textFont(f);
textAlign(CENTER, CENTER);
fill(0, 0, 0);
fill(0, 0, 0);
text("Press a button!", 200, 40);
noFill();
makeButtons();

// Listeners
mouseClicked = function() {
  if (mouseY > 350 && mouseY < 390) {
    repaint();
    makeButtons();
    switch (true) {
      case (mouseX > 10 && mouseX < 90):
        currMode = "words";
        playWords();
        break;
      case mouseX > 110 && mouseX < 190:
        currMode = "fancy";
        playFancyWords();
        break;
      case mouseX > 210 && mouseX < 290:
        currMode = "numbers";
        playNumbers();
        break;
      case mouseX > 310 && mouseX < 390:
        currMode = "directions";
        playDirections();
        break;
    }
  }
}; 

keyPressed = function() {
  var code = String(keyCode);
  if (Object.keys(keyVals).includes(code)) {
    checkWin(keyVals[code], answer);
  }
};
