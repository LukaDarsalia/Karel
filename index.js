//* Constant Variables
const height = document.getElementById("myCanvas").height;
const width = document.getElementById("myCanvas").width;

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
var beepers = [[2,0],[2,0],[2,0],[2,0],[3,0],[3,0],[3,0],[3,0]];

//* Dog Position
var x = 0;
var y = 0;
var rotate = 0;

//* Canvas From HTML
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();

//* Size Of The Map
var aspectRatio = 8;
var size = height / aspectRatio;

function drawMap() {
  //* Creating Rectangles
  for (var i = 0; i !== height; i += size) {
    for (var o = 0; o !== width; o += size) {
      ctx.rect(i, o, size, size);
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
  $("input").keydown(function () {
    // Save old value.
    if (
      !$(this).val() ||
      (parseInt($(this).val()) <= 30 && parseInt($(this).val()) >= 0)
    )
      $(this).data("old", $(this).val());
  });
  $("input").keyup(function () {
    // Check correct, else revert back to old value.
    if (
      !$(this).val() ||
      (parseInt($(this).val()) <= 30 && parseInt($(this).val()) >= 0)
    );
    else $(this).val($(this).data("old"));
  });
});
$("input").keydown(function (e) {
  if (e.originalEvent.code === "Enter") {
    console.log(typeof parseInt($(this).val()));
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    x = 0;
    y = 0;
    rotate = 0;
    aspectRatio = parseInt($(this).val());
    size = height / aspectRatio;
    karel();
  }
});

//* Wait 500ms And Turn Left
async function turnLeft() {
  await sleep(200);
  if (rotate === 0) {
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(dog_image_90, x * size, height - size - size * y, size, size);
    rotate = 90;
  } else if (rotate === 90) {
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(dog_image_90, x * size, height - size - size * y, size, size);
    rotate = 90;
  } else if (rotate === 90) {
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    ctx.drawImage(dog_image, x * size, height - size - size * y, size, size);
    rotate = 0;
  }
}

//* Wait 500ms And Turn Right
async function turnRight() {
  await sleep(200);
  turnLeftNotAsync();
  turnLeftNotAsync();
  turnLeftNotAsync();
}

//* Wait 500ms And Turn Around
async function turnAround() {
  await sleep(200);
  turnLeftNotAsync();
  turnLeftNotAsync();
}

//* Move Conditions
async function move() {
  await sleep(200);
  if (rotate === 0) {
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    x += 1;
    ctx.drawImage(dog_image, x * size, height - size - size * y, size, size);
  } else if (rotate === 90) {
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
    if (beepersPresent() === true) {
      drawBeeper();
    }
    y += 1;
    ctx.drawImage(dog_image_90, x * size, height - size - size * y, size, size);
  } else if (rotate === 180) {
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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
    ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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
  if (x < 0 || y < 0 || x > aspectRatio - 1 || y > aspectRatio - 1) {
    alert("Front Is Blocked");
    throw "Front Is Blocked";
  }
}

//* Check If Beepers Exists On Current Location
function beepersPresent(xCord=x, yCord=y) {
  return beepers.some((i) => i[0] === xCord && i[1] === yCord);
}

//* Check If Front Is Clear
function frontIsClear() {
  if (rotate === 0) {
    return x < aspectRatio - 1;
  } else if (rotate === 90) {
    return y < aspectRatio - 1;
  } else if (rotate === 180) {
    return x > 0;
  } else if (rotate === 270) {
    return y > 0;
  }
}

//* Check If Front Is Not Clear
function frontIsBlocked() {
  return !frontIsClear();
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

//* Put Beeper
function putBeeper() {
  ctx.clearRect(x * size + 1, 600 - size + 1 - size * y, size - 2, size - 2);
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

function pickBeeper() {
  var count = 0;
  if (beepersPresent()) {
    beepers.some((i) => {
      [x, y].equals(i) === true && count++;
    });
    if (count > 1) {
      ctx.clearRect(
        x * size + 1,
        600 - size + 1 - size * y,
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
        600 - size + 1 - size * y,
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
function run(b=[[2,0],[2,0],[2,0],[2,0],[3,0],[3,0],[3,0],[3,0]]) {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  x = 0;
  y = 0;
  rotate = 0;
  beepers = b;
  console.log(b);
  karel();
  let code = localStorage
    .getItem("code")
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replaceAll("move();", "await move();")
    .replaceAll("turnLeft();", "await turnLeft();")
    .replaceAll("turnRight();", "await turnRight();")
    .replaceAll("turnAround();", "await turnAround();");
  eval("(async () => {" + code + "})()");
}

function karel() {
  drawMap();
  drawDog();
}
setTimeout(() => {
  karel();
}, 1000);



