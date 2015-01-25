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
