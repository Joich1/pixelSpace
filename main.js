const width = 64;
const height = 64;
const size = 10;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");

canvas.width = width * size;
canvas.height = height * size;

const colors = ["#ffffff", "#000000", "#e50000", "#02be01", "#0083c7", "#e5d900", "#a06a42", "#820080"];
let currentColor = colors[1];

const pixels = [];

for (let y = 0; y < height; y++) {
    pixels.push(new Array(width).fill("#ffffff"));
}

function drawPixel(x, y) {
    ctx.fillStyle = pixels[y][x];
    ctx.fillRect(x * size, y * size, size, size);
}

function drawAll() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            drawPixel(x, y);
        }
    }
}



canvas.addEventListener("click", (event) => {
    const area = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - area.left) / size);
    const y = Math.floor((event.clientY - area.top) / size);
    pixels[y][x] = currentColor;
    drawPixel(x, y);
});

colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.background = color;
    button.addEventListener("click", () => {
        currentColor = color;
        document.querySelectorAll("#palette button").forEach((b) => b.classList.remove("selected"));
        button.classList.add("selected");
    });
    palette.appendChild(button);
});

drawAll();