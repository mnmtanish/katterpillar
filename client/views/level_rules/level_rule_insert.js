ParentRule = null;

Template.level_rule_insert.created = function () {
  this.parent = this.data;
  this.isExtended = new ReactiveVar(false);
};


Template.level_rule_insert.events({
  'click .add-rule-snippet': function (e) {
    e.preventDefault();
    Template.instance().isExtended.set(true);
  },
  'click .rule-snippets-backdrop': function (e) {
    e.preventDefault();
    Template.instance().isExtended.set(false);
  },
  'click .rule-snippet-name': function (e) {
    e.preventDefault();
    var parent = Template.instance().parent;
    var rules = CurrentRules.get() || [];
    var name = this.toString();
    var rule = new Commands[name]();

    if(parent) {
      parent.children.push(rule);
    } else {
      rules.push(rule);
    }

    CurrentRules.set(rules);
    ParentRule = null;
    Template.instance().isExtended.set(false);
  },
});


Template.level_rule_insert.helpers({
  isExtended: function () {
    return Template.instance().isExtended.get();
  },
  ruleTypes: function () {
    return Commands.groups;
  },
  ruleName: function () {
    var name = this.toString();
    return Commands.getTitle(name);
  }
});
