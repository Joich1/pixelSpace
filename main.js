//---------------------------MOUSE DOIS E UM (TO FAZENDO, SE DER O ERRADO TEM CODIGO EMBAIXO!!!!!!!-----------------------------

const width = 128;
const height = 64;
const size = 10;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");
const indicator = document.getElementById("indicator");

canvas.width = width * size;
canvas.height = height * size;

indicator.style.width = size * 3 + "px";
indicator.style.height = size * 3 + "px";

const colors = ["#ffffff", "#000000", "#e50000", "#02be01", "#0083c7", "#e5d900", "#a06a42", "#820080"];

const buttonColors = {
    left: "#000000",
    right: "#ffffff"
}

let selected = null

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

function showIndicator(x, y){
    indicator.style.left = (x - 1) * size + "px";
    indicator.style.top = (y - 1) * size + "px";
    indicator.style.display = "block";
}

function clearSelection() {
    selected = null;
    indicator.style.display = "none";
}

function getSide(mouseButton){
    if (mouseButton === 0) return "left";
    if (mouseButton === 2 ) return "right";
    return null;
}


//pega da função getside isso aqui
function setColor (side, color, button ){
    buttonColors[side] = color;

    document.querySelectorAll("#pallet button").forEach((b) =>{
        b.classList.remove("selected-" + side);
    });
    button.classList.add("selected-" + side);
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

canvas.addEventListener("mousedown", (event) => {
    const area = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - area.left) / size);
    const y = Math.floor((event.clientY - area.top) / size);

    if (selected && selected.x === x && selected.y === y) {
        pixels[y][x] = currentColor;
        drawPixel(x, y);
        savePixel(x, y, currentColor);
        clearSelection();
    } else {
        selected = { x: x, y: y };
        showIndicator(x, y);
    }
});

//isso é pra limpar a seleçao com o esc
document.addEventListener("keydown", (event) =>{
    if(event.key === "Escape"){
        clearSelection();
    }
})

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




// ---------------SALVANDO O CODIGO DE ANTES--------------------

/*
const width = 128;
const height = 64;
const size = 10;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementById("palette");
const indicator = document.getElementById("indicator");

canvas.width = width * size;
canvas.height = height * size;

indicator.style.width = size * 3 + "px";
indicator.style.height = size * 3 + "px";

const colors = ["#ffffff", "#000000", "#e50000", "#02be01", "#0083c7", "#e5d900", "#a06a42", "#820080"];
let currentColor = colors[1];
let selected = null

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

function showIndicator(x, y){
    indicator.style.left = (x - 1) * size + "px";
    indicator.style.top = (y - 1) * size + "px";
    indicator.style.display = "block";
}

function clearSelection() {
    selected = null;
    indicator.style.display = "none";
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
    const x = Math.floor((event.clientX - area.left) / size);
    const y = Math.floor((event.clientY - area.top) / size);

    if (selected && selected.x === x && selected.y === y) {
        pixels[y][x] = currentColor;
        drawPixel(x, y);
        savePixel(x, y, currentColor);
        clearSelection();
    } else {
        selected = { x: x, y: y };
        showIndicator(x, y);
    }
});

document.addEventListener("keydown", (event) =>{
    if(event.key === "Escape"){
        clearSelection();
    }
})

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
*/