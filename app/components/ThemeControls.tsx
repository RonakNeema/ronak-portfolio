'use client';

import { useState, useSyncExternalStore } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeControls() {
  const { theme, accentColor, toggleTheme, setAccentColor } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const colors: Array<{ name: string; value: 'cyan' | 'purple' | 'green' | 'orange'; hex: string }> = [
    { name: 'Cyan', value: 'cyan', hex: '#22d3d3' },
    { name: 'Purple', value: 'purple', hex: '#a855f7' },
    { name: 'Green', value: 'green', hex: '#34d399' },
    { name: 'Orange', value: 'orange', hex: '#fb923c' },
  ];

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`
          rounded-lg p-3 transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-cyan-500' 
            : 'bg-white border border-gray-300 hover:border-cyan-500 shadow-lg'
          }
        `}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun className="text-yellow-400" size={20} />
        ) : (
          <Moon className="text-gray-700" size={20} />
        )}
      </button>

      {/* Color Picker */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={`
            rounded-lg p-3 transition-all duration-300
            ${theme === 'dark' 
              ? 'bg-[#1a1a1a] border border-[#2a2a2a] hover:border-cyan-500' 
              : 'bg-white border border-gray-300 hover:border-cyan-500 shadow-lg'
            }
          `}
          aria-label="Change Accent Color"
          title="Change Color"
        >
          <Palette className="text-accent" size={20} />
        </button>

        {showColorPicker && (
          <div className={`
            absolute bottom-full left-0 mb-2 rounded-lg p-3 shadow-xl min-w-[150px]
            ${theme === 'dark' 
              ? 'bg-[#1a1a1a] border border-[#2a2a2a]' 
              : 'bg-white border border-gray-300'
            }
          `}>
            <p className={`text-xs font-mono mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Accent Color
            </p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    setAccentColor(color.value);
                    setShowColorPicker(false);
                  }}
                  className={`w-8 h-8 rounded-full ${
                    accentColor === color.value
                      ? 'ring-2 ring-offset-2 ring-white'
                      : 'hover:scale-110'
                  } transition-all`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showColorPicker && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setShowColorPicker(false)}
        />
      )}
    </div>
  );
}
