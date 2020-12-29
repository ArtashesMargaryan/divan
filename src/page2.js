import * as PIXI from 'pixi.js';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { getEmitter } from './game';
import { strategy } from 'webpack-merge';
import { SofaComponent } from './sofa-component';
import { getDivansConfig } from './divans-config';

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
    this.config.divanCount = 4;
    this.pageControl(config);
    this.build();
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
    this.buildFuterContainer();
    this.toCorentDivan();
    this.buildButtonsPlay();
    this.buildButtonsRetry();
  }

  buildTitleContainer() {
    this.titleContenier = new PIXI.Container();
    const title = new PIXI.Sprite.from('title');
    title.anchor.set(0.5, 0);
    this.titleContenier.addChild((this.title = title));
    this.addChild(this.titleContenier);
  }

  toCorrectTitle() {
    let scaleTitle;
    if (this.pageType === 'x') {
      scaleTitle = Math.min(
        (3 * this.config.width) / (7 * this.title.width),
        (this.config.height * 0.4) / this.title.height
      );
      this.titleContenier.position.set(this.config.width / 2, 0.18 * this.config.height);
      this.titleContenier.children.width = 50;
    } else {
      scaleTitle = Math.min(
        (0.45 * this.config.width) / this.title.width,
        (this.config.height * 0.4) / this.title.height
      );
      this.titleContenier.position.set(this.config.width / 2, 0.01 * this.config.height);
      this.titleContenier.children.width = 50;
    }
    this.title.scale.set((this.scaleTitle = scaleTitle));
  }
  butonAnim(buton) {
    const timeLine = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    timeLine.to(buton, { pixi: { scaleX: 1.2, scaleY: 1.2, pivotX: 0.5 }, duration: 0.3 });
    timeLine.to(buton, { pixi: { scaleX: 0.9, scaleY: 0.9 }, duration: 0.3 });
  }
  buildFuterContainer() {
    const container = new PIXI.Container();
    this.rectangl = this.buildFuterRectang();
    container.addChild(this.rectangl);
    container.addChild(this.buildTextInFuter(this.rectangl.height, this.rectangl.width));
    if (this.pageType === 'x') {
      container.y = this.config.height - container.height;
    } else {
      container.y =
        this.titleContenier.y +
        this.titleContenier.height +
        Math.min(this.config.height / 10, this.titleContenier.height / 10);
    }
    this.addChild((this.rectContainer = container));
  }

  buildFuterRectang() {
    const gr = new PIXI.Graphics();
    gr.beginFill(0x537f7e);
    gr.drawRect(0, 0, this.config.width, Math.min(this.config.height / 12, 150));
    return gr;
  }

  buildTextInFuter(fontMaxW, fontMaxH) {
    const textStr = 'Keep exploring the catalog!';
    const style = new PIXI.TextStyle({
      fontFamily: 'Covet-Bold',
      fontSize: Math.min(0.8 * fontMaxH, (10 * fontMaxW) / textStr.length),
      fill: ['0xffffff'],
    });
    const text = new PIXI.Text(textStr, style);
    text.anchor.set(0.5, -0.5);
    text.x = this.config.width / 2;
    return text;
  }

  buildDivan(num) {
    if (num > 2) {
      const divan = new SofaComponent(`a${num}`, [0, 1, 1, 1]);
      return divan;
    } else {
      const divan = new SofaComponent(`a${num}`, [0, 0, 1, 0]);
      return divan;
    }
  }

  toCorentDivan(pageType) {
    const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portriate';
    const divansConfig = getDivansConfig(orientation);
    divansConfig.forEach((divanConfig) => {
      const { frameName, grid, anchor } = divanConfig;

      const rect = new PIXI.Rectangle(
        grid.x * window.innerWidth,
        grid.y * window.innerHeight,
        grid.width * window.innerWidth,
        grid.height * window.innerHeight
      );

      const divan = new SofaComponent(frameName, anchor);
      divan.pivot.set(anchor.x * divan.width, anchor.y * divan.height);
      divan.position.set(rect.x + rect.width * grid.align.x, rect.y + rect.height * grid.align.y);

      const scaleX = rect.width / divan.width;
      const scaleY = rect.height / divan.height;

      const scale = Math.min(1, scaleX, scaleY);

      divan.scale.set(scale);
      ///grid-na
      const gr = new PIXI.Graphics();
      gr.beginFill(0xff0000, 0.5);
      gr.drawRect(
        grid.x * window.innerWidth,
        grid.y * window.innerHeight,
        grid.width * window.innerWidth,
        grid.height * window.innerHeight
      );
      gr.endFill();
      this.addChild(gr);
      this.addChild(divan);
    });
  }

  divanScaleing(divan, hMax, wMax) {
    // console.warn(hMax, wMax);
    // console.warn(divan.heigh, divan.width / 2);
    return;
    if (divan.height > hMax / 5 || divan.width / 2 > wMax) {
      const scaleDivan = Math.min(this.config.height / (5 * divan.height), wMax / divan.width / 2);
      divan.scale.set(scaleDivan);
      return scaleDivan;
    }
    return 1;
  }
  buildButtonsPlay() {
    const container = new PIXI.Container();
    const buttonPlay = PIXI.Sprite.from('button1');
    buttonPlay.anchor.set(0.5, 0.5);
    container.addChild(buttonPlay);
    container.x = this.config.width / 2;
    this.butonAnim(buttonPlay);
    this.addChild((this.playBtn = container));
    if (this.pageType === 'x') {
      container.y = this.config.height / 2;
    } else {
      container.y = this.config.height - container.height;
    }
  }

  buildButtonsRetry() {
    const container = new PIXI.Container();
    const buttonRettry = PIXI.Sprite.from('button2');

    buttonRettry.anchor.set(0.5, 0.5);
    container.addChild(buttonRettry);
    container.interactive = true;
    container.on('pointerup', this.retryGame, this);
    container.x = this.config.width / 2;
    this.addChild((this.retryBtn = container));
    if (this.pageType === 'x') {
      container.y = this.config.height / 2 + this.playBtn.height + container.height;
    } else {
      container.y = this.config.height - this.playBtn.height - container.height;
    }
  }

  retryGame() {
    this.emitter.emit('retry');
  }
}
