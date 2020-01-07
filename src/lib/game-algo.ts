// types
export type Matrix = number[][]
export type Coordinate = [ number, number ]
// helpers
export const getSign = ( num: number ) => num && (num / Math.abs( num ))
export const booleanXor = ( a: boolean, b: boolean ) => !!( Number(a) ^ Number(b) )
export function coordToIndex( row: number, col: number, colMax: number ) {
  return ( row * colMax ) + col 
}

export function getPosMap( matrix: Matrix ) {
  let map = new Map
  for( let row = 0; row < matrix.length; row ++ ) {
    for( let col = 0; col < matrix[0].length; col++) {
      map.set( matrix[row][col], [ row, col ] )
    }
  }
  return map
}


export function getEmptySquareCoord( matrix: Matrix ) {
  let emptySquare = matrix.length * matrix[0].length
  for( let row = 0; row < matrix.length; row ++) {
    for( let col = 0; col < matrix[0].length; col++) {
      if( matrix[row][col] === emptySquare ) {
        return [row,col]
      }
    }
  }
}

export function getValidSquares( matrix: Matrix ) {
  let mapToIndex = ( _ ,index ) => index 
  let [ emptyRow , emptyCol ] = getEmptySquareCoord(matrix)

  let rowArr = Array.from( { length: matrix.length } ).map( mapToIndex )
  let colArr = Array.from( { length: matrix[0].length } ).map( mapToIndex )

  let validRows = rowArr
    .filter( (row) => row !== emptyRow )
    .map( row => [ row, emptyCol ])

  let validCols = colArr
    .filter( (col) => col !== emptyCol )
    .map( col => [ emptyRow, col ]) 

  return [ validRows ,validCols ]
} 

function matrixMove( matrix: Matrix, from: number, to: number, fixed: number, traverseRow = true) {
  let emptySqaureValue = ( 
    traverseRow
      ? matrix[ fixed ][ from ] 
      : matrix[ from ][ fixed ] 
  )
  if( to - from === 0 ) return matrix
  let step = getSign( to - from )
  let condition = ( index ) => (
    step > 0
      ? index < to
      : index > to
  )
  for( let index = from; condition( index ); index += step) {
    if( traverseRow ) {
      matrix[ fixed ][ index ] = matrix[ fixed ][ index + step ]
    } else {
      matrix[ index ][ fixed ] = matrix[ index + step ][ fixed ]
    } 
  }
  if( traverseRow ) {
    matrix[ fixed ][ to ] = emptySqaureValue
  } else {
    matrix[ to ][ fixed ] = emptySqaureValue
  }
  return matrix
}

export function moveFromTo( matrix: Matrix, [ fromRow, fromCol ]: Coordinate, [ toRow, toCol ]: Coordinate ) {
  if( fromRow === toRow ) {
    return matrixMove( matrix, fromCol, toCol, fromRow )
  } else if( fromCol === toCol ) {
    return matrixMove( matrix, fromRow, toRow, fromCol, false )
  }
  // move not possible
  return null
}

export function jsonCopy<A>( obj: A ): A {
  if( typeof obj !== 'object' ) {
    return obj
  }
  let result = (
    Array.isArray( obj )
      ? []
      : {}
  )
  for( let [ key, val ] of Object.entries( obj ) ) {
    result[ key ] = jsonCopy( val )
  }
  return result as A
}

export function isValidMove( matrix: Matrix, [ fromRow, fromCol ]: Coordinate, [toRow, toCol ]: Coordinate) {
  if( !Array.isArray( matrix[ fromRow ]) || !Array.isArray( matrix[toRow])) {
    return false
  }
  if( matrix[ fromRow][ fromCol ] == null || matrix[toRow][toCol] == null ) {
    return
  }
  let rowEqual = fromRow === toRow
  let colEqual = fromCol === toCol
  return booleanXor( rowEqual, colEqual )
}

export function slideFromToEmpty( matrix: Matrix, toRow: number, toCol: number ) {
  let [ fromRow, fromCol ] = getEmptySquareCoord( matrix )
  if(!isValidMove( matrix, [fromRow,fromCol], [toRow,toCol])) {
    return matrix
  }
  return moveFromTo( matrix, [ fromRow, fromCol ], [ toRow, toCol ])
}

export function slideFromToEmptyImmutable( matrix: Matrix, toRow: number, toCol: number ) {
  return slideFromToEmpty( jsonCopy( matrix ), toRow, toCol)
}

export function slideFromToEmptyTrackMoves( moves: Matrix[], matrix: Matrix, toRow: number, toCol: number ) {
  moves.push( matrix )
  return slideFromToEmpty( jsonCopy( matrix ), toRow, toCol)
}

function getRandomFromArray<A>( arr: A[] ) {
  let randomIndex = Math.floor( Math.random() * arr.length )
  return arr[randomIndex]
}

export function scrambleMatrix( matrix: Matrix, difficulty = 12 ) {
  let moves = [matrix]
  let currentMatrix = matrix
  for( let index = 0; index < difficulty; index++ ) {
    let [ validRows, validCols ] = getValidSquares( currentMatrix )
    let [ randomRow, randomCol ] = getRandomFromArray( index % 2 ? validCols : validRows )
    // console.log({randomRow,randomCol, index, validRows, validCols})
    currentMatrix = slideFromToEmptyImmutable( currentMatrix, randomRow, randomCol  )
    moves.push(currentMatrix)
  }
  return moves
}


export function isSolved( matrix: Matrix ) {
  for( let row = 0; row < matrix.length; row++ ) {
    for( let col = 0; col < matrix[0].length; col++) {
      if( matrix[row][col] !== coordToIndex(row,col,matrix[0].length) + 1)  {
        return false
      }
    }
  }
  return true
}

export function newBoard( totalRows: number, totalCols: number ) {
  let matrix = []
  for( let row = 0; row < totalRows; row++ ) {
    for( let col = 0; col < totalCols; col++ ) {
      matrix[ row ] = matrix[ row ] || []
      matrix[ row ].push( coordToIndex( row, col, totalCols ) + 1 )
    }
  }
  return matrix
}