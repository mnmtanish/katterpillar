
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

Router.route('/levels', function () {
  this.render('level_list');
});

Router.route('/play/:levelName', function () {
  var currentName = CurrentLevel.get();

  if(this.params.levelName && this.params.levelName !== currentName) {
    CurrentRules.set([]);
    CurrentLevel.set(this.params.levelName);
    localStorage.setItem('last-level-played', this.params.levelName);
  }

  this.render('level_play');
});

Router.route('/rules', function () {
  this.render('level_rules');
});
