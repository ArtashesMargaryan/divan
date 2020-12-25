import * as PIXI from 'pixi.js';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { getEmitter } from './game';

export class LastPage extends PIXI.Container {
  constructor(config, pageNum) {
    super({
      width: config.width,
      height: config.height,
      backgroundColor: config.color,
    });

    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    this.config = config;
    this.build();
    this.pageNum = pageNum;
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
    this.buildBasicContainer();
  }

  buildBasicContainer() {
    this.buildTitleContainer();
    this.toCorrectTitle();
    this.buildLeftContainer(pageNum);
    this.buildRightContainer(pageNum);
    this.buildFuterContainer();
  }

  buildTitleContainer() {
    this.titleContenier = new PIXI.Container();
    const title = new PIXI.Sprite.from('title');
    title.anchor.set(0.5, 0);
    this.titleContenier.addChild((this.title = title));
    this.addChild(this.titleContenier);
  }

  toCorrectTitle() {
    const scaleTitle = Math.min(
      (this.config.width * 0.41) / this.title.width,
      (this.config.height * 0.18) / this.title.height
    );
    this.titleContenier.position.set(this.config.width / 2, 0.01 * this.config.height);
    this.titleContenier.children.width = 50;
    this.title.scale.set(scaleTitle);
  }

  buildContainer() {
    const container = new PIXI.Container();
    container.interactive = true;

    container.on('pointerup', this.toNextPage.bind(this, container));

    return container;
  }
}
