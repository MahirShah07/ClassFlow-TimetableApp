# ClassFlow 📅

A premium, mobile-first live timetable application built specifically for students. It features beautiful glass-morphism aesthetics, live progress tracking, and interactive class widgets.

## Features ✨

- **Live Timetable**: Real-time progress bar tracking the current class.
- **Up Next Widget**: Instantly see what's coming up next without leaving the main screen.
- **Mobile First**: Specifically tailored UI for iOS and Android web browsers.
- **Glassmorphism Design**: Sleek translucent cards, vibrant colors, and smooth Framer Motion animations.
- **Offline Capable**: Uses Redux Persist to save your timetable data locally.

## Tech Stack 🛠️

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with modern Glassmorphism properties
- **Components**: Ant Design (Icons, Progress, Tags)
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit + Redux Persist
- **Time Parsing**: Day.js

## Running Locally 💻

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **View on Mobile**
   Open the localhost link in your browser and use Developer Tools (F12) to toggle the device toolbar to a mobile phone (e.g., iPhone 14 Pro). The UI is strictly optimized for mobile screens.

*(Note: You can mock the live time by modifying the `VITE_MOCK_TIME` variable inside the `.env` file.)*

---
*Designed with ❤️ for students.*
