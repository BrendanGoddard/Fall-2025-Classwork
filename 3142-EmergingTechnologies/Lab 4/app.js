// ==================== CONFIG ====================
const OLLAMA_BASE = "http://127.0.0.1:11434";
let currentModel = null;
let typingInterval = null;
let audioCtx = null;
let paletteOpen = false;

// ==================== AUDIO (SUBTLE SFX) ====================
function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq = 440, duration = 0.07, volume = 0.04) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // ignore if audio isn't allowed
  }
}

function playSendSound() {
  playTone(540, 0.05, 0.05);
}

function playReceiveSound() {
  playTone(360, 0.08, 0.05);
}

// ==================== STATUS + MESSAGES ====================
function setStatus(text, isError = false) {
  const el = document.getElementById("connectionStatus");
  if (!el) return;
  el.textContent = text;
  el.style.color = isError ? "var(--danger)" : "";
}

function appendMessage(sender, text, type) {
  const box = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = `message ${type}`;
  const senderSpan = document.createElement("span");
  senderSpan.className = "sender";
  senderSpan.textContent = sender + ": ";
  const textSpan = document.createElement("span");
  textSpan.className = "text";
  textSpan.textContent = text;
  div.appendChild(senderSpan);
  div.appendChild(textSpan);
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

function systemMessage(msg) {
  appendMessage("System", msg, "system");
}

// ==================== TYPING INDICATOR ====================
function showTyping() {
  const box = document.getElementById("messages");
  let typing = document.getElementById("typingIndicator");
  if (!typing) {
    typing = document.createElement("div");
    typing.id = "typingIndicator";
    typing.className = "message system";
    typing.innerHTML = `<span class="sender">Ollama:</span> <span class="text"> Thinking<span id="typingDots">...</span></span>`;
    box.appendChild(typing);
  }
  let dots = document.getElementById("typingDots");
  let count = 0;
  clearInterval(typingInterval);
  typingInterval = setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count) || "...";
  }, 300);
  box.scrollTop = box.scrollHeight;
}

function hideTyping() {
  clearInterval(typingInterval);
  const typing = document.getElementById("typingIndicator");
  if (typing && typing.parentNode) {
    typing.parentNode.removeChild(typing);
  }
}

// ==================== MODEL ICON HELPER ====================
function getModelIcon(name = "") {
  const lower = name.toLowerCase();
  if (lower.includes("llama") || lower.includes("llama3")) return "🦙";
  if (lower.includes("mistral")) return "🌪️";
  if (lower.includes("phi")) return "📘";
  if (lower.includes("qwen")) return "🐉";
  if (lower.includes("codellama") || lower.includes("code")) return "💻";
  return "🤖";
}

// ==================== THEME TOGGLE ====================
const themes = {
  dark: {
    "--bg": "#0a0f1e",
    "--glass-bg": "rgba(255, 255, 255, 0.06)",
    "--glass-border": "rgba(255, 255, 255, 0.12)",
    "--text": "#e8ecf2",
    "--muted": "#9aa3b2"
  },
  light: {
    "--bg": "#f5f7fb",
    "--glass-bg": "rgba(255, 255, 255, 0.86)",
    "--glass-border": "rgba(15, 23, 42, 0.1)",
    "--text": "#111827",
    "--muted": "#6b7280"
  }
};

let currentTheme = "dark";

function applyTheme(name) {
  const root = document.documentElement;
  const t = themes[name];
  if (!t) return;
  Object.entries(t).forEach(([key, val]) =>
    root.style.setProperty(key, val)
  );
  currentTheme = name;
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = name === "dark" ? "☀️ Light" : "🌙 Dark";
  }
}

