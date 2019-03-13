"use strict";
const Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.fsInfinate = new Shader(gl, gl.FRAGMENT_SHADER, "textured_fs.essl");


  this.vsIdleTexture = new Shader(gl, gl.VERTEX_SHADER, "transformation_vs.essl");
  this.fsSolidTexture = new Shader(gl, gl.FRAGMENT_SHADER, "transformation_fs.essl");

  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  this.infinateProgram = new Program(gl, this.vsIdleTexture, this.fsInfinate);


  this.texturedProgram = new TexturedProgram(gl, this.vsIdleTexture, this.fsSolidTexture);

  this.materialTexture = new Material(gl, this.texturedProgram);
//  this.materialTexture.colorTexture.set(new Texture2D(gl, "media/asteroid.png"));

  this.pokemon1 = new Material(gl, this.texturedProgram);
 this.pokemon1.colorTexture.set(new Texture2D(gl, "media/slowpoke/YadonDh.png"));
  this.pokemon2 = new Material(gl, this.texturedProgram);
  this.pokemon2.colorTexture.set(new Texture2D(gl, "media/slowpoke/YadonEyeDh.png"));




  this.texturedQuadGeometry = new TexturedQuadGeometry(gl);
  this.texturedMesh = new Mesh(this.texturedQuadGeometry, this.materialTexture);

  this.texturedObject = new GameObject(this.texturedMesh);

  this.starGeometry = new StarGeometry(gl);

  this.camera = new PerspectiveCamera();

  this.ground = new InfiniateGeometry(gl);
  this.groundMaterial = new Material(gl, this.infinateProgram);
  this.textureInfinate = new Texture2D(gl, "media/texture.jpg");
  this.groundMaterial.colorTexture.set(this.textureInfinate);
  this.groundMesh = new Mesh(this.ground, this.groundMaterial);
  this.groundObject = new GameObject(this.groundMesh, this.camera)


  this.trianglePosition = new Vec3(0,0,0);
  this.triangleAngle = 0;
  this.triangleScale = new Vec3(1.5, 1.1, .5);


  this.timeAtLastFrame = new Date().getTime();
  //in constructor:
this.timeAtFirstFrame = new Date().getTime();
this.timeAtLastFrame = this.timeAtFirstFrame;


this.material = new Material(gl, this.solidProgram);
this.material.solidColor.set(1.0, 0.2, 0.66);

this.multimesh = new MultiMesh(gl, "media/slowpoke/Slowpoke.json", [this.pokemon1, this.pokemon2])
this.gameObjectsMultimesh = new GameObject(this.multimesh, this.camera);


this.car = new Material(gl, this.texturedProgram);
this.car.colorTexture.set(new Texture2D(gl, "media/chevy/chevy.png"));
this.carMesh = new MultiMesh(gl, "media/chevy/chassis.json", [this.car]);
this.carGameObject = new GameObject(this.carMesh, this.camera);

this.wheel1 = new Material(gl, this.texturedProgram);
this.wheel1.colorTexture.set(new Texture2D(gl, "media/chevy/chevy.png"));
this.wheel1Mesh = new MultiMesh(gl, "media/chevy/wheel.json", [this.wheel1]);
this.wheel1GameObject = new GameObject(this.wheel1Mesh, this.camera);

this.gameObjectsMultimesh.position = new Vec3(0,0,0);
this.gameObjectsMultimesh.scale.set(new Vec3(.1, .1, .1))
this.gameObjectsMultimesh.orientation = 0


this.carGameObject.position = new Vec3(0, .3, 0);
this.carGameObject.scale.set(new Vec3(.05, .05, .05))
this.carGameObject.orientation = 0

this.wheel1GameObject.position.set(new Vec3(7, -2, -11));
this.wheel1GameObject.scale.set(new Vec3(1, 1, 1));
this.wheel1GameObject.orientation = .5
this.wheel1GameObject.parent = this.carGameObject;

this.wheel2GameObject = new GameObject(this.wheel1Mesh, this.camera);
this.wheel2GameObject.position.set(new Vec3(-7, -2, -11));
this.wheel2GameObject.scale.set(new Vec3(1, 1, 1));
this.wheel2GameObject.orientation = .5
this.wheel2GameObject.parent = this.carGameObject;


