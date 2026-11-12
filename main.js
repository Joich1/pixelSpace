const width = 128;
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

async function loadPixels() {
    try {
        const response = await fetch("get_pixels.php");
        const data = await response.json();

        data.forEach((pixel) => {
            pixels[pixel.y][pixel.x] = pixel.color;
        });

        drawAll();
    } catch (error) {
        console.error("Could not load pixels:", error);
    }
}

async function savePixel(x, y, color) {
    try {
        await fetch("set_pixel.php", {
            method: "POST",
            body: new URLSearchParams({ x, y, color })
        });
    } catch (error) {
        console.error("Could not save pixel:", error);
    }
}

canvas.addEventListener("click", (event) => {
    const area = canvas.getBoundingClientRect();
    const x = Math.min(width - 1, Math.floor((event.clientX - area.left) * canvas.width / area.width / size));
    const y = Math.min(height - 1, Math.floor((event.clientY - area.top) * canvas.height / area.height / size));
    pixels[y][x] = currentColor;
    drawPixel(x, y);
    savePixel(x, y, currentColor);
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

loadPixels();
setInterval(loadPixels, 2000);