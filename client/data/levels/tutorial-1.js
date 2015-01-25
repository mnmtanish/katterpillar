Levels.insert({
  order: 1,
  name: 'tutorial-1',
  size: 8,
  turns: 10,
  title: 'Tutorial Level 1',
  walls: [],
  fruits: [
    {x: 6, y: 5}
  ],
  snake: [
    {x: 1, y: 5},
    {x: 2, y: 5},
    {x: 3, y: 5},
    {x: 4, y: 5}
  ],
  intro: [
    '# Tutorial Level 1',
    '',
    'This level is pretty stright forward. Just give it a `moveForward` command 2 times to complete this level, we can do more interesting stuff later.'
  ].join('\n')
});
