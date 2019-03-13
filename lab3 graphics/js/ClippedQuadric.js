const ClippedQuadric = function(A, B) {
  this.A = A;
  this.B = B;
}

ClippedQuadric.prototype.setUnitSphere = function(){
  this.A.set(	1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, -1);
  this.B.set(	0, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, -1);
}

ClippedQuadric.prototype.setUnitCone = function(){
  this.A.set(	1, 0, 0, 0,
		0, -1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 0);
  this.B.set(0, 0, 0, 0,
		0, 1, 0, .5,
		0, 0, 0, 0,
		0, .5, 0, 0);
}

ClippedQuadric.prototype.setUnitCylinder = function(){
  this.A.set(
  	1, 0, 0, 0,
		0, 0, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, -.7);
  this.B.set(
  	0, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, -.7);
};

ClippedQuadric.prototype.setUnitElipsoid = function(){
  this.A.set(
  	3, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, -1);
  this.B.set(	0, 0, 0, 0,
  		0, 1, 0, 0,
  		0, 0, 0, 0,
  		0, 0, 0, -1);
};

ClippedQuadric.prototype.snowman = function() {
  this.A.set(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, -1);
  this.B.set(
    -1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, .08);
};

ClippedQuadric.prototype.snowmanHole = function() {
  this.B.set(
    10, 0, 0, 0,
    0, .5, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, -.5);
  this.A.set(
    -1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, .08);
};

ClippedQuadric.prototype.hyperboliod = function() {
  this.A.set(	1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 1, 1,
    0, 0, 0, 0);
  this.B.set(0, 0, 0, 0,
    0, 1, 0, .5,
    0, 0, 0, 0,
    0, .5, 0, 0);
}

ClippedQuadric.prototype.setParaboloid = function(){
  this.A.set (
  1, 0, 0, 0,
       0, 0, 0, -.5,
       0, 0, 1, 0,
       0, -.5, 0, 0);
      this.B.set(
      0, 0, 0, 0,
    0, 1, 0, -5,
    0, 0, 0, 0,
    0, -5, 0, -0
);
}

ClippedQuadric.prototype.groundPlane = function(){
  this.A.set(	0, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, .001);
}

ClippedQuadric.prototype.transform = function(T){
  T.invert();
  this.A.premul(T);
  this.B.premul(T);

  T.transpose();
  this.A.mul(T);
  this.B.mul(T);

}

ClippedQuadric.prototype.transformClipper = function(T) {
	let inverseT = new Mat4(T).invert();
	let invertTransposeT = new Mat4(T).invert().transpose();
	this.B = this.B.premul(inverseT).mul(invertTransposeT);
};
