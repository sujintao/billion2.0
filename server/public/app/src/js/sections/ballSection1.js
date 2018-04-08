'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Ball = require('../objects3D/BallObject3D');

var ballSection1 = new Section('ball1');

var ball = new Ball();
ball.el.scale.x = 0.6;
ball.el.scale.y = 0.6;
ball.el.scale.z = 0.6;
// ball.el.rotation.x = 2;
ballSection1.add(ball.el);

var text = new TextPanel(
  '我曾因执着理想被人轻视，但我不曾停止脚步。  \n  我曾因渴望改变被人嘲笑，但我不曾改变初衷。',
  {
    align: 'center',
    style: '',
    size: 20,
    lineSpacing: 10
  }
);
text.el.position.set(-6, 0, 10);
// text.el.rotation.y = -0.2;
ballSection1.add(text.el);

ball.el.visible = false;

ballSection1.onIn(function () {
  ball.in();
  text.in();
});

ballSection1.onOut(function (way) {
  text.out(way);

  if (way === 'up') {
    ball.out();
  }
});

ballSection1.onStart(function () {
  ball.start();

  ball.el.visible = true;
  //grid.el.visible = true;
});

ballSection1.onStop(function () {
  ball.stop();
  //grid.stop();

  ball.el.visible = false;
  //grid.el.visible = false;
});

module.exports = ballSection1;