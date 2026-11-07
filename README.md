# The Last 6 Hours

Game lives in `public/index.html`. `server.js` serves it on Render. The Android app is a Capacitor shell that loads your Render URL, so every launch runs whatever is newest on GitHub.

## Setup
1. Push this folder to a GitHub repo.
2. On Render: New > Blueprint, pick the repo (it reads `render.yaml`). Every push to the branch redeploys automatically.
3. Copy your service URL and put it in `capacitor.config.json` under `server.url`. Commit and push.
4. On GitHub: Actions > Build APK > Run workflow. Download the `last-6-hours-apk` artifact, unzip, and install `app-debug.apk` on your phone (allow installs from unknown sources).

## Updating the game
Edit `public/index.html`, push. Render redeploys and the app shows the new version on next launch. You only rebuild the APK to change native things (icon, name, orientation, URL).

## Notes
- Render free services sleep when idle, so the first launch after a while can take 30 to 60 seconds.
- The app needs internet (the game loads three.js from a CDN).
- The APK is a debug build. For the Play Store you need a signed release build.
- Landscape is forced in the manifest by the workflow. If you build locally: `npm install && npx cap add android`, add `android:screenOrientation="sensorLandscape"` to the `<activity>` in `android/app/src/main/AndroidManifest.xml`, then `npx cap open android`.
