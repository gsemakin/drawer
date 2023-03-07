const lerp = (a, b, n) => (1 - n) * a + n * b;

export class Cursor {
  constructor({ el }) {
    this.el = el;
    this.target = { x: 0.5, y: 0.5 }; //координаты указателя мыши
    this.cursor = { x: 0.5, y: 0.5 }; //координаты нового курсора
    this.speed = 0.3; //скорость курсора
    this.init();
  }

  init() {
    this.bindAll();
    window.addEventListener("mousemove", this.onMouseMove);
    this.raf = requestAnimationFrame(this.render);
  }

  bindAll() {
    ["onMouseMove", "render"].forEach((fn) => (this[fn] = this[fn].bind(this)));
  }

  onMouseMove(e) {
    this.target.x = e.clientX / window.innerWidth;
    this.target.y = e.clientY / window.innerHeight;
    if (!this.raf) this.raf = requestAnimationFrame(this.render);

    this.cursor.x = lerp(this.cursor.x, this.target.x, this.speed);
    this.cursor.y = lerp(this.cursor.y, this.target.y, this.speed);

    this.el.style.setProperty("--cursor-x", this.cursor.x);
    this.el.style.setProperty("--cursor-y", this.cursor.y);
  }

  render() {
    this.cursor.x = lerp(this.cursor.x, this.target.x, this.speed);
    this.cursor.y = lerp(this.cursor.y, this.target.y, this.speed);
    this.el.style.setProperty("--cursor-x", this.cursor.x);
    this.el.style.setProperty("--cursor-y", this.cursor.y);
    const delta = Math.sqrt(
      Math.pow(this.target.x - this.cursor.x, 2) +
        Math.pow(this.target.y - this.cursor.y, 2)
    );
    if (delta < 0.001) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
      return;
    }

    this.raf = requestAnimationFrame(this.render);
  }
}
