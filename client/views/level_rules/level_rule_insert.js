var insertTypes = [
  {
    type: 'Snake',
    rules: ['snake_moveForward', 'snake_turnLeft', 'snake_turnRight']
  }
];


Template.level_rule_insert.created = function () {
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
    var rules = Session.get('rules') || [];
    var ruleId = Random.id();
    var ruleName = this.toString();
    rules.push({id: ruleId, name: ruleName, params: {}});
    Session.set('rules', rules);
    Template.instance().isExtended.set(false);
  },
});


Template.level_rule_insert.helpers({
  isExtended: function () {
    return Template.instance().isExtended.get();
  },
  ruleTypes: function () {
    return insertTypes;
  },
  ruleName: function () {
    return GameRules[this].name;
  }
});
