
Router.configure({
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.render('homepage');
});

Router.route('/end', function () {
  this.render('completed');
});

Router.route('/help', function () {
  this.render('instructions');
});

Router.route('/about', function () {
  this.render('information');
});

Router.route('/next', function () {
  this.render('whats_next');
});

Router.route('/levels', function () {
  this.render('level_list');
});

Router.route('/play/:levelName', function () {
  var self = this;
  var currentName = CurrentLevel.get();

  if(this.params.levelName && this.params.levelName !== currentName) {
    CurrentRules.set([]);
    CurrentLevel.set(this.params.levelName);
    localStorage.setItem('last-level-played', this.params.levelName);
  }

  // FIXME: hack to re render template
  this.render('nothing');
  setTimeout(function () {
    self.render('level_play');
  }, 0);
});

Router.route('/rules', function () {
  this.render('level_rules');
});
