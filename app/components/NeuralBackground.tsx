"use client"

import { useEffect, useRef, useState } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

// Helper function to get primary color based on theme
// Returns Vivid Red for dark mode and Deep Blood Red for light mode
function getPrimaryColor(): string {
  if (typeof window === "undefined") return "220, 38, 38"

  const isDark = document.documentElement.classList.contains("dark")
  // Dark mode: Bright Red (RGB)
  // Light mode: Deep Blood Red (RGB)
  return isDark ? "255, 30, 30" : "150, 0, 0"
}

// Helper function to get blend mode based on theme
function getBlendMode(): string {
  if (typeof window === "undefined") return "screen"
  const isDark = document.documentElement.classList.contains("dark")
  // 'screen' makes the red glow on dark backgrounds
  return isDark ? "screen" : "multiply"
}

// Helper function to get opacity
function getOpacity(): number {
  return 0.9 // High opacity for better visibility of red
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const pointsRef = useRef<Point[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      const newHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      )
      canvas.height = newHeight
      canvas.style.height = `${newHeight}px`
      
      const pointCount = Math.floor((canvas.width * canvas.height) / 15000)
      pointsRef.current = Array.from({ length: pointCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }))
    }
    resizeCanvas()

    const updateCanvasHeight = () => {
      const newHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      )
      if (canvas.height !== newHeight) {
        canvas.height = newHeight
        canvas.style.height = `${newHeight}px`
        
        const currentPoints = pointsRef.current.length
        const expectedPoints = Math.floor((canvas.width * canvas.height) / 15000)
        if (expectedPoints > currentPoints) {
          const additionalPoints = expectedPoints - currentPoints
          const newPoints = Array.from({ length: additionalPoints }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height - (canvas.height - 500)) + (canvas.height - 500),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
          }))
          pointsRef.current = [...pointsRef.current, ...newPoints]
        }
      }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("scroll", updateCanvasHeight)

    const observer = new MutationObserver(updateCanvasHeight)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const points = pointsRef.current
      const mousePos = mousePosRef.current
      const maxDistance = 150
      const primaryColor = getPrimaryColor()

      // Update points logic
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        const randomForce = 0.02
        point.vx += (Math.random() - 0.5) * randomForce
        point.vy += (Math.random() - 0.5) * randomForce

        if (Math.random() < 0.1) {
          point.vx += (Math.random() - 0.5) * 0.3
          point.vy += (Math.random() - 0.5) * 0.3
        }

        point.x += point.vx
        point.y += point.vy

        if (point.x < 0) point.x = canvas.width
        else if (point.x > canvas.width) point.x = 0
        if (point.y < 0) point.y = canvas.height
        else if (point.y > canvas.height) point.y = 0

        point.vx *= 0.99
        point.vy *= 0.99
      }

      // Draw connections
      ctx.lineWidth = 0.6
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacityLine = (1 - distance / maxDistance) * 0.5
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacityLine})`
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      }

      // Mouse connections
      if (mousePos.x > 0 && mousePos.y > 0) {
        ctx.lineWidth = 1.0
        for (let i = 0; i < points.length; i++) {
          const dx = mousePos.x - points[i].x
          const dy = mousePos.y - points[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const mouseConnectionDistance = 200

          if (distance < mouseConnectionDistance) {
            const opacityMouse = (1 - distance / mouseConnectionDistance) * 0.7
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacityMouse})`
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(mousePos.x, mousePos.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = `rgba(${primaryColor}, 0.6)`
      for (const point of points) {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("scroll", updateCanvasHeight)
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const [blendMode, setBlendMode] = useState<React.CSSProperties["mixBlendMode"]>("screen")
  const [opacity, setOpacity] = useState(0.9)

  useEffect(() => {
    const updateTheme = () => {
      setBlendMode(getBlendMode() as React.CSSProperties["mixBlendMode"])
      setOpacity(getOpacity())
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none z-0"
      style={{ mixBlendMode: blendMode, opacity: opacity, width: "100%" }}
    />
  )
}