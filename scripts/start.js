$(function () {
  var navSize = $('.navigation').outerHeight();
  var $gameLevel = $('#game-level');
  var $containers = $('.container');
  var $mainLinks = $('.navigation a');

  setUiSizes();
  setupLinks();

  $(window).resize(function() {
    setUiSizes();
  });

  // ------------------------------------------------------------------------ //

  function setUiSizes () {
    var mainHeight = window.innerHeight - navSize;
    var mainWidth = window.innerWidth;

    if(mainHeight > mainWidth) {
      $gameLevel.css('height', null);
    } else {
      $gameLevel.css('height', mainHeight);
    }
  }

  function setupLinks () {
    $('.navigation a').click(function (e) {
      e.preventDefault();
      var pathname = this.href.split('/').pop();
      gotoPath(pathname);
    });

    $('#levels-list a').click(function (e) {
      e.preventDefault();
      var pathname = this.href.split('/').pop();
      Level.load(pathname, function () {
        gotoPath('game-play');
      });
    });
  }

  function gotoPath (pathname) {
    $containers.removeClass('active');
    $mainLinks.removeClass('active');
    $('#'+pathname).addClass('active');
    $('[href='+pathname+']').addClass('active');
  }
});
