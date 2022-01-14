//* Constant Variables
var height = document.getElementById("myCanvas").height;
var width = document.getElementById("myCanvas").width;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//* Function To Compare Arrays
// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

//* Dog Image Variable According To Their Degrees
var dog_image = new Image();
dog_image.src = "img/Dog.png";

var dog_image_90 = new Image();
dog_image_90.src = "img/Dog_90.png";

var dog_image_180 = new Image();
dog_image_180.src = "img/Dog_180.png";

var dog_image_270 = new Image();
dog_image_270.src = "img/Dog_270.png";

//* Beppers Location
var beepers = [];

//* Dog Position
var x = 0;
var y = 0;
var rotate = 0;
//* Size Of The Map
var aspectRatio = 8;
var size = 50;

var sizeX = 8;

var sizeY = 8

var toggleAddingBeepers = false;

document.getElementById("myCanvas").height = size*sizeY;
document.getElementById("myCanvas").width = size*sizeX;

height = document.getElementById("myCanvas").height;
width = document.getElementById("myCanvas").width;

//* Canvas From HTML
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();


function drawMap() {
  //* Creating Rectangles
  for (var i = 0; i !== sizeX; i++) {
    for (var o = 0; o !== sizeY; o++) {
      ctx.rect(i*size, o*size, size, size);
    }
  }
  ctx.stroke();
  ctx.beginPath();
  if(beepers.length!==0){
    beepers.forEach((i)=>{
        drawBeeper(i[0],i[1]);
    });
  }
  
}

function drawDog() {
  //* Creating Dog Image
  ctx.drawImage(dog_image, 0, height - size, size, size);
}

//* Size Changer
$(function () {
  $("input").keyup(function (e) {
    if(e.target.value.includes("x")){
      var i = e.target.value.split("x");
      try {
        sizeX=parseInt(i[0]);
        sizeY=parseInt(i[1]);
      } catch(e) {
        // statements
        console.log(e);
      }
      
    }
    if(e.target.value.includes("X")){
      var i = e.target.value.split("X");
      try {
        sizeX=parseInt(i[0]);
        sizeY=parseInt(i[1]);
      } catch(e) {
        // statements
        console.log(e);
      }
      
    }
  });
});

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


/**
 * Handle button click and acts accordingly, if + is pressed
 * addBeeper is called and if - is pressed, removeBeeper is called
 * @param {*} a addBeeper or removeBeeper
 *! @param {*} i if + is called this MUST BE 1, OTHERWISE ANYTHING ELSE
 */
function handler(a,i){
  if(i===0){
    document.getElementById("myCanvas").removeEventListener("mousedown", addBeeper);
  }else{
    document.getElementById("myCanvas").removeEventListener("mousedown", removeBeeper);
  }
  
  document.getElementById("myCanvas").addEventListener("mousedown", a);
}

/**
 * Removes beeper on the mouse click
 * @param {*} e MouseEvent
 */
function removeBeeper(e){
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  var onX = Math.floor(mouseX/(width/sizeX));
  var onY = Math.floor(sizeY-mouseY/(height/sizeY));

  beepers.forEach((i, index)=>{
    if(i.equals([onX,onY])){
        beepers.splice(index, 1);
    }
  });
  
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  x = 0;
  y = 0;
  rotate = 0;
  karel();
}

/**
 * Adds beepers on mouse click
 * @param {*} e MouseEvent
 */
function addBeeper(e){
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  var onX = Math.floor(mouseX/(width/sizeX));
  var onY = Math.floor(sizeY-mouseY/(height/sizeY));

  beepers.push([onX,onY]);
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  x = 0;
  y = 0;
  rotate = 0;
  karel();
}

/**
 *  Waits 500ms And Turn Left
 */
async function turnLeft() {
  await sleep(200);
  if (rotate === 0) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(dog_image_90, x * size, height - size - size * y, size, size);
    rotate = 90;
  } else if (rotate === 90) {
    ctx.clearRect(x * size + 1, height  - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(
      dog_image_180,
      x * size,
      height - size - size * y,
      size,
      size
    );
    rotate = 180;
  } else if (rotate === 180) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(
      dog_image_270,
      x * size,
      height - size - size * y,
      size,
      size
    );
    rotate = 270;
  } else if (rotate === 270) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(dog_image, x * size, height - size - size * y, size, size);
    rotate = 0;
  }
}

