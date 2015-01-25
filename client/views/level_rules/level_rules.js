Template.level_rules.helpers({
  isLevel: function () {
    var level = Session.get('level');
    return !!level;
  },
  rules: function () {
    var rules = Session.get('rules');
    return rules;
  },
  levelInfo: function () {
    var levelName = Session.get('level');
    var level = Levels.findOne({name: levelName});
    return level.intro;
  },
  goToHomepage: function () {
    Router.go('/');
  }
});