function toggleTheme() {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

function createThemeToggle() {
  const header = document.querySelector("header.panel");
  if (!header) return;
  const btn = document.createElement("button");
  btn.id = "themeToggle";
  btn.type = "button";
  btn.className = "mini-btn";
  btn.style.marginLeft = "10px";
  btn.textContent = "☀️ Light";
  btn.addEventListener("click", toggleTheme);

  // wrap status + theme together
  const statusContainer = header.querySelector(".status");
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "10px";

  header.replaceChild(wrapper, statusContainer);
  wrapper.appendChild(statusContainer);
  wrapper.appendChild(btn);

  applyTheme("dark");
}

// ==================== COMMAND PALETTE ====================
let paletteInput = null;

function createCommandPalette() {
  const overlay = document.createElement("div");
  overlay.id = "commandPalette";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "rgba(15, 23, 42, 0.55)";
  overlay.style.backdropFilter = "blur(12px)";
  overlay.style.zIndex = "999";

  const panel = document.createElement("div");
  panel.style.minWidth = "320px";
  panel.style.maxWidth = "480px";
  panel.style.padding = "14px 16px 10px";
  panel.style.borderRadius = "16px";
  panel.style.background = "rgba(15, 23, 42, 0.92)";
  panel.style.border = "1px solid rgba(148, 163, 184, 0.5)";
  panel.style.boxShadow = "0 18px 40px rgba(0,0,0,0.6)";

  const label = document.createElement("div");
  label.textContent = "Command Palette";
  label.style.fontSize = "0.8rem";
  label.style.color = "var(--muted)";
  label.style.marginBottom = "6px";

  paletteInput = document.createElement("input");
  paletteInput.type = "text";
  paletteInput.placeholder = "Try: /clear, /reload, /running, /help";
  paletteInput.style.width = "100%";
  paletteInput.style.padding = "8px 10px";
  paletteInput.style.borderRadius = "10px";
  paletteInput.style.border = "1px solid rgba(148, 163, 184, 0.8)";
  paletteInput.style.background = "#020617";
  paletteInput.style.color = "var(--text)";
  paletteInput.style.outline = "none";
  paletteInput.addEventListener("keydown", handlePaletteKey);

  const hint = document.createElement("div");
  hint.style.marginTop = "6px";
  hint.style.fontSize = "0.75rem";
  hint.style.color = "var(--muted)";
  hint.textContent = "Press Esc to close • Ctrl+K / Cmd+K to open";

  panel.appendChild(label);
  panel.appendChild(paletteInput);
  panel.appendChild(hint);
  overlay.appendChild(panel);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closePalette();
    }
  });

  document.body.appendChild(overlay);
}

function openPalette() {
  const overlay = document.getElementById("commandPalette");
  if (!overlay) return;
  overlay.style.display = "flex";
  paletteOpen = true;
  paletteInput.value = "";
  paletteInput.focus();
}

function closePalette() {
  const overlay = document.getElementById("commandPalette");
  if (!overlay) return;
  overlay.style.display = "none";
  paletteOpen = false;
}

async function executeCommand(cmdRaw) {
  const cmd = cmdRaw.trim();
  if (!cmd) return;
  if (!cmd.startsWith("/")) {
    // treat as prompt shortcut
    const promptBox = document.getElementById("prompt");
    promptBox.value = cmd;
    closePalette();
    promptBox.focus();
    return;
  }

  switch (cmd.toLowerCase()) {
    case "/clear":
      document.getElementById("messages").innerHTML = "";
      systemMessage("Chat cleared via command palette.");
      break;
    case "/reload":
      await loadModels();
      systemMessage("Models reloaded.");
      break;
    case "/running":
      await refreshRunningModel();
      break;
    case "/help":
      systemMessage("Commands: /clear, /reload, /running, or just type a question to send to chat.");
      break;
    default:
      systemMessage("Unknown command: " + cmd);
      break;
  }
}

function handlePaletteKey(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    executeCommand(paletteInput.value);
    closePalette();
  } else if (e.key === "Escape") {
    e.preventDefault();
    closePalette();
  }
}

// global keyboard shortcut
document.addEventListener("keydown", (e) => {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const mod = isMac ? e.metaKey : e.ctrlKey;

  if (mod && e.key.toLowerCase() === "k") {
    e.preventDefault();
    paletteOpen ? closePalette() : openPalette();
  }

  if (paletteOpen && e.key === "Escape") {
    e.preventDefault();
    closePalette();
  }
});

// ==================== MODELS ====================
async function loadModels() {
  const sel = document.getElementById("modelSelect");
  const info = document.getElementById("modelInfo");
  if (!sel || !info) return;

  sel.innerHTML = `<option>Loading models…</option>`;
  info.innerHTML = "<li>Loading…</li>";

  try {
    setStatus("Loading models from Ollama…");
    const res = await fetch(OLLAMA_BASE + "/api/tags");
    if (!res.ok) throw new Error("HTTP " + res.status + " " + res.statusText);
    const data = await res.json();

    const models = data.models || [];
    sel.innerHTML = "";

    if (models.length === 0) {
      sel.innerHTML = `<option>No models found</option>`;
      info.innerHTML = "<li>No local models. Pull one with <code>ollama pull</code>.</li>";
      setStatus("No models found", true);
      return;
    }

    models.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = m.name;
      opt.textContent = m.name;
      sel.appendChild(opt);
    });

    if (!currentModel) {
      currentModel = models[0].name;
    }
    sel.value = currentModel;
    await loadModelInfo(currentModel);
    setStatus("Models loaded.");
  } catch (err) {
    console.error(err);
    setStatus("Error loading models.", true);
    info.innerHTML = `<li style="color:var(--danger);">Error: ${err.message}</li>`;
    systemMessage("Error loading models: " + err.message);
  }
}

