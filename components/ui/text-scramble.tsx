"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { ReactNode } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

interface TextScrambleProps {
  text: string
  className?: string
  autoScramble?: boolean
  finalRender?: ReactNode
}

export function TextScramble({
  text,
  className = "",
  autoScramble = true,
  finalRender,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef(0)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    const duration = text.length * 3

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frameRef.current++

      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * text.length)

      const newText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " "
          if (i < revealedLength) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      setDisplayText(newText)

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }, [text])

  useEffect(() => {
    if (autoScramble) scramble()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoScramble, scramble])

  const handleMouseEnter = () => {
    setIsHovering(true)
    scramble()
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const showFinal = finalRender != null && !isScrambling

  return (
    <span
      className={`group relative flex flex-col ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative">
        {showFinal
          ? finalRender
          : displayText.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-150"
                style={{
                  color: isScrambling && char !== text[i] ? "#C084FC" : "inherit",
                  transform:
                    isScrambling && char !== text[i] ? "scale(1.1)" : "scale(1)",
                  transitionDelay: `${i * 10}ms`,
                }}
              >
                {char}
              </span>
            ))}
      </span>

      {/* Animated underline */}
      <span className="relative h-px w-full mt-2 overflow-hidden">
        <span
          className="absolute inset-0 transition-transform duration-500 ease-out origin-left"
          style={{
            backgroundColor: "#A855F7",
            transform: isHovering ? "scaleX(1)" : "scaleX(0)",
          }}
        />
        <span
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(168,85,247,.08)" }}
        />
      </span>

      {/* Subtle glow on hover */}
      <span
        className="absolute -inset-4 rounded-lg -z-10 transition-opacity duration-300"
        style={{
          background: "rgba(168,85,247,.05)",
          opacity: isHovering ? 1 : 0,
        }}
      />
    </span>
  )
}
