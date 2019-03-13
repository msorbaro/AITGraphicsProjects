"use strict";
const GameObject = function(mesh, camera) {
  this.mesh = mesh;
  this.camera= camera;
  this.position = new Vec3(0, 0, 0);
  this.orientation = 0;
  this.scale = new Vec3(1, 1, 1);
  this.parent = false;
  this.orientationDirection = 0;

  this.modelMatrix = new Mat4();
};


GameObject.prototype.updateModelMatrix =
                              function(){
// TODO: set the game object’s model matrix property according to the position, orientation, and scale
this.modelMatrix.set();

this.modelMatrix.scale(this.scale).rotate(this.orientation, 1, 0, 0).translate(this.position);


if(this.parent){
  this.modelMatrix.scale(this.parent.scale).rotate(this.parent.orientation, 1, 0, 0).rotate(this.orientationDirection, 0, 1, 0).translate(this.parent.position);
}

};


GameObject.prototype.draw = function(){

  Material.shadowColor.set(1, 1, 1);

  this.updateModelMatrix();
// TODO: Set the uniform modelViewProjMatrix (reflected in the material) from the modelMatrix property
// of GameObject (no camera yet). Operator = cannot be used. Use Mat4’s methods set() and/or mul().
  Material.modelViewProjMatrix.set(this.modelMatrix).mul(this.camera.viewProjMatrix);

  Material.modelMatrix.set(this.modelMatrix)
  Material.modelMatrixInverse.set(this.modelMatrix).invert();


  this.mesh.draw();
};

GameObject.prototype.drawShadow = function(lightDir) {

  Material.shadowColor.set(0, 0, 0);


  var a = - lightDir.x / lightDir.y;
  var b = -lightDir.y / lightDir.x;

  var projectToPlane = new Mat4(
    1, 0, 0, 0,
    a, 0, b, 0,
    0, 0, 1, 0,
    0, .1, 0, 1
  );

  Material.modelViewProjMatrix.set(this.modelMatrix).mul(projectToPlane).mul(this.camera.viewProjMatrix);
  this.mesh.draw();

};
