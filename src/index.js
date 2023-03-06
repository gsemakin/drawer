import "./styles/main.sass";

const canv = document.getElementById("js-canv");
const context = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;
let mouseClicked = false;

canv.addEventListener("mousedown", (e) => {
  mouseClicked = true;
  context.beginPath();
});

canv.addEventListener("mouseup", (e) => {
  mouseClicked = false;
});

canv.addEventListener("mousemove", (e) => {
  if (mouseClicked) {
    context.lineTo(e.clientX, e.clientY);
    context.lineWidth = 30 * 2;
    context.stroke();

    context.beginPath();
    context.arc(e.clientX, e.clientY, 30, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
  }
});
