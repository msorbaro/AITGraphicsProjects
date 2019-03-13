"use strict";
const Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);

  this.starGeometry = new StarGeometry(gl);
  this.HeartGeometry = new HeartGeometry(gl);

  this.trianglePosition = new Vec3(0,0,0);
  this.triangleAngle = 0;
  this.triangleScale = new Vec3(1.5, 1.1, .5);


  this.timeAtLastFrame = new Date().getTime();
  //in constructor:
  this.timeAtFirstFrame = new Date().getTime();


  this.timeAtLastFrame = this.timeAtFirstFrame;

  this.material = new Material(gl, this.solidProgram);
  this.material.solidColor.set(0.98, 1.0, 0.46);

  this.material2 = new Material(gl, this.solidProgram);
  this.material2.solidColor.set(0.34, 0.65, 0.85);

  this.heartMaterial = new Material(gl, this.solidProgram);
  this.heartMaterial.solidColor.set(1.0, 0.0, 0.99);

  this.pulseMaterial = new Material(gl, this.solidProgram);
  this.pulseMaterial.solidColor.set(.1, .4, .4)
  this.spinObjects = [];

  this.starMesh = new Mesh(this.starGeometry, this.material);
  this.starMesh2 = new Mesh(this.starGeometry, this.material2)
  this.heartMeshPulse = new Mesh(this.HeartGeometry, this.pulseMaterial)

  this.heartMesh = new Mesh(this.HeartGeometry, this.heartMaterial);

  this.scaleCount = 0;
  this.scaleDirectionUp = true;

  this.countMaterials = 0;

  this.gameObjects = [];
  this.shrinkObjects = [];
  this.shrinkObjectsScale = [];

  this.BPressed = false;
  this.currClicked = [];
  this.ogposition = null;
// const star1 = new GameObject(this.starMesh);
// star1.position.set(.5, .5, 0);
// this.gameObjects.push(star1);

  for (var x = 1; x <= 10 ; x++){
    var tempArray= []
    for (var y = 1; y <= 10; y++ ){
      var star;
      if (Math.random() < .5){
        star = new GameObject(this.heartMesh);
        star.scale.set(.005, .005, .005)
      }
      else if (Math.random() < .25){
        star = new GameObject(this.heartMeshPulse);
        star.scale.set(.005, .005, .005)
      }
      else if (Math.random() < .15){
        star = new GameObject(this.starMesh);
        star.scale.set(.08, .08, .08)
        this.spinObjects.push(star);
      }
      else {
        star = new GameObject(this.starMesh2);
        star.scale.set(.08, .08, .08)
      }

        star.position.set(.2 * x -1 -.1, .2* y -1 -.1, 0);


      tempArray.push(star);
    }
    this.gameObjects.push(tempArray);

  }

};

