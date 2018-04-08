'use strict';

var TweenLite = require('tweenlite');

var Section = require('../classes/SectionClass');
var TextPanel = require('../objects3D/TextPanelObject3D1');

var City = require('../objects3D/CityObject3D');

var citySection = new Section('city');

var city = new City();
city.addGroup({
  name: 'shanghai',
  objs: {
    ground: './app/public/3D/shanghai-grounds.js',
    buildings: './app/public/3D/shanghai-buildings.js',
    towers: './app/public/3D/shanghai-towers.js'
  },
  outline: {
    ground: {
      offset: 0.2,
      solid: true
    }
  }
});
var text = new TextPanel(
  '你是一个骄傲的人 \n 不该低垂着头 \n  福州是一座骄傲的城 \n  不该籍籍无名',
  {
    align: 'center',
    style: '',
    size: 18,
    lineSpacing: 14
  }
);
text.el.position.set(-1, -7, 10);
// text.el.rotation.y = -0.2; 
// text.el.rotateZ(-Math.PI/2);
citySection.add(text.el);

// city.el.rotation.y = Math.PI / 6;
// city.el.rotation.y = 0;
city.el.rotation.x = - Math.PI / 16;
city.el.position.set(-8, 5, 0);
city.el.scale.x = 0.5;
city.el.scale.y = 0.5;
city.el.scale.z = 0.5;
citySection.add(city.el);
city.showGroup('shanghai');

TweenLite.to(city.el.rotation, 5, { x: 2 * Math.PI, ease: window.Linear.easeNone,
  onComplete: function () {
    this.restart();
    text.in();
  }
});

citySection.onIn(function (way) {
text.in();
});

citySection.onOut(function (way) {
text.out(way);
});

citySection.onStart(function (way) {
text.in();
});

citySection.onStop(function (way) {
text.out(way);
});

module.exports = citySection;