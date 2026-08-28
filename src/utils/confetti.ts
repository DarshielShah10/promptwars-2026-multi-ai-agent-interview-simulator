import confetti from 'canvas-confetti';

export const triggerHiringCelebration = () => {
  // Burst 1: Center blast
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6']
  });

  // Burst 2: Left cannon after slight delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#10b981', '#34d399', '#fbbf24', '#60a5fa']
    });
  }, 200);

  // Burst 3: Right cannon after slight delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#6366f1', '#a855f7', '#f43f5e', '#fbbf24']
    });
  }, 400);

  // Burst 4: High fireworks shower
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.3 },
      shapes: ['circle', 'square'],
      colors: ['#10b981', '#fbbf24', '#38bdf8', '#818cf8', '#f472b6']
    });
  }, 700);
};

export const triggerStarBurst = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { x, y },
    colors: ['#fbbf24', '#f59e0b', '#10b981', '#6366f1']
  });
};
