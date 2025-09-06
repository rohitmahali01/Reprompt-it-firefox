/* popup.js - Firefox Edition */
const $ = id => document.getElementById(id);

// Input validation functions
function validateOpenAIKey(key) {
  if (!key) return { valid: true }; // Allow empty for optional
  if (!key.startsWith('sk-')) return { valid: false, message: "OpenAI API key must start with 'sk-'" };
  if (key.length < 20) return { valid: false, message: "OpenAI API key appears too short" };
  return { valid: true };
}

function validateGeminiKey(key) {
  if (!key) return { valid: true }; // Allow empty for optional
  if (!key.startsWith('AIza')) return { valid: false, message: "Gemini API key must start with 'AIza'" };
  if (key.length < 30) return { valid: false, message: "Gemini API key appears too short" };
  return { valid: true };
}

function sanitizeInput(input) {
  return input.trim().replace(/[<>"'&]/g, '');
}

document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    browser.storage.local.get([
        'defaultProvider',
        'openaiModel',
        'openaiKey',
        'geminiModel',
        'geminiKey'
    ], function(data) {
        if (data.defaultProvider) document.getElementById('default-provider').value = data.defaultProvider;
        if (data.openaiModel) document.getElementById('openai-model').value = data.openaiModel;
        if (data.openaiKey) document.getElementById('openai-key').value = data.openaiKey;
        if (data.geminiModel) document.getElementById('gemini-model').value = data.geminiModel;
        if (data.geminiKey) document.getElementById('gemini-key').value = data.geminiKey;
    });

    // Save settings
    document.getElementById('save').addEventListener('click', function() {
        const openaiKey = sanitizeInput(document.getElementById('openai-key').value);
        const geminiKey = sanitizeInput(document.getElementById('gemini-key').value);
        
        // Validate API keys
        const openaiValidation = validateOpenAIKey(openaiKey);
        const geminiValidation = validateGeminiKey(geminiKey);
        
        if (!openaiValidation.valid) {
            const ok = document.getElementById('ok');
            ok.textContent = openaiValidation.message;
            ok.style.color = 'red';
            setTimeout(() => {
                ok.textContent = '';
                ok.style.color = 'green';
            }, 3000);
            return;
        }
        
        if (!geminiValidation.valid) {
            const ok = document.getElementById('ok');
            ok.textContent = geminiValidation.message;
            ok.style.color = 'red';
            setTimeout(() => {
                ok.textContent = '';
                ok.style.color = 'green';
            }, 3000);
            return;
        }
        
        const settings = {
            defaultProvider: document.getElementById('default-provider').value,
            openaiModel: document.getElementById('openai-model').value,
            openaiKey: openaiKey,
            geminiModel: document.getElementById('gemini-model').value,
            geminiKey: geminiKey
        };

        browser.storage.local.set(settings, function() {
            const ok = document.getElementById('ok');
            ok.textContent = 'Saved!';
            ok.style.color = 'green';
            setTimeout(() => ok.textContent = '', 2000);
        });
    });
});

// Listen for storage changes
browser.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    switch(key) {
      case 'defaultProvider':
        document.getElementById('default-provider').value = newValue;
        break;
      case 'openaiModel':
        document.getElementById('openai-model').value = newValue;
        break;
      case 'openaiKey':
        document.getElementById('openai-key').value = newValue;
        break;
      case 'geminiModel':
        document.getElementById('gemini-model').value = newValue;
        break;
      case 'geminiKey':
        document.getElementById('gemini-key').value = newValue;
        break;
    }
  }
});