//* Turn Left Immediately
function turnLeftNotAsync() {
  if (rotate === 0) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(dog_image_90, x * size, height - size - size * y, size, size);
    rotate = 90;
  } else if (rotate === 90) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(
      dog_image_180,
      x * size,
      height - size - size * y,
      size,
      size
    );
    rotate = 180;
  } else if (rotate === 180) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(
      dog_image_270,
      x * size,
      height - size - size * y,
      size,
      size
    );
    rotate = 270;
  } else if (rotate === 270) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(dog_image, x * size, height - size - size * y, size, size);
    rotate = 0;
  }
}

/**
 * Wait 500ms And Turn Right
 */
async function turnRight() {
  await sleep(200);
  turnLeftNotAsync();
  turnLeftNotAsync();
  turnLeftNotAsync();
}

// Turn Right Immediately
function turnRightNotAsync() {
  turnLeftNotAsync();
  turnLeftNotAsync();
  turnLeftNotAsync();
}

/**
 * Wait 500ms And Turn Around
 */
async function turnAround() {
  await sleep(200);
  turnLeftNotAsync();
  turnLeftNotAsync();
}

/**
 * Karel makes move
 */
async function move() {
  await sleep(200);
  if (rotate === 0) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    x += 1;
    ctx.drawImage(dog_image, x * size, height - size - size * y, size, size);
  } else if (rotate === 90) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    y += 1;
    ctx.drawImage(dog_image_90, x * size, height - size - size * y, size, size);
  } else if (rotate === 180) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    x += -1;
    ctx.drawImage(
      dog_image_180,
      x * size,
      height - size - size * y,
      size,
      size
    );
  } else if (rotate === 270) {
    ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    y += -1;
    ctx.drawImage(
      dog_image_270,
      x * size,
      height - size - size * y,
      size,
      size
    );
  }
  if (x < 0 || y < 0 || x > sizeX - 1 || y > sizeY - 1) {
    alert("Front Is Blocked");
    throw "Front Is Blocked";
  }
}

/**
 * Checks If Beepers Exists On Current Location
 */
function beepersPresent(xCord=x, yCord=y) {
  return beepers.some((i) => i[0] === xCord && i[1] === yCord);
}

function noBeepersPresent(){
  return (!beepersPresent());
}

/*
 * Checks If Front Is Clear
 */
function frontIsClear() {
  if (rotate === 0) {
    return x < sizeX - 1;
  } else if (rotate === 90) {
    return y < sizeY - 1;
  } else if (rotate === 180) {
    return x > 0;
  } else if (rotate === 270) {
    return y > 0;
  }
}

/**
 *  Checks If Front Is Not Clear
 */
function frontIsBlocked() {
  return !frontIsClear();
}

/**
 *  Checks If Left Is Clear
 */
function leftIsClear() {
  turnLeftNotAsync();
  var result = frontIsClear();
  turnRightNotAsync();
  return(result);
}

/**
 *  Checks If Left Is Not Clear
 */
function leftIsBlocked() {
  turnLeftNotAsync();
  var result = frontIsBlocked();
  turnRightNotAsync();
  return(result);
}

/**
 *  Checks If right Is Clear
 */
function rightIsClear() {
  turnRightNotAsync();
  var result = frontIsClear();
  turnLeftNotAsync();
  return(result);
}

/**
 *  Checks If right Is Not Clear
 */
function rightIsBlocked() {
  turnRightNotAsync();
  var result = frontIsBlocked();
  turnLeftNotAsync();
  return(result);
}

