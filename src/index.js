import "./styles/main.sass";
import { Cursor } from "./components/Cursor";
const curs = new Cursor({ el: document.getElementById("cursor") });
const canv = document.getElementById("js-canv");
const context = canv.getContext("2d");

canv.width = window.innerWidth * window.devicePixelRatio;
canv.height = window.innerHeight * window.devicePixelRatio;
let mouseClicked = false;

let coordinates = [];

canv.addEventListener("pointerdown", (e) => {
  mouseClicked = true;
  context.beginPath();
});

canv.addEventListener("pointerup", (e) => {
  mouseClicked = false;
  context.beginPath();
  coordinates.push("");
});

canv.addEventListener("pointermove", (e) => {
  if (mouseClicked) {
    coordinates.push([e.clientX, e.clientY]);

    context.lineTo(e.clientX, e.clientY);
    context.lineWidth = 30 * 2;
    context.strokeStyle = "#000000";
    context.stroke();

    context.beginPath();
    context.arc(e.clientX, e.clientY, 30, 0, Math.PI * 2);
    context.fillStyle = "#000000";
    context.fill();

    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
  }
});

function clear() {
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canv.width, canv.height);
  localStorage.setItem("coordinates", "");
}

function save() {
  localStorage.setItem("coordinates", JSON.stringify(coordinates));
}

function replay() {
  let timer = setInterval(() => {
    if (!coordinates.length) {
      clearInterval(timer);
      context.beginPath();
      return;
    }

    let crd = coordinates.shift();
    let e = {
      clientX: crd["0"],
      clientY: crd["1"],
    };

    context.lineTo(e.clientX, e.clientY);
    context.lineWidth = 30 * 2;
    context.strokeStyle = "#f5889f";
    context.stroke();

    context.beginPath();
    context.arc(e.clientX, e.clientY, 30, 0, Math.PI * 2);
    context.fillStyle = "#f5889f";
    context.fill();

    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
  }, 30);
}

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 83) {
    console.log("save");
    save();
  }
  if (e.keyCode == 82) {
    coordinates = JSON.parse(localStorage.getItem("coordinates"));
    console.log("reload");
    clear();
    replay();
  }
  if (e.keyCode == 67) {
    clear();
    console.log("cleared");
  }
});
