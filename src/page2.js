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
    this.pageControl(config);
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
    this.buildDivan();
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

  butonAnim(buton) {
    const timeLine = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    timeLine.to(buton, { pixi: { scaleX: 1.2, scaleY: 1.2, pivotX: 0.5 }, duration: 0.3 });
    timeLine.to(buton, { pixi: { scaleX: 0.9, scaleY: 0.9 }, duration: 0.3 });
  }

  buildDivan() {
    if (this.pageType === 'x') {
      this.buildDivanAlbum();
    } else {
      this.buildDivansPortret();
    }
  }

  toCorrectTitle() {
    if (this.pageType === 'x') {
      const scaleTitle = Math.min(
        (3 * this.config.width) / (7 * this.title.width),
        (this.config.height * 0.4) / this.title.height
      );
      this.titleContenier.position.set(this.config.width / 2, 0.18 * this.config.height);
      this.titleContenier.children.width = 50;
      this.title.scale.set((this.scaleTitle = scaleTitle));
      this.titleContenier.position.set(this.config.width / 2, 0.18 * this.config.height);
    } else {
      const scaleTitle = Math.min(
        (0.45 * this.config.width) / this.title.width,
        (this.config.height * 0.4) / this.title.height
      );
      this.titleContenier.position.set(this.config.width / 2, 0.01 * this.config.height);

      this.titleContenier.children.width = 50;
      this.title.scale.set((this.scaleTitle = scaleTitle));
    }
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
    container.x = this.config.width / 2;
    this.addChild((this.retryBtn = container));
    if (this.pageType === 'x') {
      container.y = this.config.height / 2 + this.playBtn.height + container.height;
    } else {
      container.y = this.config.height - this.playBtn.height - container.height;
    }
  }

  buildDivanAlbum() {
    const divan1 = new SofaComponent('4a', [-1, 0, 2, 0]);
    this.addChild(divan1);
    divan1.editPosition(0, 0.18 * this.config.height);
    gsap.to(divan1, {
      pixi: { x: this.config.width / 2 - (2 * this.title.width) / 3, y: 0.18 * this.config.height },
      duration: 1,
    });

    const divan2 = new SofaComponent('4b', [-1, 0, 2, 0]);
    this.addChild(divan2);
    divan2.editPosition(0, (3 * this.config.height) / 5);
    gsap.to(divan2, {
      pixi: { x: this.config.width / 2 - (2 * this.title.width) / 3, y: (3 * this.config.height) / 5 },
      duration: 1,
    });

    const divan3 = new SofaComponent('4c', [-1, 0, 2, 0]);
    this.addChild(divan3);
    divan3.editPosition(this.config.width + divan3.width, 0.18 * this.config.height);
    gsap.to(divan3, {
      pixi: { x: this.config.width / 2 + (2 * this.title.width) / 3 + divan3.width, y: 0.18 * this.config.height },
      duration: 1,
    });

    const divan4 = new SofaComponent('4d', [-1, 0, 2, 0]);
    this.addChild(divan4);
    divan4.editPosition(this.config.width + divan4.width, (3 * this.config.height) / 5);
    gsap.to(divan4, {
      pixi: { x: this.config.width / 2 + (2 * this.title.width) / 3 + divan4.width, y: (3 * this.config.height) / 5 },
      duration: 1,
    });
  }
  /***0.45 and 0.3 push in config */
  buildDivansPortret() {
    const w = this.config.width * 0.45;
    const h = this.config.height * 0.3;
    const divan1 = new SofaComponent('4a', [-1, 0, 2, 0]);
    this.addChild(divan1);
    divan1.editPosition(0, h);
    gsap.to(divan1, { pixi: { x: w, y: h }, duration: 1 });
    this.checkItem(divan1, 0.45, 0.3);
    const divan2 = new SofaComponent('4b', [-1, 0, 2, 0]);
    this.addChild(divan2);
    divan2.editPosition(0, (3 * this.config.height) / 5);
    gsap.to(divan2, { pixi: { x: w, y: (3 * this.config.height) / 5 }, duration: 1 });

    const divan3 = new SofaComponent('4c', [-1, 0, 2, 0]);
    this.addChild(divan3);
    divan3.editPosition(this.config.width + divan3.width, h);
    gsap.to(divan3, {
      pixi: { x: 0.55 * this.config.width + divan3.width, y: h },
      duration: 1,
    });

    const divan4 = new SofaComponent('4d', [-1, 0, 2, 0]);
    this.addChild(divan4);
    divan4.editPosition(this.config.width + divan4.width, (3 * this.config.height) / 5);
    gsap.to(divan4, {
      pixi: { x: 0.55 * this.config.width + divan3.width, y: (3 * this.config.height) / 5 },
      duration: 1,
    });
  }

  checkItem(item, xScale, yScale) {
    const { width, height } = this.config;
    if (item.width * 0.55 <= width * xScale && item.height <= height.yScale) {
      return;
    }
    item.scale.set(Math.min(((xScale * width) / item.width, (yScale * height) / item.height)));
  }

  toCorentScale(obj) {
    const ret = Math.min((this.config.width * 0.24) / obj.width, this.config.height / (4.6 * obj.height));
    return ret;
  }
}
