let zoom = 0.2;
let map = createPerlinMap(window.innerWidth, window.innerHeight, zoom * 100);

// basic mapping
map = map.map((col) => col.map((cell) => (cell + 1) / 2));

// more organic looking mapping
// map = map.map((col) => col.map((cell) => (cell + 0.7) / 1.7));

//darker valleys mapping
// map = map.map((col) => col.map((cell) => cell + 0.2));

//tripy
plotHeightMap(map, (height) => `hsl(${height * 4000}, 50%, 50%)`);

// height map
// plotHeightMap(map, (height) => `hsl(0, 50%, ${(height * 2000) % 80}%)`);

//geological-ish map
// plotHeightMap(
//   map,
//   (height) => `hsl(${(parseInt(height * 10) + height * 3) * 36}, 70%,50%)`
// );

//typical perlin noise render
// plotHeightMap(map, (height) => `hsl(0, 0%, ${height * 100}%)`);
