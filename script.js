const canvas = document.querySelector(".canvas")
const sizeTab = document.querySelector(".canvasSize");
let canvasSize= 50;
let selectedColor = "#000000";

let brush = true;
let opacityBrush = false;
let eraser = false;
let rainbowBrush = false;

function createCanvas(canvasSize){
    let sizeOfDiv = 500/canvasSize;
    let noOfDivs = (500*500)/(sizeOfDiv*sizeOfDiv);
    while (noOfDivs>0){
        let div = document.createElement("div")
        div.classList.add('pixel');
        div.style.height = sizeOfDiv + "px";
        div.style.width = sizeOfDiv + "px";
        div.style.backgroundColor="black";
        div.style.opacity = 0;
        canvas.appendChild(div);
        noOfDivs--;
    }
    showCanvasSize(canvasSize)
}
function showCanvasSize(canvasSize){ 
    const text = document.querySelector("#canvasSize");
    text.textContent = canvasSize+ " X " + canvasSize;
    sizeTab.appendChild(text);
}

function randomColor(){
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 50) + 5;
    let value = Math.floor(Math.random() * 65) +20;
    return "hsl("+hue.toString()+", "+saturation.toString()+"%,"+value.toString()+"%)";
}

function sendPrompt(){
    canvasSize = prompt("Enter the size of canvas you want to set, in integer & <=64");
    if (Number.isInteger(parseInt(canvasSize)) && canvasSize <= 64){
        canvas.innerHTML = "";
        createCanvas(canvasSize);
        draw();
    }
    else{
        alert("Please enter the value in integer which is less than or equals to 64 ");
    }
}

function clearCanvas(){
    const divList =document.querySelectorAll(".pixel")
    divList.forEach(div => {
        div.style.backgroundColor="black";
        div.style.opacity = 0;
    });
}

function switchBrush(){
    brush = true;
    eraser = false;
    opacityBrush = false;
    rainbowBrush = false;
}

function switchEraser(){
    brush = false;
    eraser = true;
    opacityBrush = false;
    rainbowBrush = false;
}

function switchOpacityBrush(){
    brush = false;
    eraser = false;
    opacityBrush = true;
    rainbowBrush = false;
}

function switchrainbowBrush(){
    brush = false;
    eraser = false;
    opacityBrush = false;
    rainbowBrush = true;
}

function draw() {
    const divList = document.querySelectorAll(".pixel");
    let mouseDown = false;
    divList.forEach(div => {

        div.addEventListener('mousedown', (event) => {
            mouseDown = true;
            event.preventDefault();
        });

        div.addEventListener('mouseup', (event) => {
            mouseDown = false;
            event.preventDefault();
        });

        //FOR DRAGGING
        div.addEventListener("mousemove", (event) => {
            if (mouseDown) {
                //for bursh
                if(brush===true && eraser===false && opacityBrush=== false && rainbowBrush===false ){
                    div.style.backgroundColor= selectedColor;
                    div.style.opacity = 1;
                }
                //for eraser
                else if(brush===false && eraser===true && opacityBrush=== false && rainbowBrush===false){
                    div.style.backgroundColor="black"
                    div.style.opacity = 0;
                }
                //for rainbow brush
                else if(brush===false && eraser===false && opacityBrush=== false && rainbowBrush===true){
                    let rn = Math.floor(Math.random() * 3);
                    div.style.backgroundColor = randomColor();
                    div.style.opacity = 1;
                }
                
            }
            event.preventDefault();
        });

        //FOR CLICKING
        div.addEventListener("click", (event) => {
            if(brush===true && eraser===false && opacityBrush=== false && rainbowBrush===false ){
                div.style.backgroundColor="black"
                div.style.opacity = 1;
            }
            else if(brush===false && eraser===true && opacityBrush=== false && rainbowBrush===false){
                div.style.backgroundColor="black"
                div.style.opacity = 0;
            }
            else if(brush===false && eraser===false && opacityBrush=== false && rainbowBrush===true){
                let rn = Math.floor(Math.random() * 3);
                div.style.backgroundColor = randomColor();
                div.style.opacity = 1;
            }
            event.preventDefault();
        });

        //FOR OPACITY BRUSH (mousemove rapidly changing opacity while on div, hence used mouse enter)
        div.addEventListener("mouseenter", (event) => {
            if (mouseDown) {
                if(brush===false && eraser===false && opacityBrush=== true && rainbowBrush===false ){
                    let currentOpacity = parseFloat(div.style.opacity);
                    if (currentOpacity < 1) {
                    let newOpacity = Math.min(currentOpacity + 0.12, 1); // Increment by 0.12, cap at 1
                    div.style.opacity = newOpacity;
                    }
                    event.preventDefault();
                } 
            }
        });
    });
}

const colorList = document.querySelectorAll(".colorPicker");
colorList.forEach(color => {
    color.addEventListener("click", (event) => {
        event.preventDefault(); // Prevents the color picker dialog from opening
        selectedColor = color.value; 
        console.log("Selected Color:", selectedColor);
    });
});

//Creating buttons

const gridSizeBtn = document.querySelector("#gridSize");
gridSizeBtn.addEventListener("click", () => sendPrompt());

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => clearCanvas());

const brushBtn = document.querySelector("#brush");
brushBtn.addEventListener("click", () => switchBrush());

const eraserBtn = document.querySelector("#eraser");
eraserBtn.addEventListener("click", () => switchEraser());

const opacityBrushBtn = document.querySelector("#opacityBrush");
opacityBrushBtn.addEventListener("click", () => switchOpacityBrush());

const rainbowBrushBtn = document.querySelector("#rainbowBrush");
rainbowBrushBtn.addEventListener("click", () => switchrainbowBrush());


createCanvas(canvasSize);
draw();
