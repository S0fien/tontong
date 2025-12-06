import { useEffect, useRef, useState } from "react";
import type { PhoneType } from "../interfaces";

const arpabetData = [
  { arpabet: "AO", colorbase: "#E0B0FF", example: "mauve", ipa: "ɔ" },
  { arpabet: "AA", colorbase: "#A56945", example: "coffee", ipa: "ɑ" },
  { arpabet: "IY", colorbase: "#008000", example: "green", ipa: "i" },
  { arpabet: "UW", colorbase: "#0000FF", example: "blue", ipa: "u" },
  { arpabet: "EH", colorbase: "#FF0000", example: "red", ipa: "ɛ" },
  { arpabet: "IH", colorbase: "#FFC0CB", example: "pink", ipa: "ɪ" },
  { arpabet: "UH", colorbase: "#A8531C", example: "wood", ipa: "ʊ" },
  { arpabet: "AH", colorbase: "#E5CCC9", example: "dust", ipa: "ə" },
  { arpabet: "AX", colorbase: "#E5CCC9", example: "dust", ipa: "ə" },
  { arpabet: "AE", colorbase: "#C2B280", example: "sand", ipa: "æ" },
  { arpabet: "EY", colorbase: "#00A86B", example: "jade", ipa: "eɪ" },
  { arpabet: "AY", colorbase: "#00F000", example: "lime", ipa: "aɪ" },
  { arpabet: "OW", colorbase: "#FFD700", example: "gold", ipa: "oʊ" },
  { arpabet: "AW", colorbase: "#572E02", example: "brown", ipa: "aʊ" },
  { arpabet: "OY", colorbase: "#40E0D0", example: "turquoise", ipa: "ɔɪ" },
  { arpabet: "ER", colorbase: "#800080", example: "purple", ipa: "ɝ" },
];

const samplePhones = [
  { phone: "S", start: 0.142, end: 0.282, duration: 0.14 },
  { phone: "AH0", start: 0.282, end: 0.322, duration: 0.04 },
  { phone: "M", start: 0.322, end: 0.392, duration: 0.07 },
  { phone: "T", start: 0.392, end: 0.461, duration: 0.07 },
  { phone: "AY1", start: 0.461, end: 0.641, duration: 0.18 },
  { phone: "M", start: 0.641, end: 0.701, duration: 0.06 },
  { phone: "Z", start: 0.701, end: 0.91, duration: 0.21 },
  { phone: "AY1", start: 1.868, end: 1.988, duration: 0.12 },
  { phone: "JH", start: 1.988, end: 2.068, duration: 0.08 },
  { phone: "AH0", start: 2.068, end: 2.108, duration: 0.04 },
  { phone: "S", start: 2.108, end: 2.257, duration: 0.15 },
  { phone: "T", start: 2.257, end: 2.417, duration: 0.16 },
  { phone: "F", start: 2.417, end: 2.477, duration: 0.06 },
  { phone: "IY1", start: 2.477, end: 2.507, duration: 0.03 },
  { phone: "L", start: 2.507, end: 2.567, duration: 0.06 },
  { phone: "OW2", start: 2.567, end: 2.597, duration: 0.03 },
  { phone: "V", start: 2.597, end: 2.646, duration: 0.05 },
  { phone: "ER0", start: 2.646, end: 2.786, duration: 0.14 },
  { phone: "W", start: 2.786, end: 2.916, duration: 0.13 },
  { phone: "EH1", start: 2.916, end: 2.956, duration: 0.04 },
  { phone: "L", start: 2.956, end: 3.145, duration: 0.19 },
  { phone: "M", start: 3.145, end: 3.235, duration: 0.09 },
  { phone: "D", start: 3.235, end: 3.295, duration: 0.06 },
  { phone: "Y", start: 3.295, end: 3.425, duration: 0.13 },
  { phone: "UW1", start: 3.425, end: 3.455, duration: 0.03 },
  { phone: "N", start: 3.455, end: 3.495, duration: 0.04 },
  { phone: "OW1", start: 3.495, end: 3.724, duration: 0.23 },
];

const Phonograph = ({ phones }: { phones: PhoneType[] }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const maxTime = Math.max(...samplePhones.map((p) => p.end));

  const getColor = (phone: string) => {
    const basePhone = phone.replace(/[0-9]/g, "");
    const vowel = arpabetData.find((d) => d.arpabet === basePhone);
    return vowel ? vowel.colorbase : "#808080";
  };

  const isVowel = (phone: string) => {
    const basePhone = phone.replace(/[0-9]/g, "");
    return arpabetData.some((d) => d.arpabet === basePhone);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = performance.now() - currentTime * 1000;

      const animate = (timestamp: number) => {
        const elapsed = startTimeRef.current
          ? (timestamp - startTimeRef.current) / 1000
          : 0;

        if (elapsed >= maxTime) {
          setCurrentTime(0);
          setIsPlaying(false);
          startTimeRef.current = null;
        } else {
          setCurrentTime(elapsed);
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, maxTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className=" bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Timeline Visualization */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
          <div className="relative h-32 mb-4">
            {phones
              .filter((p: PhoneType) => p.phone !== "sp")
              .map((phone, idx) => {
                const left = (phone.start / maxTime) * 100;
                const width = (phone.duration / maxTime) * 100;
                const color = getColor(phone.phone);
                const active =
                  currentTime >= phone.start && currentTime <= phone.end;

                return (
                  <div
                    key={idx}
                    className="absolute transition-all duration-100"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      top: isVowel(phone.phone) ? "0%" : "50%",
                      height: isVowel(phone.phone) ? "50%" : "50%",
                    }}
                  >
                    <div
                      className={`h-full rounded transition-all ${
                        active ? "ring-4 ring-white shadow-lg scale-105" : ""
                      }`}
                      style={{
                        backgroundColor: color,
                        opacity: active ? 1 : 0.7,
                      }}
                    >
                      <div className="flex items-center justify-center h-full">
                        <span
                          className={`text-xs font-bold ${
                            active ? "text-white" : "text-white/70"
                          }`}
                        >
                          {phone.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${(currentTime / maxTime) * 100}%` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white" />
              </div>
            </div>
          </div>

          {/* Time display */}
          <div className="flex justify-between items-center text-white/70 text-sm mb-4">
            <span>{currentTime.toFixed(2)}s</span>
            <span>{maxTime.toFixed(2)}s</span>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={togglePlay}
              className="px-6 py-2 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={reset}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-500 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Phone sequence */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Phonetic Sequence
          </h2>
          <div className="flex flex-wrap gap-2">
            {phones
              .filter((p) => p.phone !== "sp")
              .map((phone, idx) => {
                const color = getColor(phone.phone);
                const active =
                  currentTime >= phone.start && currentTime <= phone.end;

                return (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-lg font-mono font-bold transition-all ${
                      active
                        ? "scale-110 ring-2 ring-white shadow-lg"
                        : "scale-100"
                    }`}
                    style={{
                      backgroundColor: color,
                      color: "white",
                      opacity: active ? 1 : 0.6,
                    }}
                  >
                    {phone.phone}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phonograph;
