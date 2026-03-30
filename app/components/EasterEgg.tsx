'use client';

import { useEffect, useState, useCallback } from 'react';
import { Terminal, X, Trophy } from 'lucide-react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Simple snake game
interface Position {
  x: number;
  y: number;
}

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Snake game state
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const GRID_SIZE = 20;

  // Listen for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) return;

      if (e.code === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);

        if (newIndex === KONAMI_CODE.length) {
          setIsActive(true);
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, isActive]);

  // Show hint after 30 seconds on page
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 5000);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  // Game controls
  const handleGameKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive || !gameStarted || gameOver) return;

    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
      case 'KeyS':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
      case 'KeyA':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
      case 'KeyD':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
    }
  }, [isActive, gameStarted, gameOver, direction]);

  useEffect(() => {
    document.addEventListener('keydown', handleGameKeyDown);
    return () => document.removeEventListener('keydown', handleGameKeyDown);
  }, [handleGameKeyDown]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || !isActive) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          // Generate new food
          let newFood: Position;
          do {
            newFood = {
              x: Math.floor(Math.random() * GRID_SIZE),
              y: Math.floor(Math.random() * GRID_SIZE),
            };
          } while (newSnake.some(s => s.x === newFood.x && s.y === newFood.y));
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, direction, food, isActive]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const closeGame = () => {
    setIsActive(false);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  // Hint indicator
  if (!isActive && showHint) {
    return (
      <div className="fixed bottom-20 right-6 z-40 animate-bounce">
        <div className="bg-[#1a1a1a] border border-cyan-500/30 rounded-lg px-3 py-2 font-mono text-xs text-cyan-400">
          ↑↑↓↓←→←→BA
        </div>
      </div>
    );
  }

  if (!isActive) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm" onClick={closeGame} />

      {/* Game Window */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201]">
        <div className="bg-[#1a1a1a] border border-cyan-500/50 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(34,211,211,0.3)]">
          {/* Header */}
          <div className="bg-[#252525] px-4 py-2 flex items-center justify-between border-b border-[#2a2a2a]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-cyan-400 text-sm font-mono flex items-center gap-2">
                <Terminal size={14} />
                snake.exe
              </span>
            </div>
            <button onClick={closeGame} className="text-gray-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Game Content */}
          <div className="p-4">
            {!gameStarted ? (
              <div className="w-[320px] h-[320px] flex flex-col items-center justify-center text-center">
                <Trophy className="w-12 h-12 text-amber-400 mb-4" />
                <h3 className="text-white font-mono text-lg mb-2">🎉 Secret Unlocked!</h3>
                <p className="text-gray-400 font-mono text-sm mb-4">
                  You found the easter egg!<br />
                  Play a quick game of Snake?
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 font-mono text-sm hover:bg-cyan-500/30 transition-colors"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <div>
                {/* Score */}
                <div className="flex justify-between items-center mb-2 font-mono text-sm">
                  <span className="text-gray-400">Score:</span>
                  <span className="text-cyan-400">{score}</span>
                </div>

                {/* Game Grid */}
                <div 
                  className="grid bg-[#0d0d0d] border border-[#2a2a2a] rounded"
                  style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 16px)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, 16px)`,
                  }}
                >
                  {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);
                    const isSnake = snake.some(s => s.x === x && s.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;

                    return (
                      <div
                        key={i}
                        className={`w-4 h-4 border border-[#1a1a1a] ${
                          isHead ? 'bg-cyan-400' :
                          isSnake ? 'bg-cyan-600' :
                          isFood ? 'bg-amber-400' :
                          'bg-transparent'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Game Over */}
                {gameOver && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                    <p className="text-red-400 font-mono text-lg mb-2">Game Over!</p>
                    <p className="text-gray-400 font-mono text-sm mb-4">Final Score: {score}</p>
                    <button
                      onClick={startGame}
                      className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 font-mono text-sm"
                    >
                      Play Again
                    </button>
                  </div>
                )}

                {/* Controls hint */}
                <p className="mt-2 text-center text-gray-600 font-mono text-xs">
                  Use arrow keys or WASD to move
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
