'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Wave = require('../objects3D/WaveObject3D');

var waveSection = new Section('wave');

var wave = new Wave();
waveSection.add(wave.el);

var text = new TextPanel(
  '你不是早就习惯了吗，过去到现在你不都是如此吗？ \n 不，我受够了，我也想成为受关注的那一个。',
  {
    align: 'center',
    style: '',
    size: 30,
    lineSpacing: 40
  }
);
text.el.position.set = (3,5,10);
text.el.rotation.x = 0.2;
// wave.el.rotateZ(-Math/PI);
waveSection.add(text.el);

wave.el.visible = false;

waveSection.onIn(function (way) {
  text.in();
  wave.in(way);
});

waveSection.onOut(function (way) {
  text.out(way);
  wave.out(way);
});

waveSection.onStart(function () {
  wave.start();

  wave.el.visible = true;
});

waveSection.onStop(function () {
  wave.stop();

  wave.el.visible = false;
});

module.exports = waveSection;