'use strict';

require('./polyfills/animFramePolyfill');
require('./polyfills/bindPolyfill');
require('./polyfills/indexOfPolyfill');

var jQuery = require('jquery');
var TweenLite = require('tweenlite');
TweenLite.defaultEase = window.Quad.easeInOut;

require('./libs/waypointLib');

var APP = require('./modules/appModule');
var SCENE = require('./modules/sceneModule');
var SOUNDS = require('./modules/soundsModule');
var HASH = require('./modules/hashModule');

var ImagesLoader = require('./classes/LoaderClass');

var Loader = require('./objects2D/LoaderObject2D');
//var Menu = require('./objects2D/menuObject2D');
var Help = require('./objects2D/HelpObject2D');
var Wireframe = require('./objects2D/WireframeObject2D');

var helloSection = require('./sections/helloSection');
var faceSection = require('./sections/faceSection');
// var waveSection = require('./sections/waveSection');
var ballSection = require('./sections/ballSection');
var ballSection1 = require('./sections/ballSection1');
var faceSection1 = require('./sections/faceSection1');
var rocksSection = require('./sections/rocksSection');
var endSection = require('./sections/endSection');
var beamsSection = require('./sections/beamsSection');
var dropSection = require('./sections/dropSection');
var flowSection = require('./sections/flowSection');
// var neonsSection = require('./sections/neonsSection');
var heightSection = require('./sections/heightSection');
var galaxySection = require('./sections/galaxySection');
//var gravitySection = require('./sections/gravitySection');
var citySection = require('./sections/citySection');

