"use strict";

const Scene = function(gl) {
  this.vsQuad = new Shader(gl, gl.VERTEX_SHADER, "quad_vs.essl");
  this.fsTrace = new Shader(gl, gl.FRAGMENT_SHADER, "trace_fs.essl");
  this.traceProgram = new TexturedProgram(gl, this.vsQuad, this.fsTrace);

  this.texturedQuadGeometry = new TexturedQuadGeometry(gl);

  this.timeAtFirstFrame = new Date().getTime();
  this.timeAtLastFrame = this.timeAtFirstFrame;

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

  const orange = new ClippedQuadric(
    Material.quadrics.at(0),
    Material.quadrics.at(1)
  );
  orange.setUnitCone();
  Material.brdfs.at(0).set(0, 1, 0, 1);
  var T = new Mat4().scale(.7).translate(0,.5,0);

  orange.transform(T);


  const orange2 = new ClippedQuadric(
    Material.quadrics.at(2),
    Material.quadrics.at(3)
  );
  orange2.setUnitCone();
  Material.brdfs.at(2.
  ).set(0, 1, 0, 1);
  T = new Mat4().scale(.7).translate(0,1,0);

  orange2.transform(T);

  const orange3 = new ClippedQuadric(
    Material.quadrics.at(4),
    Material.quadrics.at(5)
  );
  orange3.setUnitCone();
  Material.brdfs.at(4).set(0, 1, 0, 1);
  T = new Mat4().scale(.7).translate(0,1.5,0);

  orange3.transform(T);


      const tree1 = new ClippedQuadric(
        Material.quadricsNonShadow.at(0),
        Material.quadricsNonShadow.at(1)
      );
      tree1.setUnitCone();
      Material.brdfsNoShadow.at(0).set(0, 1, 0, 1);
      var T = new Mat4().scale(.7).translate(2,.5,0);
      tree1.transform(T);


      const tree2 = new ClippedQuadric(
        Material.quadricsNonShadow.at(2),
        Material.quadricsNonShadow.at(3)
      );
      tree2.setUnitCone();
      Material.brdfsNoShadow.at(2).set(0, 1, 0, 1);
      T = new Mat4().scale(.7).translate(2,1,0);
      tree2.transform(T);

      const tree3 = new ClippedQuadric(
        Material.quadricsNonShadow.at(4),
        Material.quadricsNonShadow.at(5)
      );
      tree3.setUnitCone();
      Material.brdfsNoShadow.at(4).set(0, 1, 0, 1);
      T = new Mat4().scale(.7).translate(2,1.5,0);

      tree3.transform(T);

  this.trees = [tree1,  tree2, tree3];

  const candleTop = new ClippedQuadric(
    Material.quadrics.at(20),
    Material.quadrics.at(21)
  );

  candleTop.setUnitElipsoid();
  Material.brdfs.at(20).set(1, .7, 0, 1);
  T = new Mat4().scale(.2).translate(-3, .5, 3);
  candleTop.transform(T);

  this.flame = candleTop;
  this.flameCount = 25;
  this.flameUp = true;

  const bellInner = new ClippedQuadric(
    Material.quadrics.at(30),
    Material.quadrics.at(31)
  );

  bellInner.setParaboloid();
  Material.brdfs.at(30).set(1, .7, 0, 1);
  T = new Mat4().scale(.095).translate(4, 3.75, -.3);
  bellInner.transform(T);

  this.bell = bellInner;
};


