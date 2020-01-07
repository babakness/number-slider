export function* enumerate<A>( iter: Iterable<A> ) {
  let index = 0
  for( let item of iter ) {
    yield [ index++, item ] as [ number, A ]
  }
}

export async function promiseTimeout( delayInMs: number ) {
  return new Promise( ( resolve, reject ) => {
    setTimeout( resolve, delayInMs )
  })
}

export async function* arrayToAsyncStream<A>( delayInSeconds: number, arr: A[] ) {
  for( let item of arr ) {
    await promiseTimeout( delayInSeconds * 1000 )
    yield item
  }
}

/**
 * HOF to prevent calls to an async function before it resolves
 * @param fn async function to throttle until resolve
 */
export function throttleAsyncCalls<A,B>( 
    fn: (...args: A[]) => Promise<B> 
  ) {
  let wait = false
  return async function( ...args: A[] ) {
    if( wait === true ) {
      return
    }
    wait = true
    let result = await fn( ...args )
    wait = false
    return result
  }
}

export const last = <A>( arr: A[]) => arr[ arr.length - 1 ] 