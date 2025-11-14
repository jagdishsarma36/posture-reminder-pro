# Posture Reminder Pro 🧘‍♂️

A feature-rich Chrome extension that reminds you to take regular breaks for stretching and breathing exercises. Perfect for desk workers, students, or anyone who spends long hours in front of a computer.

![Posture Reminder Pro](https://img.shields.io/badge/Version-3.0-blue) ![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **⏰ Smart Reminders**: Customizable interval-based reminders for posture breaks
- **🌬️ Breathing Exercises**: Guided breathing animations with visual feedback
- **💪 Stretch Library**: 100+ unique stretching and wellness tips
- **🎵 Sound Alerts**: Multiple fallback methods for reliable sound notifications
- **📊 Progress Tracking**: Daily stretch counter with auto-reset
- **🎨 Beautiful UI**: Modern glass-morphism design with smooth animations
- **⏸️ Full Control**: Start, stop, and reset functionality
- **🔔 Test Mode**: Preview reminders before setting intervals
- **🔄 Real-time Timer**: Countdown to next reminder
- **💫 Floating Bubbles**: Non-intrusive in-page notifications

## 🚀 Installation

### Method 1: Chrome Web Store (Coming Soon)
*Will be available on Chrome Web Store soon*

### Method 2: Manual Installation
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **"Developer mode"** in the top-right corner
4. Click **"Load unpacked"** and select the extension folder
5. The extension will appear in your toolbar

## 🛠️ Usage

### Basic Setup
1. Click the Posture Reminder Pro icon in your Chrome toolbar
2. Set your desired reminder interval (in minutes)
3. Click **"Save"** to activate reminders
4. Enjoy regular posture breaks! 🌿

### Controls
- **▶ Start**: Begin reminder cycle
- **⏹ Stop**: Pause all reminders
- **🔄 Reset**: Reset today's stretch counter to zero
- **🔔 Test**: Trigger a test reminder immediately
- **💾 Save**: Update reminder interval

### What Happens During a Reminder
- 🔊 Gentle sound notification
- 💫 Floating bubble with breathing exercise
- 🧘 Random stretch tip from our extensive library
- 📈 Automatic counter increment
- ⏰ 20-second guided breathing session

## 🎯 Benefits

Regular use of Posture Reminder Pro helps:
- ✅ Reduce back and neck pain
- ✅ Improve circulation
- ✅ Prevent eye strain
- ✅ Boost productivity
- ✅ Enhance mental clarity
- ✅ Promote better posture habits

## 📁 File Structure

```
posture-reminder-pro/
├── manifest.json          # Extension configuration
├── popup.html            # Main settings popup
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── breathing.html        # Breathing exercise page
├── sound.html           # Audio fallback page
├── icon-dark.png        # Extension icon
├── ding.mp3            # Notification sound
└── README.md           # This file
```

## 🔧 Technical Details

### Permissions
- `notifications`: Display reminder notifications
- `alarms`: Schedule recurring reminders
- `storage`: Save user preferences
- `activeTab`: Inject floating reminders
- `scripting`: Execute content scripts

### Browser Compatibility
- ✅ Google Chrome 88+
- ✅ Microsoft Edge 88+
- ✅ Opera 74+
- ✅ Other Chromium-based browsers

## 🎨 Customization

### Changing Reminder Intervals
1. Open the extension popup
2. Modify the number in the interval field
3. Click "Save"
4. Changes take effect immediately

### Adding Custom Tips
Edit the `tips` array in `background.js` to add your own stretch reminders:

```javascript
const tips = [
  "Your custom tip here 🌟",
  "Another helpful reminder 💫",
  // ... add more tips
];
```

## 🤝 Contributing

We welcome contributions! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests
- 📖 Improve documentation

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📊 Privacy

**Posture Reminder Pro respects your privacy:**
- 🔒 No data collection
- 🔒 No tracking
- 🔒 No external servers
- 🔒 All data stored locally
- 🔒 Open source code

## 🆘 Troubleshooting

### Common Issues

**Sound not playing?**
- Ensure your browser isn't muted
- Check system volume levels
- The extension has multiple fallback methods

**Reminders not showing?**
- Verify the extension is enabled
- Check if reminders are stopped
- Ensure proper interval is set

**Counter not updating?**
- Counter resets daily at midnight
- Use "Reset" button to manually reset

### Support
If you encounter issues:
1. Check this README
2. Review Chrome's extension management page
3. Create an issue on GitHub

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from Twemoji
- Sound effects from [Freesound](https://freesound.org)
- Inspired by the need for better digital wellness

## 📮 Contact

**Developer**: Jagdish Sarma
**GitHub**: https://github.com/jagdishsarma36/
**Email**: jagdishsarma.mld@gmail.com

---

<div align="center">

### 💚 Stay Healthy, Stay Productive! 💚

*Remember: Movement is medicine! 💊*

</div>
