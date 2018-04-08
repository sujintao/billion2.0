'use strict';

var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var Galaxy = require('../objects3D/GalaxyObject3D');

var galaxySection = new Section('galaxy');

var galaxy = new Galaxy();
galaxy.el.rotation.x = -1;
galaxySection.add(galaxy.el);
galaxy.el.scale.x = 0.6;
galaxy.el.scale.y = 0.6;
galaxy.el.scale.z = 0.6;

galaxy.el.visible = false;

var text = new TextPanel(
  'You city is your world. \n 你的城市就是你的世界。',
  {
    align: 'center',
    style: '',
    size: 35,
    lineSpacing: 30
  }
);
text.el.position.set(0, 0, 5);
galaxySection.add(text.el);

galaxySection.onIn(function (way) {
  galaxy.in(way);
  text.in();
});

galaxySection.onOut(function (way) {
  galaxy.out(way);
  text.out(way);
});

galaxySection.onStart(function () {
  galaxy.start();

  galaxy.el.visible = true;
});

galaxySection.onStop(function () {
  galaxy.stop();

  galaxy.el.visible = false;
});

module.exports = galaxySection;