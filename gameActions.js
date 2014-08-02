var initializeGame = function(numEnemies) { // THE BIG BOARD!!!
  var enemies = {}; // object of enemies
  var updateSpeed = 1000;
  var enemyMovementSpeed = 1000;

  //create player
  var player = createPlayer(1)

  //create Enemies
  for (var i = 0; i < numEnemies; i++) {
    enemies[i] = createEnemy(i);
  } // end for

  // var newPositionForEnemies = function(obj, xDest, yDest) {
  var newPositionForEnemies = function(obj) {
    for (var key in obj) { // iterate through passed-in obj
      obj[key].updatePosition(); // if this breaks, do an if(undefined) check
      d3.select("#Enemy" + key)
        .transition()
        .delay(50)
        .duration(enemyMovementSpeed)
        .attr('cx', obj[key].cx)
        .attr('cy', obj[key].cy)

    } // end for (iterate through object)

  }; // end newPositionForEnemies
  setInterval(newPositionForEnemies.bind(this, enemies), updateSpeed);
}; // end initializeGame

// This createEnemy function operates in the window scope!
var createEnemy = function(i) {
  var instance = new Enemy();
  d3.select(".enemy-group")
    .append("circle")
    .attr({
      id: "Enemy" + i, // gives enemy an id of "i"
      cx: instance.cx, // sets the 'cx' property of the html 'circle' node from the 'instance.position' array (which is really an object)
      cy: instance.cy,
      r: instance.radius,
      stroke: instance.stroke,
      class: instance.className
    });

  return instance; // factory function to return instance to enemies object
}; // end createEnemy function

var createPlayer = function(j) {
  var instance = new Player();
  var drag = d3.behavior.drag()
    .on("drag", function(d, i) {
      var x = d3.event.x;
      var y = d3.event.y;
      d3.select(this)
        .attr("cx", x)
        .attr("cy", y);
    });

  d3.select(".player-group")
    .append("circle")
    .attr({
      id: "Player" + j, // gives enemy an id of "i"
      cx: instance.cx, // sets the 'cx' property of the html 'circle' node from the 'instance.position' array (which is really an object)
      cy: instance.cy,
      r: instance.radius,
      stroke: instance.stroke,
      class: instance.className,
      // transform: "translate (" + instance.cx + "," + instance.cy + ")"
    })
    .call(drag);

  return instance; // factory function to return instance to enemies object
};
