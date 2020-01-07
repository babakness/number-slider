# Play

https://number-slider.algogames.dev

# Number slider

Flying as a kid, I remember getting these free square puzzles with a 4x4 grid of numbers on them. Each number was housed in a square. That last piece was missing, so you could slide the squares could slide around.

<img src="https://github.com/babakness/number-slider/blob/master/src/images/number-slider.gif?raw=true" />

The objective of the game was to have someone scramble the board for you then solve it so that the numbers appeared sequentially, with the empty piece on the lower right side.

## Algorithm

Making this game presents a number of neat challenges. The key algorithm to making this work is, given a matrix of numbers with size N*M, and empty piece, E; move each piece from a select piece P<sub>0</sub> toward E.

Suppose we number each piece adjacent to P<sub>0</sub> in an increasing fashion, ie P<sub>1</sub>, P<sub>2</sub>, ...P<sub>n</sub> until we reach the empty square E. After the move, P<sub>n</sub> will occupy the position of E, and each piece before it will move likewise until P<sub>0</sub> is in the position of P<sub>1</sub>.

Finally, after P<sub>0</sub> moves, the piece E is placed in its prior position.

## Game Design

This game can be thought of as breaking down following the MVC structure. The main algorithms can be thought of as the Model, and the code manipulates the DOM as the Controller. Finally, the html page and the styles involved can be considered the View.

I use these names loosely, the essential idea is to break up our code into just enough abstractions to organize our code; but not so many as to create confusion.

## Play around!

Have fun!

https://number-slider.algogames.dev

Follow me on Twitter at <a href="https://twitter.com/babakness">Babakness</a>.