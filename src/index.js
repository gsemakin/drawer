import "./styles/main.sass";
import { Cursor } from "./components/Cursor";
const curs = new Cursor({ el: document.getElementById("cursor") });
const canv = document.getElementById("js-canv");
const context = canv.getContext("2d");

canv.width = window.innerWidth * window.devicePixelRatio;
canv.height = window.innerHeight * window.devicePixelRatio;
let mouseClicked = false;

const coordinates = [];

canv.addEventListener("pointerdown", (e) => {
  mouseClicked = true;
  context.beginPath();
});

canv.addEventListener("pointerup", (e) => {
  mouseClicked = false;
});

canv.addEventListener("pointermove", (e) => {
  if (mouseClicked) {
    coordinates.push([e.clientX, e.clientY]);

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

function clear() {
  context.fillStyle = "white";
  context.fillRect(0, 0, canv.width, canv.height);
}

function save() {
  localStorage.setItem("coordinates", JSON.stringify(coordinates));
}

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 83) {
    save();
  }
  if (e.keyCode == 82) {
  }
  if (e.keyCode == 67) {
  }
});