this.wheel3GameObject = new GameObject(this.wheel1Mesh, this.camera);
this.wheel3GameObject.position.set(new Vec3(-7, -2, 14));
this.wheel3GameObject.scale.set(new Vec3(1, 1, 1));
this.wheel3GameObject.orientation = .5
this.wheel3GameObject.parent = this.carGameObject;


this.wheel4GameObject = new GameObject(this.wheel1Mesh, this.camera);
this.wheel4GameObject.position.set(new Vec3(7, -2, 14));
this.wheel4GameObject.scale.set(new Vec3(1, 1, 1));
this.wheel4GameObject.orientation = .5
this.wheel4GameObject.parent = this.carGameObject;

this.left = new Vec3();



gl.enable(gl.DEPTH_TEST);
};

Scene.prototype.update = function(gl, keysPressed) {

  Material.lightPos.at(0).set(1,1,0,0);
  Material.lightPowerDensity.at(0).set(2,2,2,1);

  Material.lightPos.at(1).set(0,10,0, 1);
  Material.lightPowerDensity.at(1).set(0,0,0,1);

  Material.cameraPos.set(this.camera.position);

  Material.shadowColor.set(1, 1, 1);

  const timeAtThisFrame = new Date().getTime();
  const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;


    gl.clearColor(0.0, 0.0, 0.3, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  if (keysPressed.LEFT){
    var position = this.carGameObject.position;
    var add = new Vec3(-.002, 0, 0);
    position.add(add);
    this.carGameObject.position.set(position)

    // this.wheel3GameObject.orientation = this.wheel3GameObject.orientation + .1;
    // this.wheel2GameObject.orientation = this.wheel2GameObject.orientation + .1;
    // this.wheel1GameObject.orientation = this.wheel1GameObject.orientation + .1;
    // this.wheel4GameObject.orientation = this.wheel4GameObject.orientation + .1;
    //
    // this.wheel3GameObject.orientationDirection = -.3;
    // this.wheel2GameObject.orientationDirection = -.3;
    // this.wheel1GameObject.orientationDirection = -.3;
    // this.wheel4GameObject.orientationDirection = -.3;
    //
    // if(this.left== false){
    //   var p1 = this.wheel1GameObject.position;
    //   var add = new Vec3(-.03, 0, 0);
    //   p1.add(add);
    //   this.left == true;
    // }


  }
  else if (keysPressed.RIGHT){
    var position = this.carGameObject.position;
    var add = new Vec3(.002, 0, 0);
    position.add(add);
    this.carGameObject.position.set(position);
  }
  else if (keysPressed.UP){
    var position = this.carGameObject.position;
    var add = new Vec3(0, 0, .002);
    position.add(add);
    this.carGameObject.position.set(position);
    this.wheel3GameObject.orientation = this.wheel3GameObject.orientation + .1;
    this.wheel2GameObject.orientation = this.wheel2GameObject.orientation + .1;
    this.wheel1GameObject.orientation = this.wheel1GameObject.orientation + .1;
    this.wheel4GameObject.orientation = this.wheel4GameObject.orientation + .1;

    this.wheel3GameObject.orientationDirection = 0;
    this.wheel2GameObject.orientationDirection = 0;
    this.wheel1GameObject.orientationDirection = 0;
    this.wheel4GameObject.orientationDirection = 0;


  }
  else if (keysPressed.DOWN){
    var position = this.carGameObject.position;
    var add = new Vec3(0, 0, -.002);
    position.add(add);
    this.carGameObject.position.set(position);

    this.wheel3GameObject.orientation = this.wheel3GameObject.orientation - .1;
    this.wheel2GameObject.orientation = this.wheel2GameObject.orientation - .1;
    this.wheel1GameObject.orientation = this.wheel1GameObject.orientation - .1;
    this.wheel4GameObject.orientation = this.wheel4GameObject.orientation - .1;
  }
  else if(keysPressed){
    this.gameObjectsMultimesh.camera.move(dt, keysPressed);
  }


  //jshint bitwise:false
  //jshint unused:false




  //this.material.commit();

//this.gameObjectsMultimesh.draw();
this.groundObject.draw();
this.carGameObject.draw();
this.wheel1GameObject.draw();
this.wheel2GameObject.draw();
this.wheel3GameObject.draw();
this.wheel4GameObject.draw();

this.carGameObject.drawShadow(Material.lightPos.at(0));


  //this.starGeometry.draw();



};
