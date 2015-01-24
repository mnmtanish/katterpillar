$(function () {

  setUiSizes();
  setupLinks();
  loadLevel('tutorial-1');

  $(window).resize(function() {
    setUiSizes();
  });

  // ------------------------------------------------------------------------ //

  function setUiSizes () {
    if(window.innerHeight > window.innerWidth) {
      setUiSizesPortrait();
    } else {
      setUiSizesLandscape();
    }

    loadEditor();
  }

  function setUiSizesPortrait () {
    var mainHeight = window.innerHeight - 134;
    var levelMargin = (mainHeight - window.innerWidth)/2;
    $('#main-wrapper').css('height', Math.round(mainHeight));
    $('#game-editor').css('height', Math.round(mainHeight));
    $('#game-level').css('margin-top', Math.round(levelMargin));
  }

  function setUiSizesLandscape() {
    var mainHeight = window.innerHeight - 67;
    var editorWidth = window.innerWidth - mainHeight - 20;
    $('#main-wrapper').css('height', Math.round(mainHeight));
    $('#game-level').css('width', Math.round(mainHeight));
    $('#game-editor').css('height', Math.round(mainHeight));
    $('#game-editor').css('width', Math.round(editorWidth));
    // body...
  }

  function setupLinks () {
    $('#game-editor-link').click(function (e) {
      e.preventDefault();
      $('#game-level').hide();
      $('#game-editor').show();
    });

    $('#game-level-link').click(function (e) {
      e.preventDefault();
      $('#game-editor').hide();
      $('#game-level').show();
    });
  }

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
