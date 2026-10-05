let button = document.querySelector("button");
let boxes = document.querySelectorAll(".box");
let guessCounter = 0;
let randomBox;

function startGame() {
    guessCounter = 0;
    
    let paragraph = document.getElementById("msg");
    paragraph.textContent = "Click on the boxes to find the hidden picture";
    
    boxes.forEach(box => {box.textContent = "";});
    randomBox = Math.floor(Math.random() * boxes.length);
    boxes.forEach(box => {box.addEventListener("click", checkBox);});
}

function checkBox(event) {
    guessCounter++;

    let clickedBox = Array.from(boxes).indexOf(event.target);
    if (clickedBox === randomBox) {
        let image = document.createElement("img");
        image.src = "image.jpg";
        boxes[randomBox].appendChild(image);

        let paragraph = document.getElementById("msg");
        paragraph.textContent = "You've found it on guess " + guessCounter + "!";

        boxes.forEach(box => {box.removeEventListener("click", checkBox);});
    } else {
        event.target.textContent = "Not here";
    }
    
}

button.addEventListener("click", startGame);