"use strict";
const StarGeometry = function(gl) {
  this.gl = gl;

  // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
      -0.5, 0.2, 0,
      -0.2,  0.2, 0,
       0.0,  0.0, 0,
       -.3,  -.1, 0,
       -.4,  -.4, 0,
       -0,  -.2, 0,
       .4,  -.4, 0,
       .3,  -.1, 0,
       .5,  .2, 0,
       .2,  .2, 0,
        .0,  .5, 0,
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
           0.2,  0.9, .2,
      ]),

      gl.STATIC_DRAW);

  // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([
      2, 1, 0, 2, 0, 3, 2, 3, 4, 2, 4, 5, 2, 5, 6, 2, 6, 7, 2, 7, 8, 2, 8, 9, 2, 9, 10, 10, 2, 1
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

StarGeometry.prototype.draw = function() {
  const gl = this.gl;

  gl.bindVertexArray(this.inputLayout);

  gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_SHORT, 0);

};
