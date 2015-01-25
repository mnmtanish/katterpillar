Template.navigation.helpers({
  isLevel: function () {
    var levelName = CurrentLevel.get();
    return !!levelName;
  }
});
