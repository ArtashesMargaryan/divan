import * as PIXI from 'pixi.js';
export class Page extends PIXI.Container {
  constructor(config) {
    super({
      width: config.width,
      height: config.height,
      backgroundColor: config.color,
    });
    this.config = config;
    this.build();
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
    this.titleContenier.addChild(title);
    this.addChild(this.titleContenier);
  }
  toCorrectTitle() {
    const { width, height } = this.config;
    this.titleContenier.position.set(width / 2, height / 7);
    this.titleContenier.children.width = 50;
    this.titleContenier.children.height = 50;
    console.warn(this.titleContenier.children);
  }
}
