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
    this.buildLeft();
    this.buildRight();
    this.buildButtons();
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

  buildButtons() {
    const cont = new PIXI.Container();
    const buttonPlay = PIXI.Sprite.from('button1');
    buttonPlay.anchor.set(0.5, 0);
    this.butonAnim(buttonPlay);
    cont.addChild(buttonPlay);
    cont.positionx = this.config.width / 2;
    // cont.anchor.set(0.5, 0)
    if (this.pageType === 'x') {
      buttonPlay.x = this.config.width / 2;
      buttonPlay.y = (3 / 5) * this.config.height;
    } else {
    }
    this.addChild(cont);
  }

  buildLeft() {
    const divan = new SofaComponent('4a', [0, 1]);
    this.addChild(divan);
    console.warn(divan.width);
    return;
    const leftTopContainer = this.buildLeftUpContainer();
    const leftBotomContainer = this.buildLeftDownContainer();
    let scaleLeftUp;
    let scaleLeftDown;
    leftBotomContainer.anchor.set(0, 1);
    if (this.pageType === 'x') {
      leftTopContainer.y = this.titleContenier.y;
      leftBotomContainer.y = (4 / 5) * this.config.height;
      scaleLeftUp = this.toCorentScale(leftTopContainer);
      scaleLeftDown = this.toCorentScale(leftBotomContainer);
    } else {
      leftTopContainer.y = this.titleContenier.y + this.titleContenier.height + this.config.height * 0.1;
      leftBotomContainer.y = 0.2 * this.config.height + leftTopContainer.y + leftTopContainer.height;
      scaleLeftUp = this.toCorentScale(leftTopContainer);
      scaleLeftDown = this.toCorentScale(leftBotomContainer);
    }
    leftTopContainer.scale.set(scaleLeftUp);
    leftBotomContainer.scale.set(scaleLeftDown);
    // console.warn(leftTopContainer);
    this.addChild(leftTopContainer);
    this.addChild(leftBotomContainer);
  }

  buildLeftUpContainer() {
    const divanLeftUp = new PIXI.Sprite.from('4a');
    const leftContUp = new PIXI.Container();
    return leftContUp.addChild(divanLeftUp);
  }

  buildLeftDownContainer() {
    const divanLeftDown = new PIXI.Sprite.from('4b');
    const leftContDown = new PIXI.Container();
    return leftContDown.addChild(divanLeftDown);
  }

  buildRight() {
    return;
    const rigtTopContainer = this.buildRightUpContainer();
    const rightBotomContainer = this.buildRightDownContainer();
    rigtTopContainer.anchor.set(1, 0);
    rigtTopContainer.x = this.config.width;
    rightBotomContainer.anchor.set(1, 1);
    rightBotomContainer.x = this.config.width;

    let scaleRightUp;
    let scaleRightDown;
    if (this.pageType === 'x') {
      rigtTopContainer.y = this.titleContenier.y;
      rightBotomContainer.y = (4 / 5) * this.config.height;
      scaleRightUp = this.toCorentScale(rigtTopContainer);
      scaleRightDown = this.toCorentScale(rightBotomContainer);
    } else {
      rigtTopContainer.y = this.titleContenier.y + this.titleContenier.height + this.config.height * 0.1;
      rightBotomContainer.y = 0.2 * this.config.height + rigtTopContainer.y + rigtTopContainer.height;
      scaleRightUp = this.toCorentScale(rigtTopContainer);
      scaleRightDown = this.toCorentScale(rightBotomContainer);
    }
    rightBotomContainer.scale.set(scaleRightUp);
    rigtTopContainer.scale.set(scaleRightDown);
    this.addChild(rigtTopContainer);
    this.addChild(rightBotomContainer);
  }

  buildRightUpContainer() {
    const divanRightUp = new PIXI.Sprite.from('4d');
    const rightContUp = new PIXI.Container();

    return rightContUp.addChild(divanRightUp);
  }

  buildRightDownContainer() {
    const divanRightDown = new PIXI.Sprite.from('4c');
    const rightTopContainer = new PIXI.Container();
    return rightTopContainer.addChild(divanRightDown);
  }

  toCorentScale(obj) {
    const ret = Math.min((this.config.width * 0.24) / obj.width, this.config.height / (4.6 * obj.height));
    return ret;
  }
}
