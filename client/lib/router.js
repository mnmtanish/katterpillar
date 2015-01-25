
Router.configure({
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.render('homepage');
});

Router.route('/levels', function () {
  this.render('level_list');
});

Router.route('/play', function () {
  this.render('level_play', {name: this.params.name});
});

Router.route('/rules', function () {
  this.render('level_rules', {name: this.params.name});
});
