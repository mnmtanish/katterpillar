$(function () {
  function RulesClass () {
    this._ruleId = 0;
  }

  RulesClass.prototype.render = function() {
    // body...
  };

  RulesClass.prototype._nextRuleId = function() {
    return this._ruleId++;
  };

  // ------------------------------------------------------------------------ //

  Rules = new RulesClass();

  // ------------------------------------------------------------------------ //

  Rules.addRule({type: 'moveForward'})
});
