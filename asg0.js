// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('cnv1');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color

  var v1 = new Vector3([2.25, 2.25, 0]);

  // Draw the vector v1
  drawVector(v1, 'red', ctx);
}

function drawVector(v, color, ctx) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(200, 200); // Canvas center is (200, 200) for a 400x400 canvas
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20); // Adjust coordinates and scale
  ctx.stroke();
}

function handleDrawEvent() {
  var canvas = document.getElementById('cnv1');
  var ctx = canvas.getContext('2d');
  var x1 = parseFloat(document.getElementById('x-coord-v1').value);
  var y1 = parseFloat(document.getElementById('y-coord-v1').value);
  var x2 = parseFloat(document.getElementById('x-coord-v2').value);
  var y2 = parseFloat(document.getElementById('y-coord-v2').value);

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Clear the canvas
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var v1 = new Vector3([x1, y1, 0]);
  var v2 = new Vector3([x2, y2, 0]);

  drawVector(v1, 'red', ctx); // Draw v1 in red
  drawVector(v2, 'blue', ctx); // Draw v2 in blue
}

function handleDrawOperationEvent() {
  var canvas = document.getElementById('cnv1');
  var ctx = canvas.getContext('2d');
  var operation = document.getElementById('operation-select').value;
  var scalar = parseFloat(document.getElementById('scalar').value);

  var x1 = parseFloat(document.getElementById('x-coord-v1').value);
  var y1 = parseFloat(document.getElementById('y-coord-v1').value);
  var x2 = parseFloat(document.getElementById('x-coord-v2').value);
  var y2 = parseFloat(document.getElementById('y-coord-v2').value);

  var v1 = new Vector3([x1, y1, 0]);
  var v2 = new Vector3([x2, y2, 0]);

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  drawVector(v1, 'red', ctx);
  drawVector(v2, 'blue', ctx);

  if (operation === 'add') {
      var v3 = v1.add(v2);
      drawVector(v3, 'green', ctx);
  } else if (operation === 'sub') {
      var v3 = v1.sub(v2);
      drawVector(v3, 'green', ctx);
  } else if (operation === 'mul') {
      var v3 = v1.mul(scalar);
      var v4 = v2.mul(scalar);
      drawVector(v3, 'green', ctx);
      drawVector(v4, 'green', ctx);
  } else if (operation === 'div') {
      var v3 = v1.div(scalar);
      var v4 = v2.div(scalar);
      drawVector(v3, 'green', ctx);
      drawVector(v4, 'green', ctx);
  }
  else if (operation === 'mag') {
    console.log('Magnitude v1:', v1.magnitude());
    console.log('Magnitude v2:', v2.magnitude());
} 
  else if (operation === 'norm') {
    drawVector(v1.normalize(), 'green', ctx);
    drawVector(v2.normalize(), 'green', ctx);
  }
   else if (operation === 'angle') {
    var angle = angleBetween(v1, v2);
    console.log('Angle :', angle.toFixed(2));
}
  else if (operation === 'area') {
    var area = areaTriangle(v1, v2);
    console.log('Area of the triangle:', area.toFixed(2));
}
}

function angleBetween(v1, v2) {
  var dot = Vector3.dot(v1, v2);
  var magnitude1 = v1.magnitude();
  var magnitude2 = v2.magnitude();
  var angleRadians = Math.acos(dot / (magnitude1 * magnitude2));
  return angleRadians * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
  var crossProd = Vector3.cross(v1, v2);
  var area = 0.5 * crossProd.magnitude();
  return area;
}
