RulesClass = function (level) {
  this.level = level;
  this.index = 0;
  this.queue = [];
};


RulesClass.prototype.getDirection = function() {
  if(this.queue.length) {
    var next = this.queue.shift();
    return next;
  }

  this._processNextRule();
  return {x: 0, y: 0};
};


RulesClass.prototype._processNextRule = function() {
  var rule = this._nextRule();
  if(!rule) {
    return null;
  }

  var current = this.level.getDirection();
  var directions = rule.getDirection(current);
  this.queue = this.queue.concat(directions);
};


RulesClass.prototype._nextRule = function() {
  var rules = CurrentRules.get();
  var index = this.index++;
  return rules[index];
};
