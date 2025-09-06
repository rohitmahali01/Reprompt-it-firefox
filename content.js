/* global browser */
(function () {
  // Listen for messages from background to show toast or errors
  browser.runtime.onMessage.addListener((msg) => {
    if (msg.error) {
      showNotification(msg.error, 'error');
    } else if (msg.toast) {
      showNotification(msg.toast, 'success');
    }
  });
  
  function showNotification(message, type = 'success') {
    const bgColor = type === 'error' ? '#d73027' : '#323232';
    const div = Object.assign(document.createElement("div"), {
      textContent: message,
      style: `
        position:fixed;bottom:20px;right:20px;
        background:${bgColor};color:#fff;padding:12px 16px;
        border-radius:6px;font-size:14px;z-index:2147483647;
        opacity:0;transition:opacity .3s;max-width:300px;
        box-shadow:0 4px 12px rgba(0,0,0,0.3);
        font-family:system-ui,sans-serif;line-height:1.4;
      `
    });
    document.body.appendChild(div);
    requestAnimationFrame(() => (div.style.opacity = "1"));
    
    const duration = type === 'error' ? 5000 : 2200;
    setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => div.remove(), 300);
    }, duration);
  }
})();