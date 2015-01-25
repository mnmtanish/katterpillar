Template.level_play.created = function () {
  this.counter = 0;
  this.counterDep = new Tracker.Dependency();
  this.levelDep = new Tracker.Dependency();
};


Template.level_play.rendered = function () {
  var self = this;
  var level = CurrentLevel.get();
  var rules = CurrentRules.get();

  if(!level) {
    return;
  }

  this.level = new LevelClass('.svg-element');
  this.rules = new RulesClass(this.level);
  this.level.onWin = showWinMessage;
  this.level.onLose = showLoseMessage;
  this.level.load(level);
  this.levelDep.changed();
  $('.no-rules').hide();

  if(rules && rules.length) {
    playGameLevel();
  } else {
    $('.no-rules').show();
  }

  $(window).on('resize', resize);
  $(resize);

  function playGameLevel () {
    if(self.destroyed) {
      return;
    }

    if(self.counter + 1 === self.level.getMaxTurns()) {
      showTimeoutMessage();
      return;
    }

    self.counter += 1;
    self.counterDep.changed();

    var direction = self.rules.getDirection();

    if(direction) {
      self.level.setDirection(direction);
      self.level.tick(playGameLevel);
    } else {
      playGameLevel();
    }
  }
};


Template.level_play.destroyed = function () {
  this.destroyed = true;
  $(window).off('resize');
};


Template.level_play.helpers({
  isLevel: function () {
    var levelName = CurrentLevel.get();
    return !!levelName;
  },
  counter: function () {
    Template.instance().counterDep.depend();
    var counter = Template.instance().counter;
    return counter || 0;
  },
  maxTime: function () {
    Template.instance().levelDep.depend();
    var level = Template.instance().level;

    if(!level) {
      return 0;
    }

    return level.getMaxTurns();
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


function resize () {
  setTimeout(function () {
    var $container = $(window);
    var $svgElement = $('.svg-element');
    var width = $container.width() - 40;
    var height = $container.height() - 40 - 67;
    var smallest = (width < height) ? width : height;
    $svgElement.width(smallest);
    $svgElement.height(smallest);
  }, 0);
}

function showWinMessage () {
  var levelName = CurrentLevel.get();
  var level = Levels.findOne({name: levelName});
  var next = Levels.findOne({order: level.order + 1});

  if(!next) {
    showWinMessageFinal();
    return;
  }

  swal({
    title: 'Awesome!',
    text: 'You have finished "'+level.name+'".',
    type: 'success',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, bring it on!',
    cancelButtonText: 'No, I\'ll do it later',
    closeOnConfirm: true,
    closeOnCancel: true
  }, function(isConfirm) {
    if (isConfirm) {
      CurrentRules.set([]);
      CurrentLevel.set(next.name);
      localStorage.setItem('last-level-played', next.name);
      Router.go('/play');
    }
  });
}

function showWinMessageFinal () {
  swal({
    title: 'Congratulations!',
    text: 'You have successfully completed the game.',
    type: 'success',
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'More Levels',
    closeOnConfirm: true,
    closeOnCancel: true
  }, function() {
    Router.go('/end');
  });
}

function showLoseMessage (reason) {
  swal({
    title: 'Please Try again.',
    text: reason,
    type: 'error'
  });
}

function showTimeoutMessage () {
  swal({
    title: 'Taking so much time',
    text: 'Try to complete the level with fewer steps.',
    type: 'warning',
  });
}
