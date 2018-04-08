'use strict';
  
var Section = require('../classes/SectionClass');

var TextPanel = require('../objects3D/TextPanelObject3D');
var LookAtField = require('../objects3D/LookAtFieldObject3D');

var endSection = new Section('end');

var text = new TextPanel(
  '这是一个功利的时代。 \n 只有胜者，才能留下记忆的烙印。 \n 为此，我们都奋力向前。',
  {
    align: 'center',
    style: '',
    size: 20,
    lineSpacing: 20
  }
);
text.el.position.set(0, 1, 10);
endSection.add(text.el);

var field = new LookAtField({
  count: 50
});
endSection.add(field.el);

endSection.onIn(function () {
  text.in();
  field.in();
});

endSection.onOut(function (way) {
  text.out(way);
  field.out(way);
});

module.exports = endSection;