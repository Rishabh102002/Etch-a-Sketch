const canvas = document.querySelector(".canvas")
const sizeTab = document.querySelector(".canvasSize");
let canvasSize= 25;
let brush = true;
let opacityBrush = false;
let eraser = false;

function createCanvas(canvasSize){
    let sizeOfDiv = 500/canvasSize;
    let noOfDivs = (500*500)/(sizeOfDiv*sizeOfDiv);
    while (noOfDivs>0){
        let div = document.createElement("div")
        div.classList.add('pixel');
        div.style.height = sizeOfDiv + "px";
        div.style.width = sizeOfDiv + "px";
        div.style.backgroundColor= "transparent";
        canvas.appendChild(div);
        console.log("div created")
        noOfDivs--;
    }
    showCanvasSize(canvasSize)
}
function showCanvasSize(canvasSize){ 
    const text = document.querySelector("#canvasSize");
    text.textContent = canvasSize+ " X " + canvasSize;
    sizeTab.appendChild(text);
}

function sendPrompt(){
    canvasSize = prompt("Enter the size of canvas you want to set, in integer & <=100");
    if (Number.isInteger(parseInt(canvasSize)) && canvasSize <= 50){
        canvas.innerHTML = "";
        createCanvas(canvasSize);
    }
    else{
        alert("Please enter the value in integer which is less than or equals to 50 ");
    }
}

function clearCanvas(){
    const divList =document.querySelectorAll(".pixel")
    divList.forEach(div => {
        div.style.backgroundColor = "";
    });
}

function switchBrush(){
    brush = true;
    opacityBrush = false;
    eraser = false;
    draw()
}

function switchEraser(){
    brush = false;
    opacityBrush = false;
    eraser = true;
    erase();
}

function switchOpacityBrush(){
    brush = false;
    opacityBrush = true;
    eraser = false;
    opacityBrushFunction();
}

function switchrainbowBrush(){
    brush = false;
    eraser = false;
    opacityBrush = false;
    rainbowBrushFunction();
}

function erase(){
    const divList =document.querySelectorAll(".pixel")
    let mouseDown = false;
    divList.forEach( div => {
        div.addEventListener('mousedown', (event) => {
            mouseDown = true;
            event.preventDefault();
        });

        div.addEventListener('mouseup', (event) => {
            mouseDown = false;
            event.preventDefault();
        });

        div.addEventListener("mousemove", (event) => {
            if (mouseDown) {
                if(brush=== false && opacityBrush=== false && eraser === true){
                    div.style.backgroundColor = "transparent";
                    event.preventDefault();
                }
            }
        });
        
    });
}

function draw() {
    if (brush === true && opacityBrush === false) {
        console.log("brush active")
        const divList = document.querySelectorAll(".pixel");
        let mouseDown = false;
        
        divList.forEach(div => {

            div.addEventListener("mouseover", (event) =>{
                div.style.position = "relative";
                div.style.top = "-5px";
                div.style.boxShadow = "4px 4px rgba(165, 132, 98, 0.5)";
                event.preventDefault();
            });
            div.addEventListener("mouseleave", (event) =>{
                div.style.backgroundColor= " "
                div.style.position = "";
                div.style.top = "";
                div.style.boxShadow = "";    
                event.preventDefault();
            });
            div.addEventListener('mousedown', (event) => {
                mouseDown = true;
                event.preventDefault();
            });

            div.addEventListener('mouseup', (event) => {
                mouseDown = false;
                event.preventDefault();
            });

            div.addEventListener("mousemove", (event) => {
                if (mouseDown) {
                    if(brush===true && opacityBrush=== false && eraser===false){
                        div.style.backgroundColor = "black";
                        event.preventDefault();
                    }
                }
            });
        });
    }
}

function opacityBrushFunction(){
    console.log("switched to opacity brush");
    const divList = document.querySelectorAll(".pixel");
        let mouseDown = false;
        
        divList.forEach(div => {
            div.style.backgroundColor="black"
            div.style.opacity = 0;
            div.addEventListener('mousedown', (event) => {
                mouseDown = true;
                event.preventDefault();
            });
            div.addEventListener('mouseup', (event) => {
                mouseDown = false;
                event.preventDefault();
            });

            div.addEventListener("mouseenter", (event) => {
                if (mouseDown) {
                    if(brush===false && opacityBrush=== true && eraser===false ){
                        let currentOpacity = parseFloat(div.style.opacity);
                        console.log(parseFloat(div.style.opacity));
                        if (currentOpacity < 1) {
                            let newOpacity = Math.min(currentOpacity + 0.2, 1); // Increment by 0.2, cap at 1
                            div.style.opacity = newOpacity; // Update the CSS opacity property
                        }
                        event.preventDefault();
                        console.log("hi")
                    }
                }
            });
            
        });

}

function rainbowBrushFunction(){

    console.log("switched to rainbow brush");
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

            div.addEventListener("mouseenter", (event) => {
                if (mouseDown) {
                    let rn = Math.floor(Math.random() * 3);
                    div.style.backgroundColor = randomColor();
                    console.log(randomColor())
                    console.log("div is ",div.style.backgroundColor);
                }
            });
            
        });

}
function randomColor(){
    let hue = Math.floor(Math.random() * 180);
    let saturation = Math.floor(Math.random() * 25) + 5;
    let value = Math.floor(Math.random() * 65) +20;
    return "hsl("+hue.toString()+", "+saturation.toString()+"%,"+value.toString()+"%)";
}

//creating buttons

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
draw(brush);