Scene.prototype.update = function(gl, keysPressed) {
  //jshint bitwise:false
  //jshint unused:false
  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

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


  for (var i = 0; i < 3; i++){
    var T = new Mat4().rotate(.1, 0, .1);
    this.trees[i].transform(T);
  }

  if (this.flameUp && this.flameCount < 50){
    var T = new Mat4().rotate(0.0005, 0,  0);
    var T2 = new Mat4().rotate(-.00075, 0, 0);

    this.flame.transform(T);
    this.bell.transform(T2);
    this.flameCount++;
    if (this.flameCount >= 50){
      this.flameUp = false;
    }
  }
  else {
    var T = new Mat4().rotate(-.0005, 0, 0);
    var T2 = new Mat4().rotate(.00075, 0, 0);

    this.flame.transform(T);
    this.bell.transform(T2);
    this.flameCount--;
    if (this.flameCount <= 0){
      this.flameUp = true;
    }
  }




  const snowman1 = new ClippedQuadric(
    Material.quadrics.at(6),
    Material.quadrics.at(7)
  );
  snowman1.setUnitSphere();
  Material.brdfs.at(6).set(1, 1, 1, 1);
  T = new Mat4().scale(1.2).translate(-4 ,0, -5);
  snowman1.transform(T);


  // const snowman2 = new ClippedQuadric(
  //     Material.quadrics.at(8),
  //     Material.quadrics.at(9)
  //   );
  //   snowman2.setUnitSphere();
  //   Material.brdfs.at(8).set(1, 1, 1, 1);
  //   T = new Mat4().scale(.6).translate(-2 ,1 , .5);
  //   snowman2.transform(T);



    const snowmiddle = new ClippedQuadric(
      Material.quadrics.at(22),
      Material.quadrics.at(23)
    );

    snowmiddle.snowmanHole();

    Material.brdfs.at(22).set(1, 1, 1, 1);
    //2, 2.4, 0
    snowmiddle.transform(new Mat4().translate(-4, 1.9, -5));
    snowmiddle.transformClipper(new Mat4().translate(0, .4, 0));

    const snowOutside = new ClippedQuadric(
      Material.quadrics.at(24),
      Material.quadrics.at(25)
    );

    snowOutside.snowman();

    Material.brdfs.at(24).set(1, 1, 1, 1);
    snowOutside.transform(new Mat4().translate(-4, 1.5, -5));
    snowOutside.transformClipper(new Mat4().translate(0, .4, 0));



  const snowman3 = new ClippedQuadric(
        Material.quadrics.at(10),
        Material.quadrics.at(11)
      );
      snowman3.setUnitSphere();
      Material.brdfs.at(10).set(1, 1, 1, 1);
      T = new Mat4().scale(.8).translate(-4 , 2.8 , -5);
      snowman3.transform(T);

  const snowman4 = new ClippedQuadric(
          Material.quadrics.at(12),
          Material.quadrics.at(13)
      );
          snowman4.setUnitCone();
          Material.brdfs.at(12).set(1, .8, 0, 1);
          T = new Mat4().rotate(1.5, 1.5, 0, 0).scale(.4).translate(-4.0, 2.7 , -3.55);
        snowman4.transform(T);


  const snowman5 = new ClippedQuadric(
                Material.quadrics.at(14),
                Material.quadrics.at(15)
          );
      snowman5.setUnitSphere();
        Material.brdfs.at(14).set(0, 0, 0, 1);
        T = new Mat4().scale(.2).translate(-4.2, 3.0 , -3.85);
      snowman5.transform(T);

const snowman6 = new ClippedQuadric(
        Material.quadrics.at(16),
        Material.quadrics.at(17)
              );
    snowman6.setUnitSphere();
            Material.brdfs.at(16).set(0, 0, 0, 1);
            T = new Mat4().scale(.2).translate(-3.6, 3.0, -3.85);
    snowman6.transform(T);


const candle = new ClippedQuadric(
  Material.quadrics.at(18),
  Material.quadrics.at(19)
);

candle.setUnitCylinder();
Material.brdfs.at(18).set(1, 1, 1, 1);
T = new Mat4().scale(.5).translate(-3, 0, 3);
candle.transform(T);




const bellBody = new ClippedQuadric(
  Material.quadrics.at(26),
  Material.quadrics.at(27)
);

bellBody.hyperboliod();
Material.brdfs.at(26).set(1, .7, 0, 1);
T = new Mat4().scale(.9).translate(4, 5, 0);
bellBody.transform(T);


const floor = new ClippedQuadric(
  Material.quadrics.at(28),
  Material.quadrics.at(29)
);

floor.groundPlane();
Material.brdfs.at(28).set(1, .7, 0, 1);
T = new Mat4().translate(0, -1, 0);
floor.transform(T);





const org = new ClippedQuadric(
  Material.quadrics.at(32),
  Material.quadrics.at(33)
);

org.setUnitSphere();
Material.brdfs.at(32).set(1, .7, 0, 1);
T = new Mat4().scale(.95).translate(4, 0, 0);
org.transform(T);

const org2 = new ClippedQuadric(
  Material.quadrics.at(34),
  Material.quadrics.at(35)
);

org2.setUnitSphere();
Material.brdfs.at(34).set(1, .7, 0, 1);
T = new Mat4().scale(.95).translate(5.5, 0, 0);
org2.transform(T);

const org3 = new ClippedQuadric(
  Material.quadrics.at(36),
  Material.quadrics.at(37)
);

org3.setUnitSphere();
Material.brdfs.at(36).set(1, .7, 0, 1);
T = new Mat4().scale(.95).translate(5.0, 1.5, 0);
org3.transform(T);



  for(let i=0; i<this.gameObjects.length; i++){
    this.gameObjects[i].draw(this.camera);
  }
};
