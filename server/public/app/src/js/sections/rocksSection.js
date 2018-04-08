'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Rocks = require('../objects3D/RocksObject3D');

var rocksSection = new Section('rocks');

var rocks = new Rocks();
// rocks.el.position.set(0,0,0);
rocksSection.add(rocks.el);

var text = new TextPanel(
  '我曾因执着理想被人轻视，但我不曾停止脚步。  \n  我曾因渴望改变被人嘲笑，但我不曾改变初衷。',
  {
    align: 'center',
    style: '',
    size: 25,
    lineSpacing: 20
  }
);
text.el.position.set(-6, 0, 0);
rocksSection.add(text.el);
text.out('down');

rocks.el.visible = false;

rocksSection.onIn(function () {
  text.in();
  rocks.in();
});

rocksSection.onOut(function (way) {
  text.out('down');
  rocks.out(way);
});

rocksSection.onStart(function () {
  rocks.start();
});

rocksSection.onStop(function () {
  rocks.stop();
});

rocksSection.show = function () {
  rocks.el.visible = true;
};

rocksSection.hide = function () {
  rocks.el.visible = false;
};

module.exports = rocksSection;