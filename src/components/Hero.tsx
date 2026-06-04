import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const accumulatedScrollRef = useRef(0)
  const touchStartY = useRef<number>(0)
  const lastTouchY = useRef<number>(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const atTopOfPage = window.scrollY === 0
      if (atTopOfPage && !animationComplete) {
        e.preventDefault()
        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))
        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)
        if (newProgress >= 1) setAnimationComplete(true)
        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      } else if (atTopOfPage && animationComplete && e.deltaY < 0) {
        e.preventDefault()
        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + e.deltaY))
        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)
        if (newProgress < 1) setAnimationComplete(false)
        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTopOfPage = window.scrollY === 0
      const currentTouchY = e.touches[0].clientY
      const deltaY = lastTouchY.current - currentTouchY
      if (atTopOfPage && !animationComplete) {
        e.preventDefault()
        accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 3))
        const newProgress = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
        setAnimationProgress(newProgress)
        if (newProgress >= 1) setAnimationComplete(true)
        if (contentRef.current) {
          const translateY = newProgress * 200
          const rotationX = newProgress * 45
          const scale = 1 - newProgress * 0.3
          contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
        }
      }
      lastTouchY.current = currentTouchY
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [animationComplete])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2010 100%)" }}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: "600px", height: "600px",
            background: "radial-gradient(circle, #4ade80, transparent)",
            top: "-100px", right: "-100px",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full opacity-5"
          style={{
            width: "400px", height: "400px",
            background: "radial-gradient(circle, #4ade80, transparent)",
            bottom: "100px", left: "-50px",
            animation: "pulse 6s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto px-6 md:px-12 relative z-10 pt-8 md:pt-0"
        style={{
          willChange: "transform",
          transform: "translateY(0px)",
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mb-72 md:mb-60 lg:mb-80 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-center text-green-400 mb-4 font-medium">
            Сервис аренды самокатов
          </p>

          <h1 className="text-7xl font-extrabold text-balance text-center text-white mb-6 tracking-tight leading-[0.9] lg:text-8xl">
            Движение —<br />
            <span className="text-green-400">это просто!</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light">
            Аренда самокатов в любой точке города. Выбери, поедь, наслаждайся!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-green-400 text-primary font-bold px-8 py-4 rounded-xl text-base hover:bg-green-300 transition-all duration-300 hover:scale-105"
            >
              <Icon name="Zap" size={20} />
              Найти самокат
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-all duration-300"
            >
              Узнать больше
            </a>
          </div>
        </div>
      </div>

      {animationComplete && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-30">
          <Icon name="ArrowDown" size={20} className="text-white/50" />
        </div>
      )}
    </section>
  )
}
