const { PI } = Math;

function randomVectorField(w, l) {
  let vectorField = [];
  for (let x = 0; x < w; x++) {
    vectorField[x] = [];
    for (let y = 0; y < l; y++) {
      let dir = Math.random() * 2 * PI;
      let magnitude = Math.random();
      let dx = Math.cos(dir) * magnitude;
      let dy = Math.sin(dir) * magnitude;
      vectorField[x][y] = { dx, dy };
    }
  }
  return vectorField;
}

function interpolate(a0, a1, w) {
  if (w < 0) return a0;
  if (w > 1) return a1;

  return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w ** 3) + a0;
}

function dotProduct(v1, v2) {
  return v1.dx * v2.dx + v1.dy * v2.dy;
}

function createPerlin(vectorField) {
  return function perlin(x, y) {
    //find the 4 adjacent grid nods
    let x0 = Math.floor(x),
      x1 = x0 + 1,
      y0 = Math.floor(y),
      y1 = y0 + 1;

    // for each vector of coordinates x<0/1> y<0/1>
    // calculate their dot product with the distance vector
    // between the point[x,y] and the grid node of the said vector
    let d00 = dotProduct(vectorField[x0][y0], { dx: x - x0, dy: y - y0 });
    let d01 = dotProduct(vectorField[x0][y1], { dx: x - x0, dy: y - y1 });
    let d10 = dotProduct(vectorField[x1][y0], { dx: x - x1, dy: y - y0 });
    let d11 = dotProduct(vectorField[x1][y1], { dx: x - x1, dy: y - y1 });

    // now interpolate between them
    let ix0 = interpolate(d00, d10, x - x0);
    let ix1 = interpolate(d01, d11, x - x0);

    return interpolate(ix0, ix1, y - y0);
  };
}

// creates a perlin noise map of values ranging from -1 to 1
// w and h are pixels dimensions of the ouputmap
// and nodeDist is the distance in px between each grid node
function createPerlinMap(w, h, nodeDist = 100) {
  let vectorField = randomVectorField(
    parseInt(w / nodeDist) + 2,
    parseInt(h / nodeDist) + 2
  );

  const perlin = createPerlin(vectorField);

  let map = [];
  for (let x = 0; x < w; x++) {
    map[x] = [];
    for (let y = 0; y < h; y++) map[x][y] = perlin(x / nodeDist, y / nodeDist);
  }
  return map;
}
