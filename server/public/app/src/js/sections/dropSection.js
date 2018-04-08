'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Drop = require('../objects3D/DropObject3D');
var Beam = require('../objects3D/BeamObject3D1');
var dropSection = new Section('drop');
var leftBeam = new Beam({ color: '#808080', delay: 0.2 });
leftBeam.el.position.set(10, -25, -10);
dropSection.add(leftBeam.el);

var middleBeam = new Beam({ color: '#ffffff', width: 4, cubeSize: 2, delay: 0.1 });
middleBeam.el.position.y = -22;
middleBeam.el.position.x = 0;
middleBeam.el.position.z = -30;
dropSection.add(middleBeam.el);

var rightBeam = new Beam({ color: '#4c4c4c', delay: 0.4 });
rightBeam.el.position.set(8, -14, -40);
dropSection.add(rightBeam.el);



var drop = new Drop({ amplitude: 4 });
// drop.el.rotation.x = -1.2;
drop.el.position.x = -7;
drop.el.position.y = -13;
// drop.el.rotateZ(-Math.PI/2);
drop.el.rotateY(Math.PI/2);
// drop.el.scale.x = 1;
// drop.el.scale.y = 1;
// drop.el.scale.z = 1;
dropSection.add(drop.el);

var text = new TextPanel(
  '只要你敢想，我的团队就敢去实现。\n 让你的品牌成为福州的名片。',
  {
    align: 'center',
    style: '',
    size: 30,
    lineSpacing: 20
  }
);
text.el.position.set(0, 8, 0);
dropSection.add(text.el);

drop.el.visible = false;

dropSection.onIn(function () {
  drop.in();
  text.in();
  leftBeam.in();
  middleBeam.in();
  rightBeam.in();
});

dropSection.onOut(function (way) {
  drop.out(way);
  text.out(way);
  leftBeam.out(way);
  middleBeam.out(way);
  rightBeam.out(way);
});

dropSection.onStart(function () {
  drop.start();
  leftBeam.start();
  middleBeam.start();
  rightBeam.start();

  leftBeam.el.visible = true;
  middleBeam.el.visible = true;
  rightBeam.el.visible = true;

  drop.el.visible = true;
});

dropSection.onStop(function () {
  drop.stop();
  leftBeam.stop();
  middleBeam.stop();
  rightBeam.stop();

  leftBeam.el.visible = false;
  middleBeam.el.visible = false;
  rightBeam.el.visible = false;

  drop.el.visible = false;
});

module.exports = dropSection;