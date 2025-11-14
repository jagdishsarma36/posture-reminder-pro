document.addEventListener("DOMContentLoaded", () => {
  const intervalInput = document.getElementById("interval");
  const status = document.getElementById("status");
  const statusText = document.getElementById("statusText");
  const saveBtn = document.getElementById("save");
  const testBtn = document.getElementById("test");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const resetBtn = document.getElementById("reset");
  const counter = document.getElementById("counter");
  const timer = document.getElementById("timer");

  let nextAlarmTime = null;
  let updateTimerInterval = null;
  let isRunning = false;

  // Load saved settings and initialize
  chrome.storage.sync.get(["interval", "stretchCount", "lastReset", "isRunning"], (data) => {
    intervalInput.value = data.interval || 20;
    updateCount(data.stretchCount || 0, data.lastReset);
    updateRunningStatus(data.isRunning !== false); // Default to true if not set
    updateNextAlarmTime();
  });

  // Save button click handler
  saveBtn.addEventListener("click", () => {
    const newInterval = parseInt(intervalInput.value);
    if (isNaN(newInterval) || newInterval <= 0) {
      status.textContent = "Please enter a valid number.";
      status.style.color = "#ff6b6b";
      return;
    }
    
    chrome.storage.sync.set({ interval: newInterval }, () => {
      status.textContent = `Reminder set every ${newInterval} minutes ✅`;
      status.style.color = "#a8e6cf";
      setTimeout(() => (status.textContent = ""), 2000);
      
      // Update alarm and timer
      chrome.runtime.sendMessage({ 
        action: "updateInterval", 
        interval: newInterval 
      });
      updateNextAlarmTime();
    });
  });

  // Test button click handler
  testBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "triggerTestReminder" });
    status.textContent = "Test reminder triggered 🔔";
    status.style.color = "#ffd93d";
    setTimeout(() => (status.textContent = ""), 2000);
  });

  // Start button click handler
  startBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "startReminders" });
    updateRunningStatus(true);
    status.textContent = "Reminders started ✅";
    status.style.color = "#a8e6cf";
    setTimeout(() => (status.textContent = ""), 2000);
    updateNextAlarmTime();
  });

  // Stop button click handler
  stopBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stopReminders" });
    updateRunningStatus(false);
    status.textContent = "Reminders stopped ⏹️";
    status.style.color = "#ff6b6b";
    setTimeout(() => (status.textContent = ""), 2000);
    updateNextAlarmTime();
  });

  // Reset button click handler
  resetBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "resetCounter" });
    updateCount(0, new Date().toDateString());
    status.textContent = "Counter reset to 0 🔄";
    status.style.color = "#ffd93d";
    setTimeout(() => (status.textContent = ""), 2000);
  });

  // Update stretch counter
  function updateCount(count, lastReset) {
    const today = new Date().toDateString();
    if (lastReset !== today) count = 0;
    counter.textContent = count;
  }

  // Update running status
  function updateRunningStatus(running) {
    isRunning = running;
    chrome.storage.sync.set({ isRunning: running });
    
    if (running) {
      statusText.innerHTML = '<span class="status-indicator status-running"></span>Running';
      startBtn.disabled = true;
      stopBtn.disabled = false;
    } else {
      statusText.innerHTML = '<span class="status-indicator status-stopped"></span>Stopped';
      startBtn.disabled = false;
      stopBtn.disabled = true;
      timer.textContent = "--:--";
    }
  }

  // Update next alarm time and start timer
  function updateNextAlarmTime() {
    chrome.alarms.get("postureReminder", (alarm) => {
      if (alarm && isRunning) {
        nextAlarmTime = alarm.scheduledTime;
        startTimer();
      } else {
        timer.textContent = "--:--";
        if (updateTimerInterval) {
          clearInterval(updateTimerInterval);
          updateTimerInterval = null;
        }
      }
    });
  }

  // Start the countdown timer
  function startTimer() {
    if (updateTimerInterval) {
      clearInterval(updateTimerInterval);
    }

    updateTimerInterval = setInterval(() => {
      if (!nextAlarmTime || !isRunning) {
        timer.textContent = "--:--";
        return;
      }

      const now = Date.now();
      const timeLeft = nextAlarmTime - now;

      if (timeLeft <= 0) {
        timer.textContent = "00:00";
        // Refresh alarm time
        updateNextAlarmTime();
        return;
      }

      // Convert to minutes and seconds
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);

      timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.stretchCount) {
      updateCount(changes.stretchCount.newValue, new Date().toDateString());
    }
    if (changes.interval) {
      updateNextAlarmTime();
    }
    if (changes.isRunning) {
      updateRunningStatus(changes.isRunning.newValue);
      updateNextAlarmTime();
    }
  });

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "alarmTriggered") {
      updateNextAlarmTime();
    }
    if (message.action === "runningStatusUpdated") {
      updateRunningStatus(message.running);
      updateNextAlarmTime();
    }
  });

  // Initialize
  updateNextAlarmTime();

  // Cleanup on popup close
  window.addEventListener('beforeunload', () => {
    if (updateTimerInterval) {
      clearInterval(updateTimerInterval);
    }
  });
});