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
    sprite2.x += 2 * sprite1.width;
    sprite2.scale.set(-1, 1);
    this.addChild(sprite2);
    this.addChild(sprite1);
    console.warn(sprite1.width);
  }
}
