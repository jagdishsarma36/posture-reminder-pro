const DEFAULT_INTERVAL = 20;
const prefersDark = true;
const tips = [
  "Roll your shoulders back and down 🧘‍♂️",
  "Take 3 slow deep breaths 🌬️",
  "Stand up and stretch your spine 🧍‍♀️",
  "Relax your jaw and unclench your teeth 😌",
  "Do a gentle neck rotation 🔄",
  "Drink a glass of water 💧",
  "Close your eyes for 10 seconds 👁️",
  "Stretch your arms overhead 🙆‍♂️",
  "Gently tilt your head side to side 👍",
  "Massage your temples with circular motions 💆‍♀️",
  "Look away from screen for 20 seconds 👀",
  "Stretch your wrists in all directions 🖐️",
  "Do seated spinal twists 🪑",
  "Stand up and touch your toes 🦶",
  "Roll your ankles in circles 🩷",
  "Press your palms together chest-level 🙏",
  "Stretch your quadriceps while standing 🦵",
  "Do shoulder blade squeezes 🔄",
  "Gently massage your scalp 👩‍🦰",
  "Hum your favorite song for 10 seconds 🎵",
  "Smile for no reason 😊",
  "Stretch your fingers wide apart 🖐️",
  "Roll your neck slowly clockwise 🔁",
  "Take a walk around your room 🚶‍♀️",
  "Do calf raises while standing 🦵",
  "Stretch your hamstrings gently 🦿",
  "Practice diaphragmatic breathing 🫁",
  "Massage your hands and fingers ✋",
  "Look at something green in distance 🌳",
  "Do wrist flexion and extension stretches 🤲",
  "Stretch your chest in doorway 🚪",
  "Rotate your hips in circles 🕺",
  "Shake out your hands and arms 👋",
  "Do chin tucks for neck posture 👩‍⚕️",
  "Stretch your upper back with chair 🔄",
  "Practice the 20-20-20 rule: 20s break every 20min 👁️",
  "Massage your forehead with fingertips 💆‍♂️",
  "Do finger-to-palm stretches 🖐️",
  "Stretch your sides by reaching overhead ↕️",
  "Rotate your shoulders forward and back 🔄",
  "Take micro-breaks between tasks ⏱️",
  "Stretch your hip flexors 🏃‍♀️",
  "Do gentle backbends while standing ↗️",
  "Massage your jaw muscles 👅",
  "Practice mindful breathing for 1 minute 🧠",
  "Stretch your triceps overhead 💪",
  "Do ankle rotations in both directions 🔄",
  "Stand on one leg for balance 🦅",
  "Stretch your forearm muscles 🤳",
  "Take a moment to appreciate something 🌟",
  "Do seated forward folds 🪑",
  "Rotate your wrists clockwise/counter 🔄",
  "Stretch your pectoral muscles 🏋️",
  "Practice gratitude while stretching 🙏",
  "Do lateral neck stretches ↔️",
  "Massage your own shoulders 💪",
  "Stretch your glutes while seated 🍑",
  "Take a power pose for confidence 💪",
  "Do breathing square: 4s in, 4s hold, 4s out, 4s hold 🟦",
  "Stretch your hamstrings with strap 🎗️",
  "Rotate your eyes in circles 👁️",
  "Massage your temples with pressure 💆",
  "Do standing cat-cow stretch 🐱🐮",
  "Stretch your IT band with cross-leg 🦵",
  "Practice alternate nostril breathing 👃",
  "Do wrist circles with fingers interlocked 🔗",
  "Stretch your upper trapezius muscles 🔺",
  "Take a mental vacation for 30s 🌴",
  "Do finger stretches with rubber band 🎗️",
  "Stretch your serratus anterior muscles 🔄",
  "Practice box breathing: equal inhale, hold, exhale, hold 📦",
  "Massage your own feet with ball 🦶",
  "Do standing quad stretches 🏃",
  "Stretch your hip rotators 🔄",
  "Take a moment to hydrate properly 💦",
  "Do progressive muscle relaxation 🎯",
  "Stretch your wrist extensors 🤚",
  "Practice mindful blinking for 15s 👁️",
  "Do shoulder shrugs and releases 🔄",
  "Stretch your gastrocnemius muscle 🦵",
  "Take a digital detox for 2 minutes 📵",
  "Do seated spinal extensions 🪑",
  "Stretch your wrist flexors 🤲",
  "Practice the 4-7-8 breathing technique 🔢",
  "Massage your own neck gently 👌",
  "Do standing hamstring stretches 🧍",
  "Stretch your soleus muscle 🦵",
  "Take a gratitude break 🙏",
  "Do finger push-ups on table 🖐️",
  "Stretch your upper back with towel 🧖",
  "Practice visualization of relaxing place 🏞️",
  "Do ankle pumps and circles 🔄",
  "Stretch your shoulder girdle 💪",
  "Take a moment to reset your posture 🎯",
  "Do gentle yoga for desk workers 🧘",
  "Stretch your entire body like a cat 🐈",
  "Remember: Movement is medicine! 💊"
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setIcon({ path: "icon-dark.png" });
  chrome.storage.sync.set({
    interval: DEFAULT_INTERVAL,
    stretchCount: 0,
    lastReset: new Date().toDateString(),
    isRunning: true
  });
  scheduleReminder(DEFAULT_INTERVAL);
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "postureReminder") {
    chrome.storage.sync.get(["isRunning"], (data) => {
      if (data.isRunning !== false) { // Only trigger if running
        sendPostureReminder();
      }
    });
    
    // Notify popup about the alarm trigger
    chrome.runtime.sendMessage({ action: "alarmTriggered" })
      .catch(() => {
        // Popup might not be open, which is fine
      });
  }
});

