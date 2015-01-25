
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

Router.route('/play', function () {
  this.render('level_play');
});

Router.route('/rules', function () {
  this.render('level_rules');
});
