Commands = {};

Commands.getTitle = function (key) {
  return Commands[key].prototype.title;
};

//  -----

Commands.snake_moveForward = function () {
  this.id = Random.id();
};

Commands.snake_moveForward.prototype.name = 'snake_moveForward';
Commands.snake_moveForward.prototype.title = 'moveForward';

Commands.snake_moveForward.prototype.getDirection = function (current) {
  return [current];
};

//  -----

Commands.snake_turnLeft = function () {
  this.id = Random.id();
};

Commands.snake_turnLeft.prototype.name = 'snake_turnLeft';
Commands.snake_turnLeft.prototype.title = 'turnLeft';
Commands.snake_turnLeft.prototype._directions = {
  '0,1': {x: 1, y: 0},
  '0,-1': {x: -1, y: 0},
  '1,0': {x: 0, y: -1},
  '-1,0': {x: 0, y: 1},
};

Commands.snake_turnLeft.prototype.getDirection = function (current) {
  var id = current.x + ',' + current.y;
  var next = this._directions[id];
  return [next];
};

//  -----

Commands.snake_turnRight = function () {
  this.id = Random.id();
};

Commands.snake_turnRight.prototype.name = 'snake_turnRight';
Commands.snake_turnRight.prototype.title = 'turnRight';
Commands.snake_turnRight.prototype._directions = {
  '0,1': {x: -1, y: 0},
  '0,-1': {x: 1, y: 0},
  '1,0': {x: 0, y: 1},
  '-1,0': {x: 0, y: -1},
};

Commands.snake_turnRight.prototype.getDirection = function (current) {
  var id = current.x + ',' + current.y;
  var next = this._directions[id];
  return [next];
};
