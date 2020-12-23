import * as PIXI from 'pixi.js';
export class Page extends PIXI.Container {
  constructor(config) {
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
    this.build();
  }

  pageControl(config) {
    const { width, height } = config;
    this.minSizeWindow = Math.min(width, height);
    this.pageArea = width * height;
    if (width > height) {
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
    this.buildCenterContainer();
    this.buildLeftContainerInCentrContainer(1);
    this.buildRightContainerInCentrContainer(1);
    this.buildFuterContainer();
  }

  buildTitleContainer() {
    this.titleContenier = new PIXI.Container();
    const title = new PIXI.Sprite.from('title');
    title.anchor.set(0.5);
    this.titleContenier.addChild((this.title = title));
    this.addChild(this.titleContenier);
  }

  toCorrectTitle() {
    const scaleTitle = this.minSizeWindow / (7 * this.title.height);
    this.titleContenier.position.set(
      this.config.width / 2,
      Math.max(this.title.height * scaleTitle, this.minSizeWindow / 12)
    );
    this.titleContenier.children.width = 50;
    this.title.scale.set(scaleTitle, scaleTitle);
  }

  buildCenterContainer(numPage = 1) {
    const centerContenier = new PIXI.Container();
    centerContenier.position.set(
      0,
      this.minSizeWindow / (7 * this.title.height) + this.title.height + this.minSizeWindow / 7
    );
    this.addChild((this.centerContenier = centerContenier));
  }

  buildLeftContainerInCentrContainer(pageNum) {
    this.leftBox = new PIXI.Sprite.from(`${pageNum}b`);
    this.addChild(this.leftBox);
    this.leftBox.anchor.set(0.5);
    if (this.pageType === 'x') {
      this.leftBox.y = (5 * this.config.height) / 9;
      this.leftBox.x = this.config.width / 3;
    } else {
      this.leftBox.y = this.config.height / 3;
      this.leftBox.x = this.config.width / 2;
    }
  }

  buildRightContainerInCentrContainer(pageNum) {
    this.leftBox = new PIXI.Sprite.from(`${pageNum}a`);
    this.addChild(this.leftBox);
    this.leftBox.anchor.set(0.5);
    if (this.pageType === 'x') {
      this.leftBox.y = (5 * this.config.height) / 9;
      this.leftBox.x = (2 * this.config.width) / 3;
    } else {
      this.leftBox.y = (2 * this.config.height) / 3;
      this.leftBox.x = this.config.width / 2;
    }
  }

  buildFuterContainer(width, height) {
    const container = new PIXI.Container();
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: ['0xffffff'],
    });
    const gr = new PIXI.Graphics();
    gr.beginFill(0x537f7e);
    gr.drawRect(0, 0, this.config.width, this.config.height / 10);
    const text = new PIXI.Text('Keep exploring the catalog!', style);
    text.anchor.set(0.5, 0);

    container.addChild(gr);
    container.addChild(text);
    if (this.pageType === 'x') {
      container.y = (7 * this.config.height) / 9;
    } else {
      container.y = (2 * this.config.height) / 9;
    }
    text.x = this.config.width / 2;
    this.addChild(container);
  }
  toCorrectFuter() {
    // const { width, height } = this.config;
    // this.titleContenier.position.set(width / 2, Math.max(height / 7, 50));
    // this.titleContenier.children.width = 50;
    // console.warn(this.titleContenier.children);
    // this.title.scale.set(0.8, 0.8);
  }
}
