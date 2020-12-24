import * as PIXI from 'pixi.js';
import { Page } from './page1';
import { gsap, Bounce } from 'gsap';

export class Game extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
    });

    document.body.appendChild(this.view);
    window.addEventListener('resize', this._rebuildStage.bind(this));
    window.addEventListener('orientationchange', this._rebuildStage.bind(this));

    this._startLoading();
  }

  _rebuildStage(pageNum = 1) {
    this.stage.destroy();
    this.stage = new PIXI.Container();
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    this.config = {
      width: this.pageWidth,
      height: this.pageHeight,
      color: 0xff11ff,
    };
    this.renderer.resize(window.innerWidth, window.innerHeight);
    this.builds(pageNum);
  }

  _startLoading() {
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
      this._rebuildStage();
    });
  }

  builds(pageNum) {
    this.buildBoard(pageNum);
    this.buildHand();
  }

  buildBoard(pageNum) {
    const config = this.config;
    const board = new Page(config, pageNum);
    this.stage.addChild(board);
    this.boxPos = board.printCordinats();
  }

  buildHand() {
    const hand = new PIXI.Sprite.from('hand');
    hand.position.set(this.boxPos[0].x, this.boxPos[0].y + 1000);
    this.stage.addChild((this.hand = hand));
    // let gsapLine1 = gsap.to(hand, { direction: 4, x: this.boxPos[0].x, y: this.boxPos[0].y });
    this.animation(hand);
    // tl.seek(1.5);
    // tl.reverse();
  }
  animation(hand) {
    const tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
    tl.to(hand, { x: this.boxPos[0].x, y: this.boxPos[0].y, duration: 2 });
    tl.to(hand, { x: this.boxPos[1].x, y: this.boxPos[1].y + 1, duration: 1 });
    tl.to(hand, { opacity: 0, duration: 1 });

    // then we can control the whole thing easily...

    tl.resume();
  }
}