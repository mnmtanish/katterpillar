Template.level_rules.helpers({
  isLevel: function () {
    var levelName = CurrentLevel.get();
    return !!levelName;
  },
  rules: function () {
    return CurrentRules.get();
  },
  levelInfo: function () {
    var levelName = CurrentLevel.get();
    var level = Levels.findOne({name: levelName});
    return level.intro;
  },
  goToHomepage: function () {
    Router.go('/');
  }
});
