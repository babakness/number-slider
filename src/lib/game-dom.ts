
import { getPosMap, Matrix, Coordinate, isSolved, slideFromToEmptyImmutable, newBoard, getEmptySquareCoord } from './game-algo'
import { arrayToAsyncStream, enumerate, promiseTimeout, last } from './helpers'

export class GameDom {
  private readonly squares: NodeListOf<HTMLElement>
  private readonly squareSet: Set<HTMLElement>
  private moves: Matrix[] = []
  private newBoard: Matrix
  private defaultSecondsPerMove: number
  private readonly row: number
  private readonly col: number
  constructor( squares, row, col, defaultSecondsPerMove = .25 ) {
    this.squares = squares
    this.squareSet = new Set(squares)
    this.defaultSecondsPerMove = defaultSecondsPerMove
    this.row = row
    this.col = col
    this.newBoard = newBoard( this.row, this.col )
    this.reset()
    return this
  }

  /**
   * Render board from mapping between piece and position
   * @param map mapping between piece and position
   */
  private setClasses( map: Map<number,Coordinate> ) {
    let [ emptyRow, emptyCol ] = getEmptySquareCoord( this.getCurrentState() )
    for( let [ index, el ] of enumerate( this.squares ) ) {
      let [ row, col ] = map.get( index + 1 )
      let position = `${ row }-${ col }`
      let notEmptySquare = index + 1 !== this.row * this.col
      let isMovable = row === emptyRow || col === emptyCol

      el.dataset.position = position
      el.tabIndex = ( notEmptySquare && isMovable )
        ? (row * this.col) + col
        : -1
    }
  }
  
  /**
   * render the next state of the board
   * @param matrix state of board to render
   */
  private nextBoardState( matrix: Matrix ) {
    let map = getPosMap( matrix )
    this.moves.push( matrix )
    this.setClasses( map )
  }

  /**
   * Configure squares for transition animation, run animation, then revert back to prior transition configuration
   * @param callback async function to run and wait on
   * @param postCallbackDelay time to wait after callback is complete
   */
  private async animateSquares( callback: () => Promise<unknown>, postCallbackDelay ) {
    let previousTransition = []
    for( let square of this.squares ) {
      previousTransition.push(square.style.transition)
      square.style.transition = `all ${ postCallbackDelay }s ease`
    }
    await callback()
    await promiseTimeout( postCallbackDelay * 1000 )
    for( let square of this.squares ) {
      square.style.transition = previousTransition.shift()
    }
  }

  /*

  Public API

  */

  /**
   * Reset game, reset board and moves stack
   */
  reset() {
    let matrix = this.newBoard
    let map = getPosMap( matrix )
    this.setClasses( map )
    this.moves = [ matrix ]
  }

  /**
   * Last recorded move on move stack
   */
  getCurrentState() {
    return this.moves.length 
      ? last(this.moves) 
      : this.newBoard
  }

  /**
   * List of boards represent each state of current game
   */
  getMoveHistory() {
    return this.moves
  }
  /**
   * Predicate, check to see if a dom element is one configured as a square
   * @param domElement element to check
   */
  isValidPiece( domElement: Element ) {
    if( this.squareSet.has( domElement as HTMLElement )) {
      return true
    }
    return false
  }

  /**
   * Predicate to check if game has been solved
   */
  isBoardSolved() {
    let matrix = last( this.moves )
    return isSolved(matrix) 
  }

  /*

  Timing Functions

  */

  /**
   * Animate squares, async function resolves when animation is complete
   * @param matrixMoves moves to playback, default is moves already played
   * @param secondsPerMove seconds animation should take per move, defaults to timing provided on initiation of instance
   */
  async animateMoves(matrixMoves: Matrix[] = this.moves, secondsPerMove = this.defaultSecondsPerMove ) {
    let action = async () => {
      for await( let board of arrayToAsyncStream( secondsPerMove, matrixMoves ) ) {
        this.nextBoardState( board )
      }
    }
    return this.animateSquares( action, secondsPerMove )
  }

  /**
   * Move a piece if it is valid
   * @param square square to move
   * @param secondsPerMove seconds the animation should take, defaults to timing provided on initiation of instance
   */
  async movePiece( square: Element, secondsPerMove = this.defaultSecondsPerMove ) {
    if(!this.isValidPiece( square )) {
      return
    }
    let validSquare: HTMLElement = square as HTMLElement
    let [ row, col ] = validSquare.dataset.position.split('-')
    let nextState = slideFromToEmptyImmutable( 
      last( this.moves ), 
      Number( row ), 
      Number( col )
    )
    this.animateSquares(
      async () => this.nextBoardState( nextState ),
      secondsPerMove
    )
  }
}

