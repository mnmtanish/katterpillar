Levels.insert({
  order: 2,
  name: 'tutorial-2',
  size: 12,
  turns: 20,
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
    '# Tutorial Level 2 - looking around',
    '',
    'Hi again, ',
    '',
    'This level is pretty stright forward. Just give it a `moveForward` command to complete this level, we can do more interesting stuff later.'
  ].join('\n')
});
