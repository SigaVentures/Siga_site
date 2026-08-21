/*!
 * SIGA Ventures — "Summarize with AI" widget
 * Adds a floating ChatGPT / Claude button to every page.
 * Passes the CURRENT page URL to the AI tool so it opens & summarizes
 * that exact page (driving repeat AI-referral traffic and exposing the
 * live page to the model's web-browsing / retrieval layer).
 * Pure client-side, no cloaking, no hidden text — safe for Google.
 */
(function () {
  "use strict";

  function buildPrompt() {
    var url = window.location.href;
    var title = document.title || "this page";
    return (
      "Please open and summarize this page for me: " + url +
      "\n\nPage: " + title +
      "\nGive me a short summary of what it covers and who it's for."
    );
  }

  function chatGPTUrl(prompt) {
    return "https://chatgpt.com/?q=" + encodeURIComponent(prompt) + "&hints=search";
  }

  function claudeUrl(prompt) {
    return "https://claude.ai/new?q=" + encodeURIComponent(prompt);
  }

  function injectStyles() {
    var css = "" +
      "#sv-ai-widget{position:fixed;right:20px;bottom:20px;z-index:99999;" +
      "font-family:'Inter',system-ui,sans-serif;display:flex;flex-direction:column;" +
      "align-items:flex-end;gap:10px;}" +
      "#sv-ai-widget .sv-ai-panel{display:none;flex-direction:column;gap:8px;" +
      "background:#131316;border:1px solid #232327;border-radius:14px;padding:12px;" +
      "box-shadow:0 12px 32px rgba(0,0,0,.45);min-width:220px;}" +
      "#sv-ai-widget.sv-open .sv-ai-panel{display:flex;}" +
      "#sv-ai-widget .sv-ai-label{color:#8f8f96;font-size:11px;letter-spacing:.08em;" +
      "text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:2px;}" +
      "#sv-ai-widget a.sv-ai-btn{display:flex;align-items:center;gap:8px;" +
      "padding:10px 14px;border-radius:10px;background:#18181c;color:#f4f3ef;" +
      "font-size:13.5px;font-weight:500;text-decoration:none;border:1px solid #232327;" +
      "transition:border-color .15s ease,transform .15s ease;}" +
      "#sv-ai-widget a.sv-ai-btn:hover{border-color:#ff4e1f;transform:translateY(-1px);}" +
      "#sv-ai-widget a.sv-ai-btn .sv-ai-dot{width:8px;height:8px;border-radius:50%;flex:none;}" +
      "#sv-ai-widget .sv-ai-toggle{display:flex;align-items:center;gap:8px;" +
      "background:#ff4e1f;color:#0b0b0d;border:none;border-radius:100px;" +
      "padding:12px 18px;font-size:13.5px;font-weight:600;cursor:pointer;" +
      "box-shadow:0 8px 24px rgba(255,78,31,.35);font-family:inherit;}" +
      "#sv-ai-widget .sv-ai-toggle:hover{filter:brightness(1.08);}" +
      "@media (max-width:640px){#sv-ai-widget{right:14px;bottom:14px;}" +
      "#sv-ai-widget .sv-ai-panel{min-width:190px;}}";
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    var prompt = buildPrompt();

    var wrap = document.createElement("div");
    wrap.id = "sv-ai-widget";

    var panel = document.createElement("div");
    panel.className = "sv-ai-panel";

    var label = document.createElement("div");
    label.className = "sv-ai-label";
    label.textContent = "Summarize this page with";
    panel.appendChild(label);

    var gpt = document.createElement("a");
    gpt.className = "sv-ai-btn";
    gpt.href = chatGPTUrl(prompt);
    gpt.target = "_blank";
    gpt.rel = "noopener";
    gpt.innerHTML = '<span class="sv-ai-dot" style="background:#10a37f;"></span> ChatGPT';
    panel.appendChild(gpt);

    var claude = document.createElement("a");
    claude.className = "sv-ai-btn";
    claude.href = claudeUrl(prompt);
    claude.target = "_blank";
    claude.rel = "noopener";
    claude.innerHTML = '<span class="sv-ai-dot" style="background:#d97757;"></span> Claude';
    panel.appendChild(claude);

    var toggle = document.createElement("button");
    toggle.className = "sv-ai-toggle";
    toggle.type = "button";
    toggle.innerHTML = "✦ Summarize with AI";
    toggle.addEventListener("click", function () {
      wrap.classList.toggle("sv-open");
    });

    wrap.appendChild(panel);
    wrap.appendChild(toggle);
    document.body.appendChild(wrap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
