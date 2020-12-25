import * as PIXI from 'pixi.js';
import { Page } from './page1';
import { gsap, Bounce } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import Emitter from 'eventemitter3';
const emitter = new Emitter();
export function getEmitter() {
  return emitter;
}
export class Game extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
    });
    this.emitter = getEmitter();

    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    document.body.appendChild(this.view);
    window.addEventListener('resize', this._rebuildStage.bind(this));
    window.addEventListener('orientationchange', this._rebuildStage.bind(this));

    this._startLoading();
    this.emitterControl();
  }

  emitterControl() {
    this.emitter.on('theAnd', this.nextToFinishPage.bind(this));
    this.emitter.on('handPaus', this.handAnimStop.bind(this));
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
    pageNum = 1;
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
    this.loader.add('4a', 'assets/ui/cta_apt2b_cloverdale_sofa_half.png');
    this.loader.add('4b', 'assets/ui/cta_apt2b_melrose_sofa_half.png');
    this.loader.add('4c', 'assets/ui/cta_apt2b_scott_sofa_half.png');
    this.loader.add('4d', 'assets/ui/cta_dwr_bantam73_sofa_half.png');
    this.loader.load(() => {
      this._rebuildStage(2);
    });
  }

  builds(pageNum) {
    this.buildBoard(pageNum);
    this.buildHand();
  }

  buildBoard(pageNum) {
    const config = this.config;
    const board = new Page(config, pageNum);
    this.stage.addChild((this.board = board));
    this.boxPos = board.printCordinats();
  }

  buildHand() {
    const hand = new PIXI.Sprite.from('hand');
    hand.position.set(this.boxPos[0][0], this.boxPos[0][1] + 1000);
    this.stage.addChild(hand);
    // let gsapLine1 = gsap.to(hand, { direction: 4, x: this.boxPos[0].x, y: this.boxPos[0].y });
    this.animation((this.hand = hand));
    // tl.seek(1.5);
    // tl.reverse();
  }

  animation(hand) {
    gsap.to(hand, { pixi: { scaleX: 1, scaleY: 1 }, duration: 0.000001 });
    if (this.boxPos) {
      console.warn(this.boxPos);
    }
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 2 });
    tl.to(hand, {
      pixi: { alpha: 1 },
      x: this.boxPos[1][0],
      y: this.boxPos[1][1] + 1,
      ease: Bounce,
      duration: 1,
      yoyo: true,
    });
    tl.to(hand, { pixi: { scaleX: 0.5, scaleY: 0.5 }, duration: 1 });
    tl.to(hand, { pixi: { scaleX: 1, scaleY: 1 }, duration: 1 });
    tl.to(hand, { x: this.boxPos[0][0], y: this.boxPos[0][1], duration: 1 });
    tl.to(hand, { pixi: { scaleX: 0.5, scaleY: 0.5 }, duration: 1 });
    tl.to(hand, { pixi: { scaleX: 1, scaleY: 1 }, duration: 1 });
    // tl.to(hand, { pixi: { scaleX: 0, scaleY: 0 }, duration: 1 });
    tl.to(hand, { pixi: { alpha: 0, scaleX: 0.5, scaleY: 0.5 }, duration: 0.5 });
    this.tl = tl;
    // tl.resume();

    // setTimeout(() => {
    //   gsap.killTweensOf(hand);
    // }, 3000);
  }
  handAnimStop() {
    console.warn('stop');
    gsap.killTweensOf(this.hand);
    gsap.to(this.hand, { pixi: { alpha: 0 } });
    this.animation(this.hand);
    // timeline.killTweensOf(this.hand);
  }
  nextToFinishPage() {
    this.board.destroy();
    gsap.killTweensOf(this.hand);
    gsap.to(this.hand, { pixi: { alpha: 0 } });
    this.stage.children[0].destroy();
    this.buildLastPage();
  }
  buildLastPage() {
    return;
    const config = this.config;
    const board = new LastPage(config, pageNum);
    this.stage.addChild(board);
  }
}
