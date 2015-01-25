Levels.insert({
  name: 'tutorial-1',
  size: 12,
  title: 'Tutorial Level 1',
  walls: [
    {x: 1, y: 1},
    {x: 1, y: 2},
    {x: 2, y: 1},
    {x: 2, y: 2},
    {x: 8, y: 8},
    {x: 8, y: 9},
    {x: 9, y: 8},
    {x: 9, y: 9}
  ],
  fruits: [
    {x: 10, y: 5}
  ],
  snake: [
    {x: 1, y: 5},
    {x: 2, y: 5},
    {x: 3, y: 5},
    {x: 4, y: 5}
  ],
  intro: [
    '# Tutorial Level 1',
    'Click on the "<i class="fa fa-code"></i>" button in the footer menu to change commands. Click on the "<i class="fa fa-play"></i>" button to test your program.',
    '',
    'Add the `moveForward` command to complete this mission.'
  ].join('\n')
});
