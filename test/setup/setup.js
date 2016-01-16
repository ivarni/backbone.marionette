import _ from 'underscore';
import Backbone from 'backbone';
import jQuery from 'jquery';
import Marionette from '../../src/backbone.marionette';
import Babysitter from 'backbone.babysitter';
import Radio from 'backbone.radio';

module.exports = function() {
  Backbone.$ = jQuery;
  Backbone.ChildViewContainer = Babysitter;
  Backbone.Radio = Radio;

  global.$ = global.jQuery = jQuery;
  global._ = _;
  global.Backbone = Backbone;
  global.Marionette = Backbone.Marionette = Marionette;
  global.expect = global.chai.expect;

  var $fixtures;

  function setFixtures() {
    _.each(arguments, function(content) {
      $fixtures.append(content);
    });
  }

  function clearFixtures() {
    $fixtures.empty();
  }

  function checkProperties(block, blacklist) {
    blacklist = blacklist ? blacklist.push('cid') : 'cid';
    var props = _.partial(_.omit, _, blacklist);
    block.call(this, props);
  }

  before(function() {
    $fixtures = $('<div id="fixtures">');
    $('body').append($fixtures);
    this.checkProperties = checkProperties;
    this.setFixtures   = setFixtures;
    this.clearFixtures = clearFixtures;
  });

  beforeEach(function() {
    this.sinon = global.sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
    window.location.hash = '';
    Backbone.history.stop();
    Backbone.history.handlers.length = 0;
    clearFixtures();
  });
};
