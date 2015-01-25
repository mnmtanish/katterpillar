Template.level_list.helpers({
  levels: function () {
    return Levels.find({}, {sort: {order: 1}});
  }
});


Template.level_list.events({
  'click .level-link': function (e) {
    e.preventDefault();
    CurrentRules.set([]);
    CurrentLevel.set(this.name);
    localStorage.setItem('last-level-played', this.name);
    Router.go('/rules');
  }
});
