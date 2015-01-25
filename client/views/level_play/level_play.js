Template.level_play.created = function () {
  this.counter = 0;
  this.counterDep = new Tracker.Dependency();
};


Template.level_play.rendered = function () {
  var self = this;
  var level = Session.get('level');
  var rules = Session.get('rules');

  if(!level) {
    return;
  }

  this.level = new LevelClass('.svg-element');
  this.rules = new RulesClass(this.level);
  this.level.onWin = showWinMessage;
  this.level.onLose = showLoseMessage;
  this.level.load(level);

  if(rules && rules.length) {
    playGameLevel();
  } else {
    showNoRules();
  }

  $(window).on('resize', resize);
  $(resize);

  function playGameLevel () {
    if(self.destroyed) {
      return;
    }

    if(self.counter + 1 === 120) {
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
    var level = Session.get('level');
    return !!level;
  },
  counter: function () {
    Template.instance().counterDep.depend();
    var counter = Template.instance().counter;
    return counter || 0;
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
  swal({
    title: 'Congratulations!',
    text: 'You have successfully completed LEVEL_NAME.',
    type: 'success',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, bring it on!',
    cancelButtonText: 'No, I\'ll do it later',
    closeOnConfirm: true,
    closeOnCancel: true
  }, function(isConfirm) {
    if (isConfirm) {
      console.log('next');
    }
  });
}

function showLoseMessage () {
  swal({
    title: 'Please Try again.',
    text: 'Please try again. Read the text on rules page for help.',
    type: 'error'
  });
}

function showTimeoutMessage () {
  swal({
    title: 'Program Timeout',
    text: 'The program is taking so much time. Remember, time is counted for both program logic and movements. Try to optimize the program a bit.',
    type: 'warning'
  });
}

function showNoRules () {
  swal({
    title: 'No Rules Defined',
    text: 'Please add some rules to control the snake',
    type: 'warning'
  });
}
