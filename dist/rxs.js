/**
 * rxs v0.1.0 (https://github.com/ItsJonQ/rxs#readme)
 * Reactive CSS: Super fast dynamic CSS rules.
 * Licensed under MIT
 */
(function() {
  'use strict';
  window.ReactiveStylesheet = (function() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
  })();

  var RXSRule = function(selector) {
    this.selector = selector;
    this.styleSheet = false;
    this.rule = false;
    this.ruleIndex = 0;
  };

  RXSRule.prototype.getStyleSheet = function() {
    return this.styleSheet || window.ReactiveStylesheet;
  };

  RXSRule.prototype.getRules = function() {
    var sheet =  this.getStyleSheet();
    return sheet.cssRules || sheet.rules;
  };

  RXSRule.prototype.getRuleIndex = function() {
    if (!this.ruleIndex) {
      this.ruleIndex = this.getRules().length;
    }
    return this.ruleIndex;
  };

  RXSRule.prototype.addRule = function() {
    var sheet = this.getStyleSheet();
    var rules = this.getRules();
    var index = this.getRuleIndex();
    var rule = this.selector + ' { }';
    console.log(rule);
    sheet.insertRule(rule, index);
    this.rule = rules[index];
    return this.rule;
  };

  RXSRule.prototype.hasRule = function() {
    var self = this;
    var rules = self.getRules();
    return Object.keys(rules).some(function(r) {
      return rules[r].selectorText === self.selector;
    });
  };

  RXSRule.prototype.getRule = function() {
    if (!this.rule || !this.hasRule()) {
      this.addRule();
    }
    return this.rule;
  };

  RXSRule.prototype.set = function(styleProps) {
    var styles = this.getRule().style;
    Object.keys(styleProps).forEach(function(k) {
      if (Object.prototype.hasOwnProperty.call(styles, k)) {
        styles[k] = styleProps[k];
      }
    });
    return this;
  };

  var RXS = function(selector) {
    return new RXSRule(selector);
  };

  window.rxs = window.ReactiveCSS = RXS;
})();
