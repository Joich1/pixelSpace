const width = 64;
const height = 64;
const size = 10;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");

canvas.width = width * size;
canvas.height = height * size;

const color = ["#ffffff", "#000000", "#e50000", "#02be01", "#0083c7", "#e5d900", "#a06a42", "#820080"];
let aColor = color[1];

const pixels = [];

for(let y = 0; y < height; y++){
    pixels.push(new Array(width).fill("#ffffff"));
}

function cPixel(x, y){
    ctx.fillStyle = pixels[y][x];
    ctx.fillReact(x * size, y * size, size, size);
}

