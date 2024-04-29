const canvas = document.querySelector(".canvas")
let brush = true;

function createCanvas(canvasSize){
    let sizeOfDiv = 500/canvasSize;
    let noOfDivs = (500*500)/(sizeOfDiv*sizeOfDiv);
    while (noOfDivs>0){
        let div = document.createElement("div")
        div.classList.add('pixel');
        div.style.height = sizeOfDiv + "px";
        div.style.width = sizeOfDiv + "px";
        div.style.backgroundColor = "#F5F4DD";
        canvas.appendChild(div);

        noOfDivs--;
    }
}

function sendPrompt(){
    let canvasSize = prompt("Enter the size of canvas you want to set, in integer & <=100");
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
        div.style.backgroundColor = "#F5F4DD";
    });
}

function switchBrush(){
    brush = true;
    draw(brush)
}

function switchEraser(){
    brush = false;
    const divList =document.querySelectorAll(".pixel")
    divList.forEach( div => {
        div.addEventListener("mouseover", ()=> div.style.backgroundColor = "#F5F4DD");
    });
}

function draw(brush){
    if(brush === true){
        const divList =document.querySelectorAll(".pixel")
        let mouseDown = false;
        divList.forEach( div => {
            div.addEventListener('mousedown', () => {
                mouseDown = true;
            });
            div.addEventListener('mouseup', () => {
                mouseDown = false;
            });
            
            div.addEventListener("mousemove", ()=>{
                if(mouseDown == true){
                    div.style.backgroundColor ="black";
                }
            });
        });
        
    }
}

const gridSizeBtn = document.querySelector("#gridSize");
gridSizeBtn.addEventListener("click", () => sendPrompt());

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => clearCanvas());

const brushBtn = document.querySelector("#brush");
brushBtn.addEventListener("click", () => switchBrush())

const eraserBtn = document.querySelector("#eraser");
eraserBtn.addEventListener("click", () => switchEraser())


createCanvas(45);
draw(brush);