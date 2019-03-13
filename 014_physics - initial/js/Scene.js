"use strict";
const Scene = function(gl) {
  this.vsTextured = new Shader(gl, gl.VERTEX_SHADER, "textured_vs.essl");
  this.vsBackground = new Shader(gl, gl.VERTEX_SHADER, "background_vs.essl");
  this.fsTextured = new Shader(gl, gl.FRAGMENT_SHADER, "textured_fs.essl");
  this.texturedProgram = new TexturedProgram(gl, this.vsTextured, this.fsTextured);
  this.backgroundProgram = new TexturedProgram(gl, this.vsBackground, this.fsTextured);

  this.quadGeometry = new TexturedQuadGeometry(gl);

  this.gameObjects = [];

  this.backgroundMaterial = new Material(gl, this.backgroundProgram);
  this.backgroundMaterial.colorTexture.set(new Texture2D(gl, "media/background.jpg"));
  this.backgroundMesh = new Mesh(this.quadGeometry, this.backgroundMaterial);
  this.background = new GameObject( this.backgroundMesh );
  this.gameObjects.push(this.background);

  this.raiderMaterial = new Material(gl, this.texturedProgram);
  this.raiderMaterial.colorTexture.set(new Texture2D(gl, "media/raider.png"));
  this.raiderMesh = new Mesh(this.quadGeometry, this.raiderMaterial);
  this.avatar = new GameObject( this.raiderMesh );
  this.avatar.position.set(-13, -13)
  this.gameObjects.push(this.avatar);

  this.asteroidMaterial = new Material(gl, this.texturedProgram);
  this.asteroidMaterial.colorTexture.set(new Texture2D(gl, "media/asteroid.png"));
  this.asteroidMesh = new Mesh(this.quadGeometry, this.asteroidMaterial);
  const genericMove = function(t, dt){
        this.velocity.addScaled((this.invMass*dt), this.force);
        this.position.addScaled(dt, this.velocity);
        this.angularVelocity+=(this.torque*(this.invAngularMass*dt));
        this.orientation += this.angularVelocity * dt;

  };

  for(let i=0; i < 64; i++){
    const asteroid = new GameObject( this.asteroidMesh );
    asteroid.position.setRandom(new Vec3(-12, -12, 0.5), new Vec3(12, 12, 0.5) );
    asteroid.velocity.setRandom(new Vec3(-2, -2, 0), new Vec3(2, 2, 0));
    asteroid.angularVelocity = Math.random(-2, 2);
    this.gameObjects.push(asteroid);
    asteroid.move = genericMove;
  }

  this.avatar.backDrag = 0.9;
  this.avatar.sideDrag = 0.5;
  this.avatar.angularDrag = 0.5;

  this.avatar.control = function(t, dt, keysPressed, colliders){
    this.torque= (0.2);


    if(keysPressed.DOWN){
      this.force.set(0, -1);
    }
    else if(keysPressed.UP){
      this.force.set(0,1);
    }
    else if(keysPressed.LEFT){
      this.force.set(-1, 0);
    }
    else if(keysPressed.RIGHT){
      this.force.set(1, 0);
    }
  };
  this.avatar.move = genericMove;

  this.camera = new OrthoCamera();

  this.timeAtFirstFrame = new Date().getTime();
  this.timeAtLastFrame = this.timeAtFirstFrame;


  gl.enable(gl.BLEND);
  gl.blendFunc(
    gl.SRC_ALPHA,
    gl.ONE_MINUS_SRC_ALPHA);

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


  for (let i = 0; i < this.gameObjects.length; i++) {
    this.gameObjects[i].control(timeAtThisFrame, dt, keysPressed, this.gameObjects);
  }

  for (let i = 0; i < this.gameObjects.length; i++) {
    this.gameObjects[i].move(timeAtThisFrame, dt);
  }

  this.camera.position = this.avatar.position;
  this.camera.updateViewProjMatrix();

  Material.viewProjMatrixInverse.set(this.camera.viewProjMatrix).invert();

  for (let i = 0; i < this.gameObjects.length; i++) {
    this.gameObjects[i].draw(this.camera);
  }
};
