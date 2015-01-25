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
  return null;
};


RulesClass.prototype._processNextRule = function() {
  var rule = this._nextRule();
  if(!rule) {
    return null;
  }

  var current = this.level.getDirection();
  var params = {current: current};
  var directions = GameRules[rule.name].getDirection(params);
  this.queue = this.queue.concat(directions);
};


RulesClass.prototype._nextRule = function() {
  var rules = Session.get('rules');
  var size = rules.length;
  var index = (this.index++) % size;
  return rules[index];
};
