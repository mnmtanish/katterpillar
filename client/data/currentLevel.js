var lastPlayed = localStorage.getItem('last-level-played');
if(!lastPlayed) {
  lastPlayed = 'tutorial-1';
  Session.set('level', 'tutorial-1');
  localStorage.setItem('last-level-played', 'tutorial-1');
}