async function loadModelInfo(name) {
  const info = document.getElementById("modelInfo");
  if (!info) return;
  if (!name) {
    info.innerHTML = "<li>Select a model to see details.</li>";
    return;
  }

  info.innerHTML = "<li>Loading details…</li>";
  try {
    const res = await fetch(OLLAMA_BASE + "/api/show", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error("HTTP " + res.status + " " + res.statusText);
    const data = await res.json();
    const d = data.details || {};

    const rows = [
      ["Parameters", d.parameter_size || d.parameters],
      ["Format", d.format],
      ["Family", d.family],
      ["Architecture", d.architecture || d.arch],
      ["Quantization", d.quantization_level || d.quantization]
    ];

    info.innerHTML = "";
    rows.forEach(([k, v]) => {
      if (!v) return;
      const li = document.createElement("li");
      li.innerHTML = `<strong>${k}:</strong> ${v}`;
      info.appendChild(li);
    });

    if (!info.innerHTML) {
      info.innerHTML = "<li>No extra details available.</li>";
    }
  } catch (err) {
    info.innerHTML = `<li style="color:var(--danger);">Error: ${err.message}</li>`;
    systemMessage("Error loading model info: " + err.message);
  }
}

async function refreshRunningModel() {
  const el = document.getElementById("runningModel");
  if (!el) return;
  el.textContent = "Checking…";

  try {
    const res = await fetch(OLLAMA_BASE + "/api/ps");
    if (!res.ok) throw new Error("HTTP " + res.status + " " + res.statusText);
    const data = await res.json();
    const running = (data.models && data.models[0]) || null;

    if (!running) {
      el.textContent = "No model currently running.";
      return;
    }

    const name = running.name || "(unknown)";
    const icon = getModelIcon(name);
    el.textContent = `${icon} ${name}`;

    // sync dropdown
    const sel = document.getElementById("modelSelect");
    if (sel && Array.from(sel.options).some((o) => o.value === name)) {
      sel.value = name;
      currentModel = name;
      loadModelInfo(name);
    }
  } catch (err) {
    el.textContent = "Error reading running model.";
    systemMessage("Error calling /api/ps: " + err.message);
  }
}

// ==================== CHAT ====================
async function sendMessage() {
  const input = document.getElementById("prompt");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  if (!currentModel) {
    systemMessage("Select a model before chatting.");
    return;
  }

  appendMessage("You", text, "user");
  playSendSound();
  input.value = "";
  input.focus();
  await generateFromOllama(text);
}

async function generateFromOllama(prompt) {
  const box = document.getElementById("messages");
  showTyping();

  // placeholder bot message
  const botDiv = appendMessage("Ollama", "", "bot");
  const textSpan = botDiv.querySelector(".text");

  try {
    setStatus("Waiting for Ollama response…");
    const response = await fetch(OLLAMA_BASE + "/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: currentModel, prompt, stream: true })
    });

    if (!response.ok || !response.body) {
      const body = await response.text().catch(() => "");
      textSpan.textContent =
        " Error " +
        response.status +
        " " +
        response.statusText +
        (body ? " – " + body : "");
      setStatus("Error from /api/generate.", true);
      hideTyping();
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let full = "";
    let firstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split("\n")) {
        const s = line.trim();
        if (!s) continue;
        try {
          const data = JSON.parse(s);
          if (data.error) {
            textSpan.textContent = " Error: " + data.error;
            setStatus("Error from /api/generate.", true);
            hideTyping();
            return;
          }
          if (data.response) {
            full += data.response;
            textSpan.textContent = " " + full;
            box.scrollTop = box.scrollHeight;
            if (firstChunk) {
              firstChunk = false;
              playReceiveSound();
            }
          }
        } catch {
          // ignore partial lines
        }
      }
    }

    hideTyping();
    setStatus("Response received.");
  } catch (err) {
    hideTyping();
    textSpan.textContent = " Network error: " + err.message;
    setStatus("Network error while calling Ollama.", true);
  }
}

// ==================== EVENTS ====================
function wireEvents() {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("prompt");
  const clearBtn = document.getElementById("clearChat");
  const refreshBtn = document.getElementById("refreshRunningBtn");
  const reloadBtn = document.getElementById("reloadModelsBtn");
  const select = document.getElementById("modelSelect");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sendMessage();
    });
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document.getElementById("messages").innerHTML = "";
      systemMessage("Chat cleared.");
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshRunningModel);
  }

  if (reloadBtn) {
    reloadBtn.addEventListener("click", loadModels);
  }

  if (select) {
    select.addEventListener("change", (e) => {
      currentModel = e.target.value || null;
      loadModelInfo(currentModel);
    });
  }
}

// ==================== INIT ====================
async function init() {
  wireEvents();
  createThemeToggle();
  createCommandPalette();
  systemMessage("UI loaded. Trying to reach Ollama on 127.0.0.1:11434 …");
  await loadModels();
  await refreshRunningModel();
}

window.addEventListener("load", init);
