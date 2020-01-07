import { promiseTimeout } from "./helpers";

export type Animations = 'bounce' | 'flash' | 'pulse' | 'rubberBand' | 'shake' | 'swing' | 'tada' | 'wobble' | 'jello' | 'heartBeat' | 'bounceIn' | 'bounceInDown' | 'bounceInLeft' | 'bounceInRight' | 'bounceInUp' | 'bounceOut' | 'bounceOutDown' | 'bounceOutLeft' | 'bounceOutRight' | 'bounceOutUp' | 'fadeIn' | 'fadeInDown' | 'fadeInDownBig' | 'fadeInLeft' | 'fadeInLeftBig' | 'fadeInRight' | 'fadeInRightBig' | 'fadeInUp' | 'fadeInUpBig' | 'fadeOut' | 'fadeOutDown' | 'fadeOutDownBig' | 'fadeOutLeft' | 'fadeOutLeftBig' | 'fadeOutRight' | 'fadeOutRightBig' | 'fadeOutUp' | 'fadeOutUpBig' | 'flip' | 'flipInX' | 'flipInY' | 'flipOutX' | 'flipOutY' | 'lightSpeedIn' | 'lightSpeedOut' | 'rotateIn' | 'rotateInDownLeft' | 'rotateInDownRight' | 'rotateInUpLeft' | 'rotateInUpRight' | 'rotateOut' | 'rotateOutDownLeft' | 'rotateOutDownRight' | 'rotateOutUpLeft' | 'rotateOutUpRight' | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight' | 'slideOutUp' | 'slideOutDown' | 'slideOutLeft' | 'slideOutRight' | 'zoomIn' | 'zoomInDown' | 'zoomInLeft' | 'zoomInRight' | 'zoomInUp' | 'zoomOut' | 'zoomOutDown' | 'zoomOutLeft' | 'zoomOutRight' | 'zoomOutUp' | 'hinge' | 'jackInTheBox' | 'rollIn' | 'rollOut';

export type InAnimation = 'bounce' ​ | 'flash' ​ | 'pulse' ​ | 'rubberBand' ​ | 'shake' ​ | 'swing' ​ | 'tada' ​ | 'wobble' ​ | 'jello' ​ | 'heartBeat' ​ | 'bounceIn' ​ | 'bounceInDown' ​ | 'bounceInLeft' ​ | 'bounceInRight' ​ | 'bounceInUp' ​ | 'fadeIn' ​ | 'fadeInDown' ​ | 'fadeInDownBig' ​ | 'fadeInLeft' ​ | 'fadeInLeftBig' ​ | 'fadeInRight' ​ | 'fadeInRightBig' ​ | 'fadeInUp' ​ | 'fadeInUpBig' ​ | 'flip' ​ | 'flipInX' ​ | 'flipInY' ​ | 'lightSpeedIn' ​ | 'rotateIn' ​ | 'rotateInDownLeft' ​ | 'rotateInDownRight' ​ | 'rotateInUpLeft' ​ | 'rotateInUpRight' ​ | 'slideInUp' ​ | 'slideInDown' ​ | 'slideInLeft' ​ | 'slideInRight' ​ | 'zoomIn' ​ | 'zoomInDown' ​ | 'zoomInLeft' ​ | 'zoomInRight' ​ | 'zoomInUp' ​ | 'hinge' ​ | 'jackInTheBox' ​ | 'rollIn' ​
export const inAnimations: InAnimation[] = [ 'bounce' ​ , 'flash' ​ , 'pulse' ​ , 'rubberBand' ​ , 'shake' ​ , 'swing' ​ , 'tada' ​ , 'wobble' ​ , 'jello' ​ , 'heartBeat' ​ , 'bounceIn' ​ , 'bounceInDown' ​ , 'bounceInLeft' ​ , 'bounceInRight' ​ , 'bounceInUp' ​ , 'fadeIn' ​ , 'fadeInDown' ​ , 'fadeInDownBig' ​ , 'fadeInLeft' ​ , 'fadeInLeftBig' ​ , 'fadeInRight' ​ , 'fadeInRightBig' ​ , 'fadeInUp' ​ , 'fadeInUpBig' ​ , 'flip' ​ , 'flipInX' ​ , 'flipInY' ​ , 'lightSpeedIn' ​ , 'rotateIn' ​ , 'rotateInDownLeft' ​ , 'rotateInDownRight' ​ , 'rotateInUpLeft' ​ , 'rotateInUpRight' ​ , 'slideInUp' ​ , 'slideInDown' ​ , 'slideInLeft' ​ , 'slideInRight' ​ , 'zoomIn' ​ , 'zoomInDown' ​ , 'zoomInLeft' ​ , 'zoomInRight' ​ , 'zoomInUp' ​ , 'hinge' ​ , 'jackInTheBox' ​ , 'rollIn' ]

