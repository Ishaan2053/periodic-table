import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Animation frame update function
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    
    // Start the animation frame loop
    requestAnimationFrame(raf)

    // Clean up
    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  return lenisRef.current
}
