var lastLevel = localStorage.getItem('last-level-played');
if(lastLevel) {
  Session.set('level', lastLevel);
  Router.go('/rules');
}
