const canvas =
  document.getElementById("canvas") || document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

function drawVector(vector, position, norm, strokeStyle = "black") {
  const [x, y] = position;
  const endX = x + Math.cos(vector.direction) * vector.magnitude * norm;
  const endY = y + Math.sin(vector.direction) * vector.magnitude * norm;

  const x2 = endX + (Math.cos(-2.5 + vector.direction) * norm) / 4;
  const y2 = endY + (Math.sin(-2.5 + vector.direction) * norm) / 4;
  const x3 = endX + (Math.cos(2.5 + vector.direction) * norm) / 4;
  const y3 = endY + (Math.sin(2.5 + vector.direction) * norm) / 4;

  c.strokeStyle = strokeStyle;

  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(endX, endY);
  c.lineTo(x2, y2);
  c.moveTo(endX, endY);
  c.lineTo(x3, y3);
  c.stroke();
}

function drawVectorField(
  vectorField,
  pxStep = 60,
  vectorNorm = 40,
  margin = 50,
  strokeStyle = "red"
) {
  for (let x = 0; x < vectorField.length; x++)
    for (let y = 0; y < vectorField[x].length; y++) {
      drawVector(
        vectorField[x][y],
        [x * pxStep + margin, y * pxStep + margin],
        vectorNorm,
        strokeStyle
      );
    }
}

// takes a map of height values ranging from 0 to 1
// callback generates the fillStyle of each px from the px associated height
function plotHeightMap(
  pxMap,
  callback = (height) => `hsl(0,0%,${height * 100}%)`
) {
  for (let x = 0; x < pxMap.length; x++)
    for (let y = 0; y < pxMap[0].length; y++) {
      c.beginPath();
      let fillStyle = callback(pxMap[x][y]);
      c.fillStyle = fillStyle;
      c.fillRect(x, y, 1, 1);
    }
}
