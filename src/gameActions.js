var InitializeGame = function(numEnemies) { // THE BIG BOARD!!!
  var enemies = {}; // object of enemies
  var updateSpeed = 1000;
  var enemyIDCreator = 1;
  // var enemyMovementSpeed = 1000; // TODO: Currently broken (after moving scopes)



  // CREATE PLAYER
  var createPlayer = function(j) {
    var instance = new Player();

    // Dragging function         // MOVE THIS to Player.js ?!?!?!?!?
    var drag = d3.behavior.drag() // gives us access to d3.event.x/y <== coordinates of mouse
      .on("drag", function() {
        instance.cx = d3.event.x; // put DOM values from mouse coordinates in instance object properties
        instance.cy = d3.event.y; // put DOM values from mouse coordinates in instance object properties

        d3.select(this) // "this" refers to whatever .call is chained to! Here: allows DOM manipulation (update player avatar position)
          .attr("cx", instance.cx)
          .attr("cy", instance.cy);
      }); // end .on(drag)

    // add player to board
    d3.select(".player-group")
      .append("circle")
      .attr({
        id: "Player" + j, // gives enemy an id of "i"
        cx: instance.cx, // sets the 'cx' property of the html 'circle' node from the 'instance.position' array (which is really an object)
        cy: instance.cy,
        r: instance.radius,
        stroke: instance.stroke,
        class: instance.className
      })
      .call(drag); // drag the player

    return instance; // factory function to return instance to enemies object
  }; // end create player



  // This createEnemy function operates in the window scope!
  var createEnemy = function() {
    var instance = new Enemy();
    instance.EnemyID = enemyIDCreator; // assign unique ID to enemy

    d3.select(".enemy-group") // points d3 at the SVG <g> tag for enemies
      .append("circle")
      .attr({
        id: "Enemy" + instance.EnemyID, // gives enemy an id of "enemyIDCreator"
        cx: instance.cx, // sets the 'cx' property of the html 'circle' node from the 'instance.position' array (which is really an object)
        cy: instance.cy,
        r: instance.radius,
        stroke: instance.stroke,
        class: instance.className
      });

    theTransition(instance); // run theTransition on this instance to start it moving

    enemyIDCreator++;
    return instance; // factory function to return instance to enemies object
  }; // end createEnemy function



  var theTransition = function(instance){ // enemy transition animation
    var element = d3.select("#Enemy" + instance.EnemyID);
    instance.updatePosition();

    element.transition()
      .duration(1000)
      .attr('cx', instance.cx)
      .attr('cy', instance.cy)
      .tween('custom', collisionCheck) // will call newPositionForEnemies
      .each("end", function(){
        theTransition(instance); // recurse through theTransition, calling it on this abject forevert. FOREEEVVVEEERRRR!!!!!!!!
      });
  }; // end theTransition



  var collisionCheck = function(){ // checks for player and enemy overlapping
    // debugger;
    return function(t) { // return this factory function
      var thisInstance = d3.select(this);
      var minimalDist = 3 * parseInt( thisInstance.attr('r')) + player.radius;
      var xDifferenceSqr = Math.pow(parseFloat( thisInstance.attr('cx')) - player.cx, 2);
      var yDifferenceSqr = Math.pow(parseFloat( thisInstance.attr('cy')) - player.cy, 2);
      var currentDist = Math.sqrt(xDifferenceSqr + yDifferenceSqr);

      if (currentDist < minimalDist){
        return true; // has collision
      }
      return false; // no collsion
    }
  }; // end collisionCheck



  //create player
  window.player = createPlayer(1);

  //create Enemies
  for (var i = 0; i < numEnemies; i++) {
    enemies[enemyIDCreator] = createEnemy(enemyIDCreator); // createEnemy returns a new instance of an enemy
  } // end for
}; // end initializeGame
