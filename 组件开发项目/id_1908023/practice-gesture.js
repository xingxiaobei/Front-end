class Carousel {
  constructor(container, data, time) {
    this._container = container;
    this._container.classList.add('container');
    this._data = data;
    this._time = time
  }

  render() {
    for (let d of data) {
      let img = document.createElement('img');
      img.src = d;
      this._container.appendChild(img);
    }
    let position = 0;
    const children = Array.prototype.slice.call(this._container.children);
    // console.log(children);

    const nextFrame = () => {
      // 获取当前帧
      let current = children[position];
      // 计算下一帧的位置
      let nextPosition = position + 1;
      nextPosition = nextPosition % children.length;
      // 获取下一帧
      let next = children[nextPosition];

      // 把下一帧摆放到正确的位置
      next.style.transition = 'ease 0s'; // 清除动画
      next.style.transform = `translate(${100 - 100 * nextPosition}%)`;

      setTimeout(() => {
        // 把当前帧移出视口
        current.style.transition = ''; // 恢复动画
        current.style.transform = `translate(${-100 - 100 * position}%)`;
        // 把下一帧移入视口
        next.style.transition = ''; // 恢复动画
        next.style.transform = `translate(${-100 * nextPosition}%)`;
        position = nextPosition;
      })


      // position++;
      // position = position % children.length;
      // for (let child of children) {
      //   child.style.transform = `translate(${-100 * position}%)`;
      // }
      setTimeout(nextFrame, this._time);
    }
    // setTimeout(nextFrame, this._time);

    this._container.addEventListener('mousedown', e => e.preventDefault());

    enableGesture(this._container);
    let x = 0;
    this._container.addEventListener('pan', event => {
      if (event.isVertical) return;

      for (let child of children) {
        child.style.transition = 'ease 0s';
        child.style.transform = `translateX(${event.dx + x}px)`;
      }
    })
    this._container.addEventListener('panend', event => {
      if (event.isVertical) return;

      if (event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)) {
        if (event.dx > 0) {
          position = position - 1;
        }
        if (event.dx < 0) {
          position = position + 1;
        }
      } else {
        position = -(Math.round((x + event.dx) / 600));
      }
      
      position = Math.max(0, Math.min(position, children.length - 1));
      for (let child of children) {
        child.style.transition = '';
        child.style.transform = `translateX(${-position * 600}px)`;
      }
      x = -position * 600;
    })



    // let startX, startTransform;
    // let start = e => {
    //   e.preventDefault();
    //   startX = e.clientX;
    //   startTransform = -position * 600;
    //   this._container.addEventListener('mousemove', move);
    //   this._container.addEventListener('mouseup', end);
    // }

    // let move = e => {
    //   for (let child of children) {
    //     child.style.transition = 'ease 0s';
    //     child.style.transform = `translate(${startTransform + e.clientX - startX}px)`;
    //   }
    // }

    // let end = e => {
    //   this._container.removeEventListener('mousemove', move);
    //   this._container.removeEventListener('mouseup', end);

    //   position = -(Math.round((startTransform + e.clientX - startX) / 600));

    //   // console.log(position);

    //   position = Math.max(0, Math.min(position, children.length - 1));

    //   // 回弹和摆放到正确的位置
    //   for (let child of children) {
    //     child.style.transition = '';
    //     child.style.transform = `translate(${-position * 600}px)`;
    //   }

    // }

    // this._container.addEventListener('mousedown', start);

  }
}

let data = [
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MB8nW70tKnB.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MB8nW78nMR-.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MBOqW7OqKnD.jpg",
  "http://pix1.tvzhe.com/stills/drama/84/135/b/MBOqW7OqL7D.jpg",
];

new Carousel(document.getElementById('container'), data, 3000).render();