jQuery(function () {
  HASH.replacePlaceholders();

  var loader = new Loader();
  var help = new Help();
  //var menu = new Menu();
  var imagesLoader = new ImagesLoader([
    './app/public/img/texture-ball.png',
    './app/public/img/texture-ballAlpha.png',
    './app/public/img/sprite-smoke.png',
    './app/public/img/sprite-AKQA.png'
  ]);

  // preload
  imagesLoader.start();

  imagesLoader.onProgress(function (percent) {
    loader.update(percent);
  });

  imagesLoader.onComplete(function () {
    loader.out();

    TweenLite.delayedCall(0.8, SCENE.in);
    TweenLite.delayedCall(1.5, function () {
      map.in();
      //menu.in();
    });
  });
  /*
    menu.onClick(function () {
      var $el = jQuery(this);
      var name = $el.attr('data-button') || '';
  
      if (name === 'sounds') {
        SOUNDS.toggle();
        $el.html(SOUNDS.isMuted() ? 'UNMUTE' : 'MUTE');
      }
      else if (name === 'help') {
        help.in();
      }
      else if (name === 'quality') {
        var text;
        var quality;
  
        if (SCENE.getQuality() === 0.5) {
          text = 'QUALITY 1';
          quality = 1;
        } else {
          text = 'QUALITY 0.5';
          quality = 0.5;
        }
  
        $el.html(text);
        SCENE.quality(quality);
      }
    });  
      */
  // scene
  var $heads = jQuery('.heads');
  var $viewport = $heads.find('.heads__viewport');

  SCENE.config({ quality: 1 });
  SCENE.setViewport($viewport);
  SCENE.addSections([
    helloSection,//1
    endSection,//14
    ballSection1,//4
    faceSection,//9
    ballSection,//4
    citySection,//13
    beamsSection,//2
    heightSection,//7
    dropSection,//3
    galaxySection,//11
    
    //waveSection,//8
    // faceSection1,//9
    // flowSection,//5
    
    
    /*
    beamsSection,//2
    flowSection,//5
    neonsSection,//6
    galaxySection,//11
    gravitySection,//12
    
    */

  ]);

  SCENE.on('section:changeBegin', function () {
    var way = this.way;
    var to = this.to.name;
    var from = this.from.name;
    // console.log(way, to, from);
    // in begin
    if (to === 'hello') {
      // console.log('hello')
      helloSection.in();
      helloSection.start();
      helloSection.smokeStart();
      //helloSection.show();

      beamsSection.out('up');//2
      beamsSection.start();//2
    }
    else if (to === 'beams') {
      helloSection.smokeStart();

      beamsSection.in();//2
      beamsSection.start();//2
    }
    else if (to === 'drop') {
      beamsSection.out('down');//2
      beamsSection.start();//2

      dropSection.in();
      dropSection.start();
    }
    else if (to === 'ball') {
      dropSection.out('down');
      dropSection.start();

      ballSection.in();
      ballSection.start();

      flowSection.fieldIn();
      flowSection.start();
    }
    else if (to === 'flow') {
      flowSection.in();5
      flowSection.fieldIn();
      flowSection.start();

      // neonsSection.smokeStart();6
    }
    else if (to === 'neons') {
      flowSection.fieldIn();
      flowSection.start();

      // neonsSection.start();6
      // neonsSection.smokeStart();6

      heightSection.show();
    }
    else if (to === 'height') {
      flowSection.fieldIn();
      flowSection.start();

      // neonsSection.smokeStart();

      heightSection.show();
      heightSection.in();
      heightSection.start();
    }
    else if (to === 'wave') {
      heightSection.show();

      // waveSection.in(way);
      // waveSection.start();
    }
    else if (to === 'face') {
      // $("#talken--9").fadeIn();
      faceSection.in();
      faceSection.start();

      rocksSection.show();
    } else if (to === 'face1') {
      faceSection1.in();
      faceSection1.start();

      rocksSection.show();
    }else if(to === 'ball1'){
      ballSection1.in();
      ballSection1.start();
    }
    else if (to === 'rocks') {
      rocksSection.show();
      rocksSection.in();
      rocksSection.start();
    }
    else if (to === 'galaxy') {
      rocksSection.show();

      galaxySection.in(way);11
      galaxySection.start();11

      // gravitySection.show();12
    }
    else if (to === 'gravity') {
      // gravitySection.show();12
      // gravitySection.in();12
      // gravitySection.start();12
    }
    else if (to === 'end') {
      endSection.in();
    }

    // out begin
    if (from === 'hello') {
      //helloSection.out(way);
      // $("#welcom").fadeOut();
    }
    else if (from === 'beams') {
      beamsSection.out(way);
    }
    else if (from === 'drop') {
      dropSection.out(way);
    }
    else if (from === 'ball') {
      ballSection.out(way);
    }
    else if (from === 'flow') {
      flowSection.out(way);
    }
    else if (from === 'neons') {
      // neonsSection.out(way);
    }
    else if (from === 'height') {
      heightSection.out(way);
    }
    else if (from === 'wave') {
      // waveSection.out(way);
    }
    else if (from === 'face') {
      faceSection.out(way);
    } else if (from === 'face1') {
      faceSection1.out(way);
    } else if(from === 'ball1'){
      ballSection1.out(way);
    }
    else if (from === 'rocks') {
      rocksSection.out(way);
    }
    else if (from === 'galaxy') {
      galaxySection.out(way);
    }
    else if (from === 'gravity') {
      // gravitySection.out(way);
    }
    else if (from === 'end') {
      endSection.out(way);
    }
  });

  SCENE.on('section:changeComplete', function () {
    var to = this.to.name;
    var from = this.from.name;

    // out complete
    if (from === 'hello') {
      
      helloSection.stop();
      if (to !== 'beams') {
        helloSection.smokeStop();
      }

      if (to !== 'beams' && to !== 'drop') {
        beamsSection.stop();
      }
    }
    else if (from === 'beams') {
      if (to !== 'hello') {
        helloSection.smokeStop();
      }

      if (to !== 'hello' && to !== 'drop') {
        beamsSection.stop();
      }
    }
    else if (from === 'drop') {
      if (to !== 'hello' && to !== 'beams') {
        beamsSection.stop();
      }

      if (to !== 'ball') {
        dropSection.stop();
      }
    }
    else if (from === 'ball') {
      ballSection.stop();

      if (to !== 'drop') {
        dropSection.stop();
      }

      if (to !== 'flow' && to !== 'neons' && to !== 'height') {
        flowSection.stop();
      }
    }
    else if (from === 'flow') {
      if (to !== 'neons' && to !== 'height') {
        // neonsSection.smokeStop();
      }

      if (to !== 'ball' && to !== 'neons' && to !== 'height') {
        flowSection.stop();
      }
    }
    else if (from === 'neons') {
      // neonsSection.stop();

      if (to !== 'flow' && to !== 'height') {
        // neonsSection.smokeStop();
      }

      if (to !== 'ball' && to !== 'flow' && to !== 'height') {
        flowSection.stop();
      }

      if (to !== 'height' && to !== 'wave') {
        heightSection.hide();
      }
    }
    else if (from === 'height') {
      heightSection.stop();

      if (to !== 'neons' && to !== 'wave') {
        heightSection.hide();
      }

      if (to !== 'flow' && to !== 'neons') {
        // neonsSection.smokeStop();
      }

      if (to !== 'ball' && to !== 'flow' && to !== 'neons') {
        flowSection.stop();
      }
    }
    else if (from === 'wave') {
      // waveSection.stop();

      if (to !== 'neons' && to !== 'height') {
        heightSection.hide();
      }
    }
    else if (from === 'face') {
      faceSection.stop();

      if (to !== 'rocks' && to !== 'galaxy') {
        rocksSection.hide();
      }
    }
    else if (from === 'rocks') {
      rocksSection.stop();

      if (to !== 'face' && to !== 'galaxy') {
        rocksSection.hide();
      }
    }
    else if (from === 'galaxy') {
      galaxySection.stop();

      if (to !== 'face' && to !== 'rocks') {
        rocksSection.hide();
      }

      if (to !== 'gravity') {
        //gravitySection.hide();
      }
    }
    else if (from === 'gravity') {
      //gravitySection.stop();

      if (to !== 'galaxy') {
        //gravitySection.hide();
      }
    }
  });

  SCENE.on('end', function () {
    SCENE.lock();
    APP.slide(SCENE.unlock);
  });

  // map
  var map = SCENE.getMap();

  $heads.prepend(map.$el);

  map.init();

  map.onClick(function (index) {
    SCENE.goTo(index);
  });

  SCENE.on('section:changeBegin', function () {
    map.setActive(this.to.index);
  });

  // tails
  var wireframe = new Wireframe(jQuery('.wireframe'));

  var $tailsSections = jQuery('.tails__section');
  $tailsSections.find('.tails__section__el').animate({ opacity: 0, y: 100 }, 0);

  var waypoint = $tailsSections.waypoint({
    $viewport: jQuery('.tails'),
    offset: 30
  });

  $tailsSections.on('active', function () {
    var $el = jQuery(this);

    if ($el.attr('data-appeared')) {
      return false;
    }

    jQuery(this).find('.tails__section__el').each(function (i) {
      jQuery(this).stop().delay(i * 100).animate({ opacity: 1, y: 0 }, 500);
    });

    $el.attr('data-appeared', true);
  });

  jQuery('.tails__section--site').on('stateChange', function (e, state) {
    if (state === 'active') {
      wireframe.start();
      wireframe.in();
    } else {
      wireframe.stop();
    }
  });

  APP.on('slideBegin', function () {
    if (this.to === 'heads') {
      waypoint.stop();

      try {
        SOUNDS.background.fadeIn(1, 2000);
      } catch (e) {
        console.warn(e);
      }

    } else {
      // SOUNDS.background.fadeOut(0, 2000);
    }
  });

  APP.on('slideComplete', function () {
    if (this.to === 'tails') {
      waypoint.start();
    }
  });

  // SCENE on/off
  APP.on('heads:visible', function () {
    SCENE.start();
  });

  APP.on('heads:invisible', function () {
    SCENE.stop();
  });

  APP.start();
  SCENE.start();

  SOUNDS.background.fadeIn(1, 2000);
});