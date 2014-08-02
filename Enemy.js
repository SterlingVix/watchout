var Enemy = function() {
  this.enemyID; // generated upon instantiation
  this.className = "enemy";
  this.cx = Math.floor(Math.random() * 90) + 5; // random x position in viewbox
  this.cy = Math.floor(Math.random() * 90) + 5; // random y position in viewbox
  this.stroke = 'black';
  this.radius = '1';
  // this.speed = 1000;
}; // end Enemy class

Enemy.prototype.updatePosition = function(xDestination, yDestination) {
  this.cx = xDestination || Math.floor(Math.random() * 90) + 5; // updates x position
  this.cy = yDestination || Math.floor(Math.random() * 90) + 5; // as above for cy
};
