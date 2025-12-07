import { BookOpen, CheckCircle, ChevronRight, Volume2 } from "lucide-react";
import { useState } from "react";

interface Grammar {
  id: string;
  title: string;
  examples: string[];
}
const dqsdqssqdds = JSON.stringify({
  "A1-003": {
    cefr: "A1",
    metacategory: "Functions/notions",
    category: "Understanding and using numbers",
  },
  "A1-004": {
    cefr: "A1",
    metacategory: "Functions/notions",
    category: "Understanding and using prices",
  },
  "A1-005": {
    cefr: "A1",
    metacategory: "Functions/notions",
    category: "Telling the time",
  },
  "A1-006": {
    cefr: "A1",
    metacategory: "Functions/notions",
    category: "Directions",
  },
  "A1-007": {
    cefr: "A1",
    metacategory: "Functions/notions",
    category: "Greetings",
  },
  "A1-008": {
    cefr: "A1",
    metacategory: "Functions/notions",
    category: "Giving personal information",
  },
  "A1-009": {
    cefr: "A1",
    metacategory: "Functions/notions",
    category: "Describing habits and routines",
  },
  "A1-041": {
    cefr: "A1",
    metacategory: "Discourse Functions",
    category: "Checking understanding",
  },
  "A1-046": {
    cefr: "A1",
    metacategory: "Discourse Markers",
    category: "Transition words",
  },
  "A1-047": {
    cefr: "A1",
    metacategory: "Discourse Markers",
    category: "Connecting words (and, but, because)",
  },
  "A1-056": {
    cefr: "A1",
    metacategory: "Simple Verb Forms",
    category: "To be, including questions and negatives",
  },
  "A1-058": {
    cefr: "A1",
    metacategory: "Simple Verb Forms",
    category: "Imperatives",
  },
  "A1-060": {
    cefr: "A1",
    metacategory: "Questions",
    category: "Question forms",
  },
  "A1-064": { cefr: "A1", metacategory: "Present", category: "Present simple" },
  "A1-065": {
    cefr: "A1",
    metacategory: "Present",
    category: "Present continuous",
  },
  "A1-067": { cefr: "A1", metacategory: "Past", category: "Past simple" },
  "A1-068": {
    cefr: "A1",
    metacategory: "Past",
    category: "Past simple (to be)",
  },
  "A1-074": { cefr: "A1", metacategory: "Future", category: "Going to" },
  "A1-076": {
    cefr: "A1",
    metacategory: "Future",
    category: "Future time with will and going to",
  },
  "A1-081": {
    cefr: "A1",
    metacategory: "Present Perfect",
    category: "Basic use of the present perfect",
  },
  "A1-085": {
    cefr: "A1",
    metacategory: "Gerund and Infinitive",
    category: "I'd like",
  },
  "A1-086": {
    cefr: "A1",
    metacategory: "Gerund and Infinitive",
    category: "Verb + -ing, like/hate/love",
  },
  "A1-103": {
    cefr: "A1",
    metacategory: "Modals",
    category: "Pre-teach modals",
  },
  "A1-104": {
    cefr: "A1",
    metacategory: "Modals",
    category: "Can/can't (Ability)",
  },
  "A1-105": {
    cefr: "A1",
    metacategory: "Modals",
    category: "Can/could (Functional)",
  },
  "A1-122": {
    cefr: "A1",
    metacategory: "Nouns",
    category:
      "Countable and uncountable (how much/many and very common countable and uncountable nouns)",
  },
  "A1-123": {
    cefr: "A1",
    metacategory: "Nouns",
    category: "There is/there are",
  },
  "A1-125": {
    cefr: "A1",
    metacategory: "Pronouns",
    category: "Simple personal pronouns",
  },
  "A1-127": {
    cefr: "A1",
    metacategory: "Possessives",
    category: "Possessive adjectives",
  },
  "A1-128": {
    cefr: "A1",
    metacategory: "Possessives",
    category: "Possessive ‘s and s’",
  },
  "A1-129": {
    cefr: "A1",
    metacategory: "Possessives",
    category: "Possessive pronouns",
  },
  "A1-131": {
    cefr: "A1",
    metacategory: "Prepositions and Prepositional Phrases",
    category: "Common prepositions",
  },
  "A1-132": {
    cefr: "A1",
    metacategory: "Prepositions and Prepositional Phrases",
    category: "Prepositional phrases (time and movement)",
  },
  "A1-135": {
    cefr: "A1",
    metacategory: "Articles",
    category: "Definite, indefinite",
  },
  "A1-141": {
    cefr: "A1",
    metacategory: "Determiners",
    category: "Basic determiners (e.g. any, some, a lot of)",
  },
  "A1-145": {
    cefr: "A1",
    metacategory: "Adjectives",
    category: "Common adjectives",
  },
  "A1-146": {
    cefr: "A1",
    metacategory: "Adjectives",
    category: "Demonstrative adjectives",
  },
  "A1-149": {
    cefr: "A1",
    metacategory: "Adjectives",
    category: "Comparative and superlative",
  },
  "A1-152": {
    cefr: "A1",
    metacategory: "Adverbs",
    category: "Adverbs of frequency",
  },
  "A1-153": {
    cefr: "A1",
    metacategory: "Adverbs",
    category: "Simple adverbs of place, manner and time",
  },
  "A1-161": {
    cefr: "A1",
    metacategory: "Intensifiers",
    category: "Very basic intensifiers (very, really)",
  },
  "A1-167": {
    cefr: "A1",
    metacategory: "Lexis",
    category: "Nationalities and countries",
  },
  "A1-168": {
    cefr: "A1",
    metacategory: "Lexis",
    category: "Personal information",
  },
  "A1-169": { cefr: "A1", metacategory: "Lexis", category: "Food and drink" },
  "A1-170": {
    cefr: "A1",
    metacategory: "Lexis",
    category: "Things in town, shops and shopping",
  },
  "A1-172": { cefr: "A1", metacategory: "Lexis", category: "Basic verbs" },
  "A1-190": { cefr: "A1", metacategory: "Topics", category: "Family life" },
  "A1-191": { cefr: "A1", metacategory: "Topics", category: "Hobbies" },
  "A1-192": {
    cefr: "A1",
    metacategory: "Topics",
    category: "Vacations and holidays",
  },
  "A1-193": { cefr: "A1", metacategory: "Topics", category: "Work and jobs" },
  "A1-194": { cefr: "A1", metacategory: "Topics", category: "Shopping" },
  "A1-195": {
    cefr: "A1",
    metacategory: "Topics",
    category: "Leisure activities",
  },
  "A1-900": {
    cefr: "A1",
    metacategory: "Lexis",
    category: "Informal and slang",
  },
  "A2-000": {
    cefr: "A2",
    metacategory: "Miscellaneous",
    category: "Miscellaneous",
  },
  "A2-003B": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Understanding and using numbers (Ordinals)",
  },
  "A2-004": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Understanding and using prices",
  },
  "A2-005B": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Telling the time (Dates)",
  },
  "A2-005C": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Telling the time (Setting a date)",
  },
  "A2-007": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Greetings",
  },
  "A2-008": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Giving personal information",
  },
  "A2-009": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Describing habits and routines",
  },
  "A2-010": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Describing people",
  },
  "A2-011": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Describing things",
  },
  "A2-012": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Requests",
  },
  "A2-013": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Suggestions",
  },
  "A2-014": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Advice",
  },
  "A2-015": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Invitations",
  },
  "A2-016": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Offers",
  },
  "A2-017": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Arrangements to meet people using -ing",
  },
  "A2-018": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Obligations and necessity",
  },
  "A2-019": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Describing places",
  },
  "A2-020": {
    cefr: "A2",
    metacategory: "Functions/notions",
    category: "Describing past experiences and storytelling",
  },
  "A2-041": {
    cefr: "A2",
    metacategory: "Discourse Functions",
    category: "Checking understanding",
  },
  "A2-048": {
    cefr: "A2",
    metacategory: "Discourse Markers",
    category: "Linkers (sequential, past time)",
  },
  "A2-058": {
    cefr: "A2",
    metacategory: "Simple Verb Forms",
    category: "Imperatives",
  },
  "A2-060": {
    cefr: "A2",
    metacategory: "Questions",
    category: "Question forms",
  },
  "A2-061": {
    cefr: "A2",
    metacategory: "Questions",
    category: "Wh-questions in the past",
  },
  "A2-064": { cefr: "A2", metacategory: "Present", category: "Present simple" },
  "A2-065": {
    cefr: "A2",
    metacategory: "Present",
    category: "Present continuous",
  },
  "A2-067A": {
    cefr: "A2",
    metacategory: "Past",
    category: "Past simple (to be)",
  },
  "A2-067B": {
    cefr: "A2",
    metacategory: "Past",
    category: "Past simple (regular verbs)",
  },
  "A2-067C": {
    cefr: "A2",
    metacategory: "Past",
    category: "Past simple (irregular verbs)",
  },
  "A2-068": { cefr: "A2", metacategory: "Past", category: "Past continuous" },
  "A2-069": { cefr: "A2", metacategory: "Past", category: "Used to" },
  "A2-074": { cefr: "A2", metacategory: "Future", category: "Going to" },
  "A2-075": {
    cefr: "A2",
    metacategory: "Future",
    category: "Present continuous for the future (arrangements)",
  },
  "A2-076": {
    cefr: "A2",
    metacategory: "Future",
    category: "Future time with will and going to",
  },
  "A2-081": {
    cefr: "A2",
    metacategory: "Present Perfect",
    category: "Basic use of the present perfect",
  },
  "A2-086": {
    cefr: "A2",
    metacategory: "Gerund and Infinitive",
    category: "Gerunds and verb + -ing or infinitive, like/want/would like",
  },
  "A2-087": {
    cefr: "A2",
    metacategory: "Gerund and Infinitive",
    category: "To + infinitive to express a purpose",
  },
  "A2-088": {
    cefr: "A2",
    metacategory: "Gerund and Infinitive",
    category: "Verb + to + infinitive",
  },
  "A2-090": {
    cefr: "A2",
    metacategory: "Conditionals",
    category: "Zero and first conditional",
  },
  "A2-094": {
    cefr: "A2",
    metacategory: "Phrasal Verbs",
    category:
      "Pre-teach or review the particles, using the verb to be as an example",
  },
  "A2-095": {
    cefr: "A2",
    metacategory: "Phrasal Verbs",
    category: "Common phrasal verbs",
  },
  "A2-105": {
    cefr: "A2",
    metacategory: "Modals",
    category: "Can/could (Functional)",
  },
  "A2-107": { cefr: "A2", metacategory: "Modals", category: "Might, may" },
  "A2-108": {
    cefr: "A2",
    metacategory: "Modals",
    category: "Possibly, probably, perhaps",
  },
  "A2-112": {
    cefr: "A2",
    metacategory: "Modals",
    category: "Must and must not",
  },
  "A2-113": { cefr: "A2", metacategory: "Modals", category: "Have to" },
  "A2-115": { cefr: "A2", metacategory: "Modals", category: "Should" },
  "A2-122": {
    cefr: "A2",
    metacategory: "Nouns",
    category: "Countable and uncountable (More practice with much and many)",
  },
  "A2-125B": {
    cefr: "A2",
    metacategory: "Pronouns",
    category: "Advanced personal pronouns",
  },
  "A2-128": {
    cefr: "A2",
    metacategory: "Possessives",
    category: "Possessive ‘s and s’",
  },
  "A2-129": {
    cefr: "A2",
    metacategory: "Possessives",
    category: "Possessive pronouns",
  },
  "A2-132": {
    cefr: "A2",
    metacategory: "Prepositions and Prepositional Phrases",
    category: "Prepositions of time (on/at/in)",
  },
  "A2-133": {
    cefr: "A2",
    metacategory: "Prepositions and Prepositional Phrases",
    category: "Prepositional phrases (place, time and movement)",
  },
  "A2-136": {
    cefr: "A2",
    metacategory: "Articles",
    category: "Zero article with uncountable nouns",
  },
  "A2-138": {
    cefr: "A2",
    metacategory: "Articles",
    category: "With countable and uncountable nouns",
  },
  "A2-141": {
    cefr: "A2",
    metacategory: "Determiners",
    category: "Basic determiners (e.g. any, some, a lot of)",
  },
  "A2-142": {
    cefr: "A2",
    metacategory: "Determiners",
    category: "Wider range (e.g. all, none, not (any), enough, (a) few)",
  },
  "A2-146": {
    cefr: "A2",
    metacategory: "Adjectives",
    category: "Demonstrative adjectives",
  },
  "A2-147": {
    cefr: "A2",
    metacategory: "Adjectives",
    category: "Ending in -ed and -ing",
  },
  "A2-149": {
    cefr: "A2",
    metacategory: "Adjectives",
    category: "Comparative (use of than)",
  },
  "A2-150": {
    cefr: "A2",
    metacategory: "Adjectives",
    category: "Superlative and use of the definite article",
  },
  "A2-152": {
    cefr: "A2",
    metacategory: "Adverbs",
    category: "Adverbs of frequency",
  },
  "A2-153": {
    cefr: "A2",
    metacategory: "Adverbs",
    category: "Simple adverbs of place, manner and time",
  },
  "A2-161": {
    cefr: "A2",
    metacategory: "Intensifiers",
    category: "Very basic intensifiers",
  },
  "A2-162": {
    cefr: "A2",
    metacategory: "Intensifiers",
    category: "Basic intensifiers (quite, so, a bit)",
  },
  "A2-166": {
    cefr: "A2",
    metacategory: "Lexis",
    category: "General A2 vocabulary",
  },
  "A2-169": { cefr: "A2", metacategory: "Lexis", category: "Food and drink" },
  "A2-170": {
    cefr: "A2",
    metacategory: "Lexis",
    category: "Things in town, shops and shopping",
  },
  "A2-171": {
    cefr: "A2",
    metacategory: "Lexis",
    category: "Travel and services vocabulary",
  },
  "A2-177": {
    cefr: "A2",
    metacategory: "Lexis",
    category: "Objects and rooms",
  },
  "A2-178": {
    cefr: "A2",
    metacategory: "Lexis",
    category: "Adjectives about personality, description, feelings",
  },
  "A2-191": { cefr: "A2", metacategory: "Topics", category: "Hobbies" },
  "A2-192": {
    cefr: "A2",
    metacategory: "Topics",
    category: "Vacations and holidays",
  },
  "A2-193": { cefr: "A2", metacategory: "Topics", category: "Work and jobs" },
  "A2-194": { cefr: "A2", metacategory: "Topics", category: "Shopping" },
  "A2-195": {
    cefr: "A2",
    metacategory: "Topics",
    category: "Leisure activities",
  },
  "A2-196": { cefr: "A2", metacategory: "Topics", category: "Education" },
  "A2-901": {
    cefr: "A2",
    metacategory: "Tricky Words and Expressions",
    category: "Common errors (French) people make",
  },
  "A2-902": {
    cefr: "A2",
    metacategory: "Tricky Words and Expressions",
    category: "Tongue twisters",
  },
  "A2-910": { cefr: "A2", metacategory: "Topics", category: "Health" },
  "B1-000": {
    cefr: "B1",
    metacategory: "Miscellaneous",
    category: "Missing lemmas",
  },
  "B1-019": {
    cefr: "B1",
    metacategory: "Functions/notions",
    category: "Describing places",
  },
  "B1-020": {
    cefr: "B1",
    metacategory: "Functions/notions",
    category: "Describing past experiences and storytelling",
  },
  "B1-021": {
    cefr: "B1",
    metacategory: "Functions/notions",
    category: "Describing feelings, emotions, attitudes",
  },
  "B1-029": {
    cefr: "B1",
    metacategory: "Functions/notions",
    category: "Expressing opinions",
  },
  "B1-031": {
    cefr: "B1",
    metacategory: "Functions/notions",
    category: "Expressing agreement/disagreement",
  },
  "B1-033": {
    cefr: "B1",
    metacategory: "Functions/notions",
    category: "Talking about films and books",
  },
  "B1-040": {
    cefr: "B1",
    metacategory: "Discourse Functions",
    category: "Initiating and closing conversation",
  },
  "B1-041": {
    cefr: "B1",
    metacategory: "Discourse Functions",
    category: "Checking understanding",
  },
  "B1-042": {
    cefr: "B1",
    metacategory: "Discourse Functions",
    category:
      "Managing interaction (interrupting, changing topic, resuming or continuing)",
  },
  "B1-048": {
    cefr: "B1",
    metacategory: "Discourse Markers",
    category: "Linkers (sequential, past time)",
  },
  "B1-049": {
    cefr: "B1",
    metacategory: "Discourse Markers",
    category: "Connecting words expressing cause and effect, contrast, etc.",
  },
  "B1-052": {
    cefr: "B1",
    metacategory: "Discourse Markers",
    category: "Markers to structure informal spoken discourse",
  },
  "B1-061": {
    cefr: "B1",
    metacategory: "Questions",
    category: "Wh-questions in the past",
  },
  "B1-062": {
    cefr: "B1",
    metacategory: "Questions",
    category: "Complex question tags",
  },
  "B1-067": { cefr: "B1", metacategory: "Past", category: "Past simple" },
  "B1-067C": {
    cefr: "B1",
    metacategory: "Past",
    category: "Past simple (irregular verbs)",
  },
  "B1-068": { cefr: "B1", metacategory: "Past", category: "Past continuous" },
  "B1-069": { cefr: "B1", metacategory: "Past", category: "Used to" },
  "B1-070": {
    cefr: "B1",
    metacategory: "Past",
    category: "would expressing habit in the past",
  },
  "B1-071": { cefr: "B1", metacategory: "Past", category: "Past perfect" },
  "B1-077": {
    cefr: "B1",
    metacategory: "Future",
    category: "Future continuous",
  },
  "B1-081": {
    cefr: "B1",
    metacategory: "Present Perfect",
    category: "Basic use of the present perfect",
  },
  "B1-082A": {
    cefr: "B1",
    metacategory: "Present Perfect",
    category: "Present perfect vs. Present (simple or continuous)",
  },
  "B1-082B": {
    cefr: "B1",
    metacategory: "Present Perfect",
    category: "Present perfect vs. Past simple",
  },
  "B1-083": {
    cefr: "B1",
    metacategory: "Present Perfect",
    category: "Present perfect continuous",
  },
  "B1-083Z": {
    cefr: "B1",
    metacategory: "Present Perfect",
    category: "More present perfect examples",
  },
  "B1-090": {
    cefr: "B1",
    metacategory: "Conditionals",
    category: "Zero and first conditional",
  },
  "B1-091": {
    cefr: "B1",
    metacategory: "Conditionals",
    category: "Second and third conditional",
  },
  "B1-095": {
    cefr: "B1",
    metacategory: "Phrasal Verbs",
    category: "Common phrasal verbs",
  },
  "B1-096": {
    cefr: "B1",
    metacategory: "Phrasal Verbs",
    category: "Advanced phrasal verbs (Extended/splitting, B1 verbs)",
  },
  "B1-098": {
    cefr: "B1",
    metacategory: "Passives",
    category: "Simple passive",
  },
  "B1-101": {
    cefr: "B1",
    metacategory: "Other Verb Forms",
    category: "Reported speech (range of tenses)",
  },
  "B1-109": {
    cefr: "B1",
    metacategory: "Modals",
    category: "Might, may, will, probably",
  },
  "B1-110": {
    cefr: "B1",
    metacategory: "Modals",
    category: "Must/can't (Deduction)",
  },
  "B1-114": { cefr: "B1", metacategory: "Modals", category: "Must/have to" },
  "B1-115": {
    cefr: "B1",
    metacategory: "Modals",
    category: "Should (Deductive/Suppositive)",
  },
  "B1-116": { cefr: "B1", metacategory: "Modals", category: "Ought to" },
  "B1-117": { cefr: "B1", metacategory: "Modals", category: "Need to" },
  "B1-118": {
    cefr: "B1",
    metacategory: "Modals",
    category: "Should have, might have, etc.",
  },
  "B1-129": {
    cefr: "B1",
    metacategory: "Possessives",
    category: "Possessive pronouns",
  },
  "B1-138": {
    cefr: "B1",
    metacategory: "Articles",
    category: "With countable and uncountable nouns",
  },
  "B1-143": {
    cefr: "B1",
    metacategory: "Determiners",
    category: "Broad range (e.g. all the, most, both)",
  },
  "B1-148": {
    cefr: "B1",
    metacategory: "Adjectives",
    category: "Collocation of adjectives",
  },
  "B1-154": {
    cefr: "B1",
    metacategory: "Adverbs",
    category:
      "Adverbial phrases of time, place and frequency including word order",
  },
  "B1-155": {
    cefr: "B1",
    metacategory: "Adverbs",
    category: "Adjectives and adverbs (contrasting adjectives and adverbs)",
  },
  "B1-156": {
    cefr: "B1",
    metacategory: "Adverbs",
    category: "Adverbial phrases of degree/extent, probability",
  },
  "B1-157": {
    cefr: "B1",
    metacategory: "Adverbs",
    category: "Comparative and superlative form of adverbs",
  },
  "B1-163": {
    cefr: "B1",
    metacategory: "Intensifiers",
    category: "Broader range of intensifiers (too, so, enough, etc.)",
  },
  "B1-164": {
    cefr: "B1",
    metacategory: "Intensifiers",
    category: "Wide range (extremely, much too, etc.)",
  },
  "B1-166": {
    cefr: "B1",
    metacategory: "Lexis",
    category: "General B1 vocabulary",
  },
  "B1-170": {
    cefr: "B1",
    metacategory: "Lexis",
    category: "Things in town, shops and shopping",
  },
  "B1-171": {
    cefr: "B1",
    metacategory: "Lexis",
    category: "Travel and services vocabulary",
  },
  "B1-179": {
    cefr: "B1",
    metacategory: "Lexis",
    category: "Contrasting opinions (on the one hand…)",
  },
  "B1-181": { cefr: "B1", metacategory: "Lexis", category: "Collocations" },
  "B1-182": {
    cefr: "B1",
    metacategory: "Lexis",
    category: "Colloquial language",
  },
  "B1-191": { cefr: "B1", metacategory: "Topics", category: "Hobbies" },
  "B1-193": { cefr: "B1", metacategory: "Topics", category: "Work and jobs" },
  "B1-195": {
    cefr: "B1",
    metacategory: "Topics",
    category: "Leisure activities",
  },
  "B1-196": { cefr: "B1", metacategory: "Topics", category: "Education" },
  "B1-197": { cefr: "B1", metacategory: "Topics", category: "Films" },
  "B1-198": {
    cefr: "B1",
    metacategory: "Topics",
    category: "Books and literature",
  },
  "B1-199": {
    cefr: "B1",
    metacategory: "Topics",
    category: "News, lifestyles and current affairs",
  },
  "B1-200": { cefr: "B1", metacategory: "Topics", category: "Media" },
  "B1-910": { cefr: "B1", metacategory: "Topics", category: "Health" },
  "B2-020": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Describing past experiences and storytelling",
  },
  "B2-021": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Describing feelings and emotions",
  },
  "B2-022": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Describing hopes and plans",
  },
  "B2-023": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Giving precise information",
  },
  "B2-024": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Expressing abstract ideas",
  },
  "B2-025": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Expressing certainty, probability, doubt",
  },
  "B2-026": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Generalizing and qualifying",
  },
  "B2-027": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Synthesizing, evaluating, glossing information",
  },
  "B2-028": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Speculating",
  },
  "B2-029": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Expressing opinions",
  },
  "B2-031": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Expressing agreement/disagreement",
  },
  "B2-032": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Expressing reaction, e.g. indifference",
  },
  "B2-033": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Critiquing and reviewing",
  },
  "B2-034": {
    cefr: "B2",
    metacategory: "Functions/notions",
    category: "Developing an argument",
  },
  "B2-041": {
    cefr: "B2",
    metacategory: "Discourse Functions",
    category: "Checking understanding",
  },
  "B2-042": {
    cefr: "B2",
    metacategory: "Discourse Functions",
    category:
      "Managing interaction (interrupting, changing topic, resuming or continuing)",
  },
  "B2-043": {
    cefr: "B2",
    metacategory: "Discourse Functions",
    category: "Taking the lead in an interaction",
  },
  "B2-044": {
    cefr: "B2",
    metacategory: "Discourse Functions",
    category: "Encouraging and inviting another speaker to continue, come in.",
  },
  "B2-045": {
    cefr: "B2",
    metacategory: "Discourse Functions",
    category:
      "Interacting informally, reacting, expressing interest, sympathy, surprise",
  },
  "B2-048": {
    cefr: "B2",
    metacategory: "Discourse Markers",
    category: "Linkers (sequential, past time)",
  },
  "B2-049": {
    cefr: "B2",
    metacategory: "Discourse Markers",
    category: "Connecting words expressing cause and effect, contrast, etc.",
  },
  "B2-067": {
    cefr: "B2",
    metacategory: "Past",
    category: "Past simple (Narrative)",
  },
  "B2-068": {
    cefr: "B2",
    metacategory: "Past",
    category: "Past continuous (Narrative)",
  },
  "B2-069": {
    cefr: "B2",
    metacategory: "Past",
    category: "Used to (Narrative)",
  },
  "B2-070": {
    cefr: "B2",
    metacategory: "Past",
    category: "would expressing habit in the past",
  },
  "B2-071": { cefr: "B2", metacategory: "Past", category: "Past perfect" },
  "B2-072": {
    cefr: "B2",
    metacategory: "Past",
    category: "Past perfect continuous",
  },
  "B2-076": {
    cefr: "B2",
    metacategory: "Future",
    category: "Future time with will and going to (Prediction)",
  },
  "B2-077": {
    cefr: "B2",
    metacategory: "Future",
    category: "Future continuous (Prediction)",
  },
  "B2-078": { cefr: "B2", metacategory: "Future", category: "Future perfect" },
  "B2-079": {
    cefr: "B2",
    metacategory: "Future",
    category: "Future perfect continuous",
  },
  "B2-083": {
    cefr: "B2",
    metacategory: "Present Perfect",
    category: "Present perfect continuous",
  },
  "B2-092": {
    cefr: "B2",
    metacategory: "Conditionals",
    category: "Mixed conditionals",
  },
  "B2-093": { cefr: "B2", metacategory: "Conditionals", category: "Wish" },
  "B2-096": {
    cefr: "B2",
    metacategory: "Phrasal Verbs",
    category: "Advanced phrasal verbs (B2 verbs, double prepositions)",
  },
  "B2-099": {
    cefr: "B2",
    metacategory: "Passives",
    category: "All passive forms",
  },
  "B2-101": {
    cefr: "B2",
    metacategory: "Other Verb Forms",
    category: "Reported speech (range of tenses)",
  },
  "B2-102": {
    cefr: "B2",
    metacategory: "Other Verb Forms",
    category: "Relative clauses",
  },
  "B2-115": { cefr: "B2", metacategory: "Modals", category: "Should" },
  "B2-119": {
    cefr: "B2",
    metacategory: "Modals",
    category: "Modals of deduction and speculation",
  },
  "B2-120": {
    cefr: "B2",
    metacategory: "Modals",
    category: "Can't have, needn't have",
  },
  "B2-130": {
    cefr: "B2",
    metacategory: "Articles",
    category: "With abstract nouns***",
  },
  "B2-155": {
    cefr: "B2",
    metacategory: "Adverbs",
    category:
      "Adjectives and adverbs (contrasting adjectives and adverbs, adjectives used as intensifiers)",
  },
  "B2-158": {
    cefr: "B2",
    metacategory: "Adverbs",
    category: "Attitudinal adverbs",
  },
  "B2-165": {
    cefr: "B2",
    metacategory: "Intensifiers",
    category: "Collocation of intensifiers",
  },
  "B2-166": {
    cefr: "B2",
    metacategory: "Lexis",
    category: "General B2 vocabulary",
  },
  "B2-179": {
    cefr: "B2",
    metacategory: "Lexis",
    category: "Contrasting opinions (on the one hand…)",
  },
  "B2-180": {
    cefr: "B2",
    metacategory: "Lexis",
    category: "Summarizing exponents (briefly, all in all…)",
  },
  "B2-181": { cefr: "B2", metacategory: "Lexis", category: "Collocations" },
  "B2-182": {
    cefr: "B2",
    metacategory: "Lexis",
    category: "Colloquial language",
  },
  "B2-196": { cefr: "B2", metacategory: "Topics", category: "Education" },
  "B2-197": { cefr: "B2", metacategory: "Topics", category: "Films" },
  "B2-198": {
    cefr: "B2",
    metacategory: "Topics",
    category: "Books and literature",
  },
  "B2-199": {
    cefr: "B2",
    metacategory: "Topics",
    category: "News, lifestyles and current affairs",
  },
  "B2-200": { cefr: "B2", metacategory: "Topics", category: "Media" },
  "B2-201": { cefr: "B2", metacategory: "Topics", category: "Arts" },
  "B2-910": { cefr: "B2", metacategory: "Topics", category: "Health" },
  "B2-911": { cefr: "B2", metacategory: "Topics", category: "Sex" },
  "C1-004": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Understanding and using prices",
  },
  "C1-021": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Expressing attitudes and feelings precisely***",
  },
  "C1-025": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Expressing certainty, probability, doubt",
  },
  "C1-027": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Synthesizing, evaluating, glossing information",
  },
  "C1-028": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Speculating and hypothesizing about causes, consequences, etc.",
  },
  "C1-029": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Expressing opinions tentatively, hedging",
  },
  "C1-030": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Expressing shades of opinion and certainty",
  },
  "C1-032": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Expressing reaction, e.g. indifference",
  },
  "C1-033": {
    cefr: "C1",
    metacategory: "Functions/notions",
    category: "Critiquing and reviewing",
  },
  "C1-054A": {
    cefr: "C1",
    metacategory: "Discourse Markers",
    category: "Markers to structure and signpost informal speech and writing",
  },
  "C1-054B": {
    cefr: "C1",
    metacategory: "Discourse Markers",
    category:
      "Markers to structure and signpost formal speech and writing, especially logical markers",
  },
  "C1-066": {
    cefr: "C1",
    metacategory: "Past",
    category: "All the narrative past tenses together",
  },
  "C1-067": {
    cefr: "C1",
    metacategory: "Past",
    category: "Past simple (Narrative)",
  },
  "C1-068": {
    cefr: "C1",
    metacategory: "Past",
    category: "Past continuous (Narrative)",
  },
  "C1-069": {
    cefr: "C1",
    metacategory: "Past",
    category: "Used to (Narrative)",
  },
  "C1-070": {
    cefr: "C1",
    metacategory: "Past",
    category: "would expressing habit in the past (Narrative)",
  },
  "C1-071": {
    cefr: "C1",
    metacategory: "Past",
    category: "Past perfect (Narrative)",
  },
  "C1-072": {
    cefr: "C1",
    metacategory: "Past",
    category: "Past perfect continuous (Narrative)",
  },
  "C1-073Z": {
    cefr: "C1",
    metacategory: "Future",
    category: "Future in the past",
  },
  "C1-076": {
    cefr: "C1",
    metacategory: "Future",
    category: "Future time with will and going to (Prediction)",
  },
  "C1-077": {
    cefr: "C1",
    metacategory: "Future",
    category: "Future continuous (Prediction)",
  },
  "C1-078": { cefr: "C1", metacategory: "Future", category: "Future perfect" },
  "C1-079": {
    cefr: "C1",
    metacategory: "Future",
    category: "Future perfect continuous",
  },
  "C1-089Z": { cefr: "C1", metacategory: "Conditionals", category: "Irrealis" },
  "C1-092": {
    cefr: "C1",
    metacategory: "Conditionals",
    category: "Mixed conditionals",
  },
  "C1-093": {
    cefr: "C1",
    metacategory: "Conditionals",
    category: "Regrets (wish, if only)",
  },
  "C1-096": {
    cefr: "C1",
    metacategory: "Phrasal Verbs",
    category: "Advanced phrasal verbs (Extended/splitting, C1 verbs)",
  },
  "C1-099": {
    cefr: "C1",
    metacategory: "Passives",
    category: "All passive forms",
  },
  "C1-119": {
    cefr: "C1",
    metacategory: "Modals",
    category: "Modals of deduction and speculation",
  },
  "C1-120": {
    cefr: "C1",
    metacategory: "Modals",
    category: "Can't have, needn't have",
  },
  "C1-144": {
    cefr: "C1",
    metacategory: "Adjectives",
    category: "Various adjectives",
  },
  "C1-144Z": {
    cefr: "C1",
    metacategory: "Adjectives",
    category: "Compound adjectives",
  },
  "C1-165": {
    cefr: "C1",
    metacategory: "Intensifiers",
    category: "Collocation of intensifiers and downtoners",
  },
  "C1-166": {
    cefr: "C1",
    metacategory: "Lexis",
    category: "General C1 vocabulary",
  },
  "C1-171": {
    cefr: "C1",
    metacategory: "Lexis",
    category: "Travel and services vocabulary",
  },
  "C1-182": {
    cefr: "C1",
    metacategory: "Lexis",
    category: "Colloquial language",
  },
  "C1-183": {
    cefr: "C1",
    metacategory: "Lexis",
    category: "Approximating (vague language)",
  },
  "C1-184": {
    cefr: "C1",
    metacategory: "Lexis",
    category: "Differentiated use of vocabulary",
  },
  "C1-193": { cefr: "C1", metacategory: "Topics", category: "Work and jobs" },
  "C1-198": {
    cefr: "C1",
    metacategory: "Topics",
    category: "Books and literature",
  },
  "C1-199": {
    cefr: "C1",
    metacategory: "Topics",
    category: "News and current affairs",
  },
  "C1-200": { cefr: "C1", metacategory: "Topics", category: "Media" },
  "C1-201": { cefr: "C1", metacategory: "Topics", category: "Arts" },
  "C1-202": {
    cefr: "C1",
    metacategory: "Topics",
    category: "Science and technology",
  },
  "C1-203": {
    cefr: "C1",
    metacategory: "Topics",
    category: "Technical and legal language",
  },
  "C1-910": { cefr: "C1", metacategory: "Topics", category: "Health" },
  "C1-911": { cefr: "C1", metacategory: "Topics", category: "Sex" },
  "C1-912": { cefr: "C1", metacategory: "Topics", category: "Money" },
  "C1-913": { cefr: "C1", metacategory: "Topics", category: "Food" },
  "C1-914": { cefr: "C1", metacategory: "Topics", category: "Lifestyle" },
  "C1-915": { cefr: "C1", metacategory: "Topics", category: "Language" },
  "C1P-000": {
    cefr: "C1+",
    metacategory: "Miscellaneous",
    category: "Missing lemmas",
  },
  "C1P-003": {
    cefr: "C1+",
    metacategory: "Functions/notions",
    category: "Understanding and using numbers (Mathematics)",
  },
  "C1P-034": {
    cefr: "C1+",
    metacategory: "Functions/notions",
    category: "Developing an argument systematically",
  },
  "C1P-035": {
    cefr: "C1+",
    metacategory: "Functions/notions",
    category: "Conceding a point",
  },
  "C1P-036": {
    cefr: "C1+",
    metacategory: "Functions/notions",
    category: "Emphasizing a point, feeling, issue",
  },
  "C1P-037": {
    cefr: "C1+",
    metacategory: "Functions/notions",
    category: "Defending a point of view persuasively",
  },
  "C1P-038": {
    cefr: "C1+",
    metacategory: "Functions/notions",
    category: "Responding to counterarguments",
  },
  "C1P-060": {
    cefr: "C1+",
    metacategory: "Passives",
    category: "All passive forms***",
  },
  "C1P-73Z": {
    cefr: "C1+",
    metacategory: "Future",
    category: "Future in the past***",
  },
  "C1P-096": {
    cefr: "C1+",
    metacategory: "Phrasal Verbs",
    category: "Advanced phrasal verbs (Extended/splitting)",
  },
  "C1P-144Z": {
    cefr: "C1+",
    metacategory: "Adjectives",
    category: "Compound adjectives",
  },
  "C1P-159": {
    cefr: "C1+",
    metacategory: "Adverbs",
    category: "Inversion (negative adverbials)",
  },
  "C1P-166": {
    cefr: "C1+",
    metacategory: "Lexis",
    category: "General C1+ vocabulary",
  },
  "C1P-187": {
    cefr: "C1+",
    metacategory: "Lexis",
    category: "Formal and informal registers",
  },
  "C1P-188A": {
    cefr: "C1+",
    metacategory: "Lexis",
    category: "Idiomatic expressions",
  },
  "C1P-188B": { cefr: "C1+", metacategory: "Lexis", category: "Proverbs" },
  "C1P-999": { cefr: "C1+", metacategory: "Outro", category: "The end" },
  "B1-076": {
    cefr: "B1",
    metacategory: "Future",
    category: "Future time with will or going to (Prediction)",
  },
});