export type OutAnimation = 'bounce' ​​| 'flash' ​​| 'pulse' ​​| 'rubberBand' ​​| 'shake' ​​| 'swing' ​​| 'tada' ​​| 'wobble' ​​| 'jello' ​​| 'heartBeat' ​​| 'bounceOut' ​​| 'bounceOutDown' ​​| 'bounceOutLeft' ​​| 'bounceOutRight' ​​| 'bounceOutUp' ​​| 'fadeOut' ​​| 'fadeOutDown' ​​| 'fadeOutDownBig' ​​| 'fadeOutLeft' ​​| 'fadeOutLeftBig' ​​| 'fadeOutRight' ​​| 'fadeOutRightBig' ​​| 'fadeOutUp' ​​| 'fadeOutUpBig' ​​| 'flip' ​​| 'flipOutX' ​​| 'flipOutY' ​​| 'lightSpeedOut' ​​| 'rotateOut' ​​| 'rotateOutDownLeft' ​​| 'rotateOutDownRight' ​​| 'rotateOutUpLeft' ​​| 'rotateOutUpRight' ​​| 'slideOutUp' ​​| 'slideOutDown' ​​| 'slideOutLeft' ​​| 'slideOutRight' ​​| 'zoomOut' ​​| 'zoomOutDown' ​​| 'zoomOutLeft' ​​| 'zoomOutRight' ​​| 'zoomOutUp' ​​| 'hinge' ​​| 'rollOut'
export const outAnimations: OutAnimation[] = [ 'bounce' , 'flash' , 'pulse' , 'rubberBand' , 'shake' , 'swing' , 'tada' , 'wobble' , 'jello' , 'heartBeat' , 'bounceOut' , 'bounceOutDown' , 'bounceOutLeft' , 'bounceOutRight' , 'bounceOutUp' , 'fadeOut' , 'fadeOutDown' , 'fadeOutDownBig' , 'fadeOutLeft' , 'fadeOutLeftBig' , 'fadeOutRight' , 'fadeOutRightBig' , 'fadeOutUp' , 'fadeOutUpBig' , 'flip' , 'flipOutX' , 'flipOutY' , 'lightSpeedOut' , 'rotateOut' , 'rotateOutDownLeft' , 'rotateOutDownRight' , 'rotateOutUpLeft' , 'rotateOutUpRight' , 'slideOutUp' , 'slideOutDown' , 'slideOutLeft' , 'slideOutRight' , 'zoomOut' , 'zoomOutDown' , 'zoomOutLeft' , 'zoomOutRight' , 'zoomOutUp' , 'hinge' , 'rollOut' ]


export async function inOutAnimate(domElement: Element, inAnimation: Animations, outAnimation: Animations, animationDuration = 1000, invisibleClass = 'invisible') {
  // start animations
  domElement.classList.add( inAnimation )


  domElement.classList.remove(invisibleClass)

  // let start animations finish
  await promiseTimeout( animationDuration )

  // end animations
  domElement.classList.add(outAnimation)

  // wait to just before they finish
  await promiseTimeout( animationDuration * .98 )
  
  domElement.classList.add( invisibleClass )
  domElement.classList.remove( inAnimation )
  domElement.classList.remove( outAnimation )
}


export function randomInOutAnimate( domElement: Element, animationDuration = 1000, invisibleClass = 'invisible' ) {
  let inIndex = Math.floor( 
    inAnimations.length * Math.random() 
  )
  let outIndex = Math.floor( 
    outAnimations.length * Math.random() 
  )
  return inOutAnimate( 
    domElement, 
    inAnimations[ inIndex ], 
    outAnimations[ outIndex ], 
    animationDuration, 
    invisibleClass 
  )
}

