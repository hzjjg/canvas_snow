const flakeUrl = '//beauty-public.zone1.meitudata.com/5c10d9de46b273fnz2y6p48138.jpg';
const blurFlakeUrl = '//beauty-public.zone1.meitudata.com/5c15ff3406923pnwqslhgb8334.jpg';
const circleFlakeUrl = '//beauty-public.zone1.meitudata.com/5c160b8d08104p1mwfp3yg4354.jpg';

/**
 * 下雪效果
 */
export class Snow {

   private container: HTMLElement;

   private config: SnowConfig;

   private canvas: HTMLCanvasElement;

   private ctx: CanvasRenderingContext2D;

   private status: 'start' | 'stop' = 'stop';

   private flakeImg = new Image();
   private blurFlakeImg = new Image();
   private circleFlakeImg = new Image();

   private flakes: SnowFlake[] = [];

   private genFlakeTimmer: any;
   private gcTimmer: any;
   private renderAnimationFrame: number;

   constructor(config: SnowConfig) {
      this.config = config;
      this.container = config.container;
      this.init();
   }

   public start() {
      if (this.status === 'start') return;

      this.status = 'start';
      this.loadImages([flakeUrl, blurFlakeUrl, circleFlakeUrl]).then(() => {
         this.startGenFlake();
         this.startRender();
         this.startGc();
      });
   }

   public stop() {
      if (this.status === 'stop') return;

      clearInterval(this.genFlakeTimmer);
      clearInterval(this.gcTimmer);
      cancelAnimationFrame(this.renderAnimationFrame);

      this.status = 'stop';
   }

   private genFlake(): SnowFlake {

      const size = this.randomRange(10, 40);

      return {
         type: <any> this.randomArray(['flower', 'flower', 'circle', 'blurCircle']),
         x: this.randomRange(0, this.canvas.width),
         y: -size,
         velocity: {
            x: this.randomRange(-2, 2) / 10,
            y: this.randomRange(5, 15) / 10,
         },
         size,
         alpha: this.randomRange(8, 10) / 10,
      };
   }

   private randomArray<T>(items: T[]) {
      const index = Math.floor(Math.random() * items.length + 1) - 1;
      return items[index];
   }

   private randomRange(min: number, max: number) {
      const Range = max - min;
      const Rand = Math.random();
      const num = min + Math.round(Rand * Range);
      return num;
   }

   private startGenFlake() {
      // TODO
      this.genFlakeTimmer = setInterval(() => {
         this.flakes.push(this.genFlake());
      }, 500);
   }

   private startRender() {
      this.renderAnimationFrame = requestAnimationFrame(() => {
         this.clearCtx();
         this.updateFlakes();

         this.renderFlakes();
         this.startRender();
      });
   }

   private clearCtx() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   /**
    * 定时删除超出屏幕的雪花
    */
   private startGc() {
      this.gcTimmer = setInterval(() => {
         this.flakes.forEach((flake) => {
            if (flake.x >= this.canvas.width || flake.y >= this.canvas.height) {
               this.flakes.splice(this.flakes.indexOf(flake), 1);
            }
         });
      }, 3000);
   }

   private updateFlakes() {
      this.flakes.forEach((flake) => {
         // 更新位置
         flake.x += flake.velocity.x;
         flake.y += flake.velocity.y;
      });
   }

   private renderFlakes() {
      this.flakes.forEach(flake => {
         this.renderFlake(flake);
      });
   }

   private renderFlake(flake: SnowFlake) {

      switch (flake.type) {
         case 'flower':
            this.renderFlowerFlake(flake);
            break;
         case 'circle':
            this.renderCircleFlake(flake);
            break;
         case 'blurCircle':
            this.renderBlurCircleFlake(flake);
            break;
      }

   }

   private renderFlowerFlake(flake: SnowFlake) {
      this.ctx.globalAlpha = flake.alpha || 1;
      this.ctx.drawImage(this.flakeImg, flake.x, flake.y, flake.size, flake.size);
   }

   private renderCircleFlake(flake: SnowFlake) {
      this.ctx.globalAlpha = flake.alpha || 1;
      const size = flake.size / 3;
      this.ctx.drawImage(this.circleFlakeImg, flake.x, flake.y, size, size);
   }

   private renderBlurCircleFlake(flake: SnowFlake) {
      this.ctx.globalAlpha = flake.alpha || 1;
      this.ctx.drawImage(this.blurFlakeImg, flake.x, flake.y, flake.size, flake.size);
   }

   private init() {
      this.flakeImg.src = flakeUrl;
      this.blurFlakeImg.src = blurFlakeUrl;
      this.circleFlakeImg.src = circleFlakeUrl;

      this.initCanvas();

      document.addEventListener('visibilitychange', () => {
         if (this.status === 'start'){
            this.stop();
         }else{
            this.start();
         }
       });
   }

   private initCanvas() {
      const canvas = this.canvas = document.createElement('canvas');
      this.ctx = canvas.getContext('2d');

      canvas.style.position = 'absolute';
      canvas.style.left = '0';
      canvas.style.top = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '999';
      canvas.className = this.config.canvasClass;
      canvas.setAttribute('width', this.container.offsetWidth.toString());
      canvas.setAttribute('height', this.container.offsetHeight.toString());

      if (this.container.style.position !== 'absolute') {
         this.container.style.position = 'relative';
      }

      this.container.appendChild(canvas);
   }

   private loadImages(images: string[]) {
      let count = 0;
      return new Promise(resolve => {
         (images || []).forEach(src => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
               count++;
               if (count === images.length) resolve();
            };
            image.onerror = () => {
               count++;
               if (count === images.length) resolve();
            };
         });
      });
   }

}

interface SnowConfig {
   container: any;
   canvasClass?: string;
}

interface SnowFlake {
   type: 'flower' | 'circle' | 'blurCircle';
   x: number;
   y: number;
   size: number;
   alpha?: number;
   velocity: {
      x: number,
      y: number,
   };
}