const lol = JSON.parse(dqsdqssqdds);
const soso = Object.values(lol);

console.log("soso", soso);
const ddsq = Array.from(
  new Set(
    Object.entries(lol).map((curr) => {
      const entry = curr[1] as unknown as { metacategory: string };
      return entry.metacategory;
    })
  )
);
console.log("lol", ddsq);

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

  return (
    <div className="min-h-full bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900">
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
            {ddsq.map((level) => (
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
                  className={`absolute inset-0 bg-gradient-to-br opacity-90`}
                />
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-white mb-1">
                    {level}
                  </div>
                  <div className="text-sm text-white/90">
                    ${level.toString()}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Categories and Topics */}
        <div className="space-y-6">
          {ddsq.map((data, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 px-6 py-4 border-b border-white/20">
                <h3 className="text-xl font-bold text-white">
                  {index + 1}. {data}
                </h3>
              </div>

              <div className="divide-y divide-white/10">
                {soso
                  .filter(
                    (item) =>
                      (item as { metacategory: string }).metacategory === data
                  )
                  .map((item) => {
                    const { cefr, category, id } = item as {
                      cefr: string;
                      id: string;
                      category: string;
                    };
                    const isExpanded = expandedTopic === cefr;
                    const isCompleted = completedTopics.has(cefr);

                    return (
                      <div key={id}>
                        <button
                          onClick={() => toggleTopic(id)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <ChevronRight
                              className={`w-5 h-5 text-purple-300 transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                            <span className="text-purple-100 font-mono text-sm">
                              {cefr}
                            </span>
                            <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                              {category}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markComplete(id);
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
                                {category ? (
                                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs text-purple-200 font-semibold shrink-0">
                                      1
                                    </div>
                                    <p className="text-white flex-1">
                                      {category}
                                    </p>
                                    <button className="text-purple-300 hover:text-white transition-colors">
                                      <Volume2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : null}
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