Scene.prototype.update = function(gl, keysPressed) {
  //jshint bitwise:false
  //jshint unused:false
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;


  const modelMatrixUniformLocation = gl.getUniformLocation(
    this.solidProgram.glProgram,
    "modelViewProjMatrix"

  );


  gl.clearColor(0.0, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  this.material.commit();

  if (keysPressed.B){
    this.BPressed = true;
  }
  else {
    this.BPressed = false;
  }
  // this.triangleGeometry.draw();
  //this.gameObjects[3][3].orientation = (this.gameObjects[3][3].orientation+ .01);
  for (var i = 0; i< this.spinObjects.length; i++){
    this.spinObjects[i].orientation = this.spinObjects[i].orientation +.01;
  }

  this.pulseMaterial.solidColor.set(Math.sin( 1.5 * dt) * .95, .2, .5)

  if (this.shrinkObjects.length > 0){
    for(var i = 0; i< this.shrinkObjects.length; i++){
        // console.log(this.shrinkObjects[i].mesh.geometry == this.starGeometry);
        if(this.shrinkObjectsScale[i] < 80 && this.shrinkObjects[i].mesh.geometry == this.starGeometry){
          this.shrinkObjects[i].scale.add(-.001, -.001, -.001);
        }
        else if (this.shrinkObjectsScale[i] < 85 && this.shrinkObjects[i].mesh.geometry == this.HeartGeometry) {
          this.shrinkObjects[i].scale.add(-.00006, -.00006, -.00006);
        }
        this.shrinkObjectsScale[i] = this.shrinkObjectsScale[i] + 1;
        this.shrinkObjects[i].orientation = (this.shrinkObjects[i].orientation+ .05);


        if(this.shrinkObjectsScale[i] >= 85){
          for (var r = 0; r<this.gameObjects.length; r++){
          //  console.log("hi")

            for(var c= 0; c <this.gameObjects[i].length; c++){
            //  console.log(this.gameObjects[r][c]);
              if (this.gameObjects[r][c] != null && this.shrinkObjects[i]!=null && this.shrinkObjects[i]== this.gameObjects[r][c]){
                this.gameObjects[r][c]= null;
              }
            }
          }
          this.shrinkObjects.splice(i, 1);
          this.shrinkObjectsScale.splice(i, 1);
      //    this.gameObjects = checkShiftDown(this.gameObjects);

        }

    }
  }


  this.countMaterials++;


  for (var i = 0; i < this.gameObjects.length; i++){
    for(var j = 0; j< this.gameObjects[i].length; j++){
      if( this.gameObjects[i][j] != null) this.gameObjects[i][j].draw();

    }
  }

};
//
// function checkShiftDown(gameObjects){
//   for(var y = 0; y< gameObjects.length - 1; y++){
//     for(var x = 0; x < gameObjects.length - 1; x++){
//       console.log("y: " + y + " x: " + x)
//       if(gameObjects[x][y] == null){
//         gameObjects[x][y] = gameObjects[x][y+1];
//         var count = 1;
//         while(gameObjects[x][y] == null){
//           count++;
//           if(count > 9) break;
//           gameObjects[x][y] = gameObjects[x][y+count];
//           console.log("count: " + count);
//         }
//         if(count < 9){
//           gameObjects[x][y].position = gameObjects[x][y+ count].position;
//           gameObjects[x][y+count] = null;
//         }
//         else {
//           gameObjects[x][y].position = gameObjects[x][9].position;
//           //gameObjects[x][9] = null;
//         }
//       }
//     }
//   }
//   return gameObjects;
// }


Scene.prototype.onClickDown = function(event){
  //  console.log((event.clientX/canvas.width) + " " + (event.clientY/canvas.height))
  //console.log(event.x/screen.width*10 + "  " + event.y/screen.height*10)
  //console.log(event);
  var x = ((event.clientX/canvas.width) -.5) * 2;
  var y = ((event.clientY/canvas.height) -.5) * -2;
  //  console.log(x + " " + y)
  var coorx = getCoors(x, y)[0];
  var coory = getCoors(x, y)[1];
  console.log(coorx + " " + coory);
  this.currClicked = [coorx, coory];
  this.ogposition = this.gameObjects[coorx][coory].position;

  console.log("OG POSITION");
  console.log(this.ogposition)


  //this.gameObjects[coorx][coory].scale.set(.001, .001, .001);
  if (this.BPressed){
    this.shrinkObjects.push(this.gameObjects[coorx][coory])
    this.shrinkObjectsScale.push(0);
  }
}

Scene.prototype.onClickUp = function(event){
  var x = ((event.clientX/canvas.width) -.5) * 2;
  var y = ((event.clientY/canvas.height) -.5) * -2;
  var coorxx = getCoors(x, y)[0];
  var cooryy = getCoors(x, y)[1];



  //&& ((currmesh==meshabove&& currmesh == meshbellow)|| (currmesh==meshleft &&currmesh== meshright))
  //console.log(canSwap(coorx, coory, this.gameObjects, this.currClicked[0], this.currClicked[1]))
  var second = canSwap(this.currClicked[0], this.currClicked[1], this.gameObjects, coorxx, cooryy)
  var first  = canSwap(coorxx, cooryy, this.gameObjects, this.currClicked[0], this.currClicked[1]);

  var neighbor = false;
  if(this.currClicked[0]==coorxx && this.currClicked[1] == cooryy + 1) neighbor= true;
  if(this.currClicked[0]==coorxx && this.currClicked[1] == cooryy - 1) neighbor= true;
  if(this.currClicked[1]==cooryy && this.currClicked[0] == coorxx - 1) neighbor= true;
  if(this.currClicked[1]==cooryy && this.currClicked[0] == coorxx + 1) neighbor= true;


  if (this.currClicked.length > 0 && ( first || second ) & neighbor){
  //  console.log(this.currClicked);
  //  console.log(coorx + " " + coory)
    //issue here is when changes position changes in the grid for later use
  //  console.log(true);


    var temp = this.gameObjects[coorxx][cooryy];

    //dragged onto
    var g1position = this.gameObjects[coorxx][cooryy].position

    //item being dragged
    var g2position = this.gameObjects[this.currClicked[0]][this.currClicked[1]].position

    //dragged item is now coorxx
    this.gameObjects[coorxx][cooryy] = this.gameObjects[this.currClicked[0]][this.currClicked[1]];

    //being dragged onto is now here
    this.gameObjects[this.currClicked[0]][this.currClicked[1]] = temp;


    this.gameObjects[coorxx][cooryy].position.set(g1position);
    this.gameObjects[this.currClicked[0]][this.currClicked[1]].position.set(.2 * this.currClicked[0] -1 + .1, .2* this.currClicked[1] -1 +.1, 0);
    console.log("when setting");
    console.log(this.ogposition)
    console.log(this.gameObjects[this.currClicked[0]][this.currClicked[1]].position)
    //console.log(getCoors(this))
    //this.currClicked = [];

    var toadd = checkToDisapearHorizontal(coorxx, cooryy, this.gameObjects);
    for (var i = 0; i < toadd.length; i++){
      this.shrinkObjects.push(this.gameObjects[toadd[i][0]][toadd[i][1]])
      this.shrinkObjectsScale.push(0);
    }

    var again = checkToDisapearVertical(coorxx, cooryy, this.gameObjects);
  //  console.log(again);
    var i;
    if(toadd.length >= 3) i = 1;
    else i =0;
    for (i; i < again.length; i++){
      this.shrinkObjects.push(this.gameObjects[again[i][0]][again[i][1]])
      this.shrinkObjectsScale.push(0);
    }

    var toadd = checkToDisapearHorizontal(this.currClicked[0], this.currClicked[1], this.gameObjects);
    for (var i = 0; i < toadd.length; i++){
      this.shrinkObjects.push(this.gameObjects[toadd[i][0]][toadd[i][1]])
      this.shrinkObjectsScale.push(0);
    }

    var again = checkToDisapearVertical(this.currClicked[0], this.currClicked[1], this.gameObjects);
  //  console.log(again);
    var i;
    if(toadd.length >= 3) i = 1;
    else i =0;
    for (i; i < again.length; i++){
      this.shrinkObjects.push(this.gameObjects[again[i][0]][again[i][1]])
      this.shrinkObjectsScale.push(0);
    }



  }

  else {
    this.gameObjects[this.currClicked[0]][this.currClicked[1]].position.set(.2 * this.currClicked[0] -1 + .1, .2* this.currClicked[1] -1 +.1, 0);
    this.currClicked= [];
  }
  this.currClicked = [];

}

Scene.prototype.mouseDrag = function(event){
  //console.log("draging");
  var x = ((event.clientX/canvas.width) -.5) * 2;
  var y = ((event.clientY/canvas.height) -.5) * -2;
  if(this.currClicked.length == 2){
  //  console.log("x: " + x + " y ; "  + y);

    this.gameObjects[this.currClicked[0]][this.currClicked[1]].position.set(x, y, 0);
  }
}

function checkToDisapearVertical(curx, cury, gameObjects){
  var returnarr = [];
  var thisMesh = gameObjects[curx][cury].mesh;
  var down = 0;
  if(cury > 0){
    var i = 0;
    var downMesh = gameObjects[curx][cury-1].mesh;
    while(downMesh == thisMesh){
      returnarr.push([curx, cury-i]);
      down++;
      i++;
      if(cury-i >=0 && gameObjects[curx][cury-i]!=null){
        downMesh = gameObjects[curx][cury-i].mesh;
      //  console.log(downMesh)
      }
      else {
        downMesh = null;
      }
    }
  }

  var up = 0;
  if(cury < 10){
    var i = 1;
    var upMesh = gameObjects[curx][cury+i].mesh;
    while(upMesh == thisMesh){
      returnarr.push([curx, cury+i]);
      up++;
      i++;
      if(cury+i <=9 && gameObjects[curx][cury+i]!=null ){
        upMesh = gameObjects[curx][cury+i].mesh;
      }
      else {
        upMesh = null;
      }
    }
  }
  if(returnarr.length >= 3) return returnarr;
  else return [];
//  return up;
}


function checkToDisapearHorizontal(curx, cury, gameObjects){
  var returnarr = [];
  var thisMesh = gameObjects[curx][cury].mesh;
  var left = 0;
  if(curx > 0){
    var i = 0;
    var leftMesh = gameObjects[curx-i][cury].mesh;
    while(leftMesh == thisMesh){
      returnarr.push([curx-i, cury]);
      left++;
      i++;
      if(curx-i >=0  && gameObjects[curx-i][cury]!=null){
        leftMesh = gameObjects[curx-i][cury].mesh;
      }
      else {
        leftMesh = null;
      }
    }
  }

  var right = 0;
  if(curx < 10){
    var i = 1;
    var rightMesh = gameObjects[curx+i][cury].mesh;
    while(rightMesh == thisMesh){
      returnarr.push([curx+i, cury]);
      right++;
      i++;
      if(curx+i <=9 && gameObjects[curx+i][cury]!=null){
        rightMesh = gameObjects[curx+i][cury].mesh;
      }
      else {
        rightMesh = null;
      }
    }
  }

  if(returnarr.length >= 3) return returnarr;
  else return [];

}
//coor x and y are the position you are debating moving to
//curr x and curr y is the position you are currently at
function canSwap(currx, curry, gameObjects, coorx, coory){
  // console.log(currx + "move from x")
  // console.log(curry + "move from y")
  // console.log(coorx + "move to x")
  // console.log(coory + "move to y")
  // console.log("game object move from:")
  // console.log(gameObjects[currx][curry]);
  // console.log("game object move to")
  // console.log(gameObjects[coorx][coory])

  var meshabove = null;
  if(coory > 0 && !(coorx==currx && coory-1 == curry) && gameObjects[coorx][coory-1]!=null) meshabove = gameObjects[coorx][coory-1].mesh;

  var meshbellow= null;
  if (coory < 9 && !(coorx==currx && coory+1 == curry)&& gameObjects[coorx][coory+1]!=null) meshbellow = gameObjects[coorx][coory+1].mesh;

  var meshleft = null;
  if(coorx > 0 && !(coorx-1==currx && coory == curry) && gameObjects[coorx-1][coory]!=null) meshleft = gameObjects[coorx-1][coory].mesh;

  var meshright = null;
  if(coorx < 9  && !(coorx+1==currx && coory == curry) && gameObjects[coorx+1][coory]!=null) meshright = gameObjects[coorx+1][coory].mesh;

  var currmesh = gameObjects[currx][curry].mesh;
  // console.log(currmesh)
  // console.log(currx)
  // console.log(curry)

  var meshtwoabove = null;
  if (coory > 1  && !(coorx==currx && coory-2 == curry) && gameObjects[coorx][coory-2]!=null) meshtwoabove = gameObjects[coorx][coory-2].mesh;

  var meshtwobellow = null
  if(coory < 8  && !(coorx==currx && coory+2 == curry) && gameObjects[coorx][coory+2]!=null) meshtwobellow = gameObjects[coorx][coory+2].mesh;

  var meshtwoleft = null
  if(coorx > 1  && !(coorx==currx-2 && coory == curry) && gameObjects[coorx-2][coory]!=null) meshtwoleft = gameObjects[coorx-2][coory].mesh;

  var meshtworight = null
  if(coorx < 8  && !(coorx==currx+2 && coory == curry) && gameObjects[coorx+2][coory]!=null) meshtworight = gameObjects[coorx+2][coory].mesh;
  //console.log("here")
  if(meshtwoleft == currmesh && currmesh == meshleft) return true;
  //console.log("here1")
  if(meshtworight == currmesh && currmesh == meshright) return true;
  //console.log("here2")
  if(meshtwobellow == currmesh && currmesh == meshbellow) return true;
  //console.log("here3")

  if(meshtwoabove == currmesh && currmesh == meshabove) return true;
  //console.log("here4")

  if(meshleft === currmesh && currmesh === meshright) return true;
  //console.log("here5")

  if(meshbellow === currmesh && currmesh === meshabove) return true;
  //console.log("here6")
  return false;

}



function getCoors(x, y) {
  var coorx;
  var coory;
  if(x < -.8){
    coorx = 0;
  }
  else if(x < -.6){
    coorx = 1;
  }
  else if(x < -.4){
    coorx = 2;
  }
  else if(x < -.2){
    coorx = 3;
  }
  else if(x < 0){
    coorx = 4;
  }
  else if(x < .2){
    coorx = 5;
  }
  else if(x < .4){
    coorx = 6;
  }
  else if(x < .6){
    coorx = 7;
  }
  else if(x < .8){
    coorx = 8;
  }
  else if(x < 1){
    coorx = 9;
  }

  if(y < -.8){
    coory = 0;
  }
  else if(y < -.6){
    coory = 1;
  }
  else if(y < -.4){
    coory = 2;
  }
  else if(y < -.2){
    coory = 3;
  }
  else if(y < 0){
    coory = 4;
  }
  else if(y < .2){
    coory = 5;
  }
  else if(y < .4){
    coory = 6;
  }
  else if(y < .6){
    coory = 7;
  }
  else if(y < .8){
    coory= 8;
  }
  else if(y < 1){
    coory = 9;
  }

  return [coorx, coory]
}
