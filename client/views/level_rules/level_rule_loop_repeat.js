Template.level_rule_loop_repeat.rendered = function () {
  var $editable = this.$('span');
  var command = this.data;

  var before;

  $editable.html(command.count);

  $editable.on('focus', function() {
    before = $editable.html();
  }).on('blur keyup paste', function() {
    if(before !== $editable.html()) {
      $editable.trigger('change');
    }
  });

  $editable.on('change', function() {
    var html = $editable.html();
    var num = parseInt(html) || 10;
    command.count = num;
    $editable.html(num);
  });
};
