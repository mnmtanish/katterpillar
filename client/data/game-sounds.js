$(function () {
  GameSounds = {};

  GameSounds.enabled = new ReactiveVar(true);

  GameSounds.step = new buzz.sound( "/sounds/branch_break", {
    formats: ["mp3"]
    // formats: [ "ogg", "mp3", "aac" ]
  });

  GameSounds.eat = new buzz.sound( "/sounds/glass", {
    formats: ["mp3"]
    // formats: [ "ogg", "mp3", "aac" ]
  });

  GameSounds.hit = new buzz.sound( "/sounds/light_bulb_breaking", {
    formats: ["mp3"]
    // formats: [ "ogg", "mp3", "aac" ]
  });

  GameSounds.background = new buzz.sound( "/sounds/background", {
    formats: ["mp3"]
    // formats: [ "ogg", "mp3", "aac" ]
  });
});
