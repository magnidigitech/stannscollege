"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Palette, Check, RotateCcw, Copy, X, Sliders, Sparkles,
  Building, Compass, Heading, Bookmark, BookmarkPlus,
  Pipette, CheckCircle2, ArrowRight, Trash2, Clock, BookOpen,
  Type, SlidersHorizontal, Layers, Paintbrush, Shield
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
  if (!colorStr) return false;
  if (colorStr.includes("gradient")) {
    return colorStr.includes("#fff") || colorStr.includes("#f8") || colorStr.includes("#ea");
  }
  const rgb = hexToRgb(colorStr);
  if (!rgb) return false;
  const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  return yiq >= 145;
}

function extractSolidFromGradient(colorStr: string): string {
  if (!colorStr || !colorStr.includes("gradient")) return colorStr || "#002147";
  const match = colorStr.match(/#[a-fA-F0-9]{6}/);
  return match ? match[0] : "#002147";
}

// --- Data Types ---
export interface SavedColorSetup {
  id: string;
  name: string;
  createdAt: string;
  logoBar: string;
  crestBoxColor?: string;
  logoBoxColor?: string;
  topNav: string;
  level1: string;
  level2: string;
  sidebar?: string;
  sidebarBg?: string;
  headerTitleColor?: string;
  headerSubColor?: string;
  headerAccentColor?: string;
  headerAddressColor?: string;
  topNavLinkColor?: string;
  topNavRow2Color?: string;
}

export interface ReadyMadeOption {
  id: string;
  name: string;
  desc: string;
  logoBar: string;
  crestBoxColor?: string;
  logoBoxColor?: string;
  topNav: string;
  level1: string;
  level2: string;
  sidebar?: string;
  sidebarBg?: string;
  headerTitleColor?: string;
  headerSubColor?: string;
  headerAccentColor?: string;
  headerAddressColor?: string;
  topNavLinkColor?: string;
  topNavRow2Color?: string;
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
    sidebarBg: "#eaeff5",
    headerTitleColor: "#ffffff",
    headerSubColor: "#bfdbfe",
    headerAccentColor: "#93c5fd",
    headerAddressColor: "#cbd5e1",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#e2e8f0"
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
    sidebarBg: "#eaeff5",
    headerTitleColor: "#ffffff",
    headerSubColor: "#bfdbfe",
    headerAccentColor: "#93c5fd",
    headerAddressColor: "#cbd5e1",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#e2e8f0"
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
    sidebarBg: "#ffffff",
    headerTitleColor: "#002b49",
    headerSubColor: "#1e3a8a",
    headerAccentColor: "#991b1b",
    headerAddressColor: "#334155",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#cbd5e1"
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
    sidebarBg: "#e8f1fd",
    headerTitleColor: "#ffffff",
    headerSubColor: "#a5f3fc",
    headerAccentColor: "#67e8f9",
    headerAddressColor: "#e0f2fe",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#e2e8f0"
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
    sidebarBg: "#eef2ff",
    headerTitleColor: "#ffffff",
    headerSubColor: "#c7d2fe",
    headerAccentColor: "#a5b4fc",
    headerAddressColor: "#e0e7ff",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#e0e7ff"
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
    sidebarBg: "#f1f5f9",
    headerTitleColor: "#ffffff",
    headerSubColor: "#94a3b8",
    headerAccentColor: "#38bdf8",
    headerAddressColor: "#cbd5e1",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#94a3b8"
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
    sidebarBg: "#f0fdf4",
    headerTitleColor: "#ffffff",
    headerSubColor: "#a7f3d0",
    headerAccentColor: "#6ee7b7",
    headerAddressColor: "#d1fae5",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#a7f3d0"
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
    sidebarBg: "#fdf2f2",
    headerTitleColor: "#ffffff",
    headerSubColor: "#fecdd3",
    headerAccentColor: "#fda4af",
    headerAddressColor: "#ffe4e6",
    topNavLinkColor: "#ffffff",
    topNavRow2Color: "#fecdd3"
  }
];

