"use strict";

var theta = 2*Math.PI / 30
const HeartGeometry = function(gl) {
  this.gl = gl;

  // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
      0, 0, 0,
      16*Math.pow(Math.sin(0*theta), 3), 13*Math.cos(0*theta) - 5*Math.cos(0*2*theta) - 2* Math.cos(0*3* theta) - Math.cos(0*4*theta), 0,
      16*Math.pow(Math.sin(theta), 3), 13*Math.cos(theta) - 5*Math.cos(2*theta) - 2* Math.cos(3* theta) - Math.cos(4*theta), 0,
      16*Math.pow(Math.sin(2*theta), 3), 13*Math.cos(2*theta) - 5*Math.cos(2*2*theta) - 2* Math.cos(3* 2* theta) - Math.cos(4*2*theta), 0,
      16*Math.pow(Math.sin(3*theta), 3), 13*Math.cos(3*theta) - 5*Math.cos(2*3*theta) - 2* Math.cos(3* 3* theta) - Math.cos(4*3*theta), 0,
      16*Math.pow(Math.sin(4*theta), 3), 13*Math.cos(4*theta) - 5*Math.cos(2*4*theta) - 2* Math.cos(3* 4* theta) - Math.cos(4*4*theta), 0,
      16*Math.pow(Math.sin(5*theta), 3), 13*Math.cos(5*theta) - 5*Math.cos(2*5*theta) - 2* Math.cos(3* 5* theta) - Math.cos(4*5*theta), 0,
      16*Math.pow(Math.sin(6*theta), 3), 13*Math.cos(6*theta) - 5*Math.cos(2*6*theta) - 2* Math.cos(3* 6* theta) - Math.cos(4*6*theta), 0,
      16*Math.pow(Math.sin(7*theta), 3), 13*Math.cos(7*theta) - 5*Math.cos(2*7*theta) - 2* Math.cos(3* 7* theta) - Math.cos(4*7*theta), 0,
      16*Math.pow(Math.sin(8*theta), 3), 13*Math.cos(8*theta) - 5*Math.cos(2*8*theta) - 2* Math.cos(3* 8* theta) - Math.cos(4*8*theta), 0,
      16*Math.pow(Math.sin(9*theta), 3), 13*Math.cos(9*theta) - 5*Math.cos(2*9*theta) - 2* Math.cos(3* 9* theta) - Math.cos(4*9*theta), 0,
      16*Math.pow(Math.sin(10*theta), 3), 13*Math.cos(10*theta) - 5*Math.cos(2*10*theta) - 2* Math.cos(3* 10* theta) - Math.cos(4*10*theta), 0,
      16*Math.pow(Math.sin(11*theta), 3), 13*Math.cos(11*theta) - 5*Math.cos(2*11*theta) - 2* Math.cos(3* 11* theta) - Math.cos(4*11*theta), 0,
      16*Math.pow(Math.sin(12*theta), 3), 13*Math.cos(12*theta) - 5*Math.cos(2*12*theta) - 2* Math.cos(3* 12* theta) - Math.cos(4*12*theta), 0,
      16*Math.pow(Math.sin(13*theta), 3), 13*Math.cos(13*theta) - 5*Math.cos(2*13*theta) - 2* Math.cos(3* 13* theta) - Math.cos(4*13*theta), 0,
      16*Math.pow(Math.sin(14*theta), 3), 13*Math.cos(14*theta) - 5*Math.cos(2*14*theta) - 2* Math.cos(3* 14* theta) - Math.cos(4*14*theta), 0,
      16*Math.pow(Math.sin(15*theta), 3), 13*Math.cos(15*theta) - 5*Math.cos(2*15*theta) - 2* Math.cos(3* 15* theta) - Math.cos(4*15*theta), 0,
      16*Math.pow(Math.sin(16*theta), 3), 13*Math.cos(16*theta) - 5*Math.cos(2*16*theta) - 2* Math.cos(3* 16* theta) - Math.cos(4*16*theta), 0,
      16*Math.pow(Math.sin(17*theta), 3), 13*Math.cos(17*theta) - 5*Math.cos(2*17*theta) - 2* Math.cos(3* 17* theta) - Math.cos(4*17*theta), 0,
      16*Math.pow(Math.sin(18*theta), 3), 13*Math.cos(18*theta) - 5*Math.cos(2*18*theta) - 2* Math.cos(3* 18* theta) - Math.cos(4*18*theta), 0,
      16*Math.pow(Math.sin(19*theta), 3), 13*Math.cos(19*theta) - 5*Math.cos(2*19*theta) - 2* Math.cos(3* 19* theta) - Math.cos(4*19*theta), 0,
      16*Math.pow(Math.sin(20*theta), 3), 13*Math.cos(20*theta) - 5*Math.cos(2*20*theta) - 2* Math.cos(3* 20* theta) - Math.cos(4*20*theta), 0,
      16*Math.pow(Math.sin(21*theta), 3), 13*Math.cos(21*theta) - 5*Math.cos(2*21*theta) - 2* Math.cos(3* 21* theta) - Math.cos(4*21*theta), 0,
      16*Math.pow(Math.sin(22*theta), 3), 13*Math.cos(22*theta) - 5*Math.cos(2*22*theta) - 2* Math.cos(3* 22* theta) - Math.cos(4*22*theta), 0,
      16*Math.pow(Math.sin(23*theta), 3), 13*Math.cos(23*theta) - 5*Math.cos(2*23*theta) - 2* Math.cos(3* 23* theta) - Math.cos(4*23*theta), 0,
      16*Math.pow(Math.sin(24*theta), 3), 13*Math.cos(24*theta) - 5*Math.cos(2*24*theta) - 2* Math.cos(3* 24* theta) - Math.cos(4*24*theta), 0,
      16*Math.pow(Math.sin(25*theta), 3), 13*Math.cos(25*theta) - 5*Math.cos(2*25*theta) - 2* Math.cos(3* 25* theta) - Math.cos(4*25*theta), 0,
      16*Math.pow(Math.sin(26*theta), 3), 13*Math.cos(26*theta) - 5*Math.cos(2*26*theta) - 2* Math.cos(3* 26* theta) - Math.cos(4*26*theta), 0,
      16*Math.pow(Math.sin(27*theta), 3), 13*Math.cos(27*theta) - 5*Math.cos(2*27*theta) - 2* Math.cos(3* 27* theta) - Math.cos(4*27*theta), 0,
      16*Math.pow(Math.sin(28*theta), 3), 13*Math.cos(28*theta) - 5*Math.cos(2*28*theta) - 2* Math.cos(3* 28* theta) - Math.cos(4*28*theta), 0,
      16*Math.pow(Math.sin(29*theta), 3), 13*Math.cos(29*theta) - 5*Math.cos(2*29*theta) - 2* Math.cos(3* 29* theta) - Math.cos(4*29*theta), 0,
      16*Math.pow(Math.sin(30*theta), 3), 13*Math.cos(30*theta) - 5*Math.cos(2*30*theta) - 2* Math.cos(3* 30* theta) - Math.cos(4*30*theta), 0,
      16*Math.pow(Math.sin(31*theta), 3), 13*Math.cos(31*theta) - 5*Math.cos(2*31*theta) - 2* Math.cos(3* 31* theta) - Math.cos(4*31*theta), 0,
      16*Math.pow(Math.sin(32*theta), 3), 13*Math.cos(32*theta) - 5*Math.cos(2*32*theta) - 2* Math.cos(3* 32* theta) - Math.cos(4*32*theta), 0,
      16*Math.pow(Math.sin(33*theta), 3), 13*Math.cos(33*theta) - 5*Math.cos(2*33*theta) - 2* Math.cos(3* 33* theta) - Math.cos(4*33*theta), 0,
      16*Math.pow(Math.sin(34*theta), 3), 13*Math.cos(34*theta) - 5*Math.cos(2*34*theta) - 2* Math.cos(3* 34* theta) - Math.cos(4*34*theta), 0,
      16*Math.pow(Math.sin(35*theta), 3), 13*Math.cos(35*theta) - 5*Math.cos(2*35*theta) - 2* Math.cos(3* 35* theta) - Math.cos(4*35*theta), 0,
      16*Math.pow(Math.sin(36*theta), 3), 13*Math.cos(36*theta) - 5*Math.cos(2*36*theta) - 2* Math.cos(3* 36* theta) - Math.cos(4*36*theta), 0,
      16*Math.pow(Math.sin(37*theta), 3), 13*Math.cos(37*theta) - 5*Math.cos(2*37*theta) - 2* Math.cos(3* 37* theta) - Math.cos(4*37*theta), 0,

    ]),

    // indices = [3, 2, 1, 3, 1, 0];

    gl.STATIC_DRAW);

    this.vertexColor = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColor);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([
        .34, .5, .2,
        0.2,  0.9, .2,
         .8,  .2, .6,
         .34, .5, .2,
         0.2,  0.9, .2,
          .8,  .2, .6,
          .34, .5, .2,
          0.2,  0.9, .2,
           .8,  .2, .6,
           .34, .5, .2,
           .34, .5, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
           0.2,  0.9, .2,
      ]),

      gl.STATIC_DRAW);

  // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([
      0, 1, 2,
      0, 2, 3,
      0, 3, 4,
      0, 4, 5,
      0, 5, 6,
      0, 6, 7,
      0, 7, 8,
      0, 8, 9,
      0, 9, 10,
      0, 10, 11,
      0, 11, 12,
      0, 12, 13,
      0, 13, 14,
      0, 14, 15,
      0, 15, 16,
      0, 16, 17,
      0, 17, 18,
      0, 18, 19,
      0, 19, 20,
      0, 20, 21,
      0, 21, 22,
      0, 22, 23,
      0, 23, 24,
      0, 24, 25,
      0, 25, 26,
      0, 26, 27,
      0, 27, 28,
      0, 28, 29,
      0, 29, 30,
      0, 30, 31,
      0, 31, 32,
      0, 32, 33,
      0, 33, 34,
      0, 34, 35,
      0, 35, 36,
      0, 36, 37,
      0, 37, 38,
      0, 38, 1,

    ]),
    gl.STATIC_DRAW);

  // create and bind input layout with input buffer bindings (OpenGL name: vertex array)
  this.inputLayout = gl.createVertexArray();
  gl.bindVertexArray(this.inputLayout);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.enableVertexAttribArray(0);

  gl.vertexAttribPointer(0,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColor);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );
  // set index buffer to pipeline input
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

  gl.bindVertexArray(null);
};

HeartGeometry.prototype.draw = function() {
  const gl = this.gl;

  gl.bindVertexArray(this.inputLayout);

  gl.drawElements(gl.TRIANGLES, 105, gl.UNSIGNED_SHORT, 0);

};
