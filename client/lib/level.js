LevelClass = function (target) {
  this.targetElement = target;
  this.params = null;
  this._mapSvg = null;
  this._gridSize = null;
  this._stoneDots = [];
  this._fruitDots = [];
  this._caterpillarDots = [];
  this._caterpillarDirection = {x: 0, y: 0};
};


LevelClass.prototype._styles = {
  bg: {fill: '#FCFCFC', stroke: '#EEEEEE', strokeWidth: 4, radius: 0.3},
  stone: {fill: '#9E9E9E', stroke: '#212121', strokeWidth: 4, radius: 0.5},
  caterpillar: {fill: '#D7CCC8', stroke: '#3E2723', strokeWidth: 20, radius: 1},
  head: {fill: '#A1887F', stroke: '#3E2723', strokeWidth: 20, radius: 1.15},
  fruit: {fill: '#B2FF59', stroke: '#33691E', strokeWidth: 12, radius: 0.5},
  randomFruit: {fill: '#FF4081', stroke: '#880E4F', strokeWidth: 12, radius: 0.5},
};


LevelClass.prototype.onWin = Function.prototype;
LevelClass.prototype.onLose = Function.prototype;


LevelClass.prototype.setup = function() {
  var element = this.targetElement;
  var viewboxSize = $(element).prop('viewBox').baseVal.height;
  this._setGridSize(viewboxSize);
  this._createMap(element);
  this._createWalls();
  this._createFruits();
  this._createRandomFruits();
  this._createCaterpillar();
  this._setInitialDirection();
};


LevelClass.prototype.load = function(levelName) {
  this.params = Levels.findOne({name: levelName});
  this.setup();
};


LevelClass.prototype.setDirection = function(pos) {
  this._caterpillarDirection = pos;
};


LevelClass.prototype.getMaxTurns = function() {
  return this.params.turns;
};

LevelClass.prototype.getDirection = function() {
  return this._caterpillarDirection;
};


LevelClass.prototype.tick = function(callback) {
  var stones = this._stoneDots;
  var fruits = this._fruitDots;
  var dots = this._caterpillarDots;
  var head = dots[dots.length - 1];
  var done = false;
  var lost = false;
  var delay = 300;
  var gSize = this._gridSize;
  var i;

  if(this._caterpillarDirection.x || this._caterpillarDirection.y) {
    for(i=0; i<dots.length - 1; ++i) {
      dots[i].pos = dots[i+1].pos;
    }

    head.pos = {
      x: head.pos.x + this._caterpillarDirection.x * this._gridSize,
      y: head.pos.y + this._caterpillarDirection.y * this._gridSize,
    };
  }

  if((head.pos.x)/gSize >= this.params.size || (head.pos.x)/gSize < 0
    || (head.pos.y)/gSize >= this.params.size || (head.pos.y)/gSize < 0) {
    this.onLose('The caterpillar has travelled out of the game universe');
    return;
  }

  for(i=0; i<stones.length; ++i) {
    var stone = stones[i];
    lost = head.pos.x === stone.pos.x && head.pos.y === stone.pos.y;
    if(lost) {
      this.onLose('The caterpillar just hit a stone');
      return;
    }
  }

  for(i=0; i<dots.length - 1; ++i) {
    var dot = dots[i];
    lost = head.pos.x === dot.pos.x && head.pos.y === dot.pos.y;
    if(lost) {
      this.onLose('Ouch! The caterpillar just bit itself');
      return;
    }
  }

  done = true;
  for(i=0; i<fruits.length; ++i) {
    var fruit = fruits[i];
    if(head.pos.x === fruit.pos.x && head.pos.y === fruit.pos.y) {
      fruit.consumed = true;
      fruit.attr('display', 'none');
    }

    done = done && fruit.consumed;
  }

  for(i=0; i<dots.length; ++i) {
    var circle = dots[i];
    var pos = dots[i].pos;
    circle.stop();
    circle.animate({cx: pos.x, cy: pos.y}, delay, mina.easein);
  }

  if(done) {
    setTimeout(this.onWin.bind(this), delay);
  } else {
    setTimeout(callback, delay);
  }
};


LevelClass.prototype._setGridSize = function(viewboxSize) {
  this._gridSize = viewboxSize/this.params.size;
};


