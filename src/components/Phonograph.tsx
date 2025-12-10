import { useEffect, useRef, useState } from "react";
import type { PhoneType } from "../interfaces";

const arpabetData = [
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "AO",
    ipa: "ɔ",
    example: "mauve",
    examplearpabet: "M AO1 V",
    examplehtml: "m<em>au</em>ve",
    colorbase: "#E0B0FF",
    colorbright1: "#F3DFFF",
    colorbright2: "#E8C4FF",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "AA",
    ipa: "ɑ",
    example: "coffee",
    examplearpabet: "K AA1 F IY0",
    examplehtml: "c<em>o</em>ffee",
    colorbase: "#A56945",
    colorbright1: "#F4DCCE",
    colorbright2: "#A56945",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "IY",
    ipa: "i",
    example: "green",
    examplearpabet: "G R IY1 N",
    examplehtml: "gr<em>ee</em>n",
    colorbase: "#008000",
    colorbright1: "#7ED47E",
    colorbright2: "#30C030",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "UW",
    ipa: "u",
    example: "blue",
    examplearpabet: "B L UW1",
    examplehtml: "bl<em>ue</em>",
    colorbase: "#0000FF",
    colorbright1: "#9A9ADF",
    colorbright2: "#4040FF",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "EH",
    ipa: "ɛ",
    example: "red",
    examplearpabet: "R EH1 D",
    examplehtml: "r<em>e</em>d",
    colorbase: "#FF0000",
    colorbright1: "#FF9797",
    colorbright2: "#FF4040",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "IH",
    ipa: "ɪ",
    example: "pink",
    examplearpabet: "P IH1 NG K",
    examplehtml: "p<em>i</em>nk",
    colorbase: "#FFC0CB",
    colorbright1: "#FFE5EA",
    colorbright2: "#FFD0D8",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "UH",
    ipa: "ʊ",
    example: "wood",
    examplearpabet: "W UH1 D",
    examplehtml: "w<em>oo</em>d",
    colorbase: "#A8531C",
    colorbright1: "#D39973",
    colorbright2: "#D3834F",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "AH",
    ipa: "ə",
    example: "dust",
    examplearpabet: "D AH1 S T",
    examplehtml: "d<em>u</em>st",
    colorbase: "#E5CCC9",
    colorbright1: "#F2DEDC",
    colorbright2: "#DFCBD4",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "AX",
    ipa: "ə",
    example: "dust",
    examplearpabet: "D AH1 S T",
    examplehtml: "d<em>u</em>st",
    colorbase: "#E5CCC9",
    colorbright1: "#F2DEDC",
    colorbright2: "#DFCBD4",
  },
  {
    category: "vowel",
    subcategory: "monophthong",
    arpabet: "AE",
    ipa: "æ",
    example: "sand",
    examplearpabet: "S AE1 N D",
    examplehtml: "s<em>a</em>nd",
    colorbase: "#C2B280",
    colorbright1: "#EAE3CA",
    colorbright2: "#E1D3A7",
  },
  {
    category: "vowel",
    subcategory: "diphthong",
    arpabet: "EY",
    ipa: "eɪ",
    example: "jade",
    examplearpabet: "JH EY1 D",
    examplehtml: "j<em>a</em>de",
    colorbase: "#00A86B",
    colorbright1: "#B2F5DD",
    colorbright2: "#35D39C",
  },
  {
    category: "vowel",
    subcategory: "diphthong",
    arpabet: "AY",
    ipa: "aɪ",
    example: "lime",
    examplearpabet: "L AY1 M",
    examplehtml: "l<em>i</em>me",
    colorbase: "#00F000",
    colorbright1: "#B9FFB9",
    colorbright2: "#40FF40",
  },
  {
    category: "vowel",
    subcategory: "diphthong",
    arpabet: "OW",
    ipa: "oʊ",
    example: "gold",
    examplearpabet: "G OW1 L D",
    examplehtml: "g<em>o</em>ld",
    colorbase: "#FFD700",
    colorbright1: "#FFE140",
    colorbright2: "#FFC340",
  },
  {
    category: "vowel",
    subcategory: "diphthong",
    arpabet: "AW",
    ipa: "aʊ",
    example: "brown",
    examplearpabet: "B R AW1 N",
    examplehtml: "br<em>o</em>wn",
    colorbase: "#572E02",
    colorbright1: "#AB7F4F",
    colorbright2: "#AB6F2E",
  },
  {
    category: "vowel",
    subcategory: "diphthong",
    arpabet: "OY",
    ipa: "ɔɪ",
    example: "turquoise",
    examplearpabet: "T ER1 K W OY0 Z",
    examplehtml: "turqu<em>oi</em>se",
    colorbase: "#40E0D0",
    colorbright1: "#CBFBF6",
    colorbright2: "#6FF0E2",
  },
  {
    category: "vowel",
    subcategory: "R-colored vowel",
    arpabet: "ER",
    ipa: "ɝ",
    example: "purple",
    examplearpabet: "P ER1 P AH0 L",
    examplehtml: "p<em>ur</em>ple",
    colorbase: "#800080",
    colorbright1: "#D47ED4",
    colorbright2: "#C030C0",
  },
  {
    category: "consonant",
    subcategory: "stop",
    arpabet: "P",
    ipa: "p",
    example: "pig",
    examplearpabet: "P IH1 G",
    examplehtml: "<em>p</em>ig",
  },
  {
    category: "consonant",
    subcategory: "stop",
    arpabet: "B",
    ipa: "b",
    example: "bear",
    examplearpabet: "B EH1 R",
    examplehtml: "<em>b</em>ear",
  },
  {
    category: "consonant",
    subcategory: "stop",
    arpabet: "T",
    ipa: "t",
    example: "turtle",
    examplearpabet: "T ER1 T AH0 L",
    examplehtml: "<em>t</em>urtle",
  },
  {
    category: "consonant",
    subcategory: "stop",
    arpabet: "D",
    ipa: "d",
    example: "dog",
    examplearpabet: "D AO1 G",
    examplehtml: "<em>d</em>og",
  },
  {
    category: "consonant",
    subcategory: "stop",
    arpabet: "K",
    ipa: "k",
    example: "cat",
    examplearpabet: "K AE1 T",
    examplehtml: "<em>c</em>at",
  },
  {
    category: "consonant",
    subcategory: "stop",
    arpabet: "G",
    ipa: "ɡ",
    example: "goat",
    examplearpabet: "G OW1 T",
    examplehtml: "<em>g</em>oat",
  },
  {
    category: "consonant",
    subcategory: "affricate",
    arpabet: "CH",
    ipa: "tʃ",
    example: "chicken",
    examplearpabet: "CH IH1 K AH0 N",
    examplehtml: "<em>ch</em>icken",
  },
  {
    category: "consonant",
    subcategory: "affricate",
    arpabet: "JH",
    ipa: "dʒ",
    example: "giraffe",
    examplearpabet: "JH ER0 AE1 F",
    examplehtml: "<em>g</em>iraffe",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "F",
    ipa: "f",
    example: "frog",
    examplearpabet: "F R AA1 G",
    examplehtml: "<em>f</em>rog",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "V",
    ipa: "v",
    example: "beaver",
    examplearpabet: "B IY1 V ER0",
    examplehtml: "bea<em>v</em>er",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "TH",
    ipa: "θ",
    example: "panther",
    examplearpabet: "P AE1 N TH ER0",
    examplehtml: "pan<em>th</em>er",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "DH",
    ipa: "ð",
    example: "feather",
    examplearpabet: "F EH1 DH ER0",
    examplehtml: "fea<em>th</em>er",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "S",
    ipa: "s",
    example: "spider",
    examplearpabet: "S P AY1 D ER0",
    examplehtml: "<em>s</em>pider",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "Z",
    ipa: "z",
    example: "zebra",
    examplearpabet: "Z IY1 B R AH0",
    examplehtml: "<em>z</em>ebra",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "SH",
    ipa: "ʃ",
    example: "sheep",
    examplearpabet: "SH IY1 P",
    examplehtml: "<em>sh</em>eep",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "ZH",
    ipa: "ʒ",
    example: "television",
    examplearpabet: "T EH1 L AH0 V IH2 ZH AH0 N",
    examplehtml: "televi<em>si</em>on",
  },
  {
    category: "consonant",
    subcategory: "fricative",
    arpabet: "HH",
    ipa: "h",
    example: "horse",
    examplearpabet: "HH AO1 R S",
    examplehtml: "<em>h</em>orse",
  },
  {
    category: "consonant",
    subcategory: "nasal",
    arpabet: "M",
    ipa: "m",
    example: "mouse",
    examplearpabet: "M AW1 S",
    examplehtml: "<em>m</em>ouse",
  },
  {
    category: "consonant",
    subcategory: "nasal",
    arpabet: "N",
    ipa: "n",
    example: "dinosaur",
    examplearpabet: "D AY1 N AH0 S AO2 R",
    examplehtml: "di<em>n</em>osaur",
  },
  {
    category: "consonant",
    subcategory: "nasal",
    arpabet: "NG",
    ipa: "ŋ",
    example: "penguin",
    examplearpabet: "P EH1 NG G W AH0 N",
    examplehtml: "pe<em>n</em>guin",
  },
  {
    category: "consonant",
    subcategory: "liquid",
    arpabet: "L",
    ipa: "ɫ",
    example: "lion",
    examplearpabet: "L AY1 AH0 N",
    examplehtml: "<em>l</em>ion",
  },
  {
    category: "consonant",
    subcategory: "liquid",
    arpabet: "R",
    ipa: "ɹ",
    example: "rabbit",
    examplearpabet: "R AE1 B IH2 T",
    examplehtml: "<em>r</em>abbit",
  },
  {
    category: "consonant",
    subcategory: "semivowel",
    arpabet: "Y",
    ipa: "j",
    example: "yak",
    examplearpabet: "Y AE1 K",
    examplehtml: "<em>y</em>ak",
  },
  {
    category: "consonant",
    subcategory: "semivowel",
    arpabet: "W",
    ipa: "w",
    example: "wolf",
    examplearpabet: "W UH1 L F",
    examplehtml: "<em>w</em>olf",
  },
];

