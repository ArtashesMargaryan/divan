import * as PIXI from 'pixi.js';

export class SofaComponent extends PIXI.Container {
  constructor(frame, anchor) {
    super();
    this._build(frame, anchor);
    this.position.set(200, 200);
  }

  _build(frame, anchor) {
    const sprite1 = PIXI.Sprite.from(frame);
    const sprite2 = PIXI.Sprite.from(frame);
    sprite2.anchor.set(anchor[0], anchor[1]);
    sprite1.anchor.set(anchor[2], anchor[3]);
    sprite2.x += sprite1.width;
    sprite2.scale.set(-1, 1);
    this.addChild(sprite1);
    this.addChild(sprite2);
  }

  editPosition(x, y) {
    this.position.set(x, y);
  }
}
