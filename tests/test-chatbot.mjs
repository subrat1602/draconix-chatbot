import {
  chatbotFAQs,
  basicConversations,
  findChatbotResponse,
  fallbackResponse,
  defaultQuickQuestions
} from "../components/Chatbot/chatbotData.js";

console.log("=== Running Chatbot Unit & Matching Tests ===");

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`✓ PASS: ${message}`);
  } else {
    console.error(`✗ FAIL: ${message}`);
  }
}

// 1. Verify 10 FAQs defined
assert(chatbotFAQs.length === 10, "Has exactly 10 FAQs defined in chatbotFAQs");

// 2. Test exact FAQ questions matching
chatbotFAQs.forEach((faq) => {
  const res = findChatbotResponse(faq.question);
  assert(
    !res.isFallback && res.answer === faq.answer,
    `Exact match for FAQ #${faq.id}: "${faq.question}"`
  );
});

// 3. Test variations & keywords for each FAQ
const sampleQueries = [
  { q: "Tell me about Draconix", expectedId: 1 },
  { q: "What is your tech stack?", expectedId: 8 },
  { q: "Can I book plumber services?", expectedId: 5 },
  { q: "Can I do online shopping?", expectedId: 4 },
  { q: "I want to order food from restaurant", expectedId: 6 },
  { q: "What services do you provide?", expectedId: 2 },
  { q: "What products are available?", expectedId: 3 },
  { q: "Can you help me build an ecommerce store?", expectedId: 9 },
  { q: "How do I reach customer support?", expectedId: 10 },
  { q: "What is your phone contact or email?", expectedId: 7 }
];

sampleQueries.forEach(({ q, expectedId }) => {
  const res = findChatbotResponse(q);
  const expectedFaq = chatbotFAQs.find((f) => f.id === expectedId);
  assert(
    !res.isFallback && res.answer === expectedFaq.answer,
    `Fuzzy/Keyword match for: "${q}" -> maps to FAQ #${expectedId}`
  );
});

// 4. Test Basic Conversational greetings
const greetings = [
  { text: "Hi", includes: "Hi! 👋 Welcome" },
  { text: "hello", includes: "Hello! 👋" },
  { text: "How are you?", includes: "doing great! 😊" },
  { text: "thank you", includes: "You're welcome! 😊" },
  { text: "bye", includes: "Goodbye! 👋" }
];

greetings.forEach(({ text, includes }) => {
  const res = findChatbotResponse(text);
  assert(
    !res.isFallback && res.answer.includes(includes),
    `Greeting conversational match for: "${text}"`
  );
});

// 5. Test Unknown Question fallback
const unknownQueries = [
  "Can you book a flight to Mars?",
  "What is the capital of France?",
  "Who won the 1998 World Cup?"
];

unknownQueries.forEach((q) => {
  const res = findChatbotResponse(q);
  assert(
    res.isFallback && res.answer === fallbackResponse.text,
    `Fallback triggered correctly for unknown query: "${q}"`
  );
});

// 6. Test Default Quick Questions
assert(defaultQuickQuestions.length === 4, "Initial quick questions count is 4");

console.log(`\n=== Test Results: ${passed} / ${total} passed ===`);

if (passed !== total) {
  process.exit(1);
} else {
  console.log("All Chatbot logic tests passed flawlessly!");
}
