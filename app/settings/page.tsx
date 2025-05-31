"use client";
import React, { useState } from "react";
import { Sun, Moon, Check } from "lucide-react";
import { useTheme } from "next-themes";

// DaisyUI themes organized by light/dark
const LIGHT_THEMES = [
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "retro",
  "cyberpunk",
  "valentine",
  "garden",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "cmyk",
  "autumn",
  "acid",
  "lemonade",
  "winter",
  "nord",
  "silk",
  "caramellatte",
];

const DARK_THEMES = [
  "dark",
  "synthwave",
  "halloween",
  "forest",
  "aqua",
  "luxury",
  "dracula",
  "night",
  "coffee",
  "dim",
  "sunset",
  "business",
  "abyss",
  "black",
];

const SettingsPage = () => {
  const [themeCategory, setThemeCategory] = useState<"light" | "dark">("light");

  const { theme, setTheme } = useTheme();

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  };

  const getThemeDisplayName = (theme: string) => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  const getThemesByCategory = () => {
    return themeCategory === "light" ? LIGHT_THEMES : DARK_THEMES;
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-base-content mb-2">Cài đặt</h1>
          <p className="text-base-content/60">Chọn theme cho giao diện</p>
        </div>

        {/* Theme Selection */}
        <div className="space-y-6">
          {/* Theme Category Toggle */}
          <div className="flex items-center justify-center mb-6 ">
            <div className="flex gap-2">
              <button
                onClick={() => setThemeCategory("light")}
                className={`btn gap-2 ${
                  themeCategory === "light" ? "btn-primary" : "btn-outline"
                }`}
              >
                <Sun className="w-4 h-4" />
                Sáng ({LIGHT_THEMES.length})
              </button>
              <button
                onClick={() => setThemeCategory("dark")}
                className={`btn gap-2 ${
                  themeCategory === "dark" ? "btn-primary" : "btn-outline"
                }`}
              >
                <Moon className="w-4 h-4" />
                Tối ({DARK_THEMES.length})
              </button>
            </div>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {getThemesByCategory().map((t) => (
              <div
                key={t}
                className={`relative cursor-pointer transition-all duration-200 hover:scale-105 ${
                  theme === t ? "border-2 border-primary" : ""
                }`}
                onClick={() => handleThemeChange(t)}
              >
                {/* Theme Preview Card */}
                <div
                  className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow"
                  data-theme={t}
                >
                  {/* Color Preview */}
                  <div className="h-12 flex">
                    <div className="flex-1 bg-primary"></div>
                    <div className="flex-1 bg-secondary"></div>
                    <div className="flex-1 bg-accent"></div>
                  </div>

                  {/* Theme Name */}
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-base-content">
                      {getThemeDisplayName(t)}
                    </span>
                    {theme === t && <Check className="w-4 h-4 text-primary" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
