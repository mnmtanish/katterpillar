GameRules = {};

GameRules.snake_moveForward = {
  name: 'moveForward',
  code: 'snake.moveForward();',
  getDirection: function (params) {
    return [params.current];
  }
};

GameRules.snake_turnLeft = {
  name: 'turnLeft',
  code: 'snake.turnLeft();',
  getDirection: function (params) {
    var current = params.current;
    var id = current.x + ',' + current.y;
    var next = GameRules.snake_turnLeft._lefts[id]
    return [next];
  },
  _lefts: {
    '0,1': {x: 1, y: 0},
    '0,-1': {x: -1, y: 0},
    '1,0': {x: 0, y: -1},
    '-1,0': {x: 0, y: 1},
  },
};

GameRules.snake_turnRight = {
  name: 'turnRight',
  code: 'snake.turnRight();',
  getDirection: function (params) {
    var current = params.current;
    var id = current.x + ',' + current.y;
    var next = GameRules.snake_turnRight._rights[id]
    return [next];
  },
  _rights: {
    '0,1': {x: -1, y: 0},
    '0,-1': {x: 1, y: 0},
    '1,0': {x: 0, y: 1},
    '-1,0': {x: 0, y: -1},
  },
};
