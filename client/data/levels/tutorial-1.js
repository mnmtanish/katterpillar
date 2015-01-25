Levels.insert({
  order: 1,
  name: 'tutorial-1',
  size: 12,
  title: 'Tutorial Level 1',
  walls: [],
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
    '',
    'Hi, in this game you\'re going to write simple programs to guide this snake to it\'s goals. This is the rule editor,from here you can give some instructions to the snake. To come back here, click on the "<i class="fa fa-code"></i>" icon on the footer. After programming the snake, click on the play button on the footer to see how it goes. Before checking it out, give the snake some commands.',
    '',
    'This level is pretty stright forward. Just give it a `moveForward` command to complete this level, we can do more interesting stuff later.'
  ].join('\n')
});
