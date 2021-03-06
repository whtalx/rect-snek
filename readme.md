# Snake game

[Play](https://whtalx.github.io/react-snek/)

The game simulate 90s «Brick Game» version of [Snake](https://en.wikipedia.org/wiki/Snake_(video_game_genre)).

## Instructions

### Display

Display indicators:
1) Total score of current game.
2) Highest score of all games. It stored in `localStorage`.
3) Current level. There is 7 levels, started with zero («00»). In each level there is obstacles, which amount equals level value.
4) Current speed, also started with zero. Speed increasing with every third food eaten. On reaching seventh speed current level completing.
5) Lives amount. First level starting with three lives, on every next level this amount increases by one. This picture showing 5 lives out of 9:
<div align="center"><img src="./images/lives.png" /></div>

6) Pause indicator.
7) Sound indicator. Sound is enabled by default, but it will start with game starts. So, you can disable it before.

### Controls

All buttons can be pressed by mouse/touch on screen or with keys on keyboard.

Key bindings:
* <kbd>Enter</kbd> — start
* <kbd>Space</kbd> — pause
* <kbd> M </kbd> — sound
* <kbd> W </kbd> or <kbd> &#9650; </kbd> — up
* <kbd> S </kbd> or <kbd> &#9660; </kbd> — down
* <kbd> A </kbd> or <kbd> &#9668; </kbd> — left
* <kbd> D </kbd> or <kbd> &#9658; </kbd> — right

### Gameplay

Every level starts with snake length of three. Head of snake and food are marked blinking.

Changing direction cause snake move instantly to new direction. While moving along screen border, game prevent you for turn out of screen.

Move out of the screen or bump an obstacle cause death.

Death decreases lives amount while above zero, otherwise it ends the game.

Snake can reverse if you turn to opposite direction. Reversed direction is direction which snake tail pointing on. On picture below current direction is «right» and if you turn left, snake will move up.
<div align="center"><img src="./images/reverse.png" /></div>

## Built With

* [React](https://reactjs.org/) – A JavaScript library for building user interfaces.
* [Jest](https://jestjs.io/) – JavaScript testing framework.
* [Enzyme](https://airbnb.io/enzyme/) – Testing utility for React.
* [SASS](https://sass-lang.com/) – CSS extension language.
* [Web Audio API](https://www.w3.org/TR/webaudio/) – High-level Web API for processing and synthesizing audio.

## Acknowledgments

* [Philipp](https://github.com/psr1919plus21) for help & support
* [Jonathan Neal](https://gist.github.com/jonathantneal) for @font-face [mixin](https://gist.github.com/jonathantneal/d0460e5c2d5d7f9bc5e6)
