## Roger for Mac (Apple Silicon: M1, M2, M3, M4)

Push-to-talk radio for squads. This is the Mac version of Roger; it connects to the same server as the Windows app, so Mac and Windows players are on the same channels.

### Install
1. Download **`Roger-<version>-mac-arm64.dmg`** below (the one ending in `.dmg`; ignore the other files), open it and drag **Roger** into **Applications**.
2. The first time, macOS says it can't verify the app, because it isn't notarized (Apple charges a yearly fee for that). Get past it once:
   - **macOS 14 or older:** right-click **Roger** > **Open** > **Open**.
   - **macOS 15 or newer:** try to open Roger, then go to **System Settings > Privacy & Security**, scroll down and click **Open Anyway** next to Roger.
   - Or in Terminal: `xattr -dr com.apple.quarantine /Applications/Roger.app`
3. Allow the microphone when asked.

### Using it
- Talk key: **Option+Space** by default (change it in Settings). Mouse buttons can't be used as talk keys on a Mac.
- Updates are not installed automatically: when a newer version exists, Roger tells you and opens this page.
- Intel Macs are not supported by this build (Apple Silicon only).

### Verify your download
The SHA-256 of each file is printed on the build that made it (Actions tab > the latest "Build Mac app" run > summary). Roger is open source: see `README.md` here, and `PRIVACY-AND-SECURITY.md` in the main Roger repository for exactly what it does and which servers it talks to.
