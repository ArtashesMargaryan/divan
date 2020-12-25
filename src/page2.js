import * as PIXI from 'pixi.js';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { getEmitter } from './game';

export class LastPage extends PIXI.Container {
  constructor(config) {
    super({
      width: config.width,
      height: config.height,
      backgroundColor: config.color,
    });

    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    this.config = config;
    this.build();

    this.arrPos = [];
    this.emitter = getEmitter();
  }

  destroy() {
    super.destroy({ children: true });
  }

  pageControl(config) {
    const { width, height } = config;
    this.minSizeWindow = Math.min(width, height);
    this.pageArea = width * height;
    if (width >= height) {
      this.pageType = 'x';
    } else {
      this.pageType = 'y';
    }
  }

  build() {
    this.buildTitleContainer();
    this.toCorrectTitle();
  }

  buildTitleContainer() {
    this.titleContenier = new PIXI.Container();
    const title = new PIXI.Sprite.from('title');
    title.anchor.set(0.5, 0);
    this.titleContenier.addChild((this.title = title));
    this.addChild(this.titleContenier);
  }

  toCorrectTitle() {
    if (this.pageType === 'x') {
    }
    const scaleTitle = Math.min(
      this.config.width / 3 / this.title.width,
      (this.config.height * 0.4) / this.title.height
    );
    this.titleContenier.position.set(this.config.width / 2, 0.18 * this.config.height);
    this.titleContenier.children.width = 50;
    this.title.scale.set(scaleTitle);
  }

  buldLeft() {
    const leftContainer = new PIXI.Container();
  }
}
