"use strict";

const Scene = function(gl) {
  this.vsQuad = new Shader(gl, gl.VERTEX_SHADER, "quad_vs.essl");
  this.fsTrace = new Shader(gl, gl.FRAGMENT_SHADER, "trace_fs.essl");
  this.traceProgram = new TexturedProgram(gl, this.vsQuad, this.fsTrace);

  this.texturedQuadGeometry = new TexturedQuadGeometry(gl);

  this.timeAtFirstFrame = new Date().getTime();
  this.timeAtLastFrame = this.timeAtFirstFrame;

  this.score = 0;

  this.traceMaterial = new Material(gl, this.traceProgram);
  this.traceMaterial.envmap.set(new TextureCube(gl, [
	"media/posx.jpg",
    "media/negx.jpg",
    "media/posy.jpg",
    "media/negy.jpg",
    "media/posz.jpg",
    "media/negz.jpg",]
  	));

  this.traceMesh = new Mesh(this.texturedQuadGeometry, this.traceMaterial);

  this.gameObjects = [];
  this.gameObjects.push(new GameObject(this.traceMesh));

  this.camera = new PerspectiveCamera();

  this.score = 0;

  var d = new Date();
  this.time = d.getSeconds();
  this.timer = 30;

  const snowman1 = new ClippedQuadric(
    Material.quadrics.at(0),
    Material.quadrics.at(1)
  );
  snowman1.setUnitSphere();
  Material.brdfs.at(0).set(1, 1, 1, 1);
  var T = new Mat4().scale(1.2).translate(-4 ,0, -5);
  snowman1.transform(T);



    const snowman2 = new ClippedQuadric(
      Material.quadrics.at(4),
      Material.quadrics.at(5)
    );

    snowman2.setUnitSphere();

    Material.brdfs.at(4).set(1, 1, 1, 1);
    snowman2.transform(new Mat4().translate(-4, 1.5, -5));
    snowman2.transformClipper(new Mat4().translate(0, .4, 0));



  const snowman3 = new ClippedQuadric(
        Material.quadrics.at(6),
        Material.quadrics.at(7)
      );
      snowman3.setUnitSphere();
      Material.brdfs.at(6).set(1, 1, 1, 1);
      T = new Mat4().scale(.8).translate(-4 , 2.8 , -5);
      snowman3.transform(T);

  const snowman4 = new ClippedQuadric(
          Material.quadrics.at(8),
          Material.quadrics.at(9)
      );
          snowman4.setUnitCone();
          Material.brdfs.at(8).set(1, .8, 0, 1);
          T = new Mat4().rotate(1.5, 1.5, 0, 0).scale(.4).translate(-4.0, 2.7 , -3.55);
        snowman4.transform(T);


  const snowman5 = new ClippedQuadric(
                Material.quadrics.at(10),
                Material.quadrics.at(11)
          );
      snowman5.setUnitSphere();
        Material.brdfs.at(10).set(0, 0, 0, 1);
        T = new Mat4().scale(.2).translate(-4.2, 3.0 , -3.85);
      snowman5.transform(T);

    const snowman6 = new ClippedQuadric(
        Material.quadrics.at(12),
        Material.quadrics.at(13)
              );
    snowman6.setUnitSphere();
            Material.brdfs.at(12).set(0, 0, 0, 1);
            T = new Mat4().scale(.2).translate(-3.6, 3.0, -3.85);
    snowman6.transform(T);

    this.snowman = [snowman1, snowman2, snowman3, snowman4, snowman5, snowman6];



      // var candycane1 = createCane(14, 1, 0, 0);
      // var candycane2 = createCane(30, -1, 0, 0);
      // var candycane3 = createCane(46, 3, 0, -2);
      this.candycanes = [];


      let candycanenum = 10;
      for (let x = -2; x < 1 ; x ++ ){
        for (let y = -1; y< 1; y ++) {
            let newX = Math.floor((Math.random() * 20) - 20);
            let newY = Math.floor((Math.random() * 20)  - 20);
            var candycane = createCane(candycanenum,  newX, 0, newY);
            this.candycanes.push(candycane);
            candycanenum += 16;
        }
      }

};

