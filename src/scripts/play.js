export default function play() {
  let food = this.state.food;
  let snake = this.state.snake;
  let nextDirection = this.state.nextDirection;

  /* if food appeared iside snake -- make new food */
  snake.forEach(item => {
    if (item.x === food[0].x && item.y === food[0].y) {
      this.newFood();
    }
  });

    this.switchPixels(food);

  /* declaring snake parts */
  let tail = snake[0];
  let head = snake[snake.length - 1];
  let nextCoord = {x: head.x, y: head.y, status: head.status};

  /* get moving direction and let it possible to make new direction */
  if (nextDirection !== null) {
    this.setState({
      direction: nextDirection,
      nextDirection: null
    })
  }
  
  let direction = this.state.direction;

  if (direction === 'right') {
    nextCoord.x++
  } else if (direction === 'left') {
    nextCoord.x--
  } else if (direction === 'up') {
    nextCoord.y--
  }else if (direction === 'down') {
    nextCoord.y++
  }

  /* remove tail */
  snake.shift();
  tail.status = 'off';
  this.switchPixels([tail]);

  /* bite itself game over */
  snake.forEach(item => {
    if ( item.x === nextCoord.x && item.y === nextCoord.y) {
      this.gameOver([item]);
      }
  });

  /* get off screen game over */
  if (nextCoord.x > 9 ||
      nextCoord.x < 0 ||
      nextCoord.y > 19 ||
      nextCoord.y < 0) {
    this.gameOver([head]);
  }

  /* make new head */
  head.status = 'on';
  nextCoord.status = 'blink';
  snake.push(nextCoord);
  
  /*grow if eating food, make new food */
  if (nextCoord.x === food[0].x && nextCoord.y === food[0].y) {
    this.newFood();
    snake.unshift(tail);
    console.log('levelUp');
  }

  /* draw snake with new coordinates */
  this.setState({snake: snake});
  this.switchPixels(snake);

  /* repeat until death */
  if (this.state.isAlive) this.resume();
}