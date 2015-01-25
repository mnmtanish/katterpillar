$(function () {
  Tracker.autorun(function () {
    GameSounds.background.stop();
    if(GameSounds.enabled.get()) {
      GameSounds.background.play().fadeIn().loop();
    }
  });
});
