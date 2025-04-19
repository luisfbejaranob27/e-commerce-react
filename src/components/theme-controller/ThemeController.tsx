import { useState, useEffect } from 'react';
import "./ThemeController.css"

export const ThemeController = () =>
{
  const [isDark, setIsDark] = useState(false);

  useEffect(() =>
  {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark)
    {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
    else
    {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }, []);

  const toggleTheme = () =>
  {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    document.documentElement.setAttribute('data-bs-theme', newIsDark ? 'dark' : 'light');
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} id="theme-toggle" className="btn btn-primary">
      {isDark ? (
        <i className="bi bi-sun-fill"></i>
      ) : (
        <i className="bi bi-moon-fill"></i>
      )}
    </button>
  );
}
