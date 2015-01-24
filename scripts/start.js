$(function () {

  loadLevel('tutorial-1');
  loadEditor();

  // ------------------------------------------------------------------------ //

  function loadLevel (levelName) {
    var path = 'levels/'+levelName+'.json';

    $.getJSON(path, function(params) {
      if(!params) {
        throw new Error('Error loading level ('+levelName+')');
      }

      var level = new Level(params);
      level.setup('#level');
    });
  }


  function loadEditor () {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/github');
    editor.getSession().setMode('ace/mode/javascript');
  }
});
