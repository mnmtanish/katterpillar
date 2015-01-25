Template.level_list.helpers({
  levels: function () {
    return Levels.find();
  }
});


Template.level_list.events({
  'click .level-link': function (e) {
    e.preventDefault();
    Session.set('rules', []);
    Session.set('level', this.name);
    localStorage.setItem('last-level-played', this.name);
    Router.go('/play');
  }
});
