
import { scrambleMatrix, newBoard  } from './lib/game-algo'
import { GameDom } from './lib/game-dom'
import { promiseTimeout, last, throttleAsyncCalls } from './lib/helpers'
import { inOutAnimate, randomInOutAnimate } from './lib/animate'


document?.addEventListener('DOMContentLoaded', async () => {

  /*
   *
   Initial Game Elements
   *
   */

  let squares = document.querySelectorAll('ul li')
  let board = document.querySelector('ul')
  let shuffleButton = document.querySelector('.shuffle')
  let resetButton = document.querySelector('.reset')
  let winEl = document.querySelector('.win')
  let shuffles = 0
  /* 
   *
   Initialize Game
   *
   */

  let game = new GameDom( squares, 4, 4 )

  /*
   *
   Define Game Event Handlers
   *
   */

  // shuffle board
  let shuffleHandler = throttleAsyncCalls( async function( event: Event ) {
    let moves = scrambleMatrix( game.getCurrentState(), 6 )
    await game.animateMoves( moves, .1 )
    shuffles++
  })

  //
  // reset logic
  let resetHandler = throttleAsyncCalls( async function( event: Event ) {
    let moves = game.getMoveHistory().reverse()
    let reverseGame = moves.slice( 1, )
    let speed = reverseGame.length > 12 
      ? 1 / ( ( ( reverseGame.length - 12 ) / 10) ** .5 )
      : 1
    if( reverseGame.length < 50 ) {
      await game.animateMoves( reverseGame, .08 * speed )
    } 
    
    game.reset()
  })

  //
  // handle game play
  let gamePlayHandler = async function( event: Event ) {
    if( !game.isValidPiece( event.target as Element ) ){
      return
    }
    game.movePiece( event.target as Element )
    if( game.isBoardSolved() && shuffles > 0 ) {
      await promiseTimeout( 200 )
      randomInOutAnimate( winEl )
      game.reset()
      shuffles = 0
    }
  }

  /*
   * 
   Game Event Listners
   *
   */
  shuffleButton.addEventListener( 'click', shuffleHandler )
  resetButton.addEventListener( 'click', resetHandler )
  board.addEventListener( 'click', gamePlayHandler )
  board.addEventListener( 'keypress', function( event ) {
    let mouseClick = new MouseEvent('click', {bubbles: true})
    if( event.key.toLowerCase() === 'enter' ) {
      event.target.dispatchEvent(mouseClick)
    }
  } )

})
