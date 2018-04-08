'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Face = require('../objects3D/FaceHpObject3D1');
var Strips = require('../objects3D/StripsObject3D');

var faceSection = new Section('face1');

var text = new TextPanel(
  '"去找他吧，孩子，他能解决你的阿喀琉斯之踵。"',
  {
    align: 'center',
    style: '',
    size: 13,
    lineSpacing: 40
  }
);
text.el.position.set(-5, 0, 20);
text.el.rotation.y = -0.2;
faceSection.add(text.el);

var face = new Face();
face.el.position.y = 0;
face.el.rotation.x = -0.1;
face.el.rotation.z = 0.25;
faceSection.add(face.el);

var strips = new Strips({
  count: 10,
  colors: ['#444444', '#333333', '#222222'],
  rangeY: [-60, 60]
});
faceSection.add(strips.el);

face.el.visible = false;
strips.el.visible = false;

faceSection.onIn(function () {
  face.in();
  strips.in();
  text.in();
});

faceSection.onOut(function (way) {
  face.out(way);
  strips.out();
  text.out();
});

faceSection.onStart(function () {
  face.start();

  face.el.visible = true;
  strips.el.visible = true;
});

faceSection.onStop(function () {
  face.stop();

  face.el.visible = false;
  strips.el.visible = false;
});

module.exports = faceSection;