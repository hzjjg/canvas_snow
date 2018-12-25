!function(n){var i={};function a(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=n,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=2)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=function(){function t(t){this.defaultOption={container:null,stopWhenVisibilityChange:!0,quantity:5,speed:5},this.status="stop",this.flakeImg=new Image,this.blurFlakeImg=new Image,this.circleFlakeImg=new Image,this.flakes=[],this.options=Object.assign(this.defaultOption,t),this.container=t.container,this.quantity=Math.max(1,Math.min(this.options.quantity,100)),this.speed=Math.max(1,Math.min(this.options.speed,10)),this.init()}return t.prototype.start=function(){var t=this;"start"!==this.status&&(this.status="start",this.loadImages([i.default.flakeImage,i.default.blurFlakeImage,i.default.circleFlakeImage]).then(function(){t.startGenFlake(),t.startRender(),t.startGc()}))},t.prototype.stop=function(){"stop"!==this.status&&(clearInterval(this.genFlakeTimmer),clearInterval(this.gcTimmer),cancelAnimationFrame(this.renderAnimationFrame),this.status="stop")},t.prototype.changeSpeed=function(t){isNaN(t)||(this.speed=Math.max(1,Math.min(t,10)))},t.prototype.changeQuantity=function(t){isNaN(t)||(this.stop(),this.quantity=Math.max(1,Math.min(t,100)),this.start())},t.prototype.genFlake=function(){var t=this.randomRange(10,40);return{type:this.randomArray(["flower","flower","circle","blurCircle"]),x:this.randomRange(0,this.canvas.width),y:-t,velocity:{x:this.randomRange(-2,2)*(this.speed/50),y:this.randomRange(5,15)*(this.speed/50)},size:t,alpha:this.randomRange(8,10)/10}},t.prototype.randomArray=function(t){return t[Math.floor(Math.random()*t.length+1)-1]},t.prototype.randomRange=function(t,e){var n=e-t,i=Math.random();return t+Math.round(i*n)},t.prototype.startGenFlake=function(){var t=this;this.genFlakeTimmer=setInterval(function(){t.flakes.push(t.genFlake())},2e3/this.quantity)},t.prototype.startRender=function(){var t=this;this.renderAnimationFrame=requestAnimationFrame(function(){t.clearCtx(),t.updateFlakes(),t.renderFlakes(),t.startRender()})},t.prototype.clearCtx=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.startGc=function(){var e=this;this.gcTimmer=setInterval(function(){e.flakes.forEach(function(t){(t.x>=e.canvas.width||t.y>=e.canvas.height)&&e.flakes.splice(e.flakes.indexOf(t),1)})},3e3)},t.prototype.updateFlakes=function(){this.flakes.forEach(function(t){t.x+=t.velocity.x,t.y+=t.velocity.y})},t.prototype.renderFlakes=function(){var e=this;this.flakes.forEach(function(t){e.renderFlake(t)})},t.prototype.renderFlake=function(t){switch(t.type){case"flower":this.renderFlowerFlake(t);break;case"circle":this.renderCircleFlake(t);break;case"blurCircle":this.renderBlurCircleFlake(t)}},t.prototype.renderFlowerFlake=function(t){this.ctx.globalAlpha=t.alpha||1,this.ctx.drawImage(this.flakeImg,t.x,t.y,t.size,t.size)},t.prototype.renderCircleFlake=function(t){this.ctx.globalAlpha=t.alpha||1;var e=t.size/3;this.ctx.drawImage(this.circleFlakeImg,t.x,t.y,e,e)},t.prototype.renderBlurCircleFlake=function(t){this.ctx.globalAlpha=t.alpha||1,this.ctx.drawImage(this.blurFlakeImg,t.x,t.y,t.size,t.size)},t.prototype.init=function(){this.flakeImg.src=i.default.flakeImage,this.blurFlakeImg.src=i.default.blurFlakeImage,this.circleFlakeImg.src=i.default.circleFlakeImage,this.options.stopWhenVisibilityChange&&this.bindPageVisibilitychangeStopSnow(),this.initCanvas()},t.prototype.bindPageVisibilitychangeStopSnow=function(){var t=this;document.addEventListener("visibilitychange",function(){"start"===t.status?t.stop():t.start()})},t.prototype.initCanvas=function(){var t=this.canvas=document.createElement("canvas");this.ctx=t.getContext("2d"),t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.pointerEvents="none",t.style.zIndex="999",t.className=this.options.canvasClass,t.setAttribute("width",this.container.offsetWidth.toString()),t.setAttribute("height",this.container.offsetHeight.toString()),"absolute"!==this.container.style.position&&(this.container.style.position="relative"),this.container.appendChild(t)},t.prototype.loadImages=function(i){var a=0;return new Promise(function(n){(i||[]).forEach(function(t){var e=new Image;e.src=t,e.onload=function(){++a===i.length&&n()},e.onerror=function(){++a===i.length&&n()}})})},t}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={flakeImage:"data:image/png;base64,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\n72I2vV1GT9lMAAAAASUVORK5CYII=",blurFlakeImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABnCAMAAAC+eQU5AAAAzFBMVEUQZqYTaKeNtNSpxt6L\ntNPR4e7e6vPl7vapx9/r8vfM3uy0zuPo8Pfv9fnw9vro8Pbp8Pb09/vu9Pnx9vrw9fn0+PvT4u76+/34+v37/f76/P72+fzy9/r+/v/+/v/9/v74+/3H2u\nr6/P71+Pvz9/vp8ffV5O/9/v76+/37/P71+Pv+/v/9/v72+fv+/v/+/v/7/f77/f7+/v/9/v79/v76/P37/f7+/v/9/v79/v79/v78/v78/v77/f77/f7/\n///+/v/+/v/7/f7+/v/2kroKAAAARHRSTlMBBAMGCggLDgwTExAeFiobIDsiLScwG1JCbVZGM8S9kUkWWj84JhecYl01saBOzap7dbekjHFp0paJhYF+ZU7\nYyK541OqaioMAAAUrSURBVGje7Jdrc5pAFIZrII1BlLsi0IqieK8YLxVF2pj//5/6nl1S2k47I5s60w99hpmEmcxzDi+H3c27//yz3DEkSboveM8p7iRwxx\nHXS4X3Add3cHePMtJ94X9T6+R9BM2CR4KK8EdgflH9PdeTXCtoAvh5Tm/VIxQ0C7eqqjpDVVECBSgjQf2PyTC3btp2i2PbI9NEicfXfET1lAzsqmmadstxn\nBkROA4qmLrK/Oif+XFV16P3ZlNF21YwM4woconIGAaOhUfQmihQ+Kvr0TuSUfWR5cyMyA3DvEPky9BHicBqISG8AcRzJ6CXeDLmqBUMDRdubzCd0jXw8jB0\n4bdNtfmoIH+B7mlmeDJO5Pq5N52c911ivz9PvU7uR0P4kQ/Lv7qeJlJTTSswQsjP3fUlORFZst6hQid0h46tq03lQUCP5nnwztDNvQHs2emYbkF6zC677nmQ\n+8bMMnUN+srDyaZGeVRNe2aE3mDSXSeQ98Chtz2eknV36i1dw0H8mB4xPd6rbRluPp3sL1naO4wXm81msRgftsdsvZ96fjRr2TpPR6qmJzvpHTfsIJnT9rDY\nrObE82ox7qXZjsWD6cTL5cNTWa/Z1szPB8gd9tX86SPxNH/ejA9p0p10wiiwRpqwXm05w7AzQe7c/oHx8Qn+3mm9R/ozx9Yw+u9F9E3Vcoyld76c0vFmDvkn\n4iv8q83hmHQHHX/otPBpvUGfD87JcTteofdPnwn4qf002U2hD0T1ShP6wOgM9tmxt1g9ffj6+eULgP/jfDXeZruJF4rrsSLoVhBx/eb5Cc1/IV4+k36xPa2h\nx5cF/YOIPv5Rz7r/wrvn+gx6X1hff4hjyh76pAjn0wtRhJNmr9nHIpNTLycnOW0Xf3q1DtPXxfSY+6U3WWfpAeHDXwzmfLM4HC/dQY65b2nV9TVJgj7WRtYs\nzKdYE3oYfPj5V4XkD9use8ZX69BXK6ZXHttszfH2uyTtjVfoH3B774g1bcnWnFh5qFfT12p8QY6xz0bucrLfZfBvVs9sRdugd3yzGEu2YmJBJvv1+lqpN1tDw\n8detUuOtCAvFpvFmNbLC76pDl/vi/W4VrvWXupV3Z5BT9vJKYWfOBy2xXaC3RanEaVR6GsV9Ai/0VA0bIazaNmhzRB7YY/Ypqdkt594SD5omXpbadShrxHX2s\nkv1+uNuI2TQhD5YWcw2Xd3lyS5XNbYaKcD2sktW9fIXkfzFfV3TN+PNXNkGXi98J9RAHTZQWTpoveR3o6Ver0uQ8+4yl7qlX5bN4tjFE5REwZaX6J3bFS6Fvc\nbsMs1UEEPJFmWKf64rdstOgX6frhkhD6dMukM1e4jGvwdki+4zl76eT4tJxgiIp9wo2g4C2gkkUyD6WuV9YD0yEdpqyoOJFaACsSQzsf4nFT0juYRPNdzrtVL\ndPF8+n1MkD4yR6//PegqOu8zN4+m5OrmYZegZw/Qb8Ov6yPCNDGOZKfciZqIHsjQl/62pulARecAvRd2iR605Hq9hHQAAqICFBER4zeFp87t17Zf2ssC0msBX\nqJQAzaQoAZE9QDdFRGV4K4cdwG9GLfXg7fo5ZvoZX79fCeiF+5fXF8a5Ztk//to5L+mL8W3GEy5QvxcJJ4OfghkI5COkF48HnH9L4MjZgc3zQb6q5BvoudW8W\nxAhb5voBe0l/y7+m/tzKERwDAMALHuP3XfF1BaoiBrAD1/0D5yD91D+9A9dA/dQ/fQPXQP3UPzYffQfNB8yPxw9+fEa6211j0v5E3G6+rvUwQAAAAASUVORK5CYII=",circleFlakeImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAHlBMVEUAAAD///////////////\n////////////////////8kfJuVAAAACXRSTlMAROXZvaKHZOtnHBacAAAAY0lEQVQI12MAAjGnSW4CDGAgOhMIpoI57JYzQcAcxK6YCQYzChgYGIHCYGDIwMAKo\nsE6GBgkZ8KAAEMmnJ3A4AlnOzBowtkKDDPhYAKyOLJ6ZHNQzEfYi+oehDvR3I/wF7J/AbIBYuO36rHnAAAAAElFTkSuQmCC"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(3),new(n(0).default)({container:document.body}).start()},function(t,e,n){}]);