var initializeGame = function(numEnemies) { // THE BIG BOARD!!!
  var enemies = {}; // object of enemies
  var updateSpeed = 200;
  var enemyMovementSpeed = 500;

  for (var i = 0; i < numEnemies; i++) {
    enemies[i] = createEnemy(i);
  } // end for




  // var newPositionForEnemies = function(obj, xDest, yDest) {
  var newPositionForEnemies = function(obj) {
    for (var key in obj) { // iterate through passed-in obj
      obj[key].updatePosition(); // if this breaks, do an if(undefined) check
      d3.select("#ID" + key)
        .transition()
        // .delay(100)
        .duration(enemyMovementSpeed)
        .attr('cx', obj[key].cx)
        .attr('cy', obj[key].cy)

    } // end for (iterate through object)
    // d3.transition(obj[key].enemyID)

  }; // end newPositionForEnemies


  var context = this;
  setInterval(newPositionForEnemies.bind(context, enemies), updateSpeed);
}; // end initializeGame


// This createEnemy function operates in the window scope!
var createEnemy = function(i) {
  var instance = new Enemy();
  d3.select(".enemy-group")
    .append("circle")
    .attr({
      id: "ID" + i,               // gives enemy an id of "i"
      cx: instance.cx, // sets the 'cx' property of the html 'circle' node from the 'instance.position' array (which is really an object)
      cy: instance.cy,
      r:  instance.radius,
      stroke: instance.stroke,
      class: instance.className
    });

  return instance; // factory function to return instance to enemies object
}; // end createEnemy function




    // .data([instance.position])
    // .classed(instance.className, true)
    // .enter()
