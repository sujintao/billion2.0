'use strict';

var THREE = require('three');
var TweenLite = require('tweenlite');

var SOUNDS = require('../modules/soundsModule');
var random = require('../utils/randomUtil');
var yoyo = require('../utils/yoyoUtil');
var glitchMaterial = require('../materials/glitchMaterial');

/**
 * Animated ball
 *
 * @class Ball
 * @constructor
 * @requires THREE, TweenLite, SOUNDS, random, yoyo, glitchMaterial
 */
function Ball () {
  var texture = THREE.ImageUtils.loadTexture('./app/public/img/img-kobyGao.png');

  var materialStripe = new THREE.MeshLambertMaterial({
    map: texture,
    color: '#ffffff',
    emissive: '#5a5a5a',
    depthWrite: false,
    depthTest: true,
    transparent: true
  });

  var geometry = new THREE.BoxGeometry(15, 15, 15);

  var mesh = new THREE.Mesh(geometry, materialStripe);

  this.el = mesh;

  function update () {
    mesh.position.y = cache.y;
    mesh.position.x = cache.x;
    mesh.position.z = cache.z;
  }

  var cache = { z: 0, y: -30, x: 0 , opacity: 0 };
  var inTween = TweenLite.to(cache, 1, { y: 7, opacity: 1, paused: true, onUpdate: update});

  this.in = function () {
    inTween.play();
  };

  this.out = function () {
    inTween.reverse();
  };

  this.start = function () {
  };

  this.stop = function () {
  };
}

module.exports = Ball;