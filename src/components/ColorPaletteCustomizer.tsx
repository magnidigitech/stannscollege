"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Palette, Check, RotateCcw, Copy, X, Sliders, Sparkles,
  Building, Compass, Heading, Bookmark, BookmarkPlus,
  Pipette, CheckCircle2, ArrowRight, Trash2, Clock, BookOpen
} from "lucide-react";

// --- Color Conversion Helpers ---
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  s = Math.max(0, Math.min(100, s)) / 100;
  v = Math.max(0, Math.min(100, v)) / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r1 = 0, g1 = 0, b1 = 0;

  if (h >= 0 && h < 60) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x; g1 = 0; b1 = c;
  } else {
    r1 = c; g1 = 0; b1 = x;
  }

  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255)
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): [number, number, number] | null {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6) return null;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return [r, g, b];
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const rgb = hexToRgb(hex);
  if (!rgb) return { h: 0, s: 100, v: 100 };
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = h * 60;
  }
  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
}

function isLightColor(colorStr: string): boolean {
  if (colorStr.includes("gradient")) {
    return colorStr.includes("#fff") || colorStr.includes("#f8") || colorStr.includes("#ea");
  }
  const rgb = hexToRgb(colorStr);
  if (!rgb) return false;
  const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  return yiq >= 145;
}

