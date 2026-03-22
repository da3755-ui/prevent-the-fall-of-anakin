//defining all the variables that will be used
let soundtrack; 
let startPage; 
let buttonInstruction; 
let buttonSkip;
let buttonStart;
let buttonTryAgain;
let startFont; 
let gameState = 'start'; 
let instructions;
let firstQuestion=[];
let secondQuestion=[];
let thirdQuestion=[];
let fourthQuestion=[];
let fifthQuestion=[];
let sixthQuestion=[];
let seventhQuestion=[];
let node1Image;
let node2Image;
let node3Image;
let node4Image;
let node5Image;
let node6Image;
let node7Image;
let sithEndingImage;
let happyEndingImage;
let deathEndingImage;
let help = "Press f (possibly twice) to toggle fullscreen";

function preload(){
  //load start page's sound
  soundtrack=loadSound("sounds/Grievous Speaks to Lord Sidious.mp3");
  //load start page's image
  startPage=loadImage("images/Start Page.png");
  //load each question/option's background image
  node1Image=loadImage("images/coruscantApartment.png");
  node2Image=loadImage("images/theCouncil.png");
  node3Image=loadImage("images/Naboo.png");
  node4Image=loadImage("images/theCouncil.png");
  node5Image=loadImage("images/winduVsPalpatine.png");
  node6Image=loadImage("images/sithDiscovery.png");
  node7Image=loadImage("images/sithDiscovery.png");
  sithEndingImage=loadImage("images/DarthVader.jpg");
  happyEndingImage=loadImage("images/Tranquil lakeside.png");
  deathEndingImage=loadImage("images/deathEnd.png");
  //load fonts
  startFont=loadFont("fonts/Starjhol.ttf");
  titleFont=loadFont("fonts/Oxanium-Bold.ttf");
}
//------create full screen when f is pressed--------------
function keyPressed(){
  if (key=='f'){
    toggleFullScreen();
  }
}
//Toggle fullscreen state. Must be called in response to a user event
function toggleFullScreen(){
  let fs=fullscreen();//get the current state
  fullscreen(!fs);//flip it
}

//allow the page to resize itself according to the window's page
function windowResized(){
  print("resized to"+windowWidth+","+windowHeight);
  resizeCanvas(windowWidth, windowHeight);

  //i placed the buttons' position here so their position changes as well with respect to the window size
    buttonInstruction.position(width/2 - 180, height/1.13 );
    buttonTryAgain.position(width/2 - 300, height-200);
    buttonStart.position(width/2 - 180, height/1.13);
    instructions.position(0,0);
    instructions.size(width,height);
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  print(help);
  
  //creating the instruction video that will be played 
  instructions=createVideo('images/InstructionsPage (1).mp4');
  //hiding it until it is called in the instructions function
  instructions.hide();

//------create instructions button------
buttonInstruction=createButton("INSTRUCTIONS");
buttonInstruction.size(360, 70);
buttonInstruction.style('font-size', '20px');
buttonInstruction.style('background-color', 'black');
buttonInstruction.style('color', 'white');
buttonInstruction.style('border', 'none');
buttonInstruction.style('font-family', 'startFont');
buttonInstruction.style('text-align', 'center');
buttonInstruction.mousePressed(transitionToInstructions);//trigger the insructions function when the button is pressed
buttonInstruction.hide();
buttonInstruction.position(width/2 - 180, height/1.13);

//creating the restart button
buttonTryAgain=createButton("RESTART");
buttonTryAgain.size(600, 120);
buttonTryAgain.style('font-size', '20px');
buttonTryAgain.style('background-color', 'black');
buttonTryAgain.style('color', 'white');
buttonTryAgain.style('border', 'none');
buttonTryAgain.style('font-family', 'startFont');
buttonTryAgain.style('text-align', 'center');
buttonTryAgain.hide();
buttonTryAgain.position(width/2 - 300, height-200);

//creating the start button
buttonStart=createButton("START");
buttonStart.size(360, 70);
buttonStart.style('font-size', '20px');
buttonStart.style('background-color', 'black');
buttonStart.style('color', 'white');
buttonStart.style('border', 'none');
buttonStart.style('font-family', 'startFont');
buttonStart.style('text-align', 'center');
buttonStart.mousePressed(startGame); //call the function to start the game once it is pressed
buttonStart.hide() //hide the button until we can call it in the instructions function
buttonStart.position(width/2 - 180, height/1.13);

//customize the constructors made in the classes and accessing them
firstQuestion[0]=new Question1('Anakin saw Padme die in his dream, and he fears it may come true. \nPadme suggests speaking to Obi-Wan. \nWhat should he do?', 'Tell Obi-Wan, but risk his marriage and possibility of being a Jedi', 'Secretly investigate on his own, but risk not finding answers');
secondQuestion[0]=new Question2("After confiding in Obi-Wan, Obi-Wan grants him two choices", "Leave the Order completely.", "Let go of Padme \nwhile they are taken care of away from him.");
thirdQuestion[0]=new Question3('Anakin leaves the Order to live in Naboo with Padme and raise their children\n but receives an unexpected visitor: the Chancellor \nwho offers him help with his dreams', 'Refuse his help, but risk losing Padme', 'Accept his offer and train under the wing of the Chancellor');
fourthQuestion[0]=new Question4('The Council does not trust the Chancellor and suspect something wrong \nObi-Wan asks Anakin to spy on the Chancellor, should he...', 'accept', 'refuse');
fifthQuestion[0]=new Question5("Anakin  informs Master Windu that the Chancellor is a Sith Lord\nMaster Windu immediately finds the Chancellor, ready to kill him off\nShould Anakin","Help Master Windu kill Palpatine.", "Stop Master Windu to stop Padme's death.")
sixthQuestion[0]=new Question6("Anakin refused to spy on the Chancellor \nThe Chancellor reveals to Anakin that he can help him stop Padme's death\n...using the Dark Side\nAnakin is now certain that the Chancellor is a Sith Lord\n Should he","Inform the council, get their trust, but risk losing Padme","Keep it a secret and protect Padme")
seventhQuestion[0]=new Question7("Anakin agreed to spy on the Chancellor.\nThe Chancellor reveals to Anakin that he can help him stop Padme's death\n...using the Dark Side\nAnakin is now certain that the Chancellor is a Sith Lord\n Should he","Inform the council, get their trust, but risk losing Padme","Keep it a secret and protect Padme")
soundtrack.play();//play the sound in the background (placed in setup so it doesn't keep runing over itself which was a problem i faced when i put it in draw)

}

