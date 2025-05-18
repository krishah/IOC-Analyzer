# 🛡️ Privacy Policy – IOC Analyzer (Chrome Extension)

**Release Date:** 2025-05-16  
**Version:** 1.0.0  
**Author:** [Your Name or Organization]

## 🔐 1. User Data Handling

IOC Analyzer **does not collect, store, transmit, or share any personal data**.

- No activity logs are created.
- No data is sent to third-party servers.
- We do not track browsing history or user interaction.
- No indicators of compromise (IOC) or selected text are transmitted outside the browser.

---

## 🔧 2. How the Extension Works

The extension activates **only when the user explicitly requests it**, by:

- Selecting a piece of text (IP, URL, hash) on a webpage.
- Right-clicking and choosing “Analyze IOC” from the context menu.

What it does:
- Reads the selected text from the current page.
- Opens multiple tabs to user-configured threat intelligence platforms (e.g., MISP, VirusTotal, OpenCTI).
- All configuration and API keys are stored **locally** using `chrome.storage.local`.

---

## 🌐 3. Extension Permissions

IOC Analyzer requests the following Chrome extension permissions:

- `contextMenus`: Adds an option to the right-click menu.
- `scripting`:
****