chrome.storage.onChanged.addListener(changes => {
  if (changes.interval) {
    chrome.storage.sync.get(["isRunning"], (data) => {
      if (data.isRunning !== false) {
        scheduleReminder(changes.interval.newValue);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "triggerTestReminder") {
    sendPostureReminder(true);
  } else if (msg.action === "updateInterval") {
    chrome.storage.sync.get(["isRunning"], (data) => {
      if (data.isRunning !== false) {
        scheduleReminder(msg.interval);
      }
    });
  } else if (msg.action === "startReminders") {
    startReminders();
  } else if (msg.action === "stopReminders") {
    stopReminders();
  } else if (msg.action === "resetCounter") {
    resetCounter();
  }
});

function startReminders() {
  chrome.storage.sync.get(["interval"], (data) => {
    const interval = data.interval || DEFAULT_INTERVAL;
    chrome.storage.sync.set({ isRunning: true }, () => {
      scheduleReminder(interval);
      // Notify all popups about status change
      chrome.runtime.sendMessage({ 
        action: "runningStatusUpdated", 
        running: true 
      }).catch(() => {});
    });
  });
}

function stopReminders() {
  chrome.alarms.clear("postureReminder", () => {
    chrome.storage.sync.set({ isRunning: false }, () => {
      // Notify all popups about status change
      chrome.runtime.sendMessage({ 
        action: "runningStatusUpdated", 
        running: false 
      }).catch(() => {});
    });
  });
}

function resetCounter() {
  const today = new Date().toDateString();
  chrome.storage.sync.set({ 
    stretchCount: 0, 
    lastReset: today 
  });
}

function scheduleReminder(minutes) {
  chrome.alarms.clear("postureReminder", () => {
    chrome.alarms.create("postureReminder", { periodInMinutes: minutes });
    // Notify popup about the new schedule
    chrome.runtime.sendMessage({ action: "alarmTriggered" })
      .catch(() => {
        // Popup might not be open, which is fine
      });
  });
}

async function sendPostureReminder(isTest = false) {
  const randomTip = isTest
    ? "This is a test — take a deep breath 🌿"
    : tips[Math.floor(Math.random() * tips.length)];

  chrome.storage.sync.get(["stretchCount", "lastReset"], async data => {
    const today = new Date().toDateString();
    let newCount = data.stretchCount || 0;

    if (data.lastReset !== today) {
      newCount = 0;
      chrome.storage.sync.set({ lastReset: today, stretchCount: 0 });
    }

    newCount++;
    chrome.storage.sync.set({ stretchCount: newCount });

    await playSound();
    injectFloatingReminder(randomTip, newCount);
  });
}

// ✅ FIXED: Reliable sound playback
async function playSound() {
  // Method 1: Play using a background page audio element
  try {
    const audio = new Audio(chrome.runtime.getURL("ding.mp3"));
    audio.volume = 0.7;
    await audio.play();
    console.log("Sound played successfully from background");
    return;
  } catch (err) {
    console.log("Background audio failed, trying tab injection...");
  }

  // Method 2: Inject into active tab as fallback
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && /^https?:/.test(tab.url)) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const audio = new Audio(chrome.runtime.getURL("ding.mp3"));
          audio.volume = 0.7;
          audio.play().catch(e => console.log("Tab audio failed:", e));
        }
      });
    }
  } catch (err) {
    console.warn("Tab audio injection failed:", err);
  }

  // Method 3: Final fallback - Chrome notification with sound
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon-dark.png",
    title: "Time to stretch! 🧘",
    message: "Take a posture break and breathe",
    silent: false, // This will play system default sound
    priority: 2
  });
}

