import { Container, Sprite } from 'pixi.js';
export class Page extends Container {
  constructor(config) {
    super()
    this.config = config
    this.build();
  }



  build() {
    console.warn(this.config);
    this.buildBasicContainer();
  }

  buildBasicContainer() {
    this.buildTitleContainer();
    this.toCorrectTitle();
    this.buildCenterContainer()
  }

  buildTitleContainer() {
    this.titleContenier = new Container();
    const title = new Sprite.from('title');
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
    const { width, height } = this.config;
    let left = new Sprite.from('1a')
    left.scale.set(0.5, 0.5)
    const contLeft = new Container();
    contLeft.position.x = 10
    contLeft.interactive = true
    contLeft.addChild(left)
    contLeft.width = width * 0.44
    let right = new Sprite.from('1b')
    right.scale.set(0.5, 0.5)
    const contRight = new Container();
    contRight.interactive = true
    contRight.addChild(right)
    contRight.position.x = width / 2 + width / 2 - right
    contRight.width = width * 0.44

    this.centerContenier = new Container();
    // this.centerContenier.anchor.set(0,0)
    this.centerContenier.width = width
    this.centerContenier.height = height
    this.centerContenier.addChild(contLeft)
    this.centerContenier.addChild(contRight)
    this.addChild(this.centerContenier)
  }

  toCorrectCenter() { }

  buildFuterContainer() {
    return
    this.titleContenier = new PIXI.Container();
    const title = new PIXI.Sprite.from('title');
    title.anchor.set(0.5);
    this.titleContenier.addChild((this.title = title));
    this.addChild(this.titleContenier);
  }

  toCorrectFuter() {
    return
    const { width, height } = this.config;
    this.titleContenier.position.set(width / 2, Math.max(height / 7, 50));
    this.titleContenier.children.width = 50;
    console.warn(this.titleContenier.children);

    this.title.scale.set(0.8, 0.8);
  }
}
