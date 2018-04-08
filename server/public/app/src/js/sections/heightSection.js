'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D1');
var HeightMap = require('../objects3D/HeightMapObject3D');

var heightSection = new Section('height');

var heightMap = new HeightMap({
  horizontal: true,
  vertical: false,
  plane: false,
  points: false,
  maps: [
    { name: 'A', url: './app/public/img/WechatIMG1.png' },
    { name: 'B', url: './app/public/img/WechatIMG2.png' },
    // { name: 'O', url: './app/public/img/heightMap-O.jpg' }
  ]
});
heightMap.el.position.z = -30;
heightMap.el.position.y = 10;
heightMap.el.rotation.y = 0.6;
heightSection.add(heightMap.el);

var text = new TextPanel(
  '有些事总要有人做 \n 而我Koby Gao \n 正在做这件事',
  {
    align: 'center',
    style: '',
    size: 25,
    lineSpacing: 10,
  }
);
text.el.position.set(0, -10, 0);
heightSection.add(text.el);

heightMap.el.visible = false;

heightSection.onIn(function () {
  text.in();
});

heightSection.onOut(function (way) {
  text.out(way);
});

heightSection.onStart(function () {
  if (!heightMap.ready) {
    return false;
  }

  heightMap.start();
});

heightSection.onStop(function () {
  if (!heightMap.ready) {
    return false;
  }

  heightMap.stop();
});

heightSection.show = function () {
  heightMap.el.visible = true;
};

heightSection.hide = function () {
  heightMap.el.visible = false;
};

module.exports = heightSection;