function extractSolidFromGradient(colorStr: string): string {
  if (!colorStr.includes("gradient")) return colorStr;
  const match = colorStr.match(/#[a-fA-F0-9]{6}/);
  return match ? match[0] : "#002147";
}

// --- Data Types ---
export interface SavedColorSetup {
  id: string;
  name: string;
  createdAt: string;
  logoBar: string;
  topNav: string;
  level1: string;
  level2: string;
  sidebar?: string;
  sidebarBg?: string;
}

export interface ReadyMadeOption {
  id: string;
  name: string;
  desc: string;
  logoBar: string;
  topNav: string;
  level1: string;
  level2: string;
  sidebar?: string;
  sidebarBg?: string;
}

const READY_MADE_OPTIONS: ReadyMadeOption[] = [
  {
    id: "preset-1",
    name: "1. St. Ann's Navy & Teal",
    desc: "Original collegiate Midnight Navy header, Deep Academic Teal hero banner, Navy section headers & Royal Blue sidebar",
    logoBar: "#002147",
    topNav: "#002147",
    level1: "linear-gradient(to right, #002b36, #043d4d, #084c61)",
    level2: "#002147",
    sidebar: "#1e40af",
    sidebarBg: "#eaeff5"
  },
  {
    id: "preset-2",
    name: "2. All Midnight Navy",
    desc: "Monochrome institutional elegance with seamless navy across logo, navigation, section banners and sidebar",
    logoBar: "#002147",
    topNav: "#002147",
    level1: "linear-gradient(to right, #001730, #002147, #0d3b66)",
    level2: "#001730",
    sidebar: "#002147",
    sidebarBg: "#eaeff5"
  },
  {
    id: "preset-3",
    name: "3. Classic Collegiate (White + Navy)",
    desc: "Crisp white logo bar with high-contrast Midnight Navy nav and Royal Academic Blue banners & sidebar",
    logoBar: "#ffffff",
    topNav: "#002147",
    level1: "linear-gradient(to right, #1e3a8a, #1e40af, #2563eb)",
    level2: "#1e40af",
    sidebar: "#1e40af",
    sidebarBg: "#ffffff"
  },
  {
    id: "preset-4",
    name: "4. Deep Ocean University",
    desc: "Coordinated deep teal logo bar, ocean teal nav bar, academic teal hero and section headers & sidebar",
    logoBar: "#002b36",
    topNav: "#084c61",
    level1: "linear-gradient(to right, #002b36, #043d4d, #084c61)",
    level2: "#043d4d",
    sidebar: "#084c61",
    sidebarBg: "#e8f1fd"
  },
  {
    id: "preset-5",
    name: "5. Royal Oxford & Indigo",
    desc: "Rich imperial indigo theme with deep blue hues for high scholastic stature",
    logoBar: "#1e1b4b",
    topNav: "#312e81",
    level1: "linear-gradient(to right, #1e1b4b, #3730a3, #4f46e5)",
    level2: "#312e81",
    sidebar: "#312e81",
    sidebarBg: "#eef2ff"
  },
  {
    id: "preset-6",
    name: "6. Modern Midnight Slate",
    desc: "Contemporary charcoal slate header paired with vivid sapphire blue highlights",
    logoBar: "#0f172a",
    topNav: "#1e293b",
    level1: "linear-gradient(to right, #090d16, #0f172a, #2563eb)",
    level2: "#0f172a",
    sidebar: "#1e293b",
    sidebarBg: "#f1f5f9"
  },
  {
    id: "preset-7",
    name: "7. Emerald Academic Heritage",
    desc: "Distinguished dark botanical emerald symbolizing prosperity, growth and honor",
    logoBar: "#022c22",
    topNav: "#064e3b",
    level1: "linear-gradient(to right, #022c22, #064e3b, #047857)",
    level2: "#064e3b",
    sidebar: "#064e3b",
    sidebarBg: "#f0fdf4"
  },
  {
    id: "preset-8",
    name: "8. Academic Crimson & Charcoal",
    desc: "Classic ivy-league burgundy and dark charcoal for prestigious institutional presence",
    logoBar: "#3b0707",
    topNav: "#581c1c",
    level1: "linear-gradient(to right, #2c0b0e, #581c1c, #831843)",
    level2: "#581c1c",
    sidebar: "#581c1c",
    sidebarBg: "#fdf2f2"
  }
];

// --- Custom Color Picker Canvas Matching User Image ---
interface ColorPickerProps {
  currentColor: string;
  onColorChange: (newColor: string) => void;
  supportsGradient?: boolean;
}

function ImageStyleColorPicker({ currentColor, onColorChange, supportsGradient = false }: ColorPickerProps) {
  const isInitialGradient = currentColor.includes("gradient");
  const [colorMode, setColorMode] = useState<"solid" | "gradient">(
    supportsGradient && isInitialGradient ? "gradient" : "solid"
  );

  const solidHex = extractSolidFromGradient(currentColor);
  const initialHsv = hexToHsv(solidHex);
  const [hue, setHue] = useState<number>(initialHsv.h);
  const [sat, setSat] = useState<number>(initialHsv.s);
  const [val, setVal] = useState<number>(initialHsv.v);
  const [hexInput, setHexInput] = useState<string>(solidHex);

  // Gradient state
  const [gradientStart, setGradientStart] = useState<string>("#002b36");
  const [gradientEnd, setGradientEnd] = useState<string>("#084c61");
  const [gradientDir, setGradientDir] = useState<string>("to right");

  const canvasRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const nativePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentColor.includes("gradient")) {
      if (supportsGradient) setColorMode("gradient");
    } else {
      setColorMode("solid");
      const hsv = hexToHsv(currentColor);
      setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
      setHexInput(currentColor);
    }
  }, [currentColor, supportsGradient]);

  const updateFromCanvas = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round(100 - (y / rect.height) * 100);

    setSat(s);
    setVal(v);

    const [r, g, b] = hsvToRgb(hue, s, v);
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    onColorChange(hex);
  };

  const handlePointerDownCanvas = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromCanvas(e.clientX, e.clientY);
  };

  const handlePointerMoveCanvas = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    updateFromCanvas(e.clientX, e.clientY);
  };

  const updateFromHue = (clientX: number) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const h = Math.round((x / rect.width) * 360);

    setHue(h);
    const [r, g, b] = hsvToRgb(h, sat, val);
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    onColorChange(hex);
  };

  const handlePointerDownHue = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromHue(e.clientX);
  };

  const handlePointerMoveHue = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    updateFromHue(e.clientX);
  };

  const handleHexInputChange = (valStr: string) => {
    let clean = valStr.trim();
    if (!clean.startsWith("#")) clean = "#" + clean;
    setHexInput(clean);
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      const hsv = hexToHsv(clean);
      setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
      onColorChange(clean);
    }
  };

  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && (window as any).EyeDropper) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          handleHexInputChange(result.sRGBHex);
        }
      } catch (e) {
        // User dismissed
      }
    } else {
      nativePickerRef.current?.click();
    }
  };

  const applyGradient = (start: string, end: string, dir: string) => {
    const grad = `linear-gradient(${dir}, ${start}, ${end})`;
    onColorChange(grad);
  };

  const activeSolidHex = rgbToHex(...hsvToRgb(hue, sat, val));

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
      {/* Tabs matching user image: Solid colour | Gradient */}
      <div className="flex items-center border-b border-slate-100">
        <button
          onClick={() => {
            setColorMode("solid");
            onColorChange(activeSolidHex);
          }}
          className={`relative pb-2.5 px-4 font-outfit text-xs md:text-sm font-bold transition-all cursor-pointer ${
            colorMode === "solid"
              ? "text-slate-900"
              : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Solid colour
          {colorMode === "solid" && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        {supportsGradient && (
          <button
            onClick={() => {
              setColorMode("gradient");
              applyGradient(gradientStart, gradientEnd, gradientDir);
            }}
            className={`relative pb-2.5 px-4 font-outfit text-xs md:text-sm font-bold transition-all cursor-pointer ${
              colorMode === "gradient"
                ? "text-slate-900"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Gradient
            {colorMode === "gradient" && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        )}
      </div>

      {colorMode === "solid" ? (
        <>
          {/* 2D Saturation / Value Canvas */}
          <div
            ref={canvasRef}
            onPointerDown={handlePointerDownCanvas}
            onPointerMove={handlePointerMoveCanvas}
            className="relative w-full h-44 rounded-2xl cursor-crosshair overflow-hidden select-none touch-none shadow-inner"
            style={{
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
              backgroundImage: `
                linear-gradient(to top, #000, transparent),
                linear-gradient(to right, #fff, transparent)
              `
            }}
          >
            {/* Dragger circle with white ring & colored/black center */}
            <div
              className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                left: `${sat}%`,
                top: `${100 - val}%`
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full border border-black/40"
                style={{ backgroundColor: activeSolidHex }}
              />
            </div>
          </div>

          {/* 1D Rainbow Hue Slider Bar */}
          <div
            ref={hueRef}
            onPointerDown={handlePointerDownHue}
            onPointerMove={handlePointerMoveHue}
            className="relative w-full h-4 rounded-full cursor-pointer select-none touch-none shadow-inner"
            style={{
              background: `linear-gradient(to right,
                #ff0000 0%,
                #ffff00 17%,
                #00ff00 33%,
                #00ffff 50%,
                #0000ff 67%,
                #ff00ff 83%,
                #ff0000 100%
              )`
            }}
          >
            {/* Draggable thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none flex items-center justify-center"
              style={{
                left: `${(hue / 360) * 100}%`
              }}
            >
              <div
                className="w-3 h-3 rounded-full shadow-2xs"
                style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
              />
            </div>
          </div>

          {/* Bottom Bar: Swatch + Hex Input + EyeDropper */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
              <div
                className="h-6 w-6 rounded-full border border-slate-300 shadow-inner shrink-0"
                style={{ backgroundColor: activeSolidHex }}
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexInputChange(e.target.value)}
                placeholder="#002147"
                maxLength={7}
                className="flex-1 font-mono font-bold text-xs md:text-sm text-slate-800 uppercase focus:outline-none bg-transparent"
              />
            </div>

            {/* EyeDropper Button */}
            <button
              onClick={handleEyeDropper}
              type="button"
              className="p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Pick a color from screen"
            >
              <Pipette className="h-4 w-4" />
            </button>

            {/* Hidden native input fallback */}
            <input
              ref={nativePickerRef}
              type="color"
              value={activeSolidHex.length === 7 ? activeSolidHex : "#002147"}
              onChange={(e) => handleHexInputChange(e.target.value)}
              className="hidden"
            />
          </div>
        </>
      ) : (
        /* Gradient Builder */
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600">Direction</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Horizontal →", val: "to right" },
                { label: "Diagonal ↘", val: "to bottom right" },
                { label: "Vertical ↓", val: "to bottom" }
              ].map((d) => (
                <button
                  key={d.val}
                  type="button"
                  onClick={() => {
                    setGradientDir(d.val);
                    applyGradient(gradientStart, gradientEnd, d.val);
                  }}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    gradientDir === d.val
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-600">Start Tone</label>
              <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                <input
                  type="color"
                  value={gradientStart}
                  onChange={(e) => {
                    setGradientStart(e.target.value);
                    applyGradient(e.target.value, gradientEnd, gradientDir);
                  }}
                  className="h-7 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                />
                <span className="font-mono text-xs font-bold text-slate-700">{gradientStart}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-600">End Tone</label>
              <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                <input
                  type="color"
                  value={gradientEnd}
                  onChange={(e) => {
                    setGradientEnd(e.target.value);
                    applyGradient(gradientStart, e.target.value, gradientDir);
                  }}
                  className="h-7 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                />
                <span className="font-mono text-xs font-bold text-slate-700">{gradientEnd}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-1">
            <span className="text-[11px] font-bold text-slate-500">Live Gradient Preview:</span>
            <div
              className="h-10 w-full rounded-xl border border-slate-300 shadow-inner"
              style={{ background: currentColor }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Palette Customizer Component ---
export default function ColorPaletteCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [topTab, setTopTab] = useState<"manual" | "ready" | "saved">("manual");

  // Manual Element selector: Logo, Top Nav, Heading 1, Heading 2, Side Nav
  const [selectedElement, setSelectedElement] = useState<"logo" | "nav" | "level1" | "level2" | "sidebar">("logo");
  const [copied, setCopied] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // States for 5 distinct sections
  const [logoBarColor, setLogoBarColor] = useState<string>("#002147");
  const [topNavColor, setTopNavColor] = useState<string>("#002147");
  const [level1Color, setLevel1Color] = useState<string>("linear-gradient(to right, #002b36, #043d4d, #084c61)");
  const [level2Color, setLevel2Color] = useState<string>("#002147");
  const [sidebarColor, setSidebarColor] = useState<string>("#1e40af");
  const [sidebarBgColor, setSidebarBgColor] = useState<string>("#eaeff5");
  const [sidebarColorMode, setSidebarColorMode] = useState<"accent" | "background">("accent");

  // Saved Setups / Versions List
  const [savedSetups, setSavedSetups] = useState<SavedColorSetup[]>([]);
  const [newVersionName, setNewVersionName] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem("theme_logoBarColor");
      const savedNav = localStorage.getItem("theme_topNavColor");
      const savedL1 = localStorage.getItem("theme_level1Color");
      const savedL2 = localStorage.getItem("theme_level2Color");
      const savedSidebar = localStorage.getItem("theme_sidebarColor");
      const savedSidebarBg = localStorage.getItem("theme_sidebarBgColor");
      const savedList = localStorage.getItem("theme_savedColorSetups");

      if (savedLogo) setLogoBarColor(savedLogo);
      if (savedNav) setTopNavColor(savedNav);
      if (savedL1) setLevel1Color(savedL1);
      if (savedL2) setLevel2Color(savedL2);
      if (savedSidebar) setSidebarColor(savedSidebar);
      if (savedSidebarBg) setSidebarBgColor(savedSidebarBg);

      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed)) setSavedSetups(parsed);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  // Update CSS Variables in real time
  useEffect(() => {
    const root = document.documentElement;

    // 1. Logo Bar variables
    root.style.setProperty("--logo-bar-bg", logoBarColor);
    const isLogoLight = isLightColor(logoBarColor);
    root.style.setProperty("--logo-bar-title", isLogoLight ? "#002147" : "#ffffff");
    root.style.setProperty("--logo-bar-subtitle", isLogoLight ? "#475569" : "rgba(191, 219, 254, 0.9)");
    root.style.setProperty("--logo-bar-divider", isLogoLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)");
    root.style.setProperty("--logo-bar-border", isLogoLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)");
    root.style.setProperty("--logo-bar-icon-bg", isLogoLight ? "rgba(0,33,71,0.06)" : "rgba(255,255,255,0.1)");

    // 2. Top Nav Bar variables
    root.style.setProperty("--topnav-bg", topNavColor);
    const isNavLight = isLightColor(topNavColor);
    root.style.setProperty("--topnav-link-color", isNavLight ? "#0f172a" : "#ffffff");
    root.style.setProperty("--topnav-row2-color", isNavLight ? "#334155" : "#e2e8f0");
    root.style.setProperty("--topnav-divider", isNavLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)");
    root.style.setProperty("--topnav-border", isNavLight ? "rgba(0,0,0,0.1)" : "#001730");
    root.style.setProperty("--topnav-chevron", isNavLight ? "#64748b" : "#94a3b8");

    // 3. Heading Level 1 variables
    root.style.setProperty("--level1-bg", level1Color);
    const isL1Light = isLightColor(level1Color);
    root.style.setProperty("--level1-title", isL1Light ? "#002147" : "#ffffff");
    root.style.setProperty("--level1-breadcrumb", isL1Light ? "#475569" : "rgba(153, 246, 228, 0.85)");
    root.style.setProperty("--level1-border", isL1Light ? "rgba(0,0,0,0.08)" : "rgba(4, 43, 54, 0.4)");

    // 4. Heading Level 2 variables
    root.style.setProperty("--level2-bg", level2Color);
    const isL2Light = isLightColor(level2Color);
    root.style.setProperty("--level2-title", isL2Light ? "#002147" : "#ffffff");
    root.style.setProperty("--level2-subtitle", isL2Light ? "#334155" : "rgba(219, 234, 254, 0.9)");
    root.style.setProperty("--level2-border", isL2Light ? "rgba(0,0,0,0.1)" : "rgba(49, 46, 129, 0.2)");

    // 5. Side Nav Bar variables
    root.style.setProperty("--sidebar-bg", sidebarColor);
    root.style.setProperty("--sidebar-container-bg", sidebarBgColor);
    const isSidebarLight = isLightColor(sidebarColor);
    root.style.setProperty("--sidebar-text", isSidebarLight ? "#002147" : "#ffffff");
    root.style.setProperty("--sidebar-border", isSidebarLight ? "rgba(0,0,0,0.12)" : "rgba(30, 64, 175, 0.4)");

    try {
      localStorage.setItem("theme_logoBarColor", logoBarColor);
      localStorage.setItem("theme_topNavColor", topNavColor);
      localStorage.setItem("theme_level1Color", level1Color);
      localStorage.setItem("theme_level2Color", level2Color);
      localStorage.setItem("theme_sidebarColor", sidebarColor);
      localStorage.setItem("theme_sidebarBgColor", sidebarBgColor);
    } catch (e) {
      // Ignore
    }
  }, [logoBarColor, topNavColor, level1Color, level2Color, sidebarColor, sidebarBgColor]);

  // Save Current Setup to Version History
  const handleSaveCurrentSetup = () => {
    const versionNum = savedSetups.length + 1;
    const nameToUse = newVersionName.trim() || `Setup Version ${versionNum}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newSetup: SavedColorSetup = {
      id: "setup-" + Date.now(),
      name: nameToUse,
      createdAt: timeString,
      logoBar: logoBarColor,
      topNav: topNavColor,
      level1: level1Color,
      level2: level2Color,
      sidebar: sidebarColor,
      sidebarBg: sidebarBgColor
    };

    const updated = [newSetup, ...savedSetups];
    setSavedSetups(updated);
    setNewVersionName("");
    try {
      localStorage.setItem("theme_savedColorSetups", JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }

    setSaveToast(`Saved "${nameToUse}"!`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Restore/Apply a Saved Version
  const handleApplySavedSetup = (setup: SavedColorSetup) => {
    setLogoBarColor(setup.logoBar);
    setTopNavColor(setup.topNav);
    setLevel1Color(setup.level1);
    setLevel2Color(setup.level2);
    if (setup.sidebar) {
      setSidebarColor(setup.sidebar);
    }
    if (setup.sidebarBg) {
      setSidebarBgColor(setup.sidebarBg);
    }

    setSaveToast(`Applied "${setup.name}"!`);
    setTimeout(() => setSaveToast(null), 2000);
  };

  // Delete a Saved Version
  const handleDeleteSavedSetup = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedSetups.filter((s) => s.id !== id);
    setSavedSetups(updated);
    try {
      localStorage.setItem("theme_savedColorSetups", JSON.stringify(updated));
    } catch (err) {
      // Ignore
    }
  };

  const handleReset = () => {
    setLogoBarColor("#002147");
    setTopNavColor("#002147");
    setLevel1Color("linear-gradient(to right, #002b36, #043d4d, #084c61)");
    setLevel2Color("#002147");
    setSidebarColor("#1e40af");
    setSidebarBgColor("#eaeff5");
  };

  const handleApplyReadyMade = (option: ReadyMadeOption) => {
    setLogoBarColor(option.logoBar);
    setTopNavColor(option.topNav);
    setLevel1Color(option.level1);
    setLevel2Color(option.level2);
    if (option.sidebar) {
      setSidebarColor(option.sidebar);
    }
    if (option.sidebarBg) {
      setSidebarBgColor(option.sidebarBg);
    }
  };

  const handleCopyCodes = () => {
    const config = JSON.stringify(
      {
        logoBar: logoBarColor,
        topNav: topNavColor,
        level1: level1Color,
        level2: level2Color,
        sidebarAccent: sidebarColor,
        sidebarContainerBg: sidebarBgColor
      },
      null,
      2
    );
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 select-none animate-fadeIn">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 text-white font-bold text-xs shadow-2xl hover:bg-slate-800 border-2 border-indigo-400/50 hover:border-indigo-400 transition-all active:scale-95 group hover:-translate-y-0.5 hover:shadow-indigo-500/20 cursor-pointer"
            title="Customize Colors for Logo Bar, Top Nav, Heading 1 & Heading 2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 text-white shadow-xs group-hover:rotate-45 transition-transform duration-300">
              <Palette className="h-3.5 w-3.5" />
            </span>
            <span className="font-outfit tracking-wide">Color Palette</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      )}

      {/* Slide-over Drawer Panel (No blur, no darkening overlay so page colors remain 100% accurate & true-to-life) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-end select-none">
          {/* Drawer Container */}
          <div className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-slate-300 pointer-events-auto animate-slideIn">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Sliders className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-outfit font-black text-slate-900 text-base leading-tight">
                    Color Palette Manager
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500">
                    Live customization for Header, Nav &amp; Section Headings
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Toast feedback when setup saved/applied */}
            {saveToast && (
              <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn shrink-0">
                <Check className="h-3.5 w-3.5" /> {saveToast}
              </div>
            )}

            {/* Navigation Tabs: Manual Selection | Ready-Made | Saved Versions */}
            <div className="grid grid-cols-3 p-2 bg-slate-100/80 border-b border-slate-200/80 gap-1 shrink-0 text-xs font-bold text-slate-600">
              <button
                onClick={() => setTopTab("manual")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  topTab === "manual"
                    ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
                    : "hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span className="text-[11px]">Manual</span>
              </button>

              <button
                onClick={() => setTopTab("ready")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  topTab === "ready"
                    ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
                    : "hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[11px]">Presets (8)</span>
              </button>

              <button
                onClick={() => setTopTab("saved")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all cursor-pointer relative ${
                  topTab === "saved"
                    ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
                    : "hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-[11px]">Saved ({savedSetups.length})</span>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

              {/* ======================================================== */}
              {/* TAB 1: MANUAL SELECTION                                 */}
              {/* ======================================================== */}
              {topTab === "manual" && (
                <div className="flex flex-col gap-5 animate-fadeIn">

                  {/* Quick Save Current Setup Action Box */}
                  <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                    <input
                      type="text"
                      placeholder={`Name setup (e.g. Version ${savedSetups.length + 1})`}
                      value={newVersionName}
                      onChange={(e) => setNewVersionName(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-600 font-semibold"
                    />
                    <button
                      onClick={handleSaveCurrentSetup}
                      className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <BookmarkPlus className="h-3.5 w-3.5" />
                      <span>Save Setup</span>
                    </button>
                  </div>

                  {/* Element Selector Switcher: 5 distinct elements */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Select Element to Customize:
                    </span>

                    <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">

                      {/* 1. Logo Bar */}
                      <button
                        onClick={() => setSelectedElement("logo")}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "logo"
                            ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: logoBarColor }}
                          />
                          <Building className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-extrabold leading-tight">Logo Bar</span>
                      </button>

                      {/* 2. Top Nav */}
                      <button
                        onClick={() => setSelectedElement("nav")}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "nav"
                            ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: topNavColor }}
                          />
                          <Compass className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-extrabold leading-tight">Top Nav</span>
                      </button>

                      {/* 3. Heading Level 1 */}
                      <button
                        onClick={() => setSelectedElement("level1")}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "level1"
                            ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-slate-300"
                            style={{ background: level1Color }}
                          />
                          <Heading className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-extrabold leading-tight">Heading 1</span>
                      </button>

                      {/* 4. Heading Level 2 */}
                      <button
                        onClick={() => setSelectedElement("level2")}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "level2"
                            ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: level2Color }}
                          />
                          <Heading className="h-3 w-3 text-indigo-500" />
                        </div>
                        <span className="text-[10px] font-extrabold leading-tight">Heading 2</span>
                      </button>

                      {/* 5. Side Nav */}
                      <button
                        onClick={() => setSelectedElement("sidebar")}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "sidebar"
                            ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: sidebarColor }}
                          />
                          <BookOpen className="h-3 w-3 text-indigo-600" />
                        </div>
                        <span className="text-[10px] font-extrabold leading-tight">Side Nav</span>
                      </button>

                    </div>
                  </div>

                  {/* Active Element Info Header */}
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <h4 className="font-outfit text-sm font-black text-slate-800">
                        {selectedElement === "logo" && "Section 1: College Logo Bar"}
                        {selectedElement === "nav" && "Section 2: Sticky Top Nav Bar"}
                        {selectedElement === "level1" && "Section 3: Header Level 1 (Hero Banner)"}
                        {selectedElement === "level2" && "Section 4: Heading Level 2 (Section Banners)"}
                        {selectedElement === "sidebar" && "Section 5: Side Navigation Bar"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {selectedElement === "logo" && "Customizes top institution header with college crest & title."}
                        {selectedElement === "nav" && "Customizes dual-row sticky navigation bar with menu links."}
                        {selectedElement === "level1" && "Customizes main page title hero banner."}
                        {selectedElement === "level2" && "Customizes all Level 2 section header banners across the page."}
                        {selectedElement === "sidebar" && "Customizes sidebar header banner, active link indicator, and icons."}
                      </p>
                    </div>

                    <span
                      className="h-6 w-10 rounded-lg border border-slate-300 shadow-2xs shrink-0"
                      style={{
                        background:
                          selectedElement === "logo"
                            ? logoBarColor
                            : selectedElement === "nav"
                              ? topNavColor
                              : selectedElement === "level1"
                                ? level1Color
                                : selectedElement === "level2"
                                  ? level2Color
                                  : sidebarColor
                      }}
                      title="Current Color Preview"
                    />
                  </div>

                  {/* Color Picker Widget matching user image */}
                  {selectedElement === "logo" && (
                    <ImageStyleColorPicker
                      currentColor={logoBarColor}
                      onColorChange={(c) => setLogoBarColor(c)}
                      supportsGradient={false}
                    />
                  )}

                  {selectedElement === "nav" && (
                    <ImageStyleColorPicker
                      currentColor={topNavColor}
                      onColorChange={(c) => setTopNavColor(c)}
                      supportsGradient={false}
                    />
                  )}

                  {selectedElement === "level1" && (
                    <ImageStyleColorPicker
                      currentColor={level1Color}
                      onColorChange={(c) => setLevel1Color(c)}
                      supportsGradient={true}
                    />
                  )}

                  {selectedElement === "level2" && (
                    <ImageStyleColorPicker
                      currentColor={level2Color}
                      onColorChange={(c) => setLevel2Color(c)}
                      supportsGradient={false}
                    />
                  )}

                  {selectedElement === "sidebar" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                        <button
                          onClick={() => setSidebarColorMode("accent")}
                          className={`flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            sidebarColorMode === "accent"
                              ? "bg-white text-indigo-700 shadow-xs border border-slate-200/80"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full border border-slate-300"
                              style={{ backgroundColor: sidebarColor }}
                            />
                            <span>Banner &amp; Active</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setSidebarColorMode("background")}
                          className={`flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            sidebarColorMode === "background"
                              ? "bg-white text-indigo-700 shadow-xs border border-slate-200/80"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full border border-slate-300"
                              style={{ backgroundColor: sidebarBgColor }}
                            />
                            <span>Nav Background</span>
                          </div>
                        </button>
                      </div>

                      {sidebarColorMode === "accent" ? (
                        <div>
                          <span className="text-[11px] font-bold text-slate-500 block mb-2">
                            Customize Header Banner &amp; Active Link Highlight:
                          </span>
                          <ImageStyleColorPicker
                            currentColor={sidebarColor}
                            onColorChange={(c) => setSidebarColor(c)}
                            supportsGradient={false}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <div>
                            <span className="text-[11px] font-bold text-slate-500 block mb-2">
                              Customize Side Nav Container Background:
                            </span>
                            <ImageStyleColorPicker
                              currentColor={sidebarBgColor}
                              onColorChange={(c) => setSidebarBgColor(c)}
                              supportsGradient={false}
                            />
                          </div>

                          {/* Quick popular background presets */}
                          <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-200/70">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              Quick Nav Background Presets:
                            </span>
                            <div className="grid grid-cols-4 gap-1.5">
                              {[
                                { name: "Pearl Slate", hex: "#eaeff5" },
                                { name: "Pure White", hex: "#ffffff" },
                                { name: "Off White", hex: "#f8fafc" },
                                { name: "Cool Slate", hex: "#f1f5f9" },
                                { name: "Ice Blue", hex: "#e8f1fd" },
                                { name: "Mint Light", hex: "#f0fdf4" },
                                { name: "Lavender", hex: "#faf5ff" },
                                { name: "Dark Slate", hex: "#0f172a" },
                              ].map((p) => (
                                <button
                                  key={p.hex}
                                  onClick={() => setSidebarBgColor(p.hex)}
                                  className={`p-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                    sidebarBgColor.toLowerCase() === p.hex.toLowerCase()
                                      ? "border-indigo-600 bg-indigo-50 font-bold shadow-xs"
                                      : "border-slate-200 bg-white hover:bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className="h-3 w-3 rounded-full border border-slate-300 shrink-0"
                                    style={{ backgroundColor: p.hex }}
                                  />
                                  <span className="text-[10px] truncate text-slate-700 font-semibold">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Complete 5-Section Overview Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2.5 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Live Overview Across 5 Sections:
                      </span>
                      {savedSetups.length > 0 && (
                        <button
                          onClick={() => setTopTab("saved")}
                          className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          View Saved Setups ({savedSetups.length}) →
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div
                        onClick={() => setSelectedElement("logo")}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3.5 w-5 rounded border border-slate-300"
                            style={{ backgroundColor: logoBarColor }}
                          />
                          <span className="text-[11px] font-bold text-slate-800">Logo Bar</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold truncate max-w-[60px]">
                          {logoBarColor}
                        </span>
                      </div>

                      <div
                        onClick={() => setSelectedElement("nav")}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3.5 w-5 rounded border border-slate-300"
                            style={{ backgroundColor: topNavColor }}
                          />
                          <span className="text-[11px] font-bold text-slate-800">Top Nav</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold truncate max-w-[60px]">
                          {topNavColor}
                        </span>
                      </div>

                      <div
                        onClick={() => setSelectedElement("level1")}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3.5 w-5 rounded border border-slate-300"
                            style={{ background: level1Color }}
                          />
                          <span className="text-[11px] font-bold text-slate-800">Heading 1</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold truncate max-w-[60px]">
                          {level1Color.includes("gradient") ? "Gradient" : level1Color}
                        </span>
                      </div>

                      <div
                        onClick={() => setSelectedElement("level2")}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3.5 w-5 rounded border border-slate-300"
                            style={{ backgroundColor: level2Color }}
                          />
                          <span className="text-[11px] font-bold text-slate-800">Heading 2</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold truncate max-w-[60px]">
                          {level2Color}
                        </span>
                      </div>

                      <div
                        onClick={() => {
                          setSelectedElement("sidebar");
                          setSidebarColorMode("accent");
                        }}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3.5 w-5 rounded border border-slate-300"
                            style={{ backgroundColor: sidebarColor }}
                          />
                          <span className="text-[11px] font-bold text-slate-800">Nav Header</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold truncate max-w-[60px]">
                          {sidebarColor}
                        </span>
                      </div>

                      <div
                        onClick={() => {
                          setSelectedElement("sidebar");
                          setSidebarColorMode("background");
                        }}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3.5 w-5 rounded border border-slate-300"
                            style={{ backgroundColor: sidebarBgColor }}
                          />
                          <span className="text-[11px] font-bold text-slate-800">Nav Bg</span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 font-bold truncate max-w-[60px]">
                          {sidebarBgColor}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 2: READY-MADE OPTIONS (8 Curated Presets)            */}
              {/* ======================================================== */}
              {topTab === "ready" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                      Coordinated Palettes
                    </span>
                    <h4 className="font-outfit text-sm font-black text-slate-800">
                      8 Curated University Schemes
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      1-click harmonization across Logo Bar, Top Nav, Heading 1 &amp; Heading 2.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {READY_MADE_OPTIONS.map((option) => {
                      const isActive =
                        logoBarColor === option.logoBar &&
                        topNavColor === option.topNav &&
                        level1Color === option.level1 &&
                        level2Color === option.level2 &&
                        (!option.sidebar || sidebarColor === option.sidebar) &&
                        (!option.sidebarBg || sidebarBgColor === option.sidebarBg);

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleApplyReadyMade(option)}
                          className={`flex flex-col gap-2.5 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            isActive
                              ? "border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-outfit text-xs font-extrabold text-slate-900">
                              {option.name}
                            </span>
                            {isActive ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Active
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-0.5">
                                Apply <ArrowRight className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                            {option.desc}
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-bold text-slate-400">6 Colors:</span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.logoBar }}
                                title="Logo Bar"
                              />
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.topNav }}
                                title="Top Nav"
                              />
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.level1 }}
                                title="Heading 1"
                              />
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.level2 }}
                                title="Heading 2"
                              />
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.sidebar || "#1e40af" }}
                                title="Side Nav Header & Active"
                              />
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.sidebarBg || "#eaeff5" }}
                                title="Side Nav Container Background"
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 3: SAVED SETUPS (Save & Switch Between Versions)    */}
              {/* ======================================================== */}
              {topTab === "saved" && (
                <div className="flex flex-col gap-5 animate-fadeIn">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block mb-1">
                      Version Snapshots
                    </span>
                    <h4 className="font-outfit text-sm font-black text-slate-800">
                      Saved Color Setups
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Save your current palette setup, try different variations freely, and return to test or restore previous versions anytime.
                    </p>
                  </div>

                  {/* Save Current Box */}
                  <div className="flex flex-col gap-2 p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                    <span className="text-xs font-bold text-indigo-900">Save Current Setup as Version:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Setup Version ${savedSetups.length + 1}`}
                        value={newVersionName}
                        onChange={(e) => setNewVersionName(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-white border border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-600 font-semibold"
                      />
                      <button
                        onClick={handleSaveCurrentSetup}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
                      >
                        <BookmarkPlus className="h-3.5 w-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>

                  {/* List of Saved Versions */}
                  {savedSetups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl gap-2">
                      <Bookmark className="h-8 w-8 text-slate-300" />
                      <h5 className="font-outfit font-bold text-sm text-slate-700">No Saved Versions Yet</h5>
                      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                        Customize your colors in Manual Selection, then click &quot;Save Setup&quot; to bookmark this version so you can switch back to it anytime.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {savedSetups.map((setup) => {
                        const isCurrentActive =
                          logoBarColor === setup.logoBar &&
                          topNavColor === setup.topNav &&
                          level1Color === setup.level1 &&
                          level2Color === setup.level2 &&
                          (!setup.sidebar || sidebarColor === setup.sidebar) &&
                          (!setup.sidebarBg || sidebarBgColor === setup.sidebarBg);

                        return (
                          <div
                            key={setup.id}
                            onClick={() => handleApplySavedSetup(setup)}
                            className={`flex flex-col gap-2.5 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                              isCurrentActive
                                ? "border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-outfit text-xs font-extrabold text-slate-900">
                                  {setup.name}
                                </span>
                                {isCurrentActive && (
                                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Active Now
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
                                  <Clock className="h-3 w-3" /> {setup.createdAt}
                                </span>
                                <button
                                  onClick={(e) => handleDeleteSavedSetup(setup.id, e)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                  title="Delete this saved setup"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="h-4 w-5 rounded border border-slate-300"
                                  style={{ background: setup.logoBar }}
                                  title="Logo Bar"
                                />
                                <span
                                  className="h-4 w-5 rounded border border-slate-300"
                                  style={{ background: setup.topNav }}
                                  title="Top Nav"
                                />
                                <span
                                  className="h-4 w-5 rounded border border-slate-300"
                                  style={{ background: setup.level1 }}
                                  title="Heading 1"
                                />
                                <span
                                  className="h-4 w-5 rounded border border-slate-300"
                                  style={{ background: setup.level2 }}
                                  title="Heading 2"
                                />
                                <span
                                  className="h-4 w-5 rounded border border-slate-300"
                                  style={{ background: setup.sidebar || "#1e40af" }}
                                  title="Side Nav Header & Active"
                                />
                                <span
                                  className="h-4 w-5 rounded border border-slate-300"
                                  style={{ background: setup.sidebarBg || "#eaeff5" }}
                                  title="Side Nav Container Background"
                                />
                              </div>

                              <span className="text-[11px] font-bold text-indigo-600 flex items-center gap-1">
                                {isCurrentActive ? "Active" : "Click to Apply →"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCodes}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-indigo-600 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Hex Codes"}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-all active:scale-95 cursor-pointer"
                  title="Close Color Palette"
                >
                  <X className="h-3.5 w-3.5" /> Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
