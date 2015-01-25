Template.level_rule.created = function () {
  this.isExtended = new ReactiveVar(false);
};


Template.level_rule.events({
  'click .rule-code': function (e) {
    e.preventDefault();
    Template.instance().isExtended.set(true);
  },
  'click .edit-rule-backdrop': function (e) {
    e.preventDefault();
    Template.instance().isExtended.set(false);
  },
  'click .remove-rule': function (e) {
    e.preventDefault();
    removeRule(this.id);
  },
});


Template.level_rule.helpers({
  ruleTemplate: function () {
    var template = 'level_rule_' + this.name;
    return template;
  },
  isExtended: function () {
    return Template.instance().isExtended.get();
  },
});


function removeRule (id) {
  var rules = CurrentRules.get();
  var result = false;

  for(var i=0; i<rules.length; ++i) {
    var rule = rules[i];
    if(rule.id === id) {
      rules.splice(i, 1);
      result = true;
      break;
    }

    if(rule.children && removeRule(id, rule.children)) {
      result = true;
      break;
    }
  }

  if(result) {
    CurrentRules.set(rules);
  }

  return result;
}
