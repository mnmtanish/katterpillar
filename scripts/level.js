function Level (params) {
  // params => {size, snake, walls, fruits}
  this.params = params;
  this._mapSvg = null;
  this._gridSize = null;
  this._wallDots = [];
  this._fruitDots = [];
  this._snakeDots = [];
}


Level.prototype._styles = {
  bg: {fill: '#fafafa', stroke: '#ccc', strokeWidth: 4, radius: 0.4},
  wall: {fill: '#9E9E9E', stroke: '#212121', strokeWidth: 4, radius: 0.5},
  snake: {fill: '#90A4AE', stroke: '#263238', strokeWidth: 8, radius: 0.7},
  fruit: {fill: '#A5D6A7', stroke: '#1B5E20', strokeWidth: 4, radius: 0.5},
};


Level.prototype.setup = function(element) {
  var viewboxSize = $(element).prop('viewBox').baseVal.height;
  this._setGridSize(viewboxSize);
  this._createMap(element);
  this._createWalls();
  this._createFruits();
  this._createSnake();
};


Level.prototype._setGridSize = function(viewboxSize) {
  this._gridSize = viewboxSize/this.params.size;
};


Level.prototype._createMap = function(element) {
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


Level.prototype._createWalls = function() {
  var svg = this._mapSvg;
  var styles = this._styles.wall;
  var radius = this._toRadius(styles);
  var coords = this.params.walls;

  for(var i=0; i<coords.length; ++i) {
    var pos = this._toPosition(coords[i].x, coords[i].y);
    circle = svg.circle(pos.x, pos.y, radius);
    circle.attr(styles);
    circle.pos = pos;
    this._wallDots.push(circle);
  }
};


Level.prototype._createFruits = function() {
  var svg = this._mapSvg;
  var styles = this._styles.fruit;
  var radius = this._toRadius(styles);
  var coords = this.params.fruits;

  for(var i=0; i<coords.length; ++i) {
    var pos = this._toPosition(coords[i].x, coords[i].y);
    circle = svg.circle(pos.x, pos.y, radius);
    circle.attr(styles);
    circle.pos = pos;
    this._fruitDots.push(circle);
  }
};


Level.prototype._createSnake = function() {
  var svg = this._mapSvg;
  var styles = this._styles.snake;
  var radius = this._toRadius(styles);
  var coords = this.params.snake;

  for(var i=0; i<coords.length; ++i) {
    var pos = this._toPosition(coords[i].x, coords[i].y);
    circle = svg.circle(pos.x, pos.y, radius);
    circle.attr(styles);
    circle.pos = pos;
    this._snakeDots.push(circle);
  }
};


Level.prototype._toPosition = function(x, y) {
  var pos = {
    x: (x + 0.5) * this._gridSize,
    y: (y + 0.5) * this._gridSize,
  };

  return pos;
};


Level.prototype._toRadius = function(styles) {
  return styles.radius * this._gridSize / 2;
};