LevelClass.prototype._createMap = function(element) {
  var svg = Snap.call(null, element);
  var styles = this._styles.bg;
  var radius = this._toRadius(styles);

  for(var y=0; y<this.params.size; ++y) {
    for(var x=0; x<this.params.size; ++x) {
      var pos = this._toPosition(x, y);
      circle = svg.circle(pos.x, pos.y, radius);
      circle.attr(styles);
      circle.pos = pos;
    }
  }

  this._mapSvg = svg;
};


LevelClass.prototype._createWalls = function() {
  var svg = this._mapSvg;
  var styles = this._styles.stone;
  var radius = this._toRadius(styles);
  var coords = this.params.stones;

  for(var i=0; i<coords.length; ++i) {
    var pos = this._toPosition(coords[i].x, coords[i].y);
    var rect = svg.rect(pos.x - radius, pos.y - radius, radius*2, radius*2);
    rect.transform('rotate(45, '+pos.x+', '+pos.y+')');
    rect.attr(styles);
    rect.pos = pos;
    this._stoneDots.push(rect);
  }
};


LevelClass.prototype._createFruits = function() {
  var svg = this._mapSvg;
  var styles = this._styles.fruit;
  var radius = this._toRadius(styles);
  var coords = this.params.fruits;

  for(var i=0; i<coords.length; ++i) {
    var pos = this._toPosition(coords[i].x, coords[i].y);
    var circle = svg.circle(pos.x, pos.y, radius);
    circle.attr(styles);
    circle.pos = pos;
    this._fruitDots.push(circle);
  }
};


LevelClass.prototype._createRandomFruits = function() {
  var svg = this._mapSvg;
  var styles = this._styles.randomFruit;
  var radius = this._toRadius(styles);
  var coords = this._getFreeCoordinates(this.params.randomFruits);

  for(var i=0; i<coords.length; ++i) {
    var pos = this._toPosition(coords[i].x, coords[i].y);
    var circle = svg.circle(pos.x, pos.y, radius);
    circle.attr(styles);
    circle.pos = pos;
    this._fruitDots.push(circle);
  }
};


LevelClass.prototype._createCaterpillar = function() {
  var svg = this._mapSvg;
  var bodyStyles = this._styles.caterpillar;
  var headStyles = this._styles.head;
  var coords = this.params.caterpillar;

  for(var i=0; i<coords.length; ++i) {
    var pos = this._toPosition(coords[i].x, coords[i].y);
    var styles = bodyStyles;
    var radius = this._toRadius(styles);

    if(i === coords.length - 1) {
      styles = headStyles;
      radius = this._toRadius(styles);
    }

    var circle = svg.circle(pos.x, pos.y, radius);
    circle.attr(styles);
    circle.pos = pos;
    this._caterpillarDots.push(circle);
  }
};


LevelClass.prototype._setInitialDirection = function() {
  var coords = this.params.caterpillar;
  var neck = coords[coords.length - 2];
  var head = coords[coords.length - 1];
  this._caterpillarDirection = {
    x: head.x - neck.x,
    y: head.y - neck.y,
  };
};


LevelClass.prototype._toPosition = function(x, y) {
  var pos = {
    x: (x + 0.5) * this._gridSize,
    y: (y + 0.5) * this._gridSize,
  };

  return pos;
};


LevelClass.prototype._toRadius = function(styles) {
  return styles.radius * this._gridSize / 2;
};


LevelClass.prototype._getFreeCoordinates = function(count) {
  if(!count) {
    return [];
  }

  var caterpillar = this.params.caterpillar;
  var stones = this.params.stones;
  var fruits = this.params.fruits;
  var elements = caterpillar.concat(stones).concat(fruits);

  var allCoords = {};
  var i, j, el;

  for(i=0; i<this.params.size; ++i) {
    for(j=0; j<this.params.size; ++j) {
      allCoords[i+','+j] = true;
    }
  }

  for(i=0; i<elements.length; ++i) {
    el = elements[i];
    delete allCoords[el.x+','+el.y];
  }

  var keys = _.keys(allCoords);
  keys = _.shuffle(keys);
  keys = _.first(keys, count) || [];

  return keys.map(function (str) {
    var parts = str.split(',');
    return {x: parseInt(parts[0]), y: parseInt(parts[1])};
  });
};
