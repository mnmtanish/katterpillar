var lastLevel = localStorage.getItem('last-level-played');
if(lastLevel) {
  CurrentLevel.set(lastLevel);
  Router.go('/rules');
}