function draw(){
//creating the conditions that will allow to switch between nodes
 if (gameState === 'start') {
    drawStartScreen();
  } else if(gameState==='instructions'){
    drawInstructions();
  } else   if (gameState==='node1'){//what happens in the first node and so on
    drawNode1();
  } else if (gameState==='node2'){
    drawNode2();
  } else if (gameState==='node3'){
    drawNode3();
  } else if(gameState==='node4'){
    drawNode4();
  } else if(gameState==='node5'){
    drawNode5();
  } else if(gameState==='node6'){
    drawNode6();
  } else if(gameState==='node7'){
    drawNode7();
  } else if(gameState==='sithEnding'){
    drawSithEnding();
  } else if(gameState==='deathEnding'){
    drawDeathEnding();
  } else if(gameState==='happyEnding'){
    drawHappyEnding();
  }
}

//creating and customizing the start screen
function drawStartScreen(){
  background('black');

  textAlign(CENTER, CENTER);

  fill('white');
  textSize(88);
  textFont(startFont);
  text("STAR WARS", width/2, height/4);

  textSize(42);
  textFont(titleFont);
  text("PREVENT THE FALL OF ANAKIN", width/2, height/2.5);

  stroke('white');
  strokeWeight(10);
  line(0, height*0.45, width, height*0.45);

  textSize(18);
  noStroke();
  text("Press f (possibly twice) to toggle fullscreen", width/2, height/1.25);

  buttonInstruction.show();//show the instructions button
}

function transitionToInstructions(){//created transition functions to make it easier to shift game states, rather than shifting game states within each node's functions 
gameState='instructions'; //change the game state to instructions
}

//customizing the instructions page
function drawInstructions(){
  background('black');
  buttonInstruction.hide();
  buttonStart.show();

  soundtrack.stop();//mute the background audio of the game so it doesn't overlap with the instructions audio

  instructions.show();
  instructions.position(0,0);
  instructions.size(width,height);
  instructions.play();

}

function startGame(){
  //what happens after you click the start button.
  //makes the instruction video stop and hide
  buttonStart.hide();
  buttonInstruction.hide();
  instructions.stop();
  instructions.hide();
  

  gameState = 'node1';//changes the game state to the first node/choice to make
  soundtrack.play(); //plays the background audio again

  //show the first question
  firstQuestion[0].show(); 
}

function drawNode1(){
    image(node1Image, 0,0,width,height); 
    firstQuestion[0].display();//display the question
    firstQuestion[0].show();//display the choice buttons  
      //calls the transition function once you click a button
    firstQuestion[0].option1Button.mousePressed(transitionToNode2);
     //chatGpt told me to create a transition function. i originally had this statement in my node1 function but chatgpt told me to move it. also chatgpt told  me that to access my buttons i had to put my array name first  
    firstQuestion[0].option2Button.mousePressed(transitionToNode4); 
}