function createCane(clippedStartNum, x, y, z){
  // const c1 = new ClippedQuadric(
  //         Material.quadrics.at(clippedStartNum),
  //         Material.quadrics.at(clippedStartNum + 1)
  //               );
  //     c1.setUnitCylinder();
  //             Material.brdfs.at(clippedStartNum).set(1, 0, 0, 1);
  //           var  T = new Mat4().scale(.2).translate(x, y, z);
  //     c1.transform(T);
  //
  //   const c2 = new ClippedQuadric(
  //             Material.quadrics.at(clippedStartNum + 2),
  //             Material.quadrics.at(clippedStartNum + 3)
  //                   );
  //       c2.setUnitCylinder();
  //                 Material.brdfs.at(clippedStartNum + 2).set(1, 1, 1, 1);
  //                 T = new Mat4().scale(.2).translate(x, y + .3, z);
  //       c2.transform(T);

    const c3 = new ClippedQuadric(
                Material.quadrics.at(clippedStartNum + 4),
                Material.quadrics.at(clippedStartNum + 5)
                      );
      c3.setUnitCylinder();
                    Material.brdfs.at(clippedStartNum + 4).set(1, 0, 0, 1);
                  let  T = new Mat4().rotate(-.6, 0, 0).scale(.2).translate(x + .05, y + 1.1, z);
      c3.transform(T);


    const c4 = new ClippedQuadric(
              Material.quadrics.at(clippedStartNum + 6),
              Material.quadrics.at(clippedStartNum + 7)
                    );
      c4.setUnitCylinder();
                  Material.brdfs.at(clippedStartNum + 6).set(1, 1, 1, 1);
                  T = new Mat4().rotate(-1.5, 0, 0).scale(.2).translate(x + .22, y + 1.22, z);
      c4.transform(T);


    const c5 = new ClippedQuadric(
              Material.quadrics.at(clippedStartNum + 8),
              Material.quadrics.at(clippedStartNum + 9)
                    );
      c5.setUnitCylinder();
                  Material.brdfs.at(clippedStartNum + 8).set(1, 0, 0, 1);
                  T = new Mat4().rotate(-2.3, 0, 0).scale(.2).translate(x + .45, y + 1.15, z);
      c5.transform(T);


      const c6 = new ClippedQuadric(
              Material.quadrics.at(clippedStartNum + 10 ),
              Material.quadrics.at(clippedStartNum + 11)
                    );
          c6.setUnitCylinder();
                  Material.brdfs.at(clippedStartNum + 10).set(1, 0, 0, 1);
                  T = new Mat4().scale(.2).translate(x, y + 0.6, z);
          c6.transform(T);

        const c7 = new ClippedQuadric(
                  Material.quadrics.at(clippedStartNum +12),
                  Material.quadrics.at(clippedStartNum + 13)
                        );
            c7.setUnitCylinder();
                      Material.brdfs.at(clippedStartNum + 12).set(1, 1, 1, 1);
                      T = new Mat4().scale(.2).translate(x, y + .9, z);
            c7.transform(T);

    return [c3, c4, c5, c6, c7];
}


Scene.prototype.update = function(gl, keysPressed, overlay) {
  //jshint bitwise:false
  //jshint unused:false
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

  var d = new Date();
  if (Math.abs(this.time - d.getSeconds()) > 1){
    this.time = d.getSeconds();
    this.timer = this.timer -1;
  }



  // clear the screen
  gl.clearColor(0.3, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  this.camera.move(dt, keysPressed);

  Material.eyePosition.set(this.camera.position);
  Material.rayDirMatrix.set(this.camera.rayDirMatrix);


  Material.lightPos.at(0).set(1,1,0,0);
  Material.lightPowerDensity.at(0).set(2,2,2,1);

  Material.lightPos.at(1).set(-3, .5, 3, 1);
  Material.lightPowerDensity.at(1).set(2,1,1,1);

  Material.lightPos.at(2).set(0, 4, 0, 1 );
  Material.lightPowerDensity.at(2).set(2,1,1,1);

  if(this.timer >= 0){
    overlay.innerHTML = "Score: " + this.score  + " Time:  " + this.timer;
  }
  else {
    overlay.innerHTML = "GAME OVER! FINAL SCORE: "  + this.score;
    document.getElementById("overlay").style.fontSize = "150px";
  }

  if(keysPressed.LEFT){
    for (var i = 0; i < 6; i++) {
      var T = new Mat4().translate(-.03, 0, 0);
      this.snowman[i].transform(T);
    }
  }


    if(keysPressed.RIGHT){
      for (var i = 0; i < 6; i++) {
        var T = new Mat4().translate(.03, 0, 0);
        this.snowman[i].transform(T);
      }

    }


      if(keysPressed.UP){
        for (var i = 0; i < 6; i++) {
          var T = new Mat4().translate(0, 0, -.03);
          this.snowman[i].transform(T);
        }
      }

            if(keysPressed.DOWN){
              for (var i = 0; i < 6; i++) {
                var T = new Mat4().translate(0, 0, .03);
                this.snowman[i].transform(T);
              }
            }



            const floor = new ClippedQuadric(
              Material.quadrics.at(2),
              Material.quadrics.at(3)
            );

            floor.groundPlane();
            Material.brdfs.at(2).set(1, .7, 0, 1);
            T = new Mat4().translate(0, -1, 0);
            floor.transform(T);

var snowmanX = this.snowman[0].position.x;
var snowmanY = this.snowman[0].position.z;


for(let i = 0; i < this.candycanes.length; i++){
  var ccs = this.candycanes[i];
  var candycane = ccs[0];
  var ccposition = candycane.position;
  var ccX = ccposition.x;
  var ccY = ccposition.z;

    if(Math.abs(snowmanX - ccX) < .6 && Math.abs(snowmanY - ccY) < 1  ){
    console.log("DISAPPEARSSSS");
    let newX = Math.floor((Math.random() * 20) - 20);
    let newY = Math.floor((Math.random() * 20)  - 20);

    for(let j =0; j < ccs.length; j++){


      var T = new Mat4().translate(newX, 0, newY);
      ccs[j].transform(T);

    }
  //  this.candycanes.splice(i, 1);
    this.score = this.score + 1;

  }

}


  for(let i=0; i<this.gameObjects.length; i++){
    this.gameObjects[i].draw(this.camera);
  }
};
