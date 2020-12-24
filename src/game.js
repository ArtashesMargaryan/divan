import * as PIXI from 'pixi.js';
import { Page } from './page1';
import { gsap } from 'gsap';

export class Game extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
    });
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    this.config = {
      width: this.pageWidth,
      height: this.pageHeight,
      color: 0xff11ff,
    };
    this._loader();
    document.body.appendChild(this.view);
    // this.builds();
  }
  _loader() {
    this.loader.add('title', 'assets/ui/logo.png');
    this.loader.add('like', 'assets/ui/icon_like.png');
    this.loader.add('hand', 'assets/ui/hand.png');
    this.loader.add('1a', 'assets/furniture/1a.png');
    this.loader.add('1b', 'assets/furniture/1b.png');
    this.loader.add('2a', 'assets/furniture/2a.png');
    this.loader.add('2b', 'assets/furniture/2b.png');
    this.loader.add('3a', 'assets/furniture/3a.png');
    this.loader.add('3b', 'assets/furniture/3b.png');
    this.loader.load(() => {
      this.builds();
    });
  }

  builds() {
    this.buildBoard();
    this.buildHand();
    this.buildTitle();
  }

  buildBoard() {
    const config = this.config;
    const board = new Page(config);
    this.stage.addChild(board);
    this.boxPos = board.printCordinats();
  }
  buildHand() {
    const hand = new PIXI.Sprite.from('hand');
    hand.position.set(this.boxPos[0].x, this.boxPos[0].y + 1000);
    this.stage.addChild((this.hand = hand));
  }

  buildTitle() {}
}
