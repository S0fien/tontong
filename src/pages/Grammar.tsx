import { BookOpen, CheckCircle, ChevronRight, Volume2 } from "lucide-react";
import { useState } from "react";

interface Grammar {
  id: string;
  title: string;
  examples: string[];
}
const grammarData = {
  A1: {
    title: "Beginner",
    color: "from-green-500 to-emerald-600",
    categories: [
      {
        id: 1,
        name: "Functions/notions",
        topics: [
          {
            id: "A1-003",
            title: "Understanding and using numbers",
            examples: [
              "one, two, three",
              "I have two cats",
              "She is thirty years old",
            ],
          },
          {
            id: "A1-004",
            title: "Understanding and using prices",
            examples: [
              "It costs five dollars",
              "How much is this?",
              "That's too expensive",
            ],
          },
          {
            id: "A1-005",
            title: "Telling the time",
            examples: [
              "It's three o'clock",
              "Half past two",
              "Quarter to five",
            ],
          },
          {
            id: "A1-006",
            title: "Directions",
            examples: ["Turn left", "Go straight", "It's on your right"],
          },
        ],
      },
      {
        id: 2,
        name: "Verbs",
        topics: [
          {
            id: "A1-010",
            title: "Present simple (be)",
            examples: ["I am happy", "She is a teacher", "They are students"],
          },
          {
            id: "A1-011",
            title: "Present simple (have)",
            examples: ["I have a car", "He has brown eyes", "We have time"],
          },
          {
            id: "A1-012",
            title: "Present simple (do)",
            examples: ["I like coffee", "She works here", "They live in Paris"],
          },
        ],
      },
    ],
  },
  A2: {
    title: "Elementary",
    color: "from-blue-500 to-cyan-600",
    categories: [
      {
        id: 1,
        name: "Tenses",
        topics: [
          {
            id: "A2-020",
            title: "Past simple",
            examples: [
              "I went to the store",
              "She ate breakfast",
              "They played soccer",
            ],
          },
          {
            id: "A2-021",
            title: "Present continuous",
            examples: ["I am reading", "She is cooking", "They are studying"],
          },
          {
            id: "A2-022",
            title: "Future (going to)",
            examples: [
              "I'm going to travel",
              "She's going to study",
              "We're going to eat",
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Modals",
        topics: [
          {
            id: "A2-030",
            title: "Can/Could",
            examples: [
              "I can swim",
              "Could you help me?",
              "She can't come today",
            ],
          },
          {
            id: "A2-031",
            title: "Should/Must",
            examples: [
              "You should rest",
              "We must leave now",
              "He shouldn't eat that",
            ],
          },
        ],
      },
    ],
  },
  B1: {
    title: "Intermediate",
    color: "from-purple-500 to-pink-600",
    categories: [
      {
        id: 1,
        name: "Advanced Tenses",
        topics: [
          {
            id: "B1-040",
            title: "Present perfect",
            examples: [
              "I have visited Paris",
              "She has lived here for years",
              "Have you seen this?",
            ],
          },
          {
            id: "B1-041",
            title: "Past continuous",
            examples: [
              "I was sleeping",
              "They were working",
              "She was studying",
            ],
          },
          {
            id: "B1-042",
            title: "Present perfect continuous",
            examples: [
              "I've been waiting",
              "She's been studying",
              "They've been playing",
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Conditionals",
        topics: [
          {
            id: "B1-050",
            title: "First conditional",
            examples: [
              "If it rains, I'll stay home",
              "If you study, you'll pass",
              "I'll call if I'm late",
            ],
          },
          {
            id: "B1-051",
            title: "Second conditional",
            examples: [
              "If I won the lottery...",
              "If I were you...",
              "What would you do if...",
            ],
          },
        ],
      },
    ],
  },
};

const Grammar = () => {
  const [selectedLevel, setSelectedLevel] = useState("A1");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [viewMode, setViewMode] = useState("examples"); // 'examples' or 'practice'

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const markComplete = (topicId: string) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  const currentLevel = grammarData[selectedLevel as keyof typeof grammarData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900">
      {/* Header */}
      <div className="bg-purple-950/50 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">
                Grammar Explorer
              </h1>
            </div>
            <div className="text-purple-200 text-sm">
              {completedTopics.size} topics completed
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Level Selector */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">CEFR Level</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("examples")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  viewMode === "examples"
                    ? "bg-white text-purple-900"
                    : "bg-purple-600/50 text-white hover:bg-purple-600"
                }`}
              >
                Examples
              </button>
              <button
                onClick={() => setViewMode("practice")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  viewMode === "practice"
                    ? "bg-white text-purple-900"
                    : "bg-purple-600/50 text-white hover:bg-purple-600"
                }`}
              >
                Practice
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Object.entries(grammarData).map(([level, data]) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`relative overflow-hidden rounded-xl p-6 transition-all ${
                  selectedLevel === level
                    ? "ring-4 ring-white shadow-2xl scale-105"
                    : "hover:scale-102 opacity-80 hover:opacity-100"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-90`}
                />
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-white mb-1">
                    {level}
                  </div>
                  <div className="text-sm text-white/90">{data.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Categories and Topics */}
        <div className="space-y-6">
          {currentLevel.categories.map((category, catIndex) => (
            <div
              key={category.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 px-6 py-4 border-b border-white/20">
                <h3 className="text-xl font-bold text-white">
                  {catIndex + 1}. {category.name}
                </h3>
              </div>

              <div className="divide-y divide-white/10">
                {category.topics.map((topic: Grammar) => {
                  const isExpanded = expandedTopic === topic.id;
                  const isCompleted = completedTopics.has(topic.id);

                  return (
                    <div key={topic.id}>
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <ChevronRight
                            className={`w-5 h-5 text-purple-300 transition-transform ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          />
                          <span className="text-purple-100 font-mono text-sm">
                            {topic.id}
                          </span>
                          <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                            {topic.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markComplete(topic.id);
                            }}
                            className={`p-1 rounded transition-colors ${
                              isCompleted
                                ? "text-green-400"
                                : "text-white/30 hover:text-white/60"
                            }`}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("Audio playback would start here");
                            }}
                            className="p-1 text-white/50 hover:text-white transition-colors"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-6 py-4 bg-purple-950/30">
                          {viewMode === "examples" ? (
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
                                Examples
                              </h4>
                              {topic.examples.map((example, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs text-purple-200 font-semibold shrink-0">
                                    {idx + 1}
                                  </div>
                                  <p className="text-white flex-1">{example}</p>
                                  <button className="text-purple-300 hover:text-white transition-colors">
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
                                Practice Exercise
                              </h4>
                              <div className="p-4 bg-white/5 rounded-lg">
                                <p className="text-purple-200 text-sm mb-3">
                                  Fill in the blank with the correct form:
                                </p>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white">
                                      I _____ happy today.
                                    </span>
                                    <input
                                      type="text"
                                      className="px-3 py-1 bg-white/10 border border-purple-400/50 rounded text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                      placeholder="answer"
                                    />
                                  </div>
                                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors">
                                    Check Answer
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Your Progress
              </h3>
              <p className="text-purple-200">
                Keep learning and track your completed topics
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">
                {Math.round((completedTopics.size / 12) * 100)}%
              </div>
              <div className="text-sm text-purple-200">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grammar;
