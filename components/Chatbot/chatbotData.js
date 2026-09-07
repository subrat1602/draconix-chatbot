export const chatbotFAQs = [
  {
    id: 1,
    question: "What is Draconix Digital?",
    keywords: ["draconix", "about draconix", "what is draconix", "who is draconix", "company", "who are you"],
    answer:
      "Draconix Digital is a technology and digital commerce platform providing modern digital solutions and online business experiences."
  },
  {
    id: 2,
    question: "What services do you provide?",
    keywords: ["services", "service", "what do you do", "offerings", "web development", "software development", "app development", "digital marketing", "seo", "branding"],
    answer:
      "We provide services including web development, software development, app development, digital marketing, SEO, digital branding and e-commerce solutions."
  },
  {
    id: 3,
    question: "What products do you offer?",
    keywords: ["products", "product", "what products", "offerings", "jewellery", "fashion", "hardware", "sanitary", "items to buy"],
    answer:
      "Draconix Digital Store supports different business categories such as jewellery, fashion, restaurant/food, hardware and sanitary products."
  },
  {
    id: 4,
    question: "Can I shop online?",
    keywords: ["shop online", "online shopping", "online shop", "shopping", "shop", "purchase", "buy online"],
    answer:
      "Yes. The Draconix Digital Store provides an online shopping experience for supported products and categories."
  },
  {
    id: 5,
    question: "Can I book a plumber?",
    keywords: ["book a plumber", "book plumber", "plumber", "plumbing", "plumber service", "hire plumber"],
    answer:
      "Yes. The platform includes plumbing-related services where customers can find and request plumbing assistance."
  },
  {
    id: 6,
    question: "Do you support restaurant ordering?",
    keywords: ["restaurant ordering", "restaurant", "order food", "food ordering", "menus", "dining", "food"],
    answer:
      "Yes. The platform supports restaurant-related features including menus and online ordering functionality."
  },
  {
    id: 7,
    question: "How can I contact Draconix?",
    keywords: ["contact draconix", "contact", "phone", "email", "call", "reach you", "contact info", "office", "address"],
    answer:
      "You can contact the Draconix Digital team through the official contact channels provided on the website."
  },
  {
    id: 8,
    question: "What technology does Draconix use?",
    keywords: ["technology", "tech", "technology stack", "tech stack", "technologies", "framework", "tools"],
    answer:
      "Draconix uses modern web technologies to build scalable, responsive and user-friendly digital applications."
  },
  {
    id: 9,
    question: "Can Draconix build an online store?",
    keywords: ["build an online store", "build online store", "online store", "create an online store", "ecommerce store", "e-commerce store", "build store", "build website", "create website"],
    answer:
      "Yes. Draconix can help businesses create modern websites, e-commerce platforms and digital solutions."
  },
  {
    id: 10,
    question: "How can I get support?",
    keywords: ["get support", "customer support", "need help", "support", "help", "assistance", "support team"],
    answer:
      "For support, please use the customer support or contact options available on the Draconix Digital website."
  }
];

export const basicConversations = [
  {
    triggers: ["hi", "hey", "hiya", "howdy"],
    answer: "Hi! 👋 Welcome to Draconix Digital.\n\nHow can I help you today?"
  },
  {
    triggers: ["hello"],
    answer: "Hello! 👋 How can I help you?"
  },
  {
    triggers: ["how are you", "how are you doing", "how r u"],
    answer: "I'm doing great! 😊 I'm here to help you with Draconix Digital."
  },
  {
    triggers: ["thank you", "thanks", "thx", "appreciate it"],
    answer: "You're welcome! 😊"
  },
  {
    triggers: ["bye", "goodbye", "see you", "cya"],
    answer: "Goodbye! 👋 Have a great day!"
  }
];

export const initialWelcomeMessage = {
  id: "welcome",
  sender: "bot",
  text: "Hi! 👋\n\nI'm Draconix Assistant.\n\nHow can I help you today?",
  showQuickQuestions: true
};

export const defaultQuickQuestions = [
  "What is Draconix Digital?",
  "What services do you provide?",
  "What products do you offer?",
  "How can I contact you?"
];

export const fallbackQuickActions = [
  { label: "About Draconix", query: "What is Draconix Digital?" },
  { label: "Services", query: "What services do you provide?" },
  { label: "Products", query: "What products do you offer?" },
  { label: "Contact", query: "How can I contact Draconix?" }
];

export const fallbackResponse = {
  text: `Sorry! 😕 I don't have an answer for that yet.

I can help you with questions about:

• Draconix Digital
• Services
• Products
• Online shopping
• Restaurant ordering
• Plumbing services
• Customer support
• Contact information

Please try one of these questions.`,
  showFallbackActions: true
};

/**
 * Normalizes input text and finds a matching FAQ or conversational response.
 * @param {string} rawInput 
 * @returns {object} { answer: string, isFallback: boolean }
 */
export function findChatbotResponse(rawInput) {
  if (!rawInput) {
    return { answer: fallbackResponse.text, isFallback: true };
  }

  // Normalize: lower case, remove punctuation, trim
  const cleanInput = rawInput
    .toLowerCase()
    .trim()
    .replace(/[?!.,;:'"()]/g, "");

  const words = cleanInput.split(/\s+/).filter(Boolean);

  // 1. Check basic conversational greetings / courtesies first
  for (const conv of basicConversations) {
    for (const trigger of conv.triggers) {
      if (cleanInput === trigger || words.includes(trigger)) {
        return { answer: conv.answer, isFallback: false };
      }
    }
  }

  // 2. Exact or direct match with FAQ question titles
  for (const faq of chatbotFAQs) {
    const cleanFaqQuestion = faq.question
      .toLowerCase()
      .trim()
      .replace(/[?!.,;:'"()]/g, "");
    if (cleanInput === cleanFaqQuestion || cleanInput.includes(cleanFaqQuestion) || cleanFaqQuestion.includes(cleanInput)) {
      return { answer: faq.answer, isFallback: false };
    }
  }

  // 3. Keyword Scoring:
  // Longer / multi-word keywords give higher specificity scores
  let bestFaq = null;
  let highestScore = 0;

  for (const faq of chatbotFAQs) {
    let score = 0;
    for (const keyword of faq.keywords) {
      const cleanKeyword = keyword.toLowerCase().trim();
      if (cleanKeyword.includes(" ")) {
        // Multi-word phrase match gives higher score (e.g. "book plumber", "customer support")
        if (cleanInput.includes(cleanKeyword)) {
          score += 15 + cleanKeyword.length;
        }
      } else {
        // Single word match
        if (words.includes(cleanKeyword)) {
          score += 5 + cleanKeyword.length;
        } else if (cleanInput.includes(cleanKeyword) && cleanKeyword.length >= 4) {
          score += 3;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestFaq = faq;
    }
  }

  if (bestFaq && highestScore > 0) {
    return { answer: bestFaq.answer, isFallback: false };
  }

  // 4. Fallback if no match found
  return { answer: fallbackResponse.text, isFallback: true };
}
