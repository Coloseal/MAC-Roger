# Roger for Mac

Push-to-talk radio for squad coordination, for Macs with Apple silicon (M1 and newer). It connects to the same Roger server as the
Windows app and the website, so Mac and Windows players talk on the same channels.

**Download:** [Releases](https://github.com/Coloseal/MAC-Roger/releases/latest) > the file ending in `.dmg`.
Install steps (including the one-time "macOS can't verify this app" approval) are in each release's text.

**Safety and trust:** open source (MIT, see `LICENSE`). Read
[PRIVACY-AND-SECURITY.md](https://github.com/Coloseal/Roger/blob/main/PRIVACY-AND-SECURITY.md) in the main Roger repository for exactly what Roger
does and doesn't do (the section "The Mac app" covers this version). Third-party software: [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
The app is built by GitHub's own build computers from the code in this repository (see `.github/workflows/build-mac.yml`), not on anyone's laptop.
It is signed with a free "ad-hoc" signature but **not notarized by Apple**, which is why macOS asks you to approve it once.

## What's different from the Windows app
- Talk key is **Option+Space** by default; mouse buttons can't be used as keys on a Mac.
- "Key released" is guessed from key repeats (macOS has no equivalent of the Windows key check Roger uses).
- It doesn't install updates by itself: it tells you a new version exists and opens the releases page.
- Apple silicon only (arm64). There is no Intel build.

## Making a new release
1. On GitHub: **Releases > Draft a new release**, type a new tag such as `v1.5.2`, and **Publish release**.
2. The **Build Mac app** workflow starts by itself (Actions tab). A few minutes later the `.dmg`, `.zip` and `latest-mac.yml` are on that release.
   The version number inside the app comes from the tag.
3. Already have a release and just want to rebuild it? Actions > **Build Mac app** > **Run workflow** > type the tag.
   If that release doesn't exist yet, it is created for you.

If the build fails, open the failed run in the Actions tab and read the red step. A yellow "start it once" step only means the free server was asleep
while the check ran; it does not stop the release.

## Where things are
| Path | What it is |
|---|---|
| `desktop/` | The app: `main.js` (window, shortcuts, tray, update notice), `preload.js`, `loading.html`, `overlay.html`, `config.json` |
| `desktop/config.json` | The Roger server address the app connects to |
| `desktop/package.json` | Build settings (Apple silicon, ad-hoc signature, where the update notice looks for new versions) |
| `.github/workflows/build-mac.yml` | The build |
| `.github/mac-smoke.js` | The start-up check the build runs on the finished app |
| `MAC-RELEASE-NOTES.md` | The text used when the build has to create a release itself |

The app code is the same as the Windows app's `desktop/` folder in the main repository, except `main.js` (the "new version" button opens this
repository's releases) and `desktop/package.json` (Mac-only build settings).
