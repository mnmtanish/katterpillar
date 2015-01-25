Template.level_rule_condition_if.rendered = function () {
  var $editable = this.$('span');
  var command = this.data;

  var before;

  $editable.html(command.condition);

  $editable.on('focus', function() {
    before = $editable.html();
  }).on('blur keyup paste', function() {
    if(before !== $editable.html()) {
      $editable.trigger('change');
    }
  });

  $editable.on('change', function() {
    var html = $editable.html();
    command.condition = html;
  });
};
