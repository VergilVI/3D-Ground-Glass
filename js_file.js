function addMousePosFunc(ele) {
  ele.onmousemove = mousePos.bind(ele);
  for (let item of ele.children) {
    item.onmousemove = mousePos.bind(ele);
  }
}

function delMousePosFunc(ele) {
  ele.onmousemove = null;
  ele.style.transform = null;
  ele.style.boxShadow = null;
  ele.style.backgroundImage = null;
}

function mousePos() {
  let posX = 0,
    posY = 0; //鼠标相对元素的坐标
  let event = window.event;
  let ele = event.target; //触发元素的对象
  if (ele != this) return; //阻止子元素触发方法
  let eleWidth = ele.offsetWidth,
    eleHeight = ele.offsetHeight; //元素实际的宽和高

    
  //获取鼠标相对于当前元素的坐标位置
  if (event.offsetX || event.offsetY) {
    posX = event.offsetX;
    posY = event.offsetY;
  } else if (event.pageX || event.pageY) {
    posX = event.pageX;
    posY = event.pageY;
  } else if (event.clientX || event.clientY) {
    posX = event.clientX + document.documentElement.scrollLeft + document.boday.scrollLeft;
    posY = event.clientY + document.documentElement.scrollTop + document.boday.scrollTop;
  }


  // 设计元素跟随鼠标作3d旋转
  let transY = (posY / eleHeight) * 2 - 1;
  let transX = (posX / eleWidth) * -2 + 1;
  ele.style.transform = `rotateX(${transY * 25}deg) rotateY(${transX * 25}deg)`;


  // 设计元素阴影跟随鼠标显现
  let shadowY;
  if (posY < eleHeight / 2) shadowY = 2 - (posY * 2) / eleHeight;
  else shadowY = -((posY * 2) / eleHeight);

  let shadowX = 2 - (posX / eleWidth) * 4;
  if (posX < eleWidth / 2) shadowX = 2 - (posX * 2) / eleWidth;
  else shadowX = -((posX * 2) / eleWidth);
  ele.style.boxShadow = `${shadowX}px ${shadowY}px 0px -1px rgba(255,255,255,.5) inset`;

  
  //设计元素跟随鼠标打光的效果
  let percentX = (posX / eleWidth) * 100;
  let percentY = (2.3 - posY / eleHeight) * 100;
  ele.style.backgroundImage = `radial-gradient(circle farthest-side at ${percentX}% ${percentY}%, rgba(255, 255, 255, .5), transparent 80%)`;
}
