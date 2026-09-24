const box = document.getElementById("orangeBox");
const corners = document.querySelectorAll(".corner");

const savedPosition = localStorage.getItem("boxPosition");

if (savedPosition) {
    const savedCorner = document.getElementById(savedPosition);
    savedCorner.append(box);
}

corners.forEach(function(corner) {
    corner.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    corner.addEventListener("drop", function(event) {
        event.preventDefault();
        corner.append(box);

        localStorage.setItem("boxPosition", corner.id);
    });
    
});

document.addEventListener("click", (ev) => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    document.body.style.backgroundColor =
        "rgb(" + red + ", " + green + ", " + blue + ")";
});