import * as PIXI from 'pixi.js';
import { Page } from './page1';
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
    this._viewControler();
    document.body.appendChild(this.view);
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
      this._viewControler();
    });
  }

  _viewControler() {
    if (this.pageWidth >= this.pageWidth) {
      this.builds('album');
    } else {
      this.builds('book');
    }
  }
  builds(type) {
    const title = new Page(this.config);
    this.stage.addChild(title);
    this.buildTitle();
  }

  buildTitle() {}
}
new Game();