//* Draw Beeper
function drawBeeper(xCord=x, yCord=y) {
  var count = 0;
  if (beepersPresent()===true || beepersPresent(xCord, yCord)) {
    beepers.some((i) => {
      [xCord, yCord].equals(i) === true && count++;
    });
    
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(
      xCord * size + size / 2,
      height - size - size * yCord + size / 2,
      size / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.stroke();
    if (count > 1) {
      ctx.beginPath();
      ctx.fillStyle = "#e0e0e0";
      if(count>9){
        ctx.font = size/2 + "px Arial";
    }else{
        ctx.font = size + "px Arial";
    }
      ctx.fillText(count.toString(), xCord * size + size / 4, height - size / 10-yCord*size);
    }
  } else {
    ctx.beginPath();
    ctx.arc(
      xCord * size + size / 2,
      height - size - size * yCord + size / 2,
      size / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.stroke();
  }
}


/**
 * Checks if Karel is looking to north
 */
function facingNorth(){
  return (rotate===90);
}

/**
 * Checks if Karel is looking to east
 */
function facingEast(){
  return (rotate===0);
}

/**
 * Checks if Karel is looking to west
 */
function facingWest(){
  return (rotate===180);
}

/**
 * Checks if Karel is looking to south
 */
function facingSouth(){
  return (rotate===270);
}

/**
 * Checks if Karel isn't looking to north
 */
function notFacingNorth(){
  return (!facingNorth());
}

/**
 * Checks if Karel isn't looking to east
 */
function notFacingEast(){
  return (!facingEast());
}

/**
 * Checks if Karel isn't looking to west
 */
function notFacingWest(){
  return (!facingWest());
}

/**
 * Checks if Karel isn't looking to south
 */
function notFacingSouth(){
  return (!facingSouth());
}

/**
 *  Puts Beeper
 */
function putBeeper() {
  ctx.clearRect(x * size + 1, height - size + 1 - size * y, size - 2, size - 2);
  beepers.push([x, y]);
  drawBeeper();

  if (rotate === 0) {
    ctx.drawImage(dog_image, x * size, height - size - size * y, size, size);
  } else if (rotate === 90) {
    ctx.drawImage(dog_image_90, x * size, height - size - size * y, size, size);
  } else if (rotate === 180) {
    ctx.drawImage(
      dog_image_180,
      x * size,
      height - size - size * y,
      size,
      size
    );
  } else if (rotate === 270) {
    ctx.drawImage(
      dog_image_270,
      x * size,
      height - size - size * y,
      size,
      size
    );
  }
}

/**
 * Picks beeper
 */
function pickBeeper() {
  var count = 0;
  if (beepersPresent()) {
    beepers.some((i) => {
      [x, y].equals(i) === true && count++;
    });
    if (count > 1) {
      ctx.clearRect(
        x * size + 1,
        height - size + 1 - size * y,
        size - 2,
        size - 2
      );
      count--;
      ctx.beginPath();
      ctx.fillStyle = "#000000";
      ctx.arc(
        x * size + size / 2,
        height - size - size * y + size / 2,
        size / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
      if (count > 1) {
        ctx.beginPath();
        
        ctx.fillStyle = "#e0e0e0";
        if(count>9){
            ctx.font = size/2 + "px Arial";
        }else{
            ctx.font = size + "px Arial";
        }
        ctx.fillText(count.toString(), x * size + size / 4, height - size / 10);
      }
      if (rotate === 0) {
        ctx.drawImage(
          dog_image,
          x * size,
          height - size - size * y,
          size,
          size
        );
      } else if (rotate === 90) {
        ctx.drawImage(
          dog_image_90,
          x * size,
          height - size - size * y,
          size,
          size
        );
      } else if (rotate === 180) {
        ctx.drawImage(
          dog_image_180,
          x * size,
          height - size - size * y,
          size,
          size
        );
      } else if (rotate === 270) {
        ctx.drawImage(
          dog_image_270,
          x * size,
          height - size - size * y,
          size,
          size
        );
      }
      
    } else {
      ctx.clearRect(
        x * size + 1,
        height - size + 1 - size * y,
        size - 2,
        size - 2
      );
      
    }
    for(var index=0; index<beepers.length; index++){
        if(beepers[index].equals([x,y])===true){
            beepers.splice(index, 1);
            break;
        }
    }
    if (rotate === 0) {
      ctx.drawImage(dog_image, x * size, height - size - size * y, size, size);
    } else if (rotate === 90) {
      ctx.drawImage(
        dog_image_90,
        x * size,
        height - size - size * y,
        size,
        size
      );
    } else if (rotate === 180) {
      ctx.drawImage(
        dog_image_180,
        x * size,
        height - size - size * y,
        size,
        size
      );
    } else if (rotate === 270) {
      ctx.drawImage(
        dog_image_270,
        x * size,
        height - size - size * y,
        size,
        size
      );
    }
  } else {
    alert("No Beepers Present!");
    throw "No Beepers Present!";
  }
}

//* On Click Run User's Script
function run(b=beepers) {
  document.getElementById("myCanvas").removeEventListener("mousedown", addBeeper);
  toggleAddingBeepers=false;
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  x = 0;
  y = 0;
  rotate = 0;
  beepers = b;
  karel();
  //* Adds await and async to functions
  let codeList = localStorage.getItem("code").split("\n");
  codeList = codeList.map((i)=>(i.includes("();") ? i="await "+i : i=i));
  codeList = codeList.map((i)=>(i.includes("function") ? i="async "+i : i=i));
  codeList = codeList.join("\n");
  eval("(async () => {" + codeList + "})()");
}

function karel() {
  drawMap();
  drawDog();
}
function reSize(){
  document.getElementById("myCanvas").height = size*sizeY;
  document.getElementById("myCanvas").width = size*sizeX;
  height = document.getElementById("myCanvas").height;
  width = document.getElementById("myCanvas").width;
  karel();
}
function reset(){
  beepers=[];
  ctx.clearRect(0, 0, width, height);
  karel();
}
setTimeout(() => {
  karel();
}, 1000);

