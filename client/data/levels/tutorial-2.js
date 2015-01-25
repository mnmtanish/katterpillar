Levels.insert({
  order: 2,
  name: 'tutorial-2',
  size: 8,
  turns: 10,
  title: 'Tutorial Level 2',
  walls: [],
  fruits: [
    {x: 5, y: 2}
  ],
  snake: [
    {x: 1, y: 5},
    {x: 2, y: 5},
    {x: 3, y: 5},
    {x: 4, y: 5}
  ],
  intro: [
    '# Tutorial Level 2',
    '',
    'Hi again, for this level, the snake must turn left to get to the fruit. Looking around is good for you too. Try to look around every 20 minutes when you\'re playing computer games. You can easily do that when level loads, etc. Maybe that\'s why they do that <i class="fa fa-smile-o"></i>',
    '',
    'Did you notice that you only have a limited amount of time to get to the goal? Current time and total available time is shown in the top right corner when playing the game.'
  ].join('\n')
});
