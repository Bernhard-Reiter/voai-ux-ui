import { useCallback } from 'react'

export function useSound() {
  const playSound = useCallback((frequency: number = 440, duration: number = 200) => {
    if (typeof window === 'undefined') return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (error) {
      // Silently fail if audio is not supported
    }
  }, [])

  return {
    playHover: () => playSound(600, 50),
    playClick: () => playSound(800, 100),
    playSuccess: () => playSound(1000, 200),
    playError: () => playSound(300, 300),
  }
}
