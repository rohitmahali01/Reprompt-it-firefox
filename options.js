/* global browser */
// Model definitions (moved from models.js for Firefox compatibility)
const OPENAI_MODELS = [
  { id: "gpt-4o",           label: "GPT-4o" },
  { id: "gpt-4o-mini",      label: "GPT-4o Mini" },
  { id: "gpt-3.5-turbo",    label: "GPT-3.5 Turbo" }
];

const GEMINI_MODELS = [
  { id: "gemini-2.5-pro",        label: "Gemini 2.5 Pro" },
  { id: "gemini-2.5-flash",      label: "Gemini 2.5 Flash" },
  { id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash-Lite" },
  { id: "gemini-2.0-flash",      label: "Gemini 2.0 Flash" },
  { id: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash-Lite" }
];

// Input validation functions
function validateOpenAIKey(key) {
  if (!key) return { valid: false, message: "OpenAI API key is required" };
  if (!key.startsWith('sk-')) return { valid: false, message: "OpenAI API key must start with 'sk-'" };
  if (key.length < 20) return { valid: false, message: "OpenAI API key appears too short" };
  return { valid: true };
}

function validateGeminiKey(key) {
  if (!key) return { valid: false, message: "Gemini API key is required" };
  if (!key.startsWith('AIza')) return { valid: false, message: "Gemini API key must start with 'AIza'" };
  if (key.length < 30) return { valid: false, message: "Gemini API key appears too short" };
  return { valid: true };
}

function sanitizeInput(input) {
  return input.trim().replace(/[<>"'&]/g, '');
}

const keyInput     = document.getElementById("key");
const gKeyInput    = document.getElementById("gkey");
const providerSel  = document.getElementById("provider");
const openaiSel    = document.getElementById("openaiModel");
const geminiSel    = document.getElementById("geminiModel");
const status       = document.getElementById("status");

/* populate model dropdowns */
OPENAI_MODELS.forEach(m => openaiSel.add(new Option(m.label, m.id)));
GEMINI_MODELS.forEach(m => geminiSel.add(new Option(m.label, m.id)));

/* load stored prefs */
browser.storage.local.get(
  ["openaiKey","geminiKey","defaultProvider","openaiModel","geminiModel"],
  res => {
    if (res.openaiKey)      keyInput.value  = res.openaiKey;
    if (res.geminiKey)      gKeyInput.value = res.geminiKey;
    if (res.defaultProvider) providerSel.value = res.defaultProvider;
    if (res.openaiModel)    openaiSel.value = res.openaiModel;
    if (res.geminiModel)    geminiSel.value = res.geminiModel;
  }
);

/* save handler */
document.getElementById("save").onclick = () => {
  const openaiKey = sanitizeInput(keyInput.value);
  const geminiKey = sanitizeInput(gKeyInput.value);
  
  // Validate API keys if provided
  if (openaiKey) {
    const openaiValidation = validateOpenAIKey(openaiKey);
    if (!openaiValidation.valid) {
      status.textContent = openaiValidation.message;
      status.style.color = "red";
      setTimeout(() => {
        status.textContent = "";
        status.style.color = "green";
      }, 3000);
      return;
    }
  }
  
  if (geminiKey) {
    const geminiValidation = validateGeminiKey(geminiKey);
    if (!geminiValidation.valid) {
      status.textContent = geminiValidation.message;
      status.style.color = "red";
      setTimeout(() => {
        status.textContent = "";
        status.style.color = "green";
      }, 3000);
      return;
    }
  }
  
  browser.storage.local.set({
    openaiKey:       openaiKey,
    geminiKey:       geminiKey,
    defaultProvider: providerSel.value,
    openaiModel:     openaiSel.value,
    geminiModel:     geminiSel.value
  }, () => {
    status.textContent = "Saved!";
    status.style.color = "green";
    setTimeout(() => (status.textContent = ""), 1500);
  });
};

// Listen for storage changes
browser.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    switch(key) {
      case 'defaultProvider':
        document.getElementById('provider').value = newValue;
        break;
      case 'openaiModel':
        document.getElementById('openaiModel').value = newValue;
        break;
      case 'openaiKey':
        document.getElementById('key').value = newValue;
        break;
      case 'geminiModel':
        document.getElementById('geminiModel').value = newValue;
        break;
      case 'geminiKey':
        document.getElementById('gkey').value = newValue;
        break;
    }
  }
});