function transitionToNode2(){
  gameState='node2';//apparently there is a difference between === and = which i am not sure i understand but i made chatgpt explain it to me
  secondQuestion[0].show(); 
}

//------------REPEAT THE SAME PATTERN: DRAW NODE ---> GO TO TRANSITION FUNCTION ONCE BUTTON PRESSED ---> CHANGE GAME STATE ---> DRAW NODE

function drawNode2(){
  firstQuestion[0].hide();
  image(node2Image,0,0,width,height);
  secondQuestion[0].display();//display the question
  secondQuestion[0].show();//display the choice buttons 
  secondQuestion[0].option1Button.mousePressed(transitionToNode3);
  secondQuestion[0].option2Button.mousePressed(transitionToNode4);
}


function transitionToNode3(){
  gameState='node3';
  thirdQuestion[0].show();
}

function drawNode3(){
  secondQuestion[0].hide();
  image(node3Image,0,0,width,height);
  thirdQuestion[0].display();//display the question
  thirdQuestion[0].show();//display the choice buttons 
  thirdQuestion[0].option1Button.mousePressed(transitionToHappyEnding);
  thirdQuestion[0].option2Button.mousePressed(transitionToSithEnding);
}

function transitionToHappyEnding(){
  gameState='happyEnding';
}

function drawHappyEnding(){
  image(happyEndingImage,0,0,width,height);
  thirdQuestion[0].hide();
  textSize(42);
  fill('black');
  text("ENDING\n Anakin now live happily in Naboo with Padme and their children \nwhile instability is still on the rise in the galaxy...\n \nWould you like to try again?", width/2, height/5);
  buttonTryAgain.show();
  buttonTryAgain.mousePressed(transitionToRestart);
}

function transitionToNode4(){
  gameState='node4';
  fourthQuestion[0].show();
}

function drawNode4(){
  firstQuestion[0].hide();
  secondQuestion[0].hide();
  image(node4Image,0,0,width,height);
  fourthQuestion[0].show();
  fourthQuestion[0].display();
  fourthQuestion[0].option1Button.mousePressed(transitionToNode7);
  fourthQuestion[0].option2Button.mousePressed(transitionToNode6);
}


function transitionToNode7(){
  fourthQuestion[0].hide();
  gameState='node7';
  seventhQuestion[0].show();
}

function drawNode7(){
  image(node7Image,0,0,width,height);
  seventhQuestion[0].display();
  seventhQuestion[0].show();
  seventhQuestion[0].option1Button.mousePressed(transitionToNode5);
  seventhQuestion[0].option2Button.mousePressed(transitionToSithEnding);
}

function transitionToNode6(){
  fourthQuestion[0].hide();
  gameState='node6';
  sixthQuestion[0].show();
}

function drawNode6(){
  image(node6Image, 0,0,width,height);
  sixthQuestion[0].display();
  sixthQuestion[0].show();
  sixthQuestion[0].option1Button.mousePressed(transitionToNode5);
  sixthQuestion[0].option2Button.mousePressed(transitionToSithEnding);
}

function transitionToNode5(){
  gameState='node5';
  sixthQuestion[0].hide();
  seventhQuestion[0].hide()
  fifthQuestion[0].show();
  fifthQuestion[0].display();
}

function drawNode5(){
  image(node5Image,0,0,width,height);
  fifthQuestion[0].display();
  fifthQuestion[0].show();
  fifthQuestion[0].option1Button.mousePressed(transitionToDeathEnding);
  fifthQuestion[0].option2Button.mousePressed(transitionToSithEnding);
}

function transitionToSithEnding(){
  gameState='sithEnding'
}

function drawSithEnding(){
  thirdQuestion[0].hide();
  fifthQuestion[0].hide();
  sixthQuestion[0].hide();
  seventhQuestion[0].hide();
  image(sithEndingImage,0,0,width,height);
  textSize(42);
  text("ENDING\n You could not prevent Anakin from turning to the Dark Side...\n \nWould you like to try again?", width/2, height/5);
  buttonTryAgain.show();
  buttonTryAgain.mousePressed(transitionToRestart);
}

//reset the game back to the start game state, successfully restarting the game
function transitionToRestart(){
  buttonTryAgain.hide();
  gameState='start';
}

function transitionToDeathEnding(){
  gameState='deathEnding';
}

function drawDeathEnding(){
  fifthQuestion[0].hide();
  image(deathEndingImage,0,0,width,height);
  textSize(42);
  fill('black');
  text(" \nENDING\n Anakin and Master Windu defeated the Chancellor\n... at a cost \nAnakin died while fighting alongside Master Windu\n \nWould you like to try again?", width/2, height/5);
  buttonTryAgain.show();
  buttonTryAgain.mousePressed(transitionToRestart);
}