// ✅ Floating reminder bubble
function injectFloatingReminder(tip, count) {
  chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    const tab = tabs[0];
    if (!tab || !/^https?:/.test(tab.url)) return;
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showFloatingBubble,
        args: [tip, count]
      });
    } catch (err) {
      console.warn("Bubble injection failed:", err);
    }
  });
}

// Executed inside the page
function showFloatingBubble(tip, count) {
  if (document.getElementById("posture-reminder-bubble")) return;

  const wrapper = document.createElement("div");
  wrapper.id = "posture-reminder-bubble";
  wrapper.innerHTML = `
    <button id="bubble-close" title="Close">×</button>
    <div id="posture-bubble-content">
      <h4>Take a Breather 🌿</h4>
      <div id="bubble-circle"></div>
      <div id="bubble-message">Inhale...</div>
      <div id="bubble-tip">${tip}</div>
      <div id="bubble-count">Today's stretches: ${count}</div>
    </div>
  `;

  Object.assign(wrapper.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "999999",
    borderRadius: "18px",
    boxShadow: "0 0 15px rgba(255,255,255,0.15)",
    padding: "18px 20px 15px",
    textAlign: "center",
    width: "220px",
    fontFamily: "system-ui, sans-serif",
    background: "rgba(30, 30, 30, 0.95)",
    color: "#eee",
    transition: "opacity 0.4s ease-in-out"
  });

  const style = document.createElement("style");
  style.textContent = `
    #bubble-circle {
      width: 65px;
      height: 65px;
      background: #88d0a0;
      border-radius: 50%;
      margin: 10px auto;
      transition: transform 4s ease-in-out;
    }
    #bubble-tip { font-size: 14px; margin-top: 5px; }
    #bubble-count { font-size: 12px; margin-top: 8px; opacity: 0.8; }
    #bubble-message { margin-top: 5px; font-weight: bold; color: #9f9; }
    #posture-bubble-content h4 { margin: 0; font-size: 16px; color: #aaf; }
    #bubble-close {
      position: absolute;
      top: 6px;
      right: 10px;
      background: transparent;
      border: none;
      color: #bbb;
      font-size: 18px;
      cursor: pointer;
    }
    #bubble-close:hover { color: #fff; }
  `;
  document.head.appendChild(style);
  document.body.appendChild(wrapper);

  const circle = wrapper.querySelector("#bubble-circle");
  const message = wrapper.querySelector("#bubble-message");
  const closeBtn = wrapper.querySelector("#bubble-close");

  let phase = 0;
  const breathing = setInterval(() => {
    if (phase % 2 === 0) {
      circle.style.transform = "scale(1.5)";
      message.textContent = "Inhale... 🌬️";
    } else {
      circle.style.transform = "scale(1)";
      message.textContent = "Exhale... 😌";
    }
    phase++;
  }, 4000);

  const closeBubble = () => {
    clearInterval(breathing);
    wrapper.style.opacity = "0";
    setTimeout(() => wrapper.remove(), 400);
  };

  closeBtn.addEventListener("click", closeBubble);
  document.addEventListener("keydown", e => e.key === "Escape" && closeBubble());
  setTimeout(closeBubble, 20000);
}