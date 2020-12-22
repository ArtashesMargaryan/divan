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
    this.graph = new PIXI.Graphics();

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
    this.buildTitleContainer();
    this.toCorrectTitle();
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
    this.titleContenier.position.set(width / 2, Math.max(height / 7, 50));
    this.titleContenier.children.width = 50;
    console.warn(this.titleContenier.children);

    this.title.scale.set(0.8, 0.8);
  }

  buildCenterContainer() {
    this.centerContenier = new PIXI.Container();
    const contLeft = new PIXI.Container();
    const contRight = new PIXI.Container();
    graphics.beginFill(0xde3249);
    graphics.drawRect(50, 50, 100, 100);
    graphics.endFill();
    t;
  }

  toCorrectCenter() {}

  buildFuterContainer() {
    this.titleContenier = new PIXI.Container();
    const title = new PIXI.Sprite.from('title');
    title.anchor.set(0.5);
    this.titleContenier.addChild((this.title = title));
    this.addChild(this.titleContenier);
  }

  toCorrectFuter() {
    const { width, height } = this.config;
    this.titleContenier.position.set(width / 2, Math.max(height / 7, 50));
    this.titleContenier.children.width = 50;
    console.warn(this.titleContenier.children);

    this.title.scale.set(0.8, 0.8);
  }
}
