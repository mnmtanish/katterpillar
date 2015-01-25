Template.navigation.helpers({
  isLevel: function () {
    var level = Session.get('level');
    return !!level;
  }
});