// --- Custom Color Picker Canvas Component ---
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
    <div className="w-full bg-white border-2 border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col gap-3.5">
      {/* High-Contrast Segmented Tabs: Solid colour | Gradient */}
      <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-2.5">
        <button
          onClick={() => {
            setColorMode("solid");
            onColorChange(activeSolidHex);
          }}
          className={`px-3.5 py-1.5 rounded-xl font-outfit text-xs font-black transition-all cursor-pointer ${
            colorMode === "solid"
              ? "bg-slate-950 text-white shadow-xs border border-slate-800"
              : "text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          Solid colour
        </button>

        {supportsGradient && (
          <button
            onClick={() => {
              setColorMode("gradient");
              applyGradient(gradientStart, gradientEnd, gradientDir);
            }}
            className={`px-3.5 py-1.5 rounded-xl font-outfit text-xs font-black transition-all cursor-pointer ${
              colorMode === "gradient"
                ? "bg-slate-950 text-white shadow-xs border border-slate-800"
                : "text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            Gradient Tone
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
            className="relative w-full h-40 rounded-xl cursor-crosshair overflow-hidden select-none touch-none shadow-inner border border-slate-300"
            style={{
              backgroundColor: `hsl(${hue}, 100%, 50%)`,
              backgroundImage: `
                linear-gradient(to top, #000, transparent),
                linear-gradient(to right, #fff, transparent)
              `
            }}
          >
            {/* Dragger circle with high-contrast ring */}
            <div
              className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ring-1 ring-black/40"
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
            className="relative w-full h-4 rounded-full cursor-pointer select-none touch-none shadow-inner border border-slate-300"
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
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none flex items-center justify-center ring-1 ring-black/30"
              style={{
                left: `${(hue / 360) * 100}%`
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shadow-2xs"
                style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
              />
            </div>
          </div>

          {/* Bottom Bar: Swatch + Hex Input + EyeDropper */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-100 border-2 border-slate-300 rounded-xl focus-within:border-purple-600 focus-within:bg-white transition-all">
              <div
                className="h-6 w-6 rounded-lg border-2 border-white shadow-xs shrink-0 ring-1 ring-black/10"
                style={{ backgroundColor: activeSolidHex }}
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexInputChange(e.target.value)}
                placeholder="#002147"
                maxLength={7}
                className="flex-1 font-mono font-black text-xs md:text-sm text-slate-900 uppercase focus:outline-none bg-transparent"
              />
            </div>

            {/* EyeDropper Button */}
            <button
              onClick={handleEyeDropper}
              type="button"
              className="p-2.5 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-800 hover:text-purple-600 transition-all shadow-xs active:scale-95 cursor-pointer font-bold"
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
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-slate-700">Direction</label>
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
                  className={`py-2 px-1 text-center rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                    gradientDir === d.val
                      ? "border-slate-950 bg-slate-950 text-white shadow-xs"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black text-slate-700">Start Tone</label>
              <div className="flex items-center gap-2 p-2 bg-slate-100 border-2 border-slate-300 rounded-xl">
                <input
                  type="color"
                  value={gradientStart}
                  onChange={(e) => {
                    setGradientStart(e.target.value);
                    applyGradient(e.target.value, gradientEnd, gradientDir);
                  }}
                  className="h-7 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                />
                <span className="font-mono text-xs font-black text-slate-800">{gradientStart}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-black text-slate-700">End Tone</label>
              <div className="flex items-center gap-2 p-2 bg-slate-100 border-2 border-slate-300 rounded-xl">
                <input
                  type="color"
                  value={gradientEnd}
                  onChange={(e) => {
                    setGradientEnd(e.target.value);
                    applyGradient(gradientStart, e.target.value, gradientDir);
                  }}
                  className="h-7 w-8 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                />
                <span className="font-mono text-xs font-black text-slate-800">{gradientEnd}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-1">
            <span className="text-[11px] font-black text-slate-600">Gradient Live Preview:</span>
            <div
              className="h-10 w-full rounded-xl border-2 border-slate-300 shadow-inner"
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
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [topTab, setTopTab] = useState<"manual" | "ready" | "saved">("manual");

  // Manual Element selector: Logo, Top Nav, Heading 1, Heading 2, Side Nav
  const [selectedElement, setSelectedElement] = useState<"logo" | "nav" | "level1" | "level2" | "sidebar">("logo");
  const [copied, setCopied] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // States for 5 distinct sections
  const [logoBarColor, setLogoBarColor] = useState<string>("#002147");
  const [crestBoxColor, setCrestBoxColor] = useState<string>("#ffffff");
  const [logoBoxColor, setLogoBoxColor] = useState<string>("#ffffff");
  const [topNavColor, setTopNavColor] = useState<string>("#002147");
  const [level1Color, setLevel1Color] = useState<string>("linear-gradient(to right, #002b36, #043d4d, #084c61)");
  const [level2Color, setLevel2Color] = useState<string>("#002147");
  const [sidebarColor, setSidebarColor] = useState<string>("#1e40af");
  const [sidebarBgColor, setSidebarBgColor] = useState<string>("#eaeff5");

  // Logo sub-modes: Background vs Crest Box vs Logos Box vs Masthead Typography
  const [logoSubMode, setLogoSubMode] = useState<"background" | "crest" | "box" | "typography">("background");
  const [headerTitleColor, setHeaderTitleColor] = useState<string>("#002b49");
  const [headerSubColor, setHeaderSubColor] = useState<string>("#1e3a8a");
  const [headerAccentColor, setHeaderAccentColor] = useState<string>("#991b1b");
  const [headerAddressColor, setHeaderAddressColor] = useState<string>("#334155");
  const [headerColorSync, setHeaderColorSync] = useState<"all" | "individual">("all");

  // Nav sub-modes: Background vs Menu Links
  const [navSubMode, setNavSubMode] = useState<"background" | "links">("background");
  const [topNavLinkColor, setTopNavLinkColor] = useState<string>("#ffffff");
  const [topNavRow2Color, setTopNavRow2Color] = useState<string>("#e2e8f0");

  // Sidebar sub-mode
  const [sidebarColorMode, setSidebarColorMode] = useState<"accent" | "background">("accent");

  // Saved Setups / Versions List
  const [savedSetups, setSavedSetups] = useState<SavedColorSetup[]>([]);
  const [newVersionName, setNewVersionName] = useState<string>("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem("theme_logoBarColor");
      const savedCrestBoxBg = localStorage.getItem("theme_crestBoxColor");
      const savedBoxBg = localStorage.getItem("theme_logoBoxColor");
      const savedNav = localStorage.getItem("theme_topNavColor");
      const savedL1 = localStorage.getItem("theme_level1Color");
      const savedL2 = localStorage.getItem("theme_level2Color");
      const savedSidebar = localStorage.getItem("theme_sidebarColor");
      const savedSidebarBg = localStorage.getItem("theme_sidebarBgColor");

      const savedTitleCol = localStorage.getItem("theme_headerTitleColor");
      const savedSubCol = localStorage.getItem("theme_headerSubColor");
      const savedAccentCol = localStorage.getItem("theme_headerAccentColor");
      const savedAddressCol = localStorage.getItem("theme_headerAddressColor");
      const savedLinkCol = localStorage.getItem("theme_topNavLinkColor");
      const savedRow2Col = localStorage.getItem("theme_topNavRow2Color");

      const savedList = localStorage.getItem("theme_savedColorSetups");

      if (savedLogo) setLogoBarColor(savedLogo);
      if (savedCrestBoxBg) setCrestBoxColor(savedCrestBoxBg);
      if (savedBoxBg) setLogoBoxColor(savedBoxBg);
      if (savedNav) setTopNavColor(savedNav);
      if (savedL1) setLevel1Color(savedL1);
      if (savedL2) setLevel2Color(savedL2);
      if (savedSidebar) setSidebarColor(savedSidebar);
      if (savedSidebarBg) setSidebarBgColor(savedSidebarBg);

      if (savedTitleCol) setHeaderTitleColor(savedTitleCol);
      if (savedSubCol) setHeaderSubColor(savedSubCol);
      if (savedAccentCol) setHeaderAccentColor(savedAccentCol);
      if (savedAddressCol) setHeaderAddressColor(savedAddressCol);
      if (savedLinkCol) setTopNavLinkColor(savedLinkCol);
      if (savedRow2Col) setTopNavRow2Color(savedRow2Col);

      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed)) setSavedSetups(parsed);
      }
    } catch (e) {
      // Ignore
    }

    const handleDrawerState = (e: any) => {
      if (e.detail) {
        setActiveDrawer(e.detail.openDrawer);
        if (e.detail.openDrawer === "layout") {
          setIsOpen(false);
        } else if (e.detail.openDrawer === "color") {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener("customizerDrawerState", handleDrawerState);
    return () => window.removeEventListener("customizerDrawerState", handleDrawerState);
  }, []);

  // Update CSS Variables in real time
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // 1. Logo Bar variables
    root.style.setProperty("--logo-bar-bg", logoBarColor);
    const isLogoLight = isLightColor(logoBarColor);
    root.style.setProperty("--logo-bar-title", isLogoLight ? "#002147" : "#ffffff");
    root.style.setProperty("--logo-bar-subtitle", isLogoLight ? "#475569" : "rgba(191, 219, 254, 0.9)");
    root.style.setProperty("--logo-bar-divider", isLogoLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)");
    root.style.setProperty("--logo-bar-border", isLogoLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)");
    root.style.setProperty("--logo-bar-icon-bg", isLogoLight ? "rgba(0,33,71,0.06)" : "rgba(255,255,255,0.1)");

    // 1b. Crest Box variables
    root.style.setProperty("--crest-box-bg", crestBoxColor);
    const isCrestBoxLight = isLightColor(crestBoxColor);
    root.style.setProperty("--crest-box-border", isCrestBoxLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)");

    // 1c. Logos Box variables
    root.style.setProperty("--logo-box-bg", logoBoxColor);
    const isBoxLight = isLightColor(logoBoxColor);
    root.style.setProperty("--logo-box-border", isBoxLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)");
    root.style.setProperty("--logo-box-text", isBoxLight ? "#334155" : "#f1f5f9");
    root.style.setProperty("--logo-box-title", isBoxLight ? "#1e3a8a" : "#93c5fd");
    root.style.setProperty("--logo-box-divider", isBoxLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.2)");

    // Typography Text Mode Colors
    root.style.setProperty("--header-title-color", headerTitleColor);
    root.style.setProperty("--header-sub-color", headerSubColor);
    root.style.setProperty("--header-accent-color", headerAccentColor);
    root.style.setProperty("--header-address-color", headerAddressColor);

    // 2. Top Nav Bar variables
    root.style.setProperty("--topnav-bg", topNavColor);
    const isNavLight = isLightColor(topNavColor);
    root.style.setProperty("--topnav-link-color", topNavLinkColor || (isNavLight ? "#0f172a" : "#ffffff"));
    root.style.setProperty("--topnav-row2-color", topNavRow2Color || (isNavLight ? "#334155" : "#e2e8f0"));
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

    // Store in localStorage
    try {
      localStorage.setItem("theme_logoBarColor", logoBarColor);
      localStorage.setItem("theme_crestBoxColor", crestBoxColor);
      localStorage.setItem("theme_logoBoxColor", logoBoxColor);
      localStorage.setItem("theme_topNavColor", topNavColor);
      localStorage.setItem("theme_level1Color", level1Color);
      localStorage.setItem("theme_level2Color", level2Color);
      localStorage.setItem("theme_sidebarColor", sidebarColor);
      localStorage.setItem("theme_sidebarBgColor", sidebarBgColor);

      localStorage.setItem("theme_headerTitleColor", headerTitleColor);
      localStorage.setItem("theme_headerSubColor", headerSubColor);
      localStorage.setItem("theme_headerAccentColor", headerAccentColor);
      localStorage.setItem("theme_headerAddressColor", headerAddressColor);
      localStorage.setItem("theme_topNavLinkColor", topNavLinkColor);
      localStorage.setItem("theme_topNavRow2Color", topNavRow2Color);
    } catch (e) {
      // Ignore
    }

    // Dispatch real-time event for components
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("headerCustomizerUpdate", {
            detail: {
              headerTitleColor,
              headerSubColor,
              headerAccentColor,
              headerAddressColor,
              topNavLinkColor,
              topNavRow2Color,
              logoBarColor,
              crestBoxColor,
              logoBoxColor,
              topNavColor
            }
          })
        );
      }, 0);
    }
  }, [
    logoBarColor, crestBoxColor, logoBoxColor, topNavColor, level1Color, level2Color,
    sidebarColor, sidebarBgColor, headerTitleColor, headerSubColor,
    headerAccentColor, headerAddressColor, topNavLinkColor, topNavRow2Color
  ]);

  // Handle Unified Typography Color Change
  const handleUnifiedTitleColorChange = (c: string) => {
    setHeaderTitleColor(c);
    if (headerColorSync === "all") {
      setHeaderSubColor(c);
      setHeaderAccentColor(c);
      setHeaderAddressColor(c);
    }
  };

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
      crestBoxColor,
      logoBoxColor,
      topNav: topNavColor,
      level1: level1Color,
      level2: level2Color,
      sidebar: sidebarColor,
      sidebarBg: sidebarBgColor,
      headerTitleColor,
      headerSubColor,
      headerAccentColor,
      headerAddressColor,
      topNavLinkColor,
      topNavRow2Color
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
    if (setup.crestBoxColor) setCrestBoxColor(setup.crestBoxColor);
    if (setup.logoBoxColor) setLogoBoxColor(setup.logoBoxColor);
    setTopNavColor(setup.topNav);
    setLevel1Color(setup.level1);
    setLevel2Color(setup.level2);
    if (setup.sidebar) setSidebarColor(setup.sidebar);
    if (setup.sidebarBg) setSidebarBgColor(setup.sidebarBg);

    if (setup.headerTitleColor) setHeaderTitleColor(setup.headerTitleColor);
    if (setup.headerSubColor) setHeaderSubColor(setup.headerSubColor);
    if (setup.headerAccentColor) setHeaderAccentColor(setup.headerAccentColor);
    if (setup.headerAddressColor) setHeaderAddressColor(setup.headerAddressColor);
    if (setup.topNavLinkColor) setTopNavLinkColor(setup.topNavLinkColor);
    if (setup.topNavRow2Color) setTopNavRow2Color(setup.topNavRow2Color);

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
    setCrestBoxColor("#ffffff");
    setLogoBoxColor("#ffffff");
    setTopNavColor("#002147");
    setLevel1Color("linear-gradient(to right, #002b36, #043d4d, #084c61)");
    setLevel2Color("#002147");
    setSidebarColor("#1e40af");
    setSidebarBgColor("#eaeff5");

    setHeaderTitleColor("#ffffff");
    setHeaderSubColor("#bfdbfe");
    setHeaderAccentColor("#93c5fd");
    setHeaderAddressColor("#cbd5e1");
    setTopNavLinkColor("#ffffff");
    setTopNavRow2Color("#e2e8f0");
  };

  const handleApplyReadyMade = (option: ReadyMadeOption) => {
    setLogoBarColor(option.logoBar);
    setCrestBoxColor(option.crestBoxColor || "#ffffff");
    setLogoBoxColor(option.logoBoxColor || "#ffffff");
    setTopNavColor(option.topNav);
    setLevel1Color(option.level1);
    setLevel2Color(option.level2);
    if (option.sidebar) setSidebarColor(option.sidebar);
    if (option.sidebarBg) setSidebarBgColor(option.sidebarBg);

    if (option.headerTitleColor) setHeaderTitleColor(option.headerTitleColor);
    if (option.headerSubColor) setHeaderSubColor(option.headerSubColor);
    if (option.headerAccentColor) setHeaderAccentColor(option.headerAccentColor);
    if (option.headerAddressColor) setHeaderAddressColor(option.headerAddressColor);
    if (option.topNavLinkColor) setTopNavLinkColor(option.topNavLinkColor);
    if (option.topNavRow2Color) setTopNavRow2Color(option.topNavRow2Color);
  };

  const handleCopyCodes = () => {
    const config = JSON.stringify(
      {
        logoBarBackground: logoBarColor,
        crestBoxBackground: crestBoxColor,
        logosBoxBackground: logoBoxColor,
        mastheadTypography: {
          titleColor: headerTitleColor,
          subColor: headerSubColor,
          accentColor: headerAccentColor,
          addressColor: headerAddressColor
        },
        topNavBackground: topNavColor,
        topNavLinks: {
          mainRowLinkColor: topNavLinkColor,
          subRowLinkColor: topNavRow2Color
        },
        level1HeroBanner: level1Color,
        level2SectionBanner: level2Color,
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

  const handleOpenDrawer = () => {
    setIsOpen(true);
    setActiveDrawer("color");
    window.dispatchEvent(new CustomEvent("customizerDrawerState", { detail: { openDrawer: "color" } }));
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
    setActiveDrawer(null);
    window.dispatchEvent(new CustomEvent("customizerDrawerState", { detail: { openDrawer: null } }));
  };

  const handleSwitchToLayout = () => {
    setIsOpen(false);
    setActiveDrawer("layout");
    window.dispatchEvent(new CustomEvent("customizerDrawerState", { detail: { openDrawer: "layout" } }));
  };

  return (
    <>
      {/* Floating Trigger Button: ONLY rendered when NO customizer drawer is open */}
      {!isOpen && activeDrawer === null && (
        <div className="fixed bottom-6 right-6 z-50 select-none animate-fadeIn">
          <button
            onClick={handleOpenDrawer}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 text-white font-bold text-xs shadow-2xl hover:bg-slate-900 border-2 border-purple-400/80 hover:border-purple-400 transition-all active:scale-95 group hover:-translate-y-0.5 hover:shadow-purple-500/20 cursor-pointer"
            title="All Color Options: Logo Bar, Text Mode, Top Nav, Heading 1 & 2, Sidebar"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-amber-400 text-white shadow-xs group-hover:rotate-45 transition-transform duration-300">
              <Palette className="h-3.5 w-3.5" />
            </span>
            <span className="font-outfit tracking-wide">Color Palette</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      )}

      {/* Slide-over Drawer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-end select-none">
          {/* Drawer Container with high-contrast slate canvas */}
          <div className="relative z-10 w-full max-w-md h-full bg-[#f8fafc] shadow-2xl flex flex-col border-l-2 border-slate-300 pointer-events-auto animate-slideIn">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-200/90 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-sm">
                  <Palette className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-outfit font-black text-slate-950 text-base leading-tight">
                    Color Palette Studio
                  </h3>
                  <p className="text-[11px] font-bold text-slate-500">
                    Colors for Logo, Text Mode, Top Nav &amp; Headings
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSwitchToLayout}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/40 hover:bg-emerald-500/25 text-emerald-800 hover:text-emerald-950 text-[11px] font-black transition-all cursor-pointer shadow-2xs"
                  title="Switch directly to Layout & Sizing Studio"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Layout &amp; Sizing</span>
                </button>

                <button
                  onClick={handleCloseDrawer}
                  className="p-2 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-all cursor-pointer font-bold"
                  title="Close Drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Toast feedback when setup saved/applied */}
            {saveToast && (
              <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fadeIn shrink-0 shadow-xs">
                <Check className="h-3.5 w-3.5" /> {saveToast}
              </div>
            )}

            {/* High-Contrast Segmented Tabs: Manual Selection | Presets | Saved */}
            <div className="grid grid-cols-3 p-2 bg-slate-200/90 border-b-2 border-slate-300/80 gap-1.5 shrink-0 text-xs font-bold">
              <button
                onClick={() => setTopTab("manual")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  topTab === "manual"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-purple-500/30 font-black border border-slate-800"
                    : "bg-white/80 text-slate-700 font-bold hover:bg-white hover:text-slate-950 border border-slate-300/60"
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="text-[11px]">Manual Colors</span>
              </button>

              <button
                onClick={() => setTopTab("ready")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  topTab === "ready"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-purple-500/30 font-black border border-slate-800"
                    : "bg-white/80 text-slate-700 font-bold hover:bg-white hover:text-slate-950 border border-slate-300/60"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-[11px]">Presets (8)</span>
              </button>

              <button
                onClick={() => setTopTab("saved")}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl transition-all cursor-pointer relative ${
                  topTab === "saved"
                    ? "bg-slate-950 text-white shadow-md ring-2 ring-purple-500/30 font-black border border-slate-800"
                    : "bg-white/80 text-slate-700 font-bold hover:bg-white hover:text-slate-950 border border-slate-300/60"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-[11px]">Saved ({savedSetups.length})</span>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">

              {/* ======================================================== */}
              {/* TAB 1: MANUAL SELECTION                                 */}
              {/* ======================================================== */}
              {topTab === "manual" && (
                <div className="flex flex-col gap-5 animate-fadeIn">

                  {/* High-Contrast Element Selector Switcher: 5 distinct sections */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                        Select Target Section:
                      </span>
                      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                        {selectedElement.toUpperCase()} ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-slate-200/90 rounded-2xl border-2 border-slate-300/80">

                      {/* 1. Logo Bar */}
                      <button
                        onClick={() => setSelectedElement("logo")}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "logo"
                            ? "bg-slate-950 text-white shadow-lg border-2 border-purple-500 ring-2 ring-purple-500/30 scale-[1.02]"
                            : "bg-white text-slate-700 font-bold border-2 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-3 w-3 rounded-full border border-slate-400 shrink-0"
                            style={{ backgroundColor: logoBarColor }}
                          />
                          <Building className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-black leading-tight">Logo Bar</span>
                      </button>

                      {/* 2. Top Nav */}
                      <button
                        onClick={() => setSelectedElement("nav")}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "nav"
                            ? "bg-slate-950 text-white shadow-lg border-2 border-purple-500 ring-2 ring-purple-500/30 scale-[1.02]"
                            : "bg-white text-slate-700 font-bold border-2 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-3 w-3 rounded-full border border-slate-400 shrink-0"
                            style={{ backgroundColor: topNavColor }}
                          />
                          <Compass className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-black leading-tight">Top Nav</span>
                      </button>

                      {/* 3. Heading Level 1 */}
                      <button
                        onClick={() => setSelectedElement("level1")}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "level1"
                            ? "bg-slate-950 text-white shadow-lg border-2 border-purple-500 ring-2 ring-purple-500/30 scale-[1.02]"
                            : "bg-white text-slate-700 font-bold border-2 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-3 w-3 rounded-full border border-slate-400 shrink-0"
                            style={{ background: level1Color }}
                          />
                          <Heading className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-black leading-tight">Heading 1</span>
                      </button>

                      {/* 4. Heading Level 2 */}
                      <button
                        onClick={() => setSelectedElement("level2")}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "level2"
                            ? "bg-slate-950 text-white shadow-lg border-2 border-purple-500 ring-2 ring-purple-500/30 scale-[1.02]"
                            : "bg-white text-slate-700 font-bold border-2 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-3 w-3 rounded-full border border-slate-400 shrink-0"
                            style={{ backgroundColor: level2Color }}
                          />
                          <Heading className="h-3 w-3 text-purple-400" />
                        </div>
                        <span className="text-[10px] font-black leading-tight">Heading 2</span>
                      </button>

                      {/* 5. Side Nav */}
                      <button
                        onClick={() => setSelectedElement("sidebar")}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                          selectedElement === "sidebar"
                            ? "bg-slate-950 text-white shadow-lg border-2 border-purple-500 ring-2 ring-purple-500/30 scale-[1.02]"
                            : "bg-white text-slate-700 font-bold border-2 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span
                            className="h-3 w-3 rounded-full border border-slate-400 shrink-0"
                            style={{ backgroundColor: sidebarColor }}
                          />
                          <BookOpen className="h-3 w-3 text-indigo-400" />
                        </div>
                        <span className="text-[10px] font-black leading-tight">Side Nav</span>
                      </button>

                    </div>
                  </div>

                  {/* Active Section Info Card */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-outfit text-sm font-black text-slate-900">
                        {selectedElement === "logo" && "Section 1: College Logo Bar & Masthead"}
                        {selectedElement === "nav" && "Section 2: Sticky Top Nav Bar & Links"}
                        {selectedElement === "level1" && "Section 3: Header Level 1 (Hero Banner)"}
                        {selectedElement === "level2" && "Section 4: Heading Level 2 (Section Banners)"}
                        {selectedElement === "sidebar" && "Section 5: Side Navigation Bar"}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedElement === "logo" && "Background color and live Text Mode typography colors."}
                        {selectedElement === "nav" && "Navigation bar background and menu link text colors."}
                        {selectedElement === "level1" && "Main page title hero banner background (solid or gradient)."}
                        {selectedElement === "level2" && "Section headers across all academic and quality assurance pages."}
                        {selectedElement === "sidebar" && "Sidebar header banner, active link indicator, and container background."}
                      </p>
                    </div>

                    <span
                      className="h-7 w-10 rounded-lg border-2 border-white shadow-sm shrink-0 ring-1 ring-slate-300"
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
                      title="Current Section Color"
                    />
                  </div>

                  {/* ======================================================== */}
                  {/* SECTION 1: LOGO BAR (BACKGROUND VS CREST VS LOGOS BOX)    */}
                  {/* ======================================================== */}
                  {selectedElement === "logo" && (
                    <div className="flex flex-col gap-4">
                      {/* Sub-mode switcher */}
                      <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-slate-200/90 rounded-2xl border-2 border-slate-300/80">
                        <button
                          onClick={() => setLogoSubMode("background")}
                          className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            logoSubMode === "background"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <Paintbrush className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Bar BG</span>
                        </button>

                        <button
                          onClick={() => setLogoSubMode("crest")}
                          className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            logoSubMode === "crest"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <Shield className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Crest Box</span>
                        </button>

                        <button
                          onClick={() => setLogoSubMode("box")}
                          className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            logoSubMode === "box"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <Layers className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Logos Box</span>
                        </button>

                        <button
                          onClick={() => setLogoSubMode("typography")}
                          className={`py-2 px-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            logoSubMode === "typography"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <Type className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Typography</span>
                        </button>
                      </div>

                      {/* 1. Logo Bar Background */}
                      {logoSubMode === "background" && (
                        <div className="flex flex-col gap-3">
                          <ImageStyleColorPicker
                            currentColor={logoBarColor}
                            onColorChange={(c) => setLogoBarColor(c)}
                            supportsGradient={false}
                          />

                          {/* Quick Swatches for Logo Bar */}
                          <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Quick Logo Bar Presets:
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { name: "Pure White", hex: "#ffffff" },
                                { name: "Midnight Navy", hex: "#002147" },
                                { name: "Slate Dark", hex: "#0f172a" },
                                { name: "Off White", hex: "#f8fafc" },
                                { name: "Deep Teal", hex: "#002b36" },
                                { name: "Oxford Blue", hex: "#1e1b4b" },
                                { name: "Emerald Dark", hex: "#022c22" },
                                { name: "Ivory Cream", hex: "#fffbeb" },
                              ].map((p) => (
                                <button
                                  key={p.hex}
                                  onClick={() => setLogoBarColor(p.hex)}
                                  className={`p-2 rounded-xl border-2 text-left flex items-center gap-2 transition-all cursor-pointer ${
                                    logoBarColor.toLowerCase() === p.hex.toLowerCase()
                                      ? "border-purple-600 bg-purple-50 font-black shadow-xs ring-2 ring-purple-500/20"
                                      : "border-slate-200 bg-white hover:bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className="h-3.5 w-3.5 rounded-full border border-slate-300 shrink-0"
                                    style={{ backgroundColor: p.hex }}
                                  />
                                  <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. College Crest Box Background */}
                      {logoSubMode === "crest" && (
                        <div className="flex flex-col gap-3">
                          <div className="p-3 bg-purple-50/90 border-2 border-purple-200 rounded-2xl text-xs text-purple-950 flex flex-col gap-1">
                            <span className="font-black flex items-center gap-1 text-purple-900">
                              <Shield className="h-4 w-4" /> Left Crest Logo Box Background
                            </span>
                            <p className="text-[11px] text-purple-800 font-medium">
                              Controls the background color of the college crest logo box on the left.
                            </p>
                          </div>

                          <ImageStyleColorPicker
                            currentColor={crestBoxColor}
                            onColorChange={(c) => setCrestBoxColor(c)}
                            supportsGradient={false}
                          />

                          {/* Quick Swatches for Crest Box */}
                          <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Quick Crest Box Presets:
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { name: "Pure White", hex: "#ffffff" },
                                { name: "Off White", hex: "#f8fafc" },
                                { name: "Soft Cream", hex: "#fffbeb" },
                                { name: "Ice Blue", hex: "#f0f9ff" },
                                { name: "Pale Mint", hex: "#f0fdf4" },
                                { name: "Light Lavender", hex: "#f5f3ff" },
                                { name: "Midnight Navy", hex: "#002147" },
                                { name: "Slate Dark", hex: "#0f172a" },
                              ].map((p) => (
                                <button
                                  key={p.hex}
                                  onClick={() => setCrestBoxColor(p.hex)}
                                  className={`p-2 rounded-xl border-2 text-left flex items-center gap-2 transition-all cursor-pointer ${
                                    crestBoxColor.toLowerCase() === p.hex.toLowerCase()
                                      ? "border-purple-600 bg-purple-50 font-black shadow-xs ring-2 ring-purple-500/20"
                                      : "border-slate-200 bg-white hover:bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className="h-3.5 w-3.5 rounded-full border border-slate-300 shrink-0"
                                    style={{ backgroundColor: p.hex }}
                                  />
                                  <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Match Side Logos Box Button */}
                          <button
                            onClick={() => setCrestBoxColor(logoBoxColor)}
                            className="p-3 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Layers className="h-4 w-4 text-purple-600" />
                            <span>Match Side Logos Box Color ({logoBoxColor})</span>
                          </button>

                          {/* Live Mini Preview */}
                          <div className="p-3.5 bg-slate-100 border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Crest Box Live Preview (on Current Logo Bar):
                            </span>
                            <div
                              className="p-3.5 rounded-2xl flex items-center justify-between border transition-all duration-200"
                              style={{ backgroundColor: logoBarColor }}
                            >
                              <div
                                className="flex items-center gap-3 px-3 py-2 rounded-xl border shadow-xs transition-all duration-200"
                                style={{
                                  backgroundColor: crestBoxColor,
                                  borderColor: isLightColor(crestBoxColor) ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)"
                                }}
                              >
                                <img
                                  src="/images/Stanns_CLG_Website_Logo_without_background.png"
                                  alt="Preview Crest"
                                  className="h-9 w-auto object-contain"
                                />
                                <span className="text-xs font-black" style={{ color: isLightColor(crestBoxColor) ? "#002147" : "#ffffff" }}>
                                  St. Ann&apos;s Crest
                                </span>
                              </div>
                              <span
                                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                                style={{
                                  backgroundColor: isLightColor(logoBarColor) ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.1)",
                                  color: isLightColor(logoBarColor) ? "#0f172a" : "#ffffff",
                                  borderColor: isLightColor(logoBarColor) ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"
                                }}
                              >
                                {crestBoxColor}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. Logos Box Background */}
                      {logoSubMode === "box" && (
                        <div className="flex flex-col gap-3">
                          <div className="p-3 bg-purple-50/90 border-2 border-purple-200 rounded-2xl text-xs text-purple-950 flex flex-col gap-1">
                            <span className="font-black flex items-center gap-1 text-purple-900">
                              <Layers className="h-4 w-4" /> Logos Box Background Color
                            </span>
                            <p className="text-[11px] text-purple-800 font-medium">
                              Controls the background color of the logos container box in the top logo bar.
                            </p>
                          </div>

                          <ImageStyleColorPicker
                            currentColor={logoBoxColor}
                            onColorChange={(c) => setLogoBoxColor(c)}
                            supportsGradient={false}
                          />

                          {/* Quick Swatches for Logos Box */}
                          <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Quick Logos Box Presets:
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { name: "Pure White", hex: "#ffffff" },
                                { name: "Off White", hex: "#f8fafc" },
                                { name: "Soft Cream", hex: "#fffbeb" },
                                { name: "Ice Blue", hex: "#f0f9ff" },
                                { name: "Pale Mint", hex: "#f0fdf4" },
                                { name: "Light Lavender", hex: "#f5f3ff" },
                                { name: "Midnight Navy", hex: "#002147" },
                                { name: "Slate Dark", hex: "#0f172a" },
                              ].map((p) => (
                                <button
                                  key={p.hex}
                                  onClick={() => setLogoBoxColor(p.hex)}
                                  className={`p-2 rounded-xl border-2 text-left flex items-center gap-2 transition-all cursor-pointer ${
                                    logoBoxColor.toLowerCase() === p.hex.toLowerCase()
                                      ? "border-purple-600 bg-purple-50 font-black shadow-xs ring-2 ring-purple-500/20"
                                      : "border-slate-200 bg-white hover:bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className="h-3.5 w-3.5 rounded-full border border-slate-300 shrink-0"
                                    style={{ backgroundColor: p.hex }}
                                  />
                                  <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Match Crest Box Button */}
                          <button
                            onClick={() => setLogoBoxColor(crestBoxColor)}
                            className="p-3 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Shield className="h-4 w-4 text-purple-600" />
                            <span>Match Left Crest Box Color ({crestBoxColor})</span>
                          </button>

                          {/* Live Mini Preview */}
                          <div className="p-3.5 bg-slate-100 border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Box Live Preview (on Current Logo Bar):
                            </span>
                            <div
                              className="p-3.5 rounded-2xl flex items-center justify-between border transition-all duration-200"
                              style={{ backgroundColor: logoBarColor }}
                            >
                              <div
                                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border shadow-xs transition-all duration-200"
                                style={{
                                  backgroundColor: logoBoxColor,
                                  borderColor: isLightColor(logoBoxColor) ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)"
                                }}
                              >
                                <span className="text-[11px] font-black" style={{ color: isLightColor(logoBoxColor) ? "#d97706" : "#fbbf24" }}>
                                  29+ YRS
                                </span>
                                <span className="h-3.5 w-px" style={{ backgroundColor: isLightColor(logoBoxColor) ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)" }} />
                                <span className="text-[11px] font-bold" style={{ color: isLightColor(logoBoxColor) ? "#334155" : "#f1f5f9" }}>
                                  NAAC &apos;A&apos;
                                </span>
                                <span className="h-3.5 w-px" style={{ backgroundColor: isLightColor(logoBoxColor) ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)" }} />
                                <span className="text-[11px] font-black" style={{ color: isLightColor(logoBoxColor) ? "#1e3a8a" : "#93c5fd" }}>
                                  AICTE
                                </span>
                              </div>
                              <span
                                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                                style={{
                                  backgroundColor: isLightColor(logoBarColor) ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.1)",
                                  color: isLightColor(logoBarColor) ? "#0f172a" : "#ffffff",
                                  borderColor: isLightColor(logoBarColor) ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"
                                }}
                              >
                                {logoBoxColor}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. Text Mode Typography */}
                      {logoSubMode === "typography" && (
                        <div className="flex flex-col gap-4">
                          <div className="p-3 bg-purple-50/90 border-2 border-purple-200 rounded-2xl text-xs text-purple-950 flex flex-col gap-1">
                            <span className="font-black flex items-center gap-1 text-purple-900">
                              <Type className="h-4 w-4" /> Live Text Mode Masthead Colors
                            </span>
                            <p className="text-[11px] text-purple-800 font-medium">
                              Applies directly when Text Mode Header is active in Layout &amp; Sizing.
                            </p>
                          </div>

                          {/* Sync Mode Toggle */}
                          <div className="flex items-center gap-2 p-1 bg-slate-200/90 rounded-xl border border-slate-300">
                            <button
                              onClick={() => setHeaderColorSync("all")}
                              className={`flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-black transition-all cursor-pointer ${
                                headerColorSync === "all"
                                  ? "bg-slate-950 text-white shadow-xs"
                                  : "text-slate-700 hover:text-slate-950"
                              }`}
                            >
                              Unified Color (All Lines)
                            </button>
                            <button
                              onClick={() => setHeaderColorSync("individual")}
                              className={`flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-black transition-all cursor-pointer ${
                                headerColorSync === "individual"
                                  ? "bg-slate-950 text-white shadow-xs"
                                  : "text-slate-700 hover:text-slate-950"
                              }`}
                            >
                              Individual Line Colors
                            </button>
                          </div>

                          {headerColorSync === "all" ? (
                            <div className="flex flex-col gap-3">
                              <ImageStyleColorPicker
                                currentColor={headerTitleColor}
                                onColorChange={handleUnifiedTitleColorChange}
                                supportsGradient={false}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col gap-3">
                              <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-black text-slate-800">1. College Name (Title Line)</label>
                                  <span className="font-mono text-xs font-bold text-slate-600">{headerTitleColor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={headerTitleColor}
                                    onChange={(e) => setHeaderTitleColor(e.target.value)}
                                    className="h-8 w-10 rounded-lg cursor-pointer border border-slate-300"
                                  />
                                  <input
                                    type="text"
                                    value={headerTitleColor}
                                    onChange={(e) => setHeaderTitleColor(e.target.value)}
                                    className="flex-1 px-3 py-1.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg uppercase"
                                  />
                                </div>
                              </div>

                              <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-black text-slate-800">2. Society Name (Sub Line)</label>
                                  <span className="font-mono text-xs font-bold text-slate-600">{headerSubColor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={headerSubColor}
                                    onChange={(e) => setHeaderSubColor(e.target.value)}
                                    className="h-8 w-10 rounded-lg cursor-pointer border border-slate-300"
                                  />
                                  <input
                                    type="text"
                                    value={headerSubColor}
                                    onChange={(e) => setHeaderSubColor(e.target.value)}
                                    className="flex-1 px-3 py-1.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg uppercase"
                                  />
                                </div>
                              </div>

                              <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-black text-slate-800">3. Affiliation &amp; Accreditation (Accent Lines)</label>
                                  <span className="font-mono text-xs font-bold text-slate-600">{headerAccentColor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={headerAccentColor}
                                    onChange={(e) => setHeaderAccentColor(e.target.value)}
                                    className="h-8 w-10 rounded-lg cursor-pointer border border-slate-300"
                                  />
                                  <input
                                    type="text"
                                    value={headerAccentColor}
                                    onChange={(e) => setHeaderAccentColor(e.target.value)}
                                    className="flex-1 px-3 py-1.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg uppercase"
                                  />
                                </div>
                              </div>

                              <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-black text-slate-800">4. Address &amp; Pin Code (Bottom Line)</label>
                                  <span className="font-mono text-xs font-bold text-slate-600">{headerAddressColor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={headerAddressColor}
                                    onChange={(e) => setHeaderAddressColor(e.target.value)}
                                    className="h-8 w-10 rounded-lg cursor-pointer border border-slate-300"
                                  />
                                  <input
                                    type="text"
                                    value={headerAddressColor}
                                    onChange={(e) => setHeaderAddressColor(e.target.value)}
                                    className="flex-1 px-3 py-1.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg uppercase"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* SECTION 2: TOP NAV (BACKGROUND VS MENU LINKS TEXT)       */}
                  {/* ======================================================== */}
                  {selectedElement === "nav" && (
                    <div className="flex flex-col gap-4">
                      {/* Sub-mode switcher */}
                      <div className="flex items-center gap-2 p-1.5 bg-slate-200/90 rounded-2xl border-2 border-slate-300/80">
                        <button
                          onClick={() => setNavSubMode("background")}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            navSubMode === "background"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <Compass className="h-3.5 w-3.5" />
                          <span>Nav Bar Background</span>
                        </button>

                        <button
                          onClick={() => setNavSubMode("links")}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            navSubMode === "links"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <Type className="h-3.5 w-3.5" />
                          <span>Menu Links &amp; Text</span>
                        </button>
                      </div>

                      {navSubMode === "background" ? (
                        <div className="flex flex-col gap-3">
                          <ImageStyleColorPicker
                            currentColor={topNavColor}
                            onColorChange={(c) => setTopNavColor(c)}
                            supportsGradient={false}
                          />

                          {/* Quick Swatches for Nav Bar */}
                          <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Quick Nav Bar Presets:
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { name: "Midnight Navy", hex: "#002147" },
                                { name: "Deep Teal", hex: "#084c61" },
                                { name: "Oxford Indigo", hex: "#312e81" },
                                { name: "Slate Charcoal", hex: "#1e293b" },
                                { name: "Emerald Heritage", hex: "#064e3b" },
                                { name: "Burgundy Wine", hex: "#581c1c" },
                                { name: "Royal Blue", hex: "#1e3a8a" },
                                { name: "Pure White", hex: "#ffffff" },
                              ].map((p) => (
                                <button
                                  key={p.hex}
                                  onClick={() => setTopNavColor(p.hex)}
                                  className={`p-2 rounded-xl border-2 text-left flex items-center gap-2 transition-all cursor-pointer ${
                                    topNavColor.toLowerCase() === p.hex.toLowerCase()
                                      ? "border-purple-600 bg-purple-50 font-black shadow-xs ring-2 ring-purple-500/20"
                                      : "border-slate-200 bg-white hover:bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className="h-3.5 w-3.5 rounded-full border border-slate-300 shrink-0"
                                    style={{ backgroundColor: p.hex }}
                                  />
                                  <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Menu Links and Sub-Row Colors */
                        <div className="flex flex-col gap-4">
                          <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="text-xs font-black text-slate-900">Primary Nav Links Color (Row 1)</label>
                                <p className="text-[11px] text-slate-500">Main menu items like About Us, Academics, Admissions</p>
                              </div>
                              <span className="h-6 w-8 rounded-md border border-slate-300 shadow-2xs" style={{ backgroundColor: topNavLinkColor }} />
                            </div>

                            <ImageStyleColorPicker
                              currentColor={topNavLinkColor}
                              onColorChange={(c) => setTopNavLinkColor(c)}
                              supportsGradient={false}
                            />

                            {/* Quick Link Presets */}
                            <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-200">
                              {[
                                { name: "Pure White", hex: "#ffffff" },
                                { name: "Soft Slate", hex: "#e2e8f0" },
                                { name: "Pale Gold", hex: "#fef08a" },
                                { name: "Ice Cyan", hex: "#67e8f9" },
                                { name: "Dark Slate", hex: "#0f172a" },
                                { name: "Midnight Navy", hex: "#002147" },
                                { name: "Amber Gold", hex: "#f59e0b" },
                                { name: "Mint Light", hex: "#a7f3d0" },
                              ].map((p) => (
                                <button
                                  key={p.hex}
                                  onClick={() => setTopNavLinkColor(p.hex)}
                                  className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                    topNavLinkColor.toLowerCase() === p.hex.toLowerCase()
                                      ? "border-purple-600 bg-purple-50 font-black shadow-xs"
                                      : "border-slate-200 bg-white hover:bg-slate-50"
                                  }`}
                                >
                                  <span className="h-3 w-3 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: p.hex }} />
                                  <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="p-3.5 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2.5">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="text-xs font-black text-slate-900">Secondary Nav Links Color (Row 2)</label>
                                <p className="text-[11px] text-slate-500">Sub-links bar like NIRF, NAAC, Placements, Examination</p>
                              </div>
                              <span className="h-6 w-8 rounded-md border border-slate-300 shadow-2xs" style={{ backgroundColor: topNavRow2Color }} />
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={topNavRow2Color}
                                onChange={(e) => setTopNavRow2Color(e.target.value)}
                                className="h-8 w-10 rounded-lg cursor-pointer border border-slate-300"
                              />
                              <input
                                type="text"
                                value={topNavRow2Color}
                                onChange={(e) => setTopNavRow2Color(e.target.value)}
                                className="flex-1 px-3 py-1.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* SECTION 3: HEADING 1 (HERO BANNER)                       */}
                  {/* ======================================================== */}
                  {selectedElement === "level1" && (
                    <div className="flex flex-col gap-3">
                      <ImageStyleColorPicker
                        currentColor={level1Color}
                        onColorChange={(c) => setLevel1Color(c)}
                        supportsGradient={true}
                      />
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* SECTION 4: HEADING 2 (SECTION BANNERS)                   */}
                  {/* ======================================================== */}
                  {selectedElement === "level2" && (
                    <div className="flex flex-col gap-3">
                      <ImageStyleColorPicker
                        currentColor={level2Color}
                        onColorChange={(c) => setLevel2Color(c)}
                        supportsGradient={false}
                      />
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* SECTION 5: SIDE NAV                                      */}
                  {/* ======================================================== */}
                  {selectedElement === "sidebar" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 p-1.5 bg-slate-200/90 rounded-2xl border-2 border-slate-300/80">
                        <button
                          onClick={() => setSidebarColorMode("accent")}
                          className={`flex-1 py-2 px-3 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                            sidebarColorMode === "accent"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span
                              className="h-3 w-3 rounded-full border border-slate-300 shrink-0"
                              style={{ backgroundColor: sidebarColor }}
                            />
                            <span>Banner &amp; Active</span>
                          </div>
                        </button>

                        <button
                          onClick={() => setSidebarColorMode("background")}
                          className={`flex-1 py-2 px-3 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                            sidebarColorMode === "background"
                              ? "bg-slate-950 text-white shadow-md border-2 border-purple-500 ring-2 ring-purple-500/20"
                              : "bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span
                              className="h-3 w-3 rounded-full border border-slate-300 shrink-0"
                              style={{ backgroundColor: sidebarBgColor }}
                            />
                            <span>Nav Background</span>
                          </div>
                        </button>
                      </div>

                      {sidebarColorMode === "accent" ? (
                        <ImageStyleColorPicker
                          currentColor={sidebarColor}
                          onColorChange={(c) => setSidebarColor(c)}
                          supportsGradient={false}
                        />
                      ) : (
                        <div className="flex flex-col gap-3">
                          <ImageStyleColorPicker
                            currentColor={sidebarBgColor}
                            onColorChange={(c) => setSidebarBgColor(c)}
                            supportsGradient={false}
                          />

                          {/* Quick popular background presets */}
                          <div className="p-3 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs flex flex-col gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
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
                                  className={`p-1.5 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                                    sidebarBgColor.toLowerCase() === p.hex.toLowerCase()
                                      ? "border-purple-600 bg-purple-50 font-bold shadow-xs"
                                      : "border-slate-200 bg-white hover:bg-slate-50"
                                  }`}
                                >
                                  <span
                                    className="h-3 w-3 rounded-full border border-slate-300 shrink-0"
                                    style={{ backgroundColor: p.hex }}
                                  />
                                  <span className="text-[10px] truncate text-slate-800 font-bold">{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Save Current Setup Box */}
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border-2 border-purple-200 shadow-xs">
                    <input
                      type="text"
                      placeholder={`Name setup (e.g. Version ${savedSetups.length + 1})`}
                      value={newVersionName}
                      onChange={(e) => setNewVersionName(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 font-bold text-slate-800"
                    />
                    <button
                      onClick={handleSaveCurrentSetup}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-950 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <BookmarkPlus className="h-3.5 w-3.5" />
                      <span>Save Setup</span>
                    </button>
                  </div>

                </div>
              )}

              {/* ======================================================== */}
              {/* TAB 2: READY-MADE OPTIONS (8 Curated Presets)            */}
              {/* ======================================================== */}
              {topTab === "ready" && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-600 block mb-0.5">
                      Coordinated Palettes
                    </span>
                    <h4 className="font-outfit text-sm font-black text-slate-900">
                      8 Curated University Schemes
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      1-click harmonization across Logo Bar, Text Mode, Top Nav, Heading 1 &amp; Heading 2.
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
                          className={`flex flex-col gap-2.5 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                            isActive
                              ? "border-purple-600 bg-purple-50/90 shadow-md ring-2 ring-purple-500/25"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-outfit text-xs font-black text-slate-950">
                              {option.name}
                            </span>
                            {isActive ? (
                              <span className="flex items-center gap-1 text-[11px] font-black text-purple-700 bg-purple-100/90 px-2 py-0.5 rounded-md">
                                <CheckCircle2 className="h-3.5 w-3.5" /> ACTIVE PRESET
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-500 group-hover:text-purple-600 flex items-center gap-0.5">
                                Apply <ArrowRight className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                            {option.desc}
                          </p>
                          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                            <span className="text-[10px] font-black text-slate-400">Palettes:</span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.logoBar }}
                                title="Logo Bar"
                              />
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.logoBoxColor || "#ffffff" }}
                                title="Logos Box"
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
                                title="Side Nav"
                              />
                              <span
                                className="h-4 w-5 rounded border border-slate-300"
                                style={{ background: option.sidebarBg || "#eaeff5" }}
                                title="Side Nav Background"
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
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-600 block mb-0.5">
                      Version Snapshots
                    </span>
                    <h4 className="font-outfit text-sm font-black text-slate-900">
                      Saved Color Setups
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Save, switch and restore custom color palettes at any time.
                    </p>
                  </div>

                  {/* List of Saved Versions */}
                  {savedSetups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center bg-white border-2 border-dashed border-slate-200 rounded-2xl gap-2 shadow-xs">
                      <Bookmark className="h-8 w-8 text-slate-300" />
                      <h5 className="font-outfit font-black text-sm text-slate-800">No Saved Versions Yet</h5>
                      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                        Customize your colors in Manual Selection, then click &quot;Save Setup&quot; to bookmark this version.
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
                            className={`flex flex-col gap-2.5 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              isCurrentActive
                                ? "border-purple-600 bg-purple-50/90 shadow-md ring-2 ring-purple-500/25"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-2xs"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-outfit text-xs font-black text-slate-950">
                                  {setup.name}
                                </span>
                                {isCurrentActive && (
                                  <span className="text-[10px] font-black text-purple-700 bg-purple-100/90 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Active
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 mr-1">
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
                                  style={{ background: setup.logoBoxColor || "#ffffff" }}
                                  title="Logos Box"
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
                                  title="Side Nav"
                                />
                                <span
                                  className="h-4 w-5 rounded border border-slate-300"
                                  style={{ background: setup.sidebarBg || "#eaeff5" }}
                                  title="Side Nav Background"
                                />
                              </div>

                              <span className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
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

            {/* Footer Actions with High Contrast */}
            <div className="p-4 border-t-2 border-slate-200/90 bg-white flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-black text-slate-700 hover:text-slate-950 bg-slate-100 border-2 border-slate-200 rounded-xl hover:bg-slate-200 transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCodes}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-white bg-slate-950 hover:bg-purple-700 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Hex Codes"}
                </button>

                <button
                  onClick={handleCloseDrawer}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-black text-slate-700 hover:text-slate-950 bg-slate-100 border-2 border-slate-200 hover:bg-slate-200 rounded-xl transition-all active:scale-95 cursor-pointer"
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
