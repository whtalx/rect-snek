export default function newFood(draw = true) {
  let foodX = 0;
  let foodY = 0;
  let snake = this.state.snake;
  let obstacle = this.state.obstacle;

  let random = () => {
    foodX = Math.floor(Math.random() * 10);
    foodY = Math.floor(Math.random() * 20);
    
    /* if food appeared iside snake or inside obstacle -- make new food */
    snake.forEach(item => {
      if (item.x === foodX && item.y === foodY) random();
    });
    obstacle.forEach(item => {
      if (item.x === foodX && item.y === foodY) random();
    });
  }

  random();
  this.setState({food: [{x: foodX, y: foodY, status : 'blink'}]});

  /* sometimes food doesn't appearing while playing level,
   * so i render it twice: immediately here and in play() with tiomeout
   */
  if (draw) this.switchPixels(this.state.food);
}