$(function () {
  var soundsDisabled = localStorage.getItem('sounds-disabled');
  if(soundsDisabled) {
    GameSounds.enabled.set(false);
  }

  Tracker.autorun(function () {
    GameSounds.background.stop();
    if(GameSounds.enabled.get()) {
      localStorage.setItem('sounds-disabled', false);
      GameSounds.background.play().fadeIn().loop();
    } else {
      localStorage.setItem('sounds-disabled', true);
    }
  });
});
