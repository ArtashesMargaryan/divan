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
    this.scaleVal = {
      title: [],
      center: [],
      futer: [],
    };
  }

  build() {
    this.buildBasicContainer();
  }

  buildBasicContainer() {
    const width = this.config.width / 24;
    const height = this.config.height / 24;
    this.buildTitleContainer();
    this.toCorrectTitle();
    this.buildCenterContainer();
    this.buildLeftContainerInCentrContainer(width, height);
    this.buildRightContainerInCentrContainer(width, height);
    this.buildFuterContainer(width, height);
  }

  buildTitleContainer() {
    this.titleContenier = new PIXI.Container();
    const title = new PIXI.Sprite.from('title');
    title.anchor.set(0.5);
    this.titleContenier.addChild((this.title = title));
    this.addChild(this.titleContenier);
  }
  toCorrectTitle() {
    const { width, height } = this.config;
    this.minSizeWindow = Math.min(width, height);
    const scaleTitle = this.minSizeWindow / (7 * this.title.height);
    this.titleContenier.position.set(width / 2, Math.max(this.title.height * scaleTitle, this.minSizeWindow / 12));
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

  buildLeftContainerInCentrContainer(width, height) {
    const contLeft = new PIXI.Container();
    const left = new PIXI.Sprite.from('1b');
    if (width > height) {
      this.scaleCent = 1.6 * Math.min(this.config.height / 979, this.config.width / 1919);
      left.scale.set(this.scaleCent);
      contLeft.addChild((this.left = left));
      this.centerContenier.addChild((this.contLeft = contLeft));
      console.warn(width * 12 - (left.width * this.scaleCent) / 2);
      left.position.x = width * 12 - left.width;
    } else {
      this.scaleCent = 2.5 * Math.min(this.config.height / 979, this.config.width / 1919);
      left.scale.set(this.scaleCent);
      contLeft.addChild((this.left = left));
      this.centerContenier.addChild((this.contLeft = contLeft));
      left.position.set(4 * width, this.minSizeWindow / 12);
    }
  }

  buildRightContainerInCentrContainer(width, height) {
    const contRight = new PIXI.Container();
    const right = new PIXI.Sprite.from('1a');
    if (width > height) {
      right.scale.set(this.scaleCent, this.scaleCent);
      right.position.x = width * 12;
      contRight.addChild(right);
      this.centerContenier.addChild(contRight);
    } else {
      this.scaleCent = 2.5 * Math.min(this.config.height / 979, this.config.width / 1919);
      right.scale.set(this.scaleCent);
      contRight.addChild((this.right = right));
      this.centerContenier.addChild((this.contRight = contRight));
      right.position.set(4 * width, this.minSizeWindow / 2);
    }
  }

  buildFuterContainer(width, height) {
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: ['0xffffff'], // gradient
    });
    const gr = new PIXI.Graphics();
    gr.beginFill(0x537f7e);
    const text = new PIXI.Text('Keep exploring the catalog!', style);

    text.anchor.set(0.5, 0);
    if (width > height) {
      gr.drawRect(0, this.minSizeWindow / 1.21, 24 * width, this.minSizeWindow / 10);
      text.position.set(12 * width, this.minSizeWindow / 1.19);
    } else {
      gr.drawRect(0, this.minSizeWindow / 4, 24 * width, this.minSizeWindow / 10);
      text.position.set(0, this.minSizeWindow / 1.21);
    }
    gr.endFill();
    gr.addChild(text);
    this.addChild(gr);
  }

  toCorrectFuter() {
    // const { width, height } = this.config;
    // this.titleContenier.position.set(width / 2, Math.max(height / 7, 50));
    // this.titleContenier.children.width = 50;
    // console.warn(this.titleContenier.children);
    // this.title.scale.set(0.8, 0.8);
  }
}
