import Noise from './Noise';

class AWaves extends HTMLElement {
  /**
   * Init
   */
  connectedCallback() {
    // Elements
    this.svg = this.querySelector('.js-svg');
    this.path = this.svg.querySelector('.js-path');

    // Properties
    this.lines = [];
    this.noise = new Noise(Math.random());

    // Init
    this.setSize();
    this.setLines();

    this.bindEvents();

    // RAF
    requestAnimationFrame(this.tick.bind(this));
  }

  /**
   * Bind events
   */
  bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  /**
   * Resize handler
   */
  onResize() {
    this.setSize();
    this.setLines();
  }

  /**
   * Set size
   */
  setSize() {
    this.bounding = this.getBoundingClientRect();

    this.svg.style.width = `${this.bounding.width}px`;
    this.svg.style.height = `${this.bounding.height}px`;
  }

  /**
   * Set lines
   */
  setLines() {
    const { width, height } = this.bounding;

    this.lines = [];

    const xGap = 10;
    const yGap = 32;

    const oWidth = width + 200;
    const oHeight = height + 30;

    const totalLines = Math.ceil(oWidth / xGap);
    const totalPoints = Math.ceil(oHeight / yGap);

    const xStart = (width - xGap * totalLines) / 2;
    const yStart = (height - yGap * totalPoints) / 2;

    for (let i = 0; i <= totalLines; i++) {
      const points = [];

      for (let j = 0; j <= totalPoints; j++) {
        const point = {
          x: xStart + xGap * i,
          y: yStart + yGap * j,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },
        };

        points.push(point);
      }

      // Add points
      this.lines.push(points);
    }
  }

  /**
   * Move points
   */
  movePoints(time) {
    const { lines, noise } = this;

    lines.forEach((points) => {
      points.forEach((p) => {
        // Wave movement
        const move =
          noise.perlin2(
            (p.x + time * 0.0125) * 0.002,
            (p.y + time * 0.005) * 0.0015
          ) * 12;
        p.wave.x = Math.cos(move) * 32;
        p.wave.y = Math.sin(move) * 16;
      });
    });
  }

  /**
   * Get point coordinates with movement added
   */
  moved(point) {
    const coords = {
      x: point.x + point.wave.x,
      y: point.y + point.wave.y,
    };

    // Round to 2 decimals
    coords.x = Math.round(coords.x * 10) / 10;
    coords.y = Math.round(coords.y * 10) / 10;

    return coords;
  }

  /**
   * Draw lines
   */
  drawLines() {
    const { lines, moved, path } = this;

    let d = '';

    lines.forEach((points) => {
      let p1 = moved(points[0]);

      d += `M ${p1.x} ${p1.y}`;

      points.forEach((p1, pIndex) => {
        const isLast = pIndex === points.length - 1;

        p1 = moved(p1);

        const p2 = moved(
          points[pIndex + 1] || points[points.length - 1]
        );

        d += `L ${p1.x} ${p1.y}`;
      });

      path.setAttribute('d', d);
    });
  }

  /**
   * Tick
   */
  tick(time) {
    this.movePoints(time);
    this.drawLines();

    requestAnimationFrame(this.tick.bind(this));
  }
}

customElements.define('a-waves', AWaves);
