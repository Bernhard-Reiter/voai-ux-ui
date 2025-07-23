import { useCallback, useEffect, useRef } from 'react'

interface UseSoundOptions {
  volume?: number
  playbackRate?: number
  soundEnabled?: boolean
  interrupt?: boolean
}

export function useSound(
  src: string,
  options: UseSoundOptions = {}
): [() => void, { stop: () => void; isPlaying: boolean }] {
  const { volume = 1, playbackRate = 1, soundEnabled = true, interrupt = false } = options
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.volume = volume
    audioRef.current.playbackRate = playbackRate

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src, volume, playbackRate])

  const play = useCallback(() => {
    if (!soundEnabled || !audioRef.current) return

    if (interrupt && isPlayingRef.current) {
      audioRef.current.currentTime = 0
    }

    audioRef.current.play().catch(() => {
      // Ignore errors (e.g., user hasn't interacted with page yet)
    })
    isPlayingRef.current = true
  }, [soundEnabled, interrupt])

  const stop = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    isPlayingRef.current = false
  }, [])

  return [play, { stop, isPlaying: isPlayingRef.current }]
}