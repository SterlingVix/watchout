var Player = function() {
  this.playerID; // generated upon instantiation
  this.className = "player";
  this.cx = "50"; // random x position in viewbox
  this.cy = "50"; // random y position in viewbox
  this.radius = '1';
  this.stroke = 'red';
}; // end Enemy class

Player.prototype.updatePosition = function(xDestination, yDestination) {
  this.cx = xDestination || Math.floor(Math.random() * 90) + 5; // updates x position
  this.cy = yDestination || Math.floor(Math.random() * 90) + 5; // as above for cy
};
