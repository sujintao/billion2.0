'use strict';

var THREE = require('three');

var Section = require('../classes/SectionClass');

var FlowField = require('../objects3D/FlowFieldObject3D');
var TextPanel = require('../objects3D/TextPanelObject3D');

var flowSection = new Section('flow');

var points = [
  new THREE.Vector3(0, 30, 20),
  new THREE.Vector3(20, 0, -10),
  new THREE.Vector3(-20, -100, 0)
];

var field = new FlowField(points, {
  subsAmplitude: 30,
  subsNumber: 50
});
flowSection.add(field.el);

var text = new TextPanel(
  '卓越的品牌可以 \n 改变人们对城市刻板的认知 \n 让门可罗雀成为门庭若市 \n 让城市成为时代的标志',
  {
    align: 'center',
    style: '',
    size: 35,
    lineSpacing: 30
  }
);
text.el.position.z = -10;
text.el.rotation.y = 0.4;
flowSection.add(text.el);

field.el.visible = false;

var fieldIn = false;

flowSection.fieldIn = function () {
  if (fieldIn) {
    return false;
  }

  fieldIn = true;

  field.in();
};

flowSection.onIn(function () {
  text.in();
});

flowSection.onOut(function (way) {
  text.out(way);
});

flowSection.onStart(function () {
  field.start();

  field.el.visible = true;
});

flowSection.onStop(function () {
  field.stop();

  field.el.visible = false;
});

module.exports = flowSection;