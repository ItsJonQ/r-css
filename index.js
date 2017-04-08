(function() {
  window.ReactiveStylesheet = (function() {
    var style = document.createElement("style");
    // WebKit hack :(
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
  })();

  var RXS = function(selector) {
    return new RXSRule(selector);
  };

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
    var rule = `${this.selector} { }`;
    sheet.insertRule(rule, index);
    this.rule = rules[index];
    return this.rule;
  };

  RXSRule.prototype.hasRule = function() {
    return Object.keys(this.getRules()).some(function(r) {
      return r.selectorText === this.selector;
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

  window.rxs = RXS;
})();
