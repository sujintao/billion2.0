'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D1');
var Ball = require('../objects3D/BallObject3D1');

var ballSection = new Section('ball');

var ball = new Ball();
//ball.el.rotation.z = 2;
ballSection.add(ball.el);

var text = new TextPanel(
  '我是Koby Gao \n 我现在在福州 \n 一个玩品牌的老男人',
  {
    align: 'center',
    style: '',
    size: 20,
    lineSpacing: 10
  }
);
text.el.position.set(-1, -7, 10);
// text.el.rotation.y = -0.2;
ballSection.add(text.el);

ball.el.visible = false;

ballSection.onIn(function () {
  ball.in();
  text.in();
});

ballSection.onOut(function (way) {
  text.out(way);

  if (way === 'up') {
    ball.out();
  }
});

ballSection.onStart(function () {
  ball.start();

  ball.el.visible = true;
  //grid.el.visible = true;
});

ballSection.onStop(function () {
  ball.stop();
  //grid.stop();

  ball.el.visible = false;
  //grid.el.visible = false;
});

module.exports = ballSection;