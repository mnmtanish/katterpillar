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

  if(rules.length) {
    playGameLevel();
  }

  function playGameLevel () {
    if(self.destroyed) {
      return;
    }

    if(self.counter + 1 === 120) {
      showTimeoutMessage();
      return;
    }

    var direction = self.rules.getDirection();

    if(direction) {
      self.level.setDirection(direction);
      self.level.tick(playGameLevel);
      self.counter += 1;
      self.counterDep.changed();
    } else {
      playGameLevel();
    }
  }

  $(window).on('resize', resize);
  $(resize);
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
  }
});


function resize (e) {
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
  console.log('Congratulations!');
}

function showLoseMessage () {
  console.log('Please try again!');
}

function showTimeoutMessage () {
  console.log('Taking too much time!');
}
