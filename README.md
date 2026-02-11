# LetsDoIt

A polished React Native (Expo) Todo app with clean architecture, reminders, drag-and-drop, and an expressive UI.

## Features
- Create, edit, and complete tasks
- Filters (All, Today, Upcoming, Done)
- Reminders with seconds or minutes
- Countdown chip on tasks
- Drag-and-drop reorder (All view)
- Persistent storage (AsyncStorage)
- Custom header and design system

## Tech
- Expo + React Native
- React Navigation
- AsyncStorage
- Expo Notifications
- Reanimated + Gesture Handler

## Getting Started
```bash
npm install
npm run start
```

## Tests
```bash
npm test
```

CI uses coverage:
```bash
npm run test:ci
```

## CI + SonarCloud
The GitHub Actions pipeline runs tests and publishes coverage to SonarCloud.

Setup:
1. Create a SonarCloud project in org `ershubhamgarg` with key `todo-app`.
2. Generate a SonarCloud token:
   - SonarCloud → My Account → Security → Tokens → Generate.
3. Add the token as a GitHub repository secret named `SONAR_TOKEN`.

## Notes
- iOS simulator does not show local notifications. Use a real device for reminders.