const Phonograph = ({
  phones,
  playing,
}: {
  phones: PhoneType[];
  playing: boolean;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const maxTime = Math.max(...phones.map((p) => p.end));

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
    if (playing) {
      startTimeRef.current = performance.now() - currentTime * 1000;

      const animate = (timestamp: number) => {
        const elapsed = startTimeRef.current
          ? (timestamp - startTimeRef.current) / 1000
          : 0;

        if (elapsed >= maxTime) {
          setCurrentTime(0);
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
  }, [currentTime, playing, maxTime]);

  return (
    <div className="p-8">
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
          <div className="flex justify-between items-center text-white/70 text-sm mb-1">
            <span>{currentTime.toFixed(2)}s</span>
            <span>{maxTime.toFixed(2)}s</span>
          </div>
        </div>

        {/* Phone sequence */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3">
          <h2 className="text-xl font-bold text-white mb-4">
            Phonetic Sequence
          </h2>
          <div className="flex flex-wrap gap-1">
            {phones
              .filter((p) => p.phone !== "sp")
              .map((phone, idx) => {
                const color = getColor(phone.phone);
                const active =
                  currentTime >= phone.start && currentTime <= phone.end;

                return (
                  <div
                    key={idx}
                    className={`px-3 py-1 rounded-lg font-mono font-bold transition-all ${
                      active
                        ? "scale-110 ring-2 ring-white shadow-lg"
                        : "scale-80"
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
