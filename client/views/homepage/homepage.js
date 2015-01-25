Template.homepage.helpers({
  soundsEnabled: function () {
    return GameSounds.enabled && GameSounds.enabled.get();
  }
});

Template.homepage.events({
  'click .enable-sounds': function (e) {
    e.preventDefault();
    var enabled = GameSounds.enabled.get();
    GameSounds.enabled.set(!enabled);
  }
});
