import * as PIXI from 'pixi.js';
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
    this.config = config;
    this.pageControl(config);
    this.build(pageNum);
    this.pageNum = pageNum;
    console.warn(this.pageNum);
  }

  destroy() {
    super.destroy({ children: true });
  }

  pageControl(config) {
    const { width, height } = config;
    this.minSizeWindow = Math.min(width, height);
    this.pageArea = width * height;
    if (width >= height - 250) {
      this.pageType = 'x';
    } else {
      this.pageType = 'y';
    }
  }

  build(pageNum) {
    this.buildBasicContainer(pageNum);
  }

  buildBasicContainer(pageNum) {
    this.buildTitleContainer();
    this.toCorrectTitle();
    this.buildLeftContainer(pageNum);
    this.buildRightContainer(pageNum);
    this.buildFuterContainer();
    this.printCordinats();
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
      (this.config.width * 0.6) / this.title.width,
      (this.config.height * 0.2) / this.title.height
    );
    this.titleContenier.position.set(this.config.width / 2, 0.01 * this.config.height);

    this.titleContenier.children.width = 50;
    this.title.scale.set(scaleTitle);
  }

  buildContainer() {
    const container = new PIXI.Container();
    return container;
  }

  buildLeftContainer(pageNum) {
    this.leftBox = new PIXI.Sprite.from(`${pageNum}b`);
    this.addChild(this.leftBox);
    this.leftBox.anchor.set(0.5);
    this.scaleX = 1;
    this.leftContainerToCorent();
  }

  leftContainerToCorent() {
    if (this.pageType === 'x') {
      this.leftBox.y = (5 * this.config.height) / 9;
      this.leftBox.x = (2 * this.config.width) / 8;
      const scaleX = this.config.width / (2 * this.leftBox.width);
      const scaleY = this.config.height / (2 * this.leftBox.height);
      this.scaleBox = Math.min(scaleY, scaleX);
    } else {
      this.leftBox.y = (3 * this.config.height) / 8;
      this.leftBox.x = this.config.width / 2;
      const scaleX = (2 * this.config.width) / (3 * this.leftBox.width);
      this.scaleBox = scaleX;
    }

    this.leftBox.scale.set(this.scaleBox);
  }

  buildRightContainer(pageNum) {
    this.rightBox = new PIXI.Sprite.from(`${pageNum}a`);
    const container = this.buildContainer();
    container.addChild(this.rightBox);
    container.interactive = true;
    // container.addEventListener('pointerDown', () => {
    //   console.warn('sd');
    // });
    this.rightBox.buttonMode = true;
    this.rightBox.interactive = true;
    this.addChild(container);
    this.rightBox.anchor.set(0.5);
    this.rightContainerToCorent();
  }

  boxClick() {}
  rightContainerToCorent() {
    if (this.pageType === 'x') {
      this.rightBox.y = (5 * this.config.height) / 9;
      this.rightBox.x = (6 * this.config.width) / 8;
    } else {
      this.rightBox.y = (7 * this.config.height) / 9;
      this.rightBox.x = this.config.width / 2;
    }
    this.rightBox.scale.set(this.scaleBox);
  }

  buildFuterContainer() {
    const container = this.buildContainer();
    container.addChild(this.buildFuterRectang());
    container.addChild(this.buildTextInFuter());
    if (this.pageType === 'x') {
      container.y = (8 * this.config.height) / 9;
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

  buildTextInFuter() {
    const style = new PIXI.TextStyle({
      fontFamily: 'Covet-Bold',
      fontSize: Math.min(this.config.height / 12, 150) / 2,
      fill: ['0xffffff'],
    });
    const text = new PIXI.Text('Keep exploring the catalog!', style);
    text.anchor.set(0.5, -0.25);
    text.x = this.config.width / 2;
    return text;
  }

  printCordinats() {
    const arr = [];
    arr.push(this.leftBox.position);
    arr.push(this.rightBox.position);
    return arr;
  }
  toCorrectFuter() {
    // const { width, height } = this.config;
    // this.titleContenier.position.set(width / 2, Math.max(height / 7, 50));
    // this.titleContenier.children.width = 50;
    // console.warn(this.titleContenier.children);
    // this.title.scale.set(0.8, 0.8);
  }
}
