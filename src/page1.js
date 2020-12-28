import * as PIXI from 'pixi.js';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { getEmitter } from './game';

export class Page extends PIXI.Container {
  constructor(config, pageNum) {
    super({
      width: config.width,
      height: config.height,
      backgroundColor: config.color,
    });
    this.scaleVal = {
      title: [[0.8, 0.8]],
    };
    this.text = {
      1: {
        0: ' KKH \n13131',
        1: 'Wolds Away \n   Janny S',
      },
      2: {
        0: 'xjjkjc\njnj',
        1: 'dsfjhjhzhvj',
      },
      3: {
        0: 'kjdcgxxzvc',
        1: 'dfgdb',
      },
    };
    this.config = config;
    this.style = {
      algin: 'centr',
      fontSize: this.config.height / 40,
    };
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    this.pageControl(config);
    this.build(pageNum);
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

  build(pageNum) {
    this.buildBasicContainer(pageNum);
  }

  buildBasicContainer(pageNum) {
    if (pageNum > 1) {
      this.emitter.emit('handPaus');
    }
    if (pageNum > 3) {
      console.warn('sasa');
      this.emitter.emit('theAnd');
      return;
    }
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

  buildLeftContainer(pageNum) {
    const leftContainer = this.buildContainer();
    leftContainer.pat = 1;
    this.leftBox = new PIXI.Sprite.from(`${pageNum}b`);
    leftContainer.addChild(this.leftBox);
    this.leftText = new PIXI.Text(`${this.text[pageNum][0]}`, this.style);
    leftContainer.addChild(this.leftText);
    this.leftText.anchor.set(0.5, 0);

    this.addChild(leftContainer);
    this.leftBox.anchor.set(0.5);
    this.scaleX = 1;
    this.leftContainerToCorent(leftContainer);
  }

  leftContainerToCorent(leftContainer) {
    if (this.pageType === 'x') {
      leftContainer.y = (5 * this.config.height) / 9;
      leftContainer.x = (2 * this.config.width) / 8;
      const scaleX = (2 * this.config.width) / (5 * this.leftBox.width);
      const scaleY = (2 * this.config.height) / (5 * this.leftBox.height);
      this.scaleBox = Math.min(scaleY, scaleX);
    } else {
      leftContainer.y = (3 * this.config.height) / 8;
      leftContainer.x = this.config.width / 2;
      const scaleX = (4 * this.config.width) / (7 * this.leftBox.width);
      this.scaleBox = scaleX;
    }

    this.leftText.y = (this.scaleBox * this.leftBox.height) / 2;
    this.leftBox.scale.set(this.scaleBox);
  }

  buildRightContainer(pageNum) {
    const rightCont = this.buildContainer();
    rightCont.pat = 1;
    this.rightBox = new PIXI.Sprite.from(`${pageNum}a`);
    rightCont.addChild(this.rightBox);
    this.rightText = new PIXI.Text(`${this.text[pageNum][1]}`, this.style);
    rightCont.addChild(this.rightText);
    this.rightText.anchor.set(0.5, 0);
    this.rightBox.buttonMode = true;
    this.rightBox.interactive = true;
    this.addChild(rightCont);
    this.rightBox.anchor.set(0.5);
    this.rightContainerToCorent(rightCont);
  }

  rightContainerToCorent(rightCont) {
    if (this.pageType === 'x') {
      rightCont.y = (5 * this.config.height) / 9;
      rightCont.x = (6 * this.config.width) / 8;
    } else {
      rightCont.y = (7 * this.config.height) / 9;
      rightCont.x = this.config.width / 2;
    }
    this.rightText.y = (this.scaleBox * this.rightBox.height) / 2;
    this.rightBox.scale.set(this.scaleBox);
    return this.scaleBox;
  }

  buildFuterContainer() {
    const container = new PIXI.Container();
    this.rectangl = this.buildFuterRectang();
    container.addChild(this.rectangl);
    container.addChild(this.buildTextInFuter(this.rectangl.height, this.rectangl.width));
    if (this.pageType === 'x') {
      container.y = this.config.height - container.height;
    } else {
      container.y = (1 * this.config.height) / 8;
    }
    this.addChild(container);
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

  printCordinats() {
    const arr = this.children.filter((child) => child.pat === 1);
    const arr1 = [
      [arr[0].x, arr[0].y],
      [arr[1].x, arr[1].y],
    ];
    return arr1;
  }

  toNextPage(container) {
    console.warn(this);
    this.children.forEach((child) => {
      child.removeAllListeners();
    });
    if (this.pageNum <= 3) {
      const prom = new Promise((resolv) => {
        this.emitter.emit('handPaus');
        this.pageNum++;
        this.liking(container, resolv);
      }).then(() => {
        this.clearCentrContaner();
      });
    } else {
      return;
    }
  }

  clearCentrContaner() {
    const arr = this.children.filter((child) => child.pat === 1);
    arr.forEach((child) => {
      child.destroy();
    });
    this.buildBasicContainer(this.pageNum);
    return;
  }

  liking(container, onCompleteCallBack) {
    const x = container.x;
    const y = container.y;
    const like = this.buildLike(x, y, onCompleteCallBack);
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 1 });
    tl.to(like, { pixi: { scaleX: 1, scaleY: 1 }, duration: 0.3 });
    tl.to(like, { pixi: { scaleX: 1, scaleY: 1 }, duration: 0.3 });
    tl.to(like, {
      pixi: { scaleX: 0.1, scaleY: 0.1 },
      duration: 0.3,
      onComplete: () => {
        this.removeChild(like);
        onCompleteCallBack();
      },
    });

    this.addChild(like);
  }

  buildLike(x, y, onCompleteCallBack) {
    const like = new PIXI.Sprite.from('like');
    like.position.set(x, y);
    like.anchor.set(0.5);
    like.scale.set(0.5);
    return like;
  }
}
