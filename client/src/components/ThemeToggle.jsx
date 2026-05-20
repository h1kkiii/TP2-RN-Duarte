import { memo } from 'react';

const ThemeToggle = memo(({ isDark, onToggle}) => {
  return (
    <button className="btn-theme" onClick={onToggle}>
      {isDark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
    </button>
  );
});

export default ThemeToggle;