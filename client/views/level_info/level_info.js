Template.level_info.helpers({
  isLevel: function () {
    var levelName = CurrentLevel.get();
    return !!levelName;
  },
  levelInfo: function () {
    var levelName = CurrentLevel.get();
    var level = Levels.findOne({name: levelName});
    return level.intro;
  },
});
