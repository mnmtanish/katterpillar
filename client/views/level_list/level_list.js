Template.level_list.helpers({
  levels: function () {
    return Levels.find({}, {sort: {order: 1}});
  }
});


Template.level_list.events({
  'click .level-link': function (e) {
    e.preventDefault();
    Router.go('/play/'+this.name);
  }
});
