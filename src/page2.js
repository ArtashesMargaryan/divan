import * as PIXI from 'pixi.js';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { getEmitter } from './game';
import { strategy } from 'webpack-merge';
import { SofaComponent } from './sofa-component';

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
    const divanCount = this.config.divanCount;
    if (this.pageType === 'x') {
      for (let i = 1; i <= divanCount; i++) {
        const divan = this.buildDivan(i);
        this.addChild(divan);
        divan.x =
          this.titleContenier.x +
          Math.pow(-1, i) * ((2 / 3) * this.titleContenier.width) +
          (Math.pow(-1, i) * (1 * divan.width)) / 2;
        divan.y = this.titleContenier.y;
        if (i > 2) {
          divan.y += this.titleContenier.y + divan.height + this.config.height / 8;
        }
      }
    } else {
      for (let i = 1; i <= divanCount; i++) {
        const divan = this.buildDivan(i);
        this.addChild(divan);
        this.divanScaleing(divan);
        divan.x =
          this.titleContenier.x +
          Math.pow(-1, i) * Math.min(200, this.config.height / 25) +
          (Math.pow(-1, i) * (1 * divan.width)) / 2;
        divan.y = this.rectContainer.y + this.rectContainer.height + this.config.height / 10;
        if (i > 2) {
          divan.y = this.config.height / 2 + this.config.height / 8 + this.config.height / 8;
          console.warn(divan.y);
        }
        console.warn(this.config.height / 5, this.config.width * 0.45);
        this.divanScaleing(divan, this.config.height / 5, this.config.width * 0.45);
      }
    }
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

  // /***0.45 and 0.3 push in config */
  // buildDivansPortret() {
  //   const w = this.config.width * 0.45;
  //   const h = this.config.height * 0.3;
  //   const divan1 = new SofaComponent('4a', [-1, 0, 2, 0]);
  //   this.addChild(divan1);
  //   divan1.editPosition(0, h);
  //   gsap.to(divan1, { pixi: { x: w, y: h }, duration: 1 });
  //   this.checkItem(divan1, 0.45, 0.3);
  //   const divan2 = new SofaComponent('4b', [-1, 0, 2, 0]);
  //   this.addChild(divan2);
  //   divan2.editPosition(0, (3 * this.config.height) / 5);
  //   gsap.to(divan2, { pixi: { x: w, y: (3 * this.config.height) / 5 }, duration: 1 });

  //   const divan3 = new SofaComponent('4c', [-1, 0, 2, 0]);
  //   this.addChild(divan3);
  //   divan3.editPosition(this.config.width + divan3.width, h);
  //   gsap.to(divan3, {
  //     pixi: { x: 0.55 * this.config.width + divan3.width, y: h },
  //     duration: 1,
  //   });

  //   const divan4 = new SofaComponent('4d', [-1, 0, 2, 0]);
  //   this.addChild(divan4);
  //   divan4.editPosition(this.config.width + divan4.width, (3 * this.config.height) / 5);
  //   gsap.to(divan4, {
  //     pixi: { x: 0.55 * this.config.width + divan3.width, y: (3 * this.config.height) / 5 },
  //     duration: 1,
  //   });
  // }

  // checkItem(item, xScale, yScale) {
  //   const { width, height } = this.config;
  //   if (item.width * 0.55 <= width * xScale && item.height <= height.yScale) {
  //     return;
  //   }
  //   item.scale.set(Math.min(((xScale * width) / item.width, (yScale * height) / item.height)));
  // }

  // toCorentScale(obj) {
  //   const ret = Math.min((this.config.width * 0.24) / obj.width, this.config.height / (4.6 * obj.height));
  //   return ret;
  // }
}
