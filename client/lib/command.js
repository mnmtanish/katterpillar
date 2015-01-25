Commands = {};

Commands.getTitle = function (key) {
  return Commands[key].prototype.title;
};

Commands.supportsChildren = function (key) {
  return Commands[key].prototype.supportsChildren;
};

Commands.groups = [
  {
    type: 'Caterpillar',
    desc: 'Commands to move the caterpillar.',
    rules: ['caterpillar_moveForward', 'caterpillar_turnLeft', 'caterpillar_turnRight']
  },
  {
    type: 'Loops',
    desc: 'Perform actions multiple times',
    rules: ['loop_repeat']
  },
  {
    type: 'Conditions',
    desc: 'Perform commands if conditions are met. <strong>! work in progress</strong>',
    rules: ['condition_if', 'condition_unless']
  },
  {
    type: 'User Functions',
    desc: 'A set of commands saved by the user. A good place to store some frequently used functions. <a href="/next">add functions</a>',
    rules: []
  },
];

//  -----

Commands.caterpillar_moveForward = function () {
  this.id = Random.id();
};

Commands.caterpillar_moveForward.prototype.name = 'caterpillar_moveForward';
Commands.caterpillar_moveForward.prototype.title = 'moveForward';

Commands.caterpillar_moveForward.prototype.getDirection = function (current) {
  return [current];
};

//  -----

Commands.caterpillar_turnLeft = function () {
  this.id = Random.id();
};

Commands.caterpillar_turnLeft.prototype.name = 'caterpillar_turnLeft';
Commands.caterpillar_turnLeft.prototype.title = 'turnLeft';
Commands.caterpillar_turnLeft.prototype._directions = {
  '0,1': {x: 1, y: 0},
  '0,-1': {x: -1, y: 0},
  '1,0': {x: 0, y: -1},
  '-1,0': {x: 0, y: 1},
};

Commands.caterpillar_turnLeft.prototype.getDirection = function (current) {
  var id = current.x + ',' + current.y;
  var next = this._directions[id];
  return [next];
};

//  -----

Commands.caterpillar_turnRight = function () {
  this.id = Random.id();
};

Commands.caterpillar_turnRight.prototype.name = 'caterpillar_turnRight';
Commands.caterpillar_turnRight.prototype.title = 'turnRight';
Commands.caterpillar_turnRight.prototype._directions = {
  '0,1': {x: -1, y: 0},
  '0,-1': {x: 1, y: 0},
  '1,0': {x: 0, y: 1},
  '-1,0': {x: 0, y: -1},
};

Commands.caterpillar_turnRight.prototype.getDirection = function (current) {
  var id = current.x + ',' + current.y;
  var next = this._directions[id];
  return [next];
};

//  -----

Commands.loop_repeat = function () {
  this.id = Random.id();
  this.children = [];
};

Commands.loop_repeat.prototype.name = 'loop_repeat';
Commands.loop_repeat.prototype.title = 'repeat';
Commands.loop_repeat.prototype.supportsChildren = true;
Commands.loop_repeat.prototype.children = [];
Commands.loop_repeat.prototype.count = 10;

Commands.loop_repeat.prototype.getDirection = function (current) {
  var directions = [];
  var previous = [current];

  for(var c=0; c<this.count; ++c) {
    for(var i=0; i<this.children.length; ++i) {
      var child = this.children[i];
      var lastDirection = previous[previous.length - 1];
      previous = child.getDirection(lastDirection);
      directions.push(previous);
    }
  }

  return _.flatten(directions);
};

//  -----

Commands.condition_if = function () {
  this.id = Random.id();
  this.children = [];
};

Commands.condition_if.prototype.name = 'condition_if';
Commands.condition_if.prototype.title = 'if';
Commands.condition_if.prototype.supportsChildren = true;
Commands.condition_if.prototype.children = [];
Commands.condition_if.prototype.condition = 'true';

Commands.condition_if.prototype.getDirection = function (current) {
  console.log('! this\n', this);
  return [];
};

//  -----

Commands.condition_unless = function () {
  this.id = Random.id();
  this.children = [];
};

Commands.condition_unless.prototype.name = 'condition_unless';
Commands.condition_unless.prototype.title = 'unless';
Commands.condition_unless.prototype.supportsChildren = true;
Commands.condition_unless.prototype.children = [];
Commands.condition_unless.prototype.condition = 'true';

Commands.condition_unless.prototype.getDirection = function (current) {
  console.log('! this\n', this);
  return [];
};
