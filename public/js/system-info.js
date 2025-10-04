/**
 * System Information Collector
 * Gathers and displays various system and browser information
 */

/**
 * Formats bytes into human readable format
 * @param {number} bytes - The number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Safely gets nested object property
 * @param {Object} obj - The object
 * @param {string} path - The property path
 * @param {*} defaultValue - Default value if property doesn't exist
 * @returns {*} The property value or default
 */
function safeGet(obj, path, defaultValue = "Not available") {
  try {
    return (
      path.split(".").reduce((current, prop) => current[prop], obj) ||
      defaultValue
    );
  } catch {
    return defaultValue;
  }
}

/**
 * Collects browser information
 */
function collectBrowserInfo() {
  document.getElementById("userAgent").textContent = navigator.userAgent;
  document.getElementById("platform").textContent =
    navigator.platform || "Unknown";
  document.getElementById("language").textContent =
    navigator.language || "Unknown";
  document.getElementById("cookiesEnabled").textContent =
    navigator.cookieEnabled ? "Yes" : "No";
  document.getElementById("onlineStatus").textContent = navigator.onLine
    ? "Online"
    : "Offline";
}

/**
 * Collects location information
 */
function collectLocationInfo() {
  const location = window.location;

  document.getElementById("hostname").textContent =
    location.hostname || "localhost";
  document.getElementById("protocol").textContent =
    location.protocol || "Unknown";
  document.getElementById("port").textContent = location.port || "Default";
  document.getElementById("pathname").textContent = location.pathname || "/";
  document.getElementById("origin").textContent = location.origin || "Unknown";
  document.getElementById("fullUrl").textContent = location.href || "Unknown";
}

/**
 * Collects screen information
 */
function collectScreenInfo() {
  const screen = window.screen;
  document.getElementById("screenResolution").textContent =
    `${screen.width} x ${screen.height}`;
  document.getElementById("availableSize").textContent =
    `${screen.availWidth} x ${screen.availHeight}`;
  document.getElementById("colorDepth").textContent =
    screen.colorDepth || "Unknown";
  document.getElementById("pixelRatio").textContent =
    window.devicePixelRatio || 1;
  document.getElementById("viewportSize").textContent =
    `${window.innerWidth} x ${window.innerHeight}`;
}

/**
 * Collects date and time information
 */
function collectDateTimeInfo() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  document.getElementById("currentTime").textContent = formatter.format(now);
  document.getElementById("timezone").textContent =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
  document.getElementById("utcOffset").textContent =
    `GMT${now.getTimezoneOffset() <= 0 ? "+" : "-"}${Math.abs(now.getTimezoneOffset() / 60)}`;
  document.getElementById("locale").textContent =
    Intl.DateTimeFormat().resolvedOptions().locale || "Unknown";
}

/**
 * Collects performance information
 */
function collectPerformanceInfo() {
  // Memory usage
  if ("memory" in performance) {
    const memory = performance.memory;
    const used = formatBytes(memory.usedJSHeapSize);
    const total = formatBytes(memory.totalJSHeapSize);
    const limit = formatBytes(memory.jsHeapSizeLimit);
    document.getElementById("memoryUsage").textContent =
      `${used} / ${total} (Limit: ${limit})`;
  } else {
    document.getElementById("memoryUsage").textContent = "Not available";
  }

  // Connection type
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {
    const effectiveType = connection.effectiveType || "Unknown";
    const downlink = connection.downlink ? `${connection.downlink} Mbps` : "";
    document.getElementById("connectionType").textContent =
      `${effectiveType} ${downlink}`.trim();
  } else {
    document.getElementById("connectionType").textContent = "Not available";
  }

  // Hardware concurrency
  document.getElementById("hardwareConcurrency").textContent =
    navigator.hardwareConcurrency || "Unknown";

  // Max touch points
  document.getElementById("maxTouchPoints").textContent =
    navigator.maxTouchPoints || 0;
}

/**
 * Collects storage information
 */
function collectStorageInfo() {
  // Local Storage
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    document.getElementById("localStorage").textContent = "Available";
  } catch {
    document.getElementById("localStorage").textContent = "Not available";
  }

  // Session Storage
  try {
    const testKey = "__test__";
    sessionStorage.setItem(testKey, "test");
    sessionStorage.removeItem(testKey);
    document.getElementById("sessionStorage").textContent = "Available";
  } catch {
    document.getElementById("sessionStorage").textContent = "Not available";
  }

  // IndexedDB
  document.getElementById("indexedDB").textContent =
    "indexedDB" in window ? "Available" : "Not available";

  // WebSQL (deprecated)
  document.getElementById("webSQL").textContent =
    "openDatabase" in window ? "Available (Deprecated)" : "Not available";
}

/**
 * Updates the last updated timestamp
 */
function updateTimestamp() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("lastUpdated").textContent = formatter.format(now);
}

/**
 * Collects all system information
 */
function collectAllInfo() {
  collectBrowserInfo();
  collectLocationInfo();
  collectScreenInfo();
  collectDateTimeInfo();
  collectPerformanceInfo();
  collectStorageInfo();
  updateTimestamp();
}

/**
 * Refreshes all data
 */
function refreshData() {
  const button = document.querySelector(".button");
  const originalText = button.innerHTML;

  button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Refreshing...';
  button.disabled = true;

  setTimeout(() => {
    collectAllInfo();
    button.innerHTML = originalText;
    button.disabled = false;
  }, 500);
}

/**
 * Handles online/offline status changes
 */
function handleConnectionChange() {
  document.getElementById("onlineStatus").textContent = navigator.onLine
    ? "Online"
    : "Offline";

  if (navigator.onLine) {
    document.getElementById("onlineStatus").className = "has-text-success";
  } else {
    document.getElementById("onlineStatus").className = "has-text-danger";
  }
}

/**
 * Handles window resize events
 */
function handleResize() {
  document.getElementById("viewportSize").textContent =
    `${window.innerWidth} x ${window.innerHeight}`;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  collectAllInfo();

  // Add event listeners
  window.addEventListener("online", handleConnectionChange);
  window.addEventListener("offline", handleConnectionChange);
  window.addEventListener("resize", handleResize);

  // Update time every second
  setInterval(() => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
    document.getElementById("currentTime").textContent = formatter.format(now);
  }, 1000);

  // Initial connection status styling
  handleConnectionChange();
});
