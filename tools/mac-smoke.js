// Start-up check for the Mac build (run by the "Build Mac app" workflow on GitHub's Mac computer).
// Launches the freshly built Roger.app, waits for its window to load the Roger server's page, and checks the sign-in form is there.
// Usage: node mac-smoke.js <path to Roger.app/Contents/MacOS/Roger>
const { spawn } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');
const exe = process.argv[2], PORT = 9333, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'roger-smoke-'));
const app = spawn(exe, [`--user-data-dir=${prof}`, `--remote-debugging-port=${PORT}`], { stdio: 'inherit' });
let exited = null; app.on('exit', (c, s) => { exited = `exited early (code ${c}, signal ${s})`; });
const done = (ok, msg) => { console.log((ok ? 'SMOKE TEST PASSED: ' : 'SMOKE TEST FAILED: ') + msg); try { app.kill(); } catch {} setTimeout(() => process.exit(ok ? 0 : 1), 500); };
(async () => {
  let page;
  for (let i = 0; i < 60 && !page && !exited; i++) {
    try { page = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === 'page'); } catch {}
    if (!page) await sleep(1000);
  }
  if (!page) return done(false, exited || 'no window appeared');
  const ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
  let id = 0; const pend = {}; ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) pend[m.id](m); };
  const ev = (expr) => new Promise((res) => { const i = ++id; pend[i] = res; ws.send(JSON.stringify({ id: i, method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true } })); });
  let state = null;
  for (let i = 0; i < 120 && !exited; i++) {   // the free server can take a while to wake up
    const r = await ev(`JSON.stringify({ url: location.href.slice(0, 60), login: !!document.getElementById('loginForm') })`);
    state = r.result && r.result.result && r.result.result.value ? JSON.parse(r.result.result.value) : null;
    if (state && state.login) return done(true, `the window loaded ${state.url} and shows the sign-in form`);
    await sleep(1000);
  }
  done(false, exited || 'the window never reached the sign-in form: ' + JSON.stringify(state));
})().catch((e) => done(false, String(e)));
