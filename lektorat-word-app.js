/* FDS Lektorat für Word 1.1.0 */
(function () {
  var st = document.createElement('style'); st.textContent = "/* FDS-Design – übernommen aus dem Export-Formular (Grün, Karten, DE/EN-Umschalter) */\n:root {\n  --green: #8bbf49; --green-d: #6f9c37; --grey: #6f7072; --ink: #2c3136;\n  --bg: #f3f6ee; --card: #ffffff; --line: #e4e9dc; --muted: #7c8a72;\n  --red: #d6452c; --amber: #c88a00; --blue: #2f6fd0;\n  --radius: 12px; --shadow: 0 1px 2px rgba(44,49,54,.05), 0 8px 24px rgba(44,49,54,.06);\n}\n* { box-sizing: border-box; }\nhtml, body { margin: 0; background: var(--bg); color: var(--ink);\n  font: 14px/1.5 -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; }\nheader.top { display: flex; align-items: center; gap: 10px; background: var(--card); border-bottom: 1px solid var(--line);\n  padding: 10px 14px; position: sticky; top: 0; z-index: 5; }\nheader.top img { height: 28px; width: auto; }\nheader.top h1 { font-size: 15px; margin: 0; flex: 1; letter-spacing: -.2px; }\n.bar { height: 3px; background: linear-gradient(90deg, var(--green), #bcd98a); }\n.lang { display: inline-flex; border: 1px solid var(--line); border-radius: 999px; overflow: hidden; }\n.lang button { border: 0; background: transparent; color: var(--grey); font: inherit; font-weight: 600; padding: 4px 9px; cursor: pointer; font-size: 12px; }\n.lang button.active { background: var(--green); color: #fff; }\n.wrap { padding: 12px; }\n.card { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 14px; margin-bottom: 12px; box-shadow: var(--shadow); }\n.card h2 { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: .6px; color: var(--green-d); }\nlabel { display: block; font-weight: 600; margin: 0 0 4px; font-size: 13px; }\ninput, select { width: 100%; padding: 9px 10px; border: 1px solid var(--line); border-radius: 9px; font: inherit; background: #fff; color: var(--ink); }\ninput:focus, select:focus { outline: none; border-color: var(--green); box-shadow: 0 0 0 3px rgba(139,191,73,.25); }\n.field { margin-bottom: 10px; }\nbutton.primary { width: 100%; background: var(--green); color: #fff; border: 0; border-radius: 10px; padding: 11px; font: inherit; font-weight: 700; cursor: pointer; }\nbutton.primary:hover { background: var(--green-d); }\nbutton.primary:disabled { opacity: .55; cursor: default; }\nbutton.ghost { background: #eef1ea; color: var(--ink); border: 0; border-radius: 9px; padding: 7px 10px; font: inherit; font-size: 13px; cursor: pointer; }\nbutton.ghost:hover { background: #e2e8da; }\nbutton.link { background: none; border: 0; color: var(--green-d); font: inherit; cursor: pointer; padding: 0; text-decoration: underline; }\n.row { display: flex; gap: 8px; align-items: center; }\n.row > * { flex: 1; }\n.muted { color: var(--muted); font-size: 12px; }\n.status { font-size: 13px; min-height: 18px; margin-top: 8px; }\n.status.err { color: #b4442f; } .status.ok { color: var(--green-d); } .status.load { color: var(--muted); }\n.hidden { display: none !important; }\n.chk { display: flex; align-items: center; gap: 6px; font-weight: 400; margin-top: 8px; }\n.chk input { width: auto; }\n.counts { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }\n.pill { border-radius: 999px; padding: 2px 9px; font-size: 12px; font-weight: 600; }\n.pill.f { background: #fbe4df; color: #a5341f; } .pill.h { background: #fbf0d4; color: #8a5f00; } .pill.k { background: #e1ebfa; color: #234f94; }\n.hits { list-style: none; margin: 0; padding: 0; }\n.hit { border: 1px solid var(--line); border-left: 4px solid var(--red); border-radius: 10px; padding: 8px 10px; margin-bottom: 6px; cursor: pointer; background: #fff; }\n.hit.hinweis { border-left-color: var(--amber); } .hit.ki { border-left-color: var(--blue); }\n.hit.active { outline: 2px solid var(--green); }\n.hit .w { text-decoration: line-through; color: #b4442f; font-weight: 600; }\n.hit .r { color: #3d7a1e; font-weight: 700; }\n.hit .ctx { color: var(--grey); font-size: 12px; margin-top: 3px; word-break: break-word; }\n.hit .ctx mark { background: #fbe4df; color: inherit; padding: 0 1px; border-radius: 3px; }\n.hit .meta { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 4px 6px; margin-top: 5px; }\n.hit .meta .q { flex: 1 1 100%; }\n.hit .meta .q { color: var(--muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.hit .meta button { font-size: 11px; padding: 3px 7px; }\n.foot { text-align: center; color: var(--muted); font-size: 12px; margin: 6px 0 14px; }\n.warn { background: #fff7e6; border: 1px solid #f1d7a0; color: #7a5600; border-radius: 9px; padding: 8px 10px; font-size: 12px; margin-top: 8px; }\n\n/* Lade-Rädchen: jede Statuszeile im Zustand „load“ dreht sich */\n@keyframes fds-dreh { to { transform: rotate(360deg); } }\n.spinner, .status.load::before { content: ''; display: inline-block; width: 12px; height: 12px; border: 2px solid #d6e2c6;\n  border-top-color: var(--green); border-radius: 50%; animation: fds-dreh .8s linear infinite; vertical-align: -2px; margin-right: 7px; flex: none; }\n.busy { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--muted); flex: 1 1 auto; min-width: 0; overflow: hidden; white-space: nowrap; margin-left: 4px; }\n.top .lang, .top #settingsBtn { flex: none; }\n.busy .txt { overflow: hidden; text-overflow: ellipsis; }\n\n/* Hinweis: neue Plugin-Version */\n.update { background: #fff1e0; border: 2px solid #ef8a1f; color: #7a3b00; border-radius: 10px; padding: 9px 12px; margin: 10px 12px 0;\n  font-size: 13px; font-weight: 600; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; justify-content: space-between; }\n.update a { background: #ef8a1f; color: #fff; border-radius: 7px; padding: 5px 10px; text-decoration: none; white-space: nowrap; }\n.update.hidden { display: none; }\n\n/* Trefferliste: Knöpfe brechen um, nichts ragt aus der Box, kein seitliches Scrollen im Panel */\nhtml, body { overflow-x: hidden; }\n.hit { overflow: hidden; }\n.hit .w, .hit .r { overflow-wrap: anywhere; }\n.hit .meta > .row { flex: 1 1 100% !important; flex-wrap: wrap; gap: 4px; justify-content: flex-start; min-width: 0; }\n.hit .meta button { flex: none; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n\n\n    .crumbs { font-size: 12px; color: var(--muted); margin-bottom: 6px; display: flex; flex-wrap: wrap; gap: 2px; }\n    .crumbs button { background: none; border: 0; padding: 0 2px; color: var(--green-d); cursor: pointer; font: inherit; }\n    .browser { max-height: 300px; overflow: auto; border: 1px solid var(--line); border-radius: 9px; }\n    .item { display: flex; align-items: center; gap: 8px; padding: 7px 9px; border-bottom: 1px solid var(--line); cursor: pointer; font-size: 13px; }\n    .item:last-child { border-bottom: 0; }\n    .item:hover { background: #f6f9f1; }\n    .item input { width: auto; }\n    .item .ic { width: 18px; text-align: center; flex: none; }\n    .item .nm { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    .item .dt { color: var(--muted); font-size: 11px; flex: none; }\n    .rule { display: flex; gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--line); font-size: 13px; }\n    .rule:last-child { border-bottom: 0; }\n    .rule input { width: auto; margin-top: 3px; }\n    .rule .r { color: #3d7a1e; font-weight: 700; }\n    .rule .f { color: var(--grey); }\n    .rules { max-height: 260px; overflow: auto; }\n    .pill.ok { background: #e6f2d6; color: #3d7a1e; } .pill.wait { background: #fbf0d4; color: #8a5f00; } .pill.neu { background: #eef1ea; color: var(--grey); }\n    .chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }\n    .chips button { flex: none; font-size: 12px; padding: 5px 9px; }\n    .auswahl { border: 1px dashed var(--line); border-radius: 9px; padding: 7px 9px; font-size: 12px; height: 90px; min-height: 40px; overflow: auto; white-space: pre-wrap; resize: vertical; }\n    textarea.ergebnis { display: block; width: 100%; box-sizing: border-box; border: 1px solid #cfe3b6; background: #f6fbef; border-radius: 9px; padding: 8px 10px;\n      font: inherit; font-size: 13px; line-height: 1.5; height: 220px; min-height: 80px; resize: vertical; margin: 8px 0 4px; }\n    .diff { white-space: pre-wrap; min-height: 60px; max-height: 320px; overflow: auto; resize: vertical; border: 1px solid #cfe3b6; background: #f6fbef;\n      border-radius: 9px; padding: 8px 10px; font-size: 13px; line-height: 1.55; margin: 4px 0; }\n    .diff del { background: #fde3df; color: #a5341f; text-decoration: line-through; border-radius: 3px; padding: 0 1px; }\n    .diff ins { background: #dcf3d0; color: #1f6b2a; text-decoration: none; border-radius: 3px; padding: 0 1px; }\n    #umCard.gross .diff { max-height: 60vh; }\n    #umCard.gross .auswahl { height: 200px; } #umCard.gross textarea.ergebnis { height: 60vh; }\n    summary.klapp { display: flex; align-items: center; gap: 8px; cursor: pointer; list-style: none; }\n    summary.klapp::-webkit-details-marker { display: none; }\n    summary.klapp::after { content: '▸'; color: var(--muted); flex: none; transition: transform .15s; }\n    details[open] > summary.klapp::after { transform: rotate(90deg); }\n    details[open] > summary.klapp { margin-bottom: 6px; }\n    .verlauf { display: flex; gap: 2px; flex: none; }\n    .verlauf button { padding: 4px 7px; font-size: 14px; line-height: 1; }\n    .verlauf button:disabled { opacity: .35; cursor: default; }\n    .listen-sa { margin-top: 8px; border-top: 1px solid var(--line); padding-top: 8px; }\n    .wortliste { display: flex; flex-wrap: wrap; gap: 4px; margin: 4px 0 8px; min-height: 18px; }\n    .wortliste span { font-size: 12px; border-radius: 999px; padding: 2px 4px 2px 9px; display: inline-flex; align-items: center; gap: 2px; }\n    .wortliste.w span { background: #eef1ea; } .wortliste.b span { background: #e5f4e7; color: #1f6b2a; }\n    .wortliste button { border: 0; background: none; cursor: pointer; color: var(--muted); font-size: 13px; padding: 0 4px; }\n    .active-set { background: #f6f9f1; border: 1px solid #d9e8c4; border-radius: 9px; padding: 8px 10px; font-size: 13px; margin-bottom: 10px; }\n  \n\n.einst .chk:first-of-type { margin-top: 0; }\n"; document.head.appendChild(st);
  document.body.innerHTML = "<header class=\"top\">\n    <img src=\"data:image/png;base64,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\" alt=\"FDS prepress\">\n    <h1 data-i18n=\"title\">Lektorat</h1>\n    <div class=\"busy hidden\" id=\"busy\" role=\"status\" aria-live=\"polite\"><span class=\"spinner\"></span><span class=\"txt\" id=\"busyText\"></span></div>\n    <div class=\"verlauf\"><button class=\"ghost\" id=\"undoBtn\" aria-label=\"Rückgängig\" disabled>↶</button><button class=\"ghost\" id=\"redoBtn\" aria-label=\"Wiederholen\" disabled>↷</button></div>\n    <div class=\"lang\"><button type=\"button\" id=\"de\" class=\"active\">DE</button><button type=\"button\" id=\"en\">EN</button></div>\n    <button class=\"ghost\" id=\"settingsBtn\" title=\"Einstellungen\" aria-label=\"Einstellungen\" style=\"padding:6px 8px\">⚙</button>\n  </header>\n  <div class=\"bar\"></div>\n\n  <main class=\"wrap\">\n    <!-- Einstellungen (Zahnrad) -->\n    <section class=\"card hidden\" id=\"settingsCard\">\n      <h2>Einstellungen</h2>\n      <div class=\"einst\">\n        <label class=\"chk\"><input type=\"checkbox\" id=\"optLt\"> Rechtschreibung &amp; Grammatik (LanguageTool)</label>\n        <label class=\"chk\"><input type=\"checkbox\" id=\"optNachverfolgen\"> Ersetzungen als Änderungen nachverfolgen</label>\n      </div>\n    </section>\n\n    <!-- 1) FDS-Konto -->\n    <section class=\"card hidden\" id=\"login\">\n      <h2 data-i18n=\"loginTitle\">Anmeldung</h2>\n      <p class=\"muted\" data-i18n=\"loginSub\">Bitte mit deinem FDS-Konto anmelden.</p>\n      <div class=\"field\"><label for=\"email\" data-i18n=\"loginEmail\">E-Mail</label><input type=\"email\" id=\"email\" autocomplete=\"username\"></div>\n      <div class=\"field\"><label for=\"pass\" data-i18n=\"loginPass\">Passwort</label><input type=\"password\" id=\"pass\" autocomplete=\"current-password\"></div>\n      <button class=\"primary\" id=\"loginBtn\" data-i18n=\"loginBtn\">Anmelden</button>\n      <div class=\"status err\" id=\"loginErr\"></div>\n    </section>\n\n    <section id=\"app\" class=\"hidden\">\n      <!-- 2) Satzanweisung wählen -->\n      <div class=\"card\" id=\"pickCard\">\n        <div class=\"row\" style=\"margin-bottom:6px\"><h2 style=\"margin:0;flex:1\">Satzanweisung</h2>\n          <button class=\"link\" id=\"reloadListe\" style=\"flex:none\" title=\"Liste aus SharePoint neu laden\">aktualisieren</button></div>\n        <select id=\"recent\"></select>\n        <div class=\"status\" id=\"pickStatus\"></div>\n      </div>\n\n      <!-- 3) Regeln -->\n      <div class=\"card hidden\" id=\"rulesCard\">\n        <details id=\"rulesKlapp\">\n          <summary class=\"klapp\"><h2 style=\"margin:0;flex:1\">Regeln</h2><span class=\"pill\" id=\"rulesPill\" style=\"flex:none\"></span></summary>\n        <div class=\"muted\" id=\"rulesText\"></div>\n        <details id=\"rulesDetails\" style=\"margin-top:6px\"><summary class=\"muted\">Regeln anzeigen</summary>\n          <p class=\"muted\" style=\"margin:6px 0 0\">Häkchen entfernen = diese Regel für dich ausschalten.</p>\n          <div class=\"rules\" id=\"rulesList\" data-no-tr style=\"margin-top:6px\"></div>\n        </details>\n        <div class=\"listen-sa\" id=\"saListenBox\">\n          <div class=\"row\" style=\"margin-bottom:2px\"><b style=\"flex:1;font-size:13px\" data-i18n=\"saListen\">Whitelist / Blacklist dieser Satzanweisung</b></div>\n          <div class=\"muted\" style=\"font-size:12px\" id=\"saListenInfo\" data-no-tr></div>\n          <div class=\"muted\" style=\"font-size:12px;margin-top:4px\">Whitelist</div><div class=\"wortliste w\" id=\"saWhite\" data-no-tr></div>\n          <div class=\"muted\" style=\"font-size:12px\">Blacklist</div><div class=\"wortliste b\" id=\"saBlack\" data-no-tr></div>\n          <div class=\"row\"><input id=\"saWort\" data-i18n-placeholder=\"saWortPh\" placeholder=\"Wort (Blacklist auch „falsch → richtig“)\">\n            <select id=\"saArt\" style=\"flex:none;width:auto\"><option value=\"whitelist\">Whitelist</option><option value=\"blacklist\">Blacklist</option></select>\n            <button class=\"ghost\" id=\"saAdd\" style=\"flex:none\">+</button></div>\n          <div class=\"status\" id=\"saListenStatus\"></div>\n        </div>\n        <details id=\"unklarBox\" class=\"hidden\" style=\"margin-top:6px\"><summary class=\"muted\"></summary><ul class=\"muted\" id=\"unklarList\" data-no-tr style=\"padding-left:18px;margin:4px 0\"></ul></details>\n        </details>\n        <div class=\"row\" style=\"margin-top:6px;flex-wrap:wrap\">\n          <button class=\"primary hidden\" id=\"createBtn\">Erneut versuchen</button>\n        </div>\n        <div class=\"status\" id=\"rulesStatus\"></div>\n      </div>\n\n      <!-- 4) Prüfen -->\n      <div class=\"card hidden\" id=\"checkCard\">\n        <div class=\"active-set\" id=\"activeSet\"></div>\n        <div class=\"row\"><button class=\"primary\" id=\"checkBtn\">Dokument prüfen</button></div>\n        <label class=\"chk\"><input type=\"checkbox\" id=\"anzeigen\" checked> <span data-i18n=\"anzeigen\">Markierungen im Text anzeigen</span></label>\n        <label class=\"chk\"><input type=\"checkbox\" id=\"live\"> <span data-i18n=\"live\">Beim Tippen mitprüfen</span></label>\n        <div class=\"status\" id=\"status\"></div>\n      </div>\n\n      <div class=\"card hidden\" id=\"results\">\n        <div class=\"row\" style=\"margin-bottom:8px\">\n          <div class=\"counts\" id=\"counts\"></div>\n          <div style=\"flex:none\" class=\"row\">\n            <button class=\"ghost\" id=\"prev\" title=\"Vorherige Stelle\">‹</button>\n            <button class=\"ghost\" id=\"next\" title=\"Nächste Stelle\">›</button>\n          </div>\n        </div>\n        <button class=\"ghost hidden\" id=\"alleErsetzen\" style=\"width:100%;margin-bottom:8px\"></button>\n        <ul class=\"hits\" id=\"hits\" data-no-tr></ul>\n      </div>\n\n      <div class=\"card hidden\" id=\"kiCard\">\n        <h2 data-i18n=\"kiTitle\">KI-Prüfung</h2>\n        <p class=\"muted\">Prüft Stil-Hinweise und Beugungsformen, die keine feste Regel abdeckt. Der Text des Dokuments wird dafür an die KI gesendet.</p>\n        <button class=\"ghost\" id=\"kiBtn\" style=\"width:100%\" data-i18n=\"kiBtn\">Mit KI prüfen</button>\n        <div class=\"status\" id=\"kiStatus\"></div>\n      </div>\n\n      <div class=\"card hidden\" id=\"umCard\">\n        <div class=\"row\" style=\"margin-bottom:4px\"><h2 style=\"margin:0;flex:1\" data-i18n=\"umTitle\">Text umschreiben</h2>\n          <button class=\"ghost\" id=\"umGross\" style=\"flex:none;padding:3px 8px\" data-i18n-title=\"umGrossTip\" title=\"Größer / kleiner\">⤢</button></div>\n        <p class=\"muted\" style=\"margin:0 0 6px\">Text im Dokument markieren, dann wählen, was die KI damit machen soll.</p>\n        <div class=\"auswahl muted\" id=\"umAuswahl\" data-no-tr>Noch nichts markiert.</div>\n        <div class=\"status\" id=\"umStatus\"></div>\n        <div id=\"umErgebnis\" class=\"hidden\">\n          <div class=\"muted\" style=\"font-size:12px;margin-top:6px\" data-i18n=\"umErgebnisTitel\">Vorschlag der KI – Änderungen markiert:</div>\n          <div class=\"ergebnis diff\" id=\"umDiff\" data-no-tr></div>\n          <textarea class=\"ergebnis hidden\" id=\"umText\" data-no-tr spellcheck=\"false\"></textarea>\n          <div class=\"muted\" id=\"umHinweis\" data-no-tr style=\"font-size:12px\"></div>\n          <div class=\"row\" style=\"margin-top:8px;flex-wrap:wrap\">\n            <button class=\"primary\" id=\"umUebernehmen\" data-i18n=\"umUebernehmen\">Übernehmen</button>\n            <button class=\"ghost\" id=\"umBearbeiten\" style=\"flex:none\" data-i18n=\"umBearbeiten\">Bearbeiten</button>\n            <button class=\"ghost\" id=\"umKopieren\" style=\"flex:none\" data-i18n=\"copy\">Kopieren</button>\n            <button class=\"ghost\" id=\"umVerwerfen\" style=\"flex:none\" data-i18n=\"umVerwerfen\">Verwerfen</button>\n          </div>\n        </div>\n        <div class=\"chips\" id=\"umAktionen\"></div>\n        <div class=\"row\"><input id=\"umFrei\" data-i18n-placeholder=\"umFreiPh\" placeholder=\"Eigene Anweisung, z. B. „in drei Sätzen“\">\n          <button class=\"ghost\" id=\"umFreiBtn\" style=\"flex:none\" data-i18n=\"umLos\">Los</button></div>\n      </div>\n\n      <div class=\"foot\"><span id=\"who\" data-no-tr></span> · <button class=\"link\" id=\"logout\" data-i18n=\"logout\">Abmelden</button> · Word 1.1.0</div>\n    </section>\n  </main>";
  // Sprache merken wie im Chrome-Plugin (i18n.js nutzt chrome.storage.local); window.chrome der Office-Webview bleibt unberührt
  window.chrome = window.chrome || {};
  if (!window.chrome.storage) window.chrome.storage = { local: {
    get: function (k) { var o = {}; [].concat(k).forEach(function (x) { try { var v = localStorage.getItem('fdslw_c_' + x); if (v != null) o[x] = JSON.parse(v); } catch (e) {} }); return Promise.resolve(o); },
    set: function (o) { Object.keys(o).forEach(function (x) { try { localStorage.setItem('fdslw_c_' + x, JSON.stringify(o[x])); } catch (e) {} }); return Promise.resolve(); } } };
})();
/*
 * FDS Korrektur-Assistent – Matching-Engine
 * Läuft unverändert in: Chrome-Extension (Content-Script, Viewer), Node (Tests) und n8n-Code-Node.
 * Keine Abhängigkeiten.
 */
(function (root) {
  'use strict';

  const SPACE = '[\\s\\u00a0\\u202f\\u2009]+';   // normales, geschütztes und schmales Leerzeichen
  const WORD = '[\\p{L}\\p{N}]';
  const URL_RE = /\bhttps?:\/\/\S+|\bwww\.\S+|[\w.+-]+@[\w-]+\.[\w.-]+/gu;
  const QUOTE_RE = /„[^„“”"]{0,1000}[“”"]|"[^"\n]{0,1000}"|«[^«»]{0,1000}»|»[^«»]{0,1000}«/gu;

  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const SP0 = '[\\s\\u00a0\\u202f\\u2009]*';
  const isWordChar = c => /[\p{L}\p{N}]/u.test(c || '');

  // "Prof. Dr." -> Prof\.[Leerraum]+Dr\.   ("z. B." passt auch auf "z.B.")
  function variantPattern(v) {
    const toks = String(v).trim().split(/\s+/);
    return toks.map((t, i) => (i ? (toks[i - 1].endsWith('.') ? SP0 : SPACE) : '') + escapeRe(t)).join('');
  }

  // Wortgrenzen nur dort, wo die Variante mit einem Buchstaben/einer Ziffer beginnt bzw. endet ("%" passt auch in "10%").
  // Hinten auch keine Bindestrich-Zusammensetzung ("m" nicht in "m-v").
  function bounded(v, body) {
    const t = String(v).trim();
    return (isWordChar(t[0]) ? '(?<!' + WORD + ')' : '') + body +
      (isWordChar(t[t.length - 1]) ? '(?!' + WORD + '|-' + WORD + ')' : '');
  }

  // Schreibweise ("dbb-Chef"): Bestandteile mit beliebigem Trenner (Leerzeichen, Bindestrich, nichts)
  const SEP = '(?:' + SP0 + '[-\\u2010\\u2011]' + SP0 + '|[\\s\\u00a0\\u202f]+|)';
  function schreibweisePattern(form) {
    return String(form).trim().split(/[\s\-\u2010\u2011]+/).filter(Boolean).map(escapeRe).join(SEP);
  }
  // Marken/Abkürzungen: Groß-/Kleinschreibung ist Teil der Regel (dbb, BDZ, COVID-19, 3D)
  function markenartig(form) {
    const toks = String(form).trim().split(/[\s\-\u2010\u2011]+/).filter(Boolean);
    return /^[a-zäöüß]/.test(toks[0] || '') || toks.some(t => /\d/.test(t) || (t.replace(/[^\p{L}]/gu, '').length >= 2 && t.replace(/[^\p{L}]/gu, '') === t.replace(/[^\p{L}]/gu, '').toUpperCase()));
  }
  const nur_versal = form => String(form).trim().split(/[\s\-]+/).every(t => /\p{Lu}/u.test(t) && t === t.toUpperCase());

  // Einzelwörter (Coronavirus, Mitgliedstaat, PowerPoint): auch gebeugte Formen (Mitgliedstaaten, Lkws) gelten als richtig
  const ENDUNG = '(?:e|en|n|s|es|er|ern|ns)?';
  const ENDUNG_RE = /^(?:e|en|n|s|es|er|ern|ns)?$/;
  const einzelwort = f => /^[\p{L}]+$/u.test(f);
  const lowerFirst = f => f.charAt(0).toLocaleLowerCase('de-DE') + f.slice(1);
  // Typische falsche Varianten eines zusammengeschriebenen Worts: getrennt („Corona-Virus“, „Web Tipp“)
  // oder mit Fugen-s („Mitgliedsstaat“, „ruhegehaltsfähig“)
  const TRENNER = '(?:' + SP0 + '[-\\u2010\\u2011]' + SP0 + '|[\\s\\u00a0\\u202f]+)';
  function fehlformen(f) {
    if (!einzelwort(f) || f.length < 7) return [];
    const out = [];
    for (let i = 3; i <= f.length - 3; i++) out.push(escapeRe(f.slice(0, i)) + TRENNER + escapeRe(f.slice(i)));
    for (let i = 4; i <= f.length - 4; i++) {
      if (f[i - 1] !== 's' && /\p{Ll}/u.test(f[i])) out.push(escapeRe(f.slice(0, i)) + 's' + escapeRe(f.slice(i)));
    }
    return out;
  }

  function lower(s) { return String(s || '').toLocaleLowerCase('de-DE'); }

  // KI-Muster: ein Leerzeichen meint jeden Leerraum (geschützt, Achtelgeviert, Tabulator) – außer in Zeichenklassen [ ]
  function leerraum(src) {
    let out = '', klasse = false;
    for (let i = 0; i < src.length; i++) {
      const ch = src[i];
      if (ch === '\\') { out += ch + (src[i + 1] || ''); i++; continue; }
      if (klasse) { if (ch === ']') klasse = false; out += ch; continue; }
      if (ch === '[') { klasse = true; out += ch; continue; }
      out += ch === ' ' ? '\\s' : ch;
    }
    return out;
  }

  // ---------------------------------------------------------------- Bausteine: feste Prüfungen, die die KI nur auswählt
  // Telefonnummer nach „Tel.“, „Telefon“, „Fax“ …: die Nummer selbst (ohne Vorwort)
  const TEL_RE = /(?:\bTel(?:efon)?\.?|\bFax\.?|\bMobil|\bHandy)[ \t\u00a0]*:?[ \t\u00a0]*((?:[(\/]?\d)[\d()\/ \u00a0\u2009\u202f\u2008\u2006-]*\d)/gu;
  function telefonSpannen(text) {
    const out = [];
    TEL_RE.lastIndex = 0;
    let m;
    while ((m = TEL_RE.exec(text))) { const s = m.index + m[0].length - m[1].length; out.push([s, s + m[1].length, m[1]]); }
    return out;
  }
  const paare = d => { let o = ''; for (let i = d.length; i > 0; i -= 2) o = d.slice(Math.max(0, i - 2), i) + (o ? ' ' + o : ''); return o; };
  const ZAHL_RE = /(?<![\p{L}\p{N}.,:\/§\u2009\u202f\u2008\u2006])(\d{1,3}(?:[.\u2009\u202f\u2008\u2006]\d{3})+|\d+)(?![\p{L}\p{N}]|[.,:\/|]\d)/gu;
  const EINHEIT = /^[\s\u00a0\u2009\u202f]*(?:Euro|€|EUR|Prozent|%|Mio|Millionen|Mrd|Milliarden|Stück|Kilometer|km|Meter|Quadratmeter|m²|Tonnen|Mitglieder|Menschen|Personen|Beschäftigte|Mal)\b/u;
  const VORWORT = /(?:§§?|\bArt\.|\bAbs\.|\bNr\.|\bAz\.?:?|\bRn\.|\bS\.|\bParagra(?:f|ph)(?:en)?|\bHausnummer|\bPostfach)[\s\u00a0]*$/u;
  const ACHTEL_ZEICHEN = /[\u2009\u202f\u2008\u2006]/g;

  function bausteinTausender(art, ab) {
    const sep = art === 'punkt' ? '.' : art === 'achtel' ? '\u2009' : '';
    const form = d => d.length < ab ? d : d.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return text => {
      const tel = telefonSpannen(text), out = [];
      ZAHL_RE.lastIndex = 0;
      let m;
      while ((m = ZAHL_RE.exec(text))) {
        const s = m.index, e = s + m[0].length, d = m[0].replace(/\D/g, '');
        if (d.length < 4 || d[0] === '0' || tel.some(([a, b]) => s >= a && e <= b)) continue;
        const davor = text.slice(Math.max(0, s - 30), s), danach = text.slice(e, e + 30);
        if (VORWORT.test(davor)) continue;
        if (d.length === 5 && !/\D/.test(m[0]) && /^[\s\u00a0]+\p{Lu}\p{Ll}/u.test(danach) && !EINHEIT.test(danach)) continue;   // Postleitzahl vor dem Ort
        if (d.length === 4 && !/\D/.test(m[0]) && +d >= 1900 && +d <= 2099 && !EINHEIT.test(danach)) continue;   // Jahreszahl
        const soll = form(d);
        const ist = art === 'achtel' ? m[0].replace(ACHTEL_ZEICHEN, '\u2009') : m[0];
        if (ist !== soll) out.push({ s, e, richtig: soll });
      }
      return out;
    };
  }

  function bausteinTelefon(stil) {
    return text => telefonSpannen(text).flatMap(([s, e, nr]) => {
      if (/-/.test(nr)) return [];   // Durchwahl: zu viele Hausformen, die KI prüft
      let vor, an;
      const k = /^\(([^)]*)\)(.*)$/.exec(nr), sl = nr.split('/');
      if (k) { vor = k[1]; an = k[2]; } else if (sl.length === 2) { vor = sl[0]; an = sl[1]; }
      else { const t = nr.trim().split(/[\s\u00a0\u2009\u202f\u2008\u2006]+/); if (t.length < 2) return []; vor = t[0]; an = t.slice(1).join(''); }
      vor = vor.replace(/\D/g, ''); an = an.replace(/\D/g, '');
      if (!vor || !an) return [];
      const soll = stil === 'klammer' ? '(' + paare(vor) + ') ' + paare(an) : paare(vor) + '/' + paare(an);
      return nr.replace(/[\u00a0\u2009\u202f\u2008\u2006]/g, ' ') === soll ? [] : [{ s, e, richtig: soll }];
    });
  }

  /** „tausender:punkt:4“, „tausender:achtel:4“, „tausender:keiner:4“, „telefon:klammer“, „telefon:schraegstrich“ -> Prüffunktion */
  function baustein(kennung) {
    const [name, a, b] = String(kennung || '').trim().toLowerCase().split(':');
    if (name === 'tausender' && ['punkt', 'achtel', 'keiner'].includes(a)) return bausteinTausender(a, Math.max(4, Number(b) || 4));
    if (name === 'telefon' && ['klammer', 'schraegstrich'].includes(a)) return bausteinTelefon(a);
    return null;
  }

  /** Regel -> kompilierte Regel (oder null bei typ "stil" = nur KI). */
  function compileRule(rule) {
    const typ = rule.typ || 'exakt';
    const falsch = (rule.falsch || []).filter(v => String(v).trim());
    if (typ === 'schreibweise') {
      const erlaubt = (rule.erlaubt && rule.erlaubt.length ? rule.erlaubt : [rule.richtig]).filter(Boolean);
      if (!erlaubt.length) return null;
      const forms = erlaubt.slice().sort((a, b) => b.length - a.length);
      const muster = forms.map(f => bounded(f, schreibweisePattern(f) + (einzelwort(f) ? ENDUNG : '')))
        .concat(forms.flatMap(f => fehlformen(f).map(b => bounded(f, b + ENDUNG))));
      let re;
      // Groß-/Kleinschreibung gehört zur Regel („organisierte Kriminalität“ ist falsch) -> immer ohne Rücksicht suchen, dann vergleichen
      try { re = new RegExp(muster.join('|'), 'giu'); }
      catch (e) { return { rule, error: 'Ungültige Schreibweise: ' + e.message }; }
      const ok = new Set(erlaubt.map(f => f.replace(/[\u00a0\u202f]/g, ' ')));
      // Einzelwort mit großem Anfangsbuchstaben: Word schreibt Listenzeilen automatisch groß -> klein auch richtig
      for (const f of erlaubt) if (/^\p{Lu}[\p{Ll}ß]+$/u.test(f)) ok.add(lowerFirst(f));
      return { rule, re, schreibweise: true, erlaubt: ok, einzel: erlaubt.filter(einzelwort).concat(erlaubt.filter(einzelwort).map(lowerFirst)),
        versal: nur_versal(erlaubt[0]), skipQuotes: false, literals: [] };
    }
    if (typ === 'baustein') {
      const fn = baustein(rule.ersetzen);
      return fn ? { rule, baustein: fn, skipQuotes: false, literals: [] } : { rule, error: 'Unbekannter Baustein: ' + rule.ersetzen };
    }
    if (typ === 'stil' || !falsch.length) return null;
    const flags = 'gu' + (rule.case === false ? 'i' : '');
    let source;
    if (typ === 'regex') {
      source = falsch.map(x => '(?:' + leerraum(x) + ')').join('|');
    } else {
      // Längste Variante zuerst, damit "Prof. Dr." vor "Prof." greift
      const sorted = falsch.slice().sort((a, b) => b.length - a.length);
      const suffix = typ === 'stamm' ? '\\p{L}*' : '';
      source = sorted.map(v => typ === 'stamm'
        ? '(?<!' + WORD + ')' + variantPattern(v) + suffix + '(?!' + WORD + ')'
        : bounded(v, variantPattern(v))).join('|');
    }
    let re;
    try { re = new RegExp(source, flags); }
    catch (e) { return { rule, error: 'Ungültiges Muster: ' + e.message }; }
    const ausnahmen = (rule.ausnahmen || []).map(String);
    // Muster mit Ersetzungsvorschrift („Bewerber:innen“ -> „$1(innen)“): Vorschlag je Fundstelle ausrechnen
    // je Muster einzeln, damit $1 in jedem Muster die eigene erste Gruppe meint
    let einzelRe = null;
    if (typ === 'regex' && rule.ersetzen) {
      try { einzelRe = falsch.map(x => new RegExp('^(?:' + leerraum(x) + ')$', flags.replace('g', ''))); } catch (e) { einzelRe = null; }
    }
    return {
      rule,
      re,
      einzelRe,
      skipQuotes: ausnahmen.some(a => /zitat/i.test(a)),
      literals: ausnahmen.filter(a => !/zitat/i.test(a) && a.trim()),
    };
  }

  function compile(rules) {
    const compiled = [], errors = [];
    for (const r of rules || []) {
      const c = compileRule(r);
      if (!c) continue;
      if (c.error) errors.push({ id: r.id, error: c.error });
      else compiled.push(c);
    }
    return { compiled, errors };
  }

  function ranges(re, text) {
    const out = [];
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) {
      out.push([m.index, m.index + m[0].length]);
      if (m[0].length === 0) re.lastIndex++;
    }
    return out;
  }

  function inside(list, s, e) {
    for (const [a, b] of list) if (a <= s && e <= b) return true;
    return false;
  }

  function overlaps(list, s, e) {
    for (const [a, b] of list) if (s < b && a < e) return true;
    return false;
  }

  // Liegt der Treffer innerhalb der richtigen Schreibweise? (z. B. falsch "Dr." in richtig "Dr. med.")
  function insideCorrect(text, hay, needle, s, e) {
    if (!needle) return false;
    const p = hay.lastIndexOf(needle, s);
    return p >= 0 && p + needle.length >= e;
  }

  /**
   * Prüft Text gegen kompilierte Regeln.
   * @returns {Array<{start,end,match,ruleId,richtig,hinweis,schwere,quelle,key}>}
   */
  function check(text, compiledSet, opts) {
    opts = opts || {};
    const list = compiledSet.compiled || compiledSet;
    const ignore = opts.ignore || null;
    const weiss = opts.whitelist && opts.whitelist.size ? opts.whitelist : null;   // eigene Whitelist: diese Wörter nie anstreichen
    if (!text) return [];
    const urls = ranges(URL_RE, text);
    let quotes = null;
    let textLower = null;
    const candidates = [];
    const geschuetzt = [];   // korrekt geschriebene Schreibweisen: darin wird nichts angestrichen

    // 1) Schreibweisen zuerst: richtige Formen schützen, falsche Varianten anstreichen
    for (const c of list) {
      if (!c.schreibweise) continue;
      const r = c.rule;
      c.re.lastIndex = 0;
      let m;
      while ((m = c.re.exec(text))) {
        const s = m.index, e = s + m[0].length;
        if (e === s) { c.re.lastIndex++; continue; }
        const norm = m[0].replace(/[\u00a0\u202f]/g, ' ');
        if (c.erlaubt.has(norm) || c.einzel.some(f => norm.startsWith(f) && ENDUNG_RE.test(norm.slice(f.length)))) { geschuetzt.push([s, e]); if (opts.schutz) opts.schutz.push([s, e]); continue; }
        if (overlaps(urls, s, e)) continue;
        if (c.versal && /(^|[\s-])\p{Ll}/u.test(m[0])) continue;           // "junge Polizei" ist kein Magazinname
        if (!c.versal && /\p{L}{6}/u.test(m[0]) && m[0] === m[0].toLocaleUpperCase('de-DE') && !/\p{Lu}{2}/u.test(r.richtig || '')) continue;   // Versalsatz (Überschrift)
        if (weiss && weiss.has(lower(norm))) continue;
        if (amSatzanfang(text, s) && nurErsterBuchstabe(m[0], r.richtig)) continue;
        const key = hitKey(r.id, m[0]);
        if (ignore && ignore.has(key)) continue;
        candidates.push({ start: s, end: e, match: m[0], ruleId: r.id, richtig: r.richtig || '',
          hinweis: r.hinweis || '', schwere: r.schwere || 'fehler', quelle: r.quelle || '', key, ersetzbar: !!r.richtig, alle: !!r.richtig && !r.ki });
      }
    }

    // 2) Bausteine (Zahlen, Telefon): die Engine rechnet die richtige Form selbst aus
    for (const c of list) {
      if (!c.baustein) continue;
      const r = c.rule;
      for (const t of c.baustein(text)) {
        if (overlaps(urls, t.s, t.e) || inside(geschuetzt, t.s, t.e)) continue;
        const match = text.slice(t.s, t.e), key = hitKey(r.id, match);
        if (ignore && ignore.has(key)) continue;
        candidates.push({ start: t.s, end: t.e, match, ruleId: r.id, richtig: t.richtig, beispiel: '', hinweis: r.hinweis || '', schwere: r.schwere || 'hinweis',
          quelle: r.quelle || '', key, ersetzbar: true, alle: false });
      }
    }

    // 3) Ersetzungen (falsch -> richtig)
    for (const c of list) {
      if (c.schreibweise || c.baustein) continue;
      const r = c.rule;
      c.re.lastIndex = 0;
      let m;
      while ((m = c.re.exec(text))) {
        const s = m.index, e = s + m[0].length;
        if (e === s) { c.re.lastIndex++; continue; }
        if (overlaps(urls, s, e)) continue;
        if (inside(geschuetzt, s, e)) continue;
        if (weiss && weiss.has(lower(m[0].replace(/[\s\u00a0\u202f]+/g, ' ')))) continue;
        if (amSatzanfang(text, s) && nurErsterBuchstabe(m[0], r.richtig)) continue;   // "Öffentlicher Dienst" am Satzanfang
        if (c.skipQuotes) {
          quotes = quotes || ranges(QUOTE_RE, text);
          if (inside(quotes, s, e)) continue;
        }
        if (c.literals.length && c.literals.some(l => insideCorrect(text, text, l, s, e))) continue;
        if (r.richtig) {
          if (r.case === false) {
            textLower = textLower || lower(text);
            if (insideCorrect(text, textLower, lower(r.richtig), s, e)) continue;
          } else if (insideCorrect(text, text, r.richtig, s, e)) continue;
        }
        const key = hitKey(r.id, m[0]);
        if (ignore && ignore.has(key)) continue;
        const typ = r.typ || 'exakt';
        const passend = c.einzelRe && c.einzelRe.find(x => x.test(m[0]));
        let richtig = passend ? m[0].replace(passend, r.ersetzen) : c.einzelRe ? '' : (r.richtig || '');
        // Muster ohne Ersetzungsvorschrift: „richtig“ ist nur ein Beispiel aus der Satzanweisung („1. Januar 2014“).
        // Datumsangaben rechnen wir selbst um, sonst wird das Beispiel als „z. B. …“ gezeigt, nicht als Vorschlag.
        let beispiel = '', umgerechnet = false;
        if (typ === 'regex' && !c.einzelRe && richtig) {
          const d = datumUmrechnen(m[0], richtig);
          if (d && d !== m[0]) { richtig = d; umgerechnet = true; } else { beispiel = richtig; richtig = ''; }
        }
        candidates.push({
          start: s, end: e, match: m[0], ruleId: r.id, richtig, beispiel,
          hinweis: r.hinweis || '', schwere: r.schwere || 'fehler', quelle: r.quelle || '', key,
          // per Knopf ersetzbar: feste Ersetzungen und Muster mit Ersetzungsvorschrift (sonst ist „richtig“ nur ein Beispiel)
          ersetzbar: !!richtig && richtig !== m[0] && (typ === 'exakt' || !!c.einzelRe || umgerechnet),
          // „Alle ersetzen“: nur sichere feste Regeln (keine KI-Hinweise)
          alle: !!richtig && !r.ki && typ === 'exakt' && (r.schwere || 'fehler') !== 'hinweis',
        });
      }
    }

    // Überlappungen: längster Treffer gewinnt
    candidates.sort((a, b) => (b.end - b.start) - (a.end - a.start) || a.start - b.start);
    const accepted = [];
    for (const h of candidates) {
      if (!accepted.some(a => h.start < a.end && a.start < h.end)) accepted.push(h);
    }
    return accepted.sort((a, b) => a.start - b.start);
  }

  function amSatzanfang(text, s) {
    return /(^\s*|[.!?:]\s+|\n\s*)$/.test(text.slice(Math.max(0, s - 200), s)) || s === 0;
  }
  function nurErsterBuchstabe(match, richtig) {
    const a = String(match).replace(/\s+/g, ' '), b = String(richtig || '');
    return a.length === b.length && a.slice(1) === b.slice(1) && a[0].toLowerCase() === b[0].toLowerCase();
  }

  function hitKey(ruleId, match) {
    return ruleId + '|' + String(match).replace(/[\s   ]+/g, ' ');
  }

  /**
   * Normalisiert PDF-Text: Silbentrennung am Zeilenende, weiche Trennstriche,
   * Ligaturen (NFKC), Leerraum. Liefert Text + Zuordnung zurück ins Original.
   */
  function normalize(src) {
    let out = '';
    const map = [];
    const n = src.length;
    for (let i = 0; i < n; i++) {
      const ch = src[i];
      if (ch === '­') continue;                      // weicher Trennstrich
      if ((ch === '-' || ch === '‐') && /\p{L}/u.test(src[i - 1] || '')) {
        let j = i + 1;
        let sawBreak = false;
        while (j < n && /[ \t\r\n ]/.test(src[j])) { if (src[j] === '\n' || src[j] === '\r') sawBreak = true; j++; }
        if (sawBreak && j < n && /\p{Ll}/u.test(src[j])) { i = j - 1; continue; } // "Pro-\nfessor" -> "Professor"
      }
      if (/[\s   ]/.test(ch)) {
        if (out.length && out[out.length - 1] === ' ') continue;
        out += ' '; map.push(i); continue;
      }
      const nf = ch.normalize('NFKC');
      for (const c of nf) { out += c; map.push(i); }
    }
    return { text: out, map };
  }

  /**
   * PDF-Textstücke (pdf.js getTextContent().items) -> Seitentext. InDesign setzt Achtelgeviert und Tabulator oft nicht als Zeichen,
   * sondern als Lücke: ist die Lücke auf derselben Zeile breiter als ein Achtel der Schrifthöhe, steht ein Leerschritt im Text.
   * Liefert { text, items: [{ it, start, end }] }.
   */
  function pdfText(liste) {
    let text = '';
    const items = [];
    let vorher = null;
    (liste || []).forEach((it, k) => {
      // InDesign-Ligaturen (ft, ff, fi …): pdf.js liefert danach ein Leerzeichen mit Breite 0 – kein echtes Wortende
      const naechstes = liste[k + 1];
      if (!it.hasEOL && it.str === ' ' && it.width < 0.5 && /\p{L}$/u.test(text) && naechstes && /^\p{Ll}/u.test(naechstes.str)) return;
      const t = it.transform || [1, 0, 0, 1, 0, 0], h = it.height || Math.hypot(t[2], t[3]) || 10;
      if (vorher && it.str && text && !/\s$/.test(text) && !/^\s/.test(it.str)) {
        const v = vorher.transform || t, gleicheZeile = Math.abs(v[5] - t[5]) < h * 0.5;
        if (gleicheZeile && t[4] - (v[4] + (vorher.width || 0)) > h * 0.12) text += ' ';
      }
      const start = text.length;
      text += it.str;
      items.push({ it, start, end: text.length });
      if (it.hasEOL) text += '\n';
      if (it.str) vorher = it;
    });
    return { text, items };
  }

  /** check() auf normalisiertem Text, Positionen zurück ins Original gerechnet. */
  function checkNormalized(src, compiledSet, opts) {
    const { text, map } = normalize(src);
    return check(text, compiledSet, opts).map(h => Object.assign({}, h, {
      start: map[h.start],
      end: map[h.end - 1] + 1,
    }));
  }

  /**
   * Global-Regeln + Auftragsregeln. Auftrag gewinnt bei gleicher id und bei
   * Widerspruch (Global sagt "Prof. Dr." richtig, Auftrag sagt "Prof. Dr." falsch).
   */
  function mergeRules(globalRules, auftragRules) {
    const auftrag = auftragRules || [];
    const auftragFalsch = new Set();
    for (const r of auftrag) for (const v of r.falsch || []) auftragFalsch.add(lower(v));
    const out = new Map();
    for (const g of globalRules || []) {
      if (g.richtig && auftragFalsch.has(lower(g.richtig))) continue;
      out.set(g.id, g);
    }
    for (const a of auftrag) out.set(a.id, a);
    return Array.from(out.values());
  }

  /** Widersprüche innerhalb eines Regelsatzes (z. B. eine Form ist zugleich richtig und falsch). */
  function findConflicts(rules) {
    const conflicts = [];
    const byFalsch = new Map();
    for (const r of rules || []) {
      if (r.typ === 'regex' || r.typ === 'stil') continue;
      for (const v of r.falsch || []) {
        const k = lower(v);
        if (byFalsch.has(k) && lower(byFalsch.get(k).richtig) !== lower(r.richtig)) {
          conflicts.push({ art: 'doppelt', wert: v, regeln: [byFalsch.get(k).id, r.id] });
        }
        byFalsch.set(k, r);
      }
    }
    for (const r of rules || []) {
      const hit = r.richtig && byFalsch.get(lower(r.richtig));
      if (hit && hit.id !== r.id) {
        conflicts.push({ art: 'widerspruch', wert: r.richtig, regeln: [r.id, hit.id] });
      }
    }
    return conflicts;
  }

  /**
   * Datum in die Form des Satzanweisungs-Beispiels bringen: „12.03.2026“ + Beispiel „1. Januar 2014“ -> „12. März 2026“,
   * umgekehrt „12. März 2026“ + Beispiel „01.01.2014“ -> „12.03.2026“. Leer, wenn es kein passendes Datum ist.
   */
  const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const DATUM_LANG = /^(\d{1,2})\.\s?(\p{L}+)\s+(\d{4})$/u;
  const DATUM_KURZ = /^(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})$/;
  function datumUmrechnen(text, beispiel) {
    const t = String(text).trim().replace(/[\u00a0\u202f]/g, ' '), b = String(beispiel || '').trim().replace(/[\u00a0\u202f]/g, ' ');
    const zwei = (n, wie) => wie.length === 2 ? String(n).padStart(2, '0') : String(n);
    let m, bm;
    if ((bm = b.match(DATUM_LANG)) && MONATE.includes(bm[2]) && (m = t.match(DATUM_KURZ))) {
      const tag = +m[1], mon = +m[2];
      if (tag < 1 || tag > 31 || mon < 1 || mon > 12) return '';
      return zwei(tag, bm[1]) + '. ' + MONATE[mon - 1] + ' ' + m[3];
    }
    if ((bm = b.match(DATUM_KURZ)) && (m = t.match(DATUM_LANG))) {
      const mon = MONATE.findIndex(x => lower(x) === lower(m[2]));
      if (mon < 0 || +m[1] < 1 || +m[1] > 31) return '';
      return zwei(+m[1], bm[1]) + '.' + zwei(mon + 1, bm[2]) + '.' + m[3];
    }
    return '';
  }

  /** Eigene Blacklist (Zeilen „falsch“ oder „falsch → richtig“) -> Regeln. */
  function blacklistRules(zeilen) {
    const out = [];
    for (const z of zeilen || []) {
      const [falsch, richtig] = String(z).split(/\s*(?:→|->|=>)\s*/);
      if (!falsch || !falsch.trim()) continue;
      out.push({ id: 'blacklist-' + out.length, falsch: [falsch.trim()], richtig: (richtig || '').trim(), typ: 'exakt', case: false,
        ausnahmen: [], hinweis: richtig ? '' : 'Steht auf deiner Blacklist', quelle: 'Blacklist', schwere: 'blacklist' });
    }
    return out;
  }
  /** Whitelist-Zeilen -> Menge (klein geschrieben) für check({ whitelist }). */
  function whitelistSet(zeilen) {
    return new Set((zeilen || []).map(z => lower(String(z).trim().replace(/\s+/g, ' '))).filter(Boolean));
  }
  /**
   * Rechtschreibprüfung: welche Wörter muss das Wörterbuch prüfen? Bekannte Wörter (Satzanweisung, Whitelist) fallen weg,
   * bei Bindestrich-Wörtern („dbb-Chef“) nur die unbekannten Teile. Liefert [[Wort, Flags], …] (leer = richtig).
   */
  function rsAnfragen(w, flags, bekannt) {
    if (bekannt.has(lower(w))) return [];
    if (!w.includes('-')) return [[w, flags]];
    const teile = w.split('-').filter(Boolean);
    const rest = teile.filter(t => !bekannt.has(lower(t)));
    return rest.length === teile.length ? [[w, flags]] : rest.map((t, i) => [t, i || teile[0] !== t ? (flags | 1) & ~16 : flags]);
  }
  /**
   * Wörter eines Textes für die Rechtschreibprüfung, mit Kontext-Flags:
   * 1 = nach Ergänzungsstrich („-empfänger“), 2 = vor Ergänzungsstrich („Bezirks-“), 4 = Name (nach „Dr.“, „Herr“, „Foto:“ …),
   * 8 = Abkürzung („Dr.“, „Nr.“), 16 = Satzanfang. Liefert [{ s, e, w, flags }].
   */
  const RS_WORT = /(?<![\p{L}\p{N}])(-?)(\p{L}[\p{L}\p{M}'’-]*\p{L}|\p{L})(-?)(?![\p{L}\p{N}])/gu;
  const RS_TITEL = /^(?:Dr|Prof|Herr|Herrn|Frau|Foto|Fotos|Text|Texte|Autor|Autorin|Grafik|Illustration|Interview|Kontakt|Ansprechpartner|Ansprechpartnerin|von|van|zu)$/;
  function rsWoerter(text) {
    const out = [];
    let kette = 0;
    for (const m of String(text || '').matchAll(RS_WORT)) {
      const s = m.index + m[1].length, w = m[2], e = s + w.length;
      let flags = (m[1] ? 1 : 0) | (m[3] ? 2 : 0);
      const davor = text.slice(Math.max(0, s - 40), s);
      if (/(^|[.!?:…]\s+|^\s*|[„"»«(]\s*)$/.test(davor) && !/(^|\s)(?:Dr|Prof|Nr|Abs|ca|bzw|vgl|z\.\s?B|u\.\s?a)\.\s*$/.test(davor)) flags |= 16;
      if (text[e] === '.' && (w.length <= 3 || /^(?:Prof|Abs|bzw|ggf|vgl|Tel|Str|usw|inkl|zzgl|evtl|Mio|Mrd|Jhd|Jh)$/.test(w))) flags |= 8;
      if (kette > 0 && /^\p{Lu}/u.test(w)) { flags |= 4; kette--; } else kette = 0;
      if (RS_TITEL.test(w)) kette = 3;
      out.push({ s, e, w, flags });
    }
    return out;
  }
  /** Satzanweisungs-Wörter (dbb, komba, ver.di …) als „bekannt“ für die Rechtschreibprüfung */
  function regelWoerter(rules) {
    return new Set((rules || []).flatMap(r => [r.richtig].concat(r.erlaubt || []))
      .flatMap(x => { const l = lower(x); return [l].concat(l.split(/[\s\-/]+/)); }).filter(Boolean));
  }
  /** Farbgruppe eines Treffers: fehler (rot) | hinweis (gelb) | rechtschreibung | blacklist | ki */
  function kategorie(h) {
    if (h.ki) return 'ki';   // Ergebnis von „Mit KI prüfen“: eigene Farbe (lila)
    if (h.schwere === 'rechtschreibung' || h.schwere === 'blacklist' || h.schwere === 'hinweis') return h.schwere;
    return 'fehler';
  }

  // Version des Word-Lesers (= Satzanweisung.VERSION): Regeln eines älteren Lesers im Zwischenspeicher von Plugin/Add-in gelten als veraltet
  const LESER_VERSION = 4;

  const api = { LESER_VERSION, escapeRe, baustein, pdfText, compileRule, compile, check, checkNormalized, normalize, mergeRules, findConflicts, hitKey,
    blacklistRules, whitelistSet, kategorie, rsAnfragen, regelWoerter, rsWoerter, datumUmrechnen };
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.KorrekturEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);

// DE/EN wie im Export-Formular
(function (root) {
  const T = {
    de: {
      title: 'Lektorat', loginTitle: 'Anmeldung', loginSub: 'Bitte mit deinem FDS-Konto anmelden.',
      loginEmail: 'E-Mail', loginPass: 'Passwort', loginBtn: 'Anmelden', forgot: 'Passwort vergessen?',
      loginFail: 'Anmeldung fehlgeschlagen. E-Mail/Passwort prüfen.',
      forgotNoMail: 'Bitte zuerst deine E-Mail-Adresse eintragen.',
      forgotSent: 'Wenn ein Konto zu dieser E-Mail existiert, wurde eine E-Mail zum Zurücksetzen verschickt.',
      noPerm: 'Dein Konto ist für dieses Tool nicht freigeschaltet. Bitte an einen Administrator wenden.',
      auftrag: 'Auftrag', chooseAuftrag: '– Auftrag wählen –', check: 'Seite prüfen', live: 'Beim Tippen mitprüfen',
      rulesInfo: '%n Regeln · Version %v', rulesGlobal: ' (+ Hausregeln v%g)', rulesOffline: ' · offline (zwischengespeichert)',
      noRules: 'Für diesen Auftrag sind noch keine Regeln freigegeben.',
      checking: 'Prüfe …', done: '%n Stellen gefunden.', done1: '1 Stelle gefunden.', clean: 'Keine Verstöße gefunden.',
      noTab: 'Kein prüfbarer Tab aktiv.', permText: 'Für diese Seite fehlt die Freigabe.', permBtn: 'Diese Seite erlauben',
      fehler: 'Fehler', hinweise: 'Hinweise', ki: 'KI', ignore: 'Ignorieren', copy: 'Kopieren', copied: 'Kopiert',
      white: 'Whitelist', whiteTip: 'Dieses Wort nie mehr anstreichen (Einstellungen → Whitelist)',
      replace: 'Ersetzen', replaceTip: 'Im Text durch die richtige Form ersetzen (Strg+Z macht es rückgängig)',
      replaceAll: 'Alle %n sicheren Stellen ersetzen', replaceConfirm: '%n Stellen nach der Satzanweisung/Blacklist im Editor ersetzen?\n\nRechtschreibung und KI-Hinweise werden nicht automatisch ersetzt. Rückgängig im Editor mit Strg+Z.',
      replaced: '%n Stellen ersetzt.', replaceKopiert: '„%s“ ist in der Zwischenablage – bitte in die Stelle klicken und mit Strg+V einfügen.', replaceFail: 'Ersetzen nicht möglich – die Stelle liegt nicht im Editor.',
      saErst: 'Bitte zuerst oben eine Satzanweisung wählen – die Listen gehören zur Satzanweisung.', umGrossTip: 'Größer / kleiner',
      rsOffline: 'Rechtschreibung offline geprüft', updateText: 'Neue Version %n verfügbar – du nutzt noch %a.', updateLink: 'Jetzt herunterladen',
      saGespeichert: 'In Teams gespeichert ✓', saNichtGefunden: '„%s“ stand nicht (mehr) in der Liste in Teams – Liste neu geladen.',
      saFehler: 'Liste konnte nicht in Teams gespeichert werden: %s – Änderung zurückgenommen.',
      undoTeilweise: 'Nicht jede Stelle wurde wiedergefunden (Text inzwischen geändert?).',
      undoTip: 'Rückgängig: %s', redoTip: 'Wiederholen: %s', undoLeer: 'Nichts zum Rückgängigmachen', redoLeer: 'Nichts zum Wiederholen',
      saListen: 'Whitelist / Blacklist dieser Satzanweisung', saWortPh: 'Wort (Blacklist auch „falsch → richtig“)', entfernen: 'Entfernen',
      saListeNeu: 'Noch keine Liste – wird beim ersten Eintrag in Teams angelegt (%d)', saSpeichert: 'Speichere in Teams …',
      anzeigen: 'Markierungen im Text anzeigen',
      rsLimit: 'LanguageTool gerade nicht verfügbar (Limit) – Rechtschreibung nur offline geprüft, ohne Grammatik. Gleich noch einmal prüfen.',
      kiRegelnFehlen: 'Beim Einlesen war die KI nicht erreichbar, die KI-Hinweise (gelb) fehlen. Sie werden automatisch nachgeholt – bitte später neu auswählen. (%s)',
      kiTeil: 'KI prüft Teil %i von %n …', kiLimit: 'KI ist gerade ausgelastet – neuer Versuch in ein paar Sekunden …',
      findPdfTip: 'Sucht PDFs, die in der aktuellen Seite eingebettet oder verlinkt sind (z. B. die PDF-Vorschau in WoodWing), und öffnet sie im PDF-Checker',
      geprueft: '(%z Zeichen geprüft)', keinText: 'Auf dieser Seite wurde kein Text gefunden. Bitte ins Artikelfenster klicken und erneut prüfen. Diagnose: %d',
      umErgebnisTitel: 'Vorschlag der KI – Änderungen markiert:', umBearbeiten: 'Bearbeiten', umFertig: 'Fertig',
      umTitle: 'Text umschreiben', umSub: 'Text im Editor markieren, dann wählen, was die KI damit machen soll.', umLeer: 'Noch nichts markiert.',
      umKuerzen: 'Kürzen', umVerlaengern: 'Verlängern', umUmformulieren: 'Umformulieren', umEinfach: 'Einfacher', umSachlich: 'Sachlicher',
      umJournalistisch: 'Lebendiger', umLocker: 'Lockerer', umKorrigieren: 'Nur korrigieren', umUeberschrift: 'Überschrift',
      umFreiPh: 'Eigene Anweisung, z. B. „in drei Sätzen“', umLos: 'Los', umUebernehmen: 'Übernehmen', umVerwerfen: 'Verwerfen',
      umLaeuft: 'KI schreibt um …', umNichts: 'Bitte zuerst Text im Editor markieren.', umAnweisungFehlt: 'Bitte eine Anweisung eingeben.',
      umUebernommen: 'Übernommen – rückgängig im Editor mit Strg+Z.', umKopiert: 'Konnte nicht direkt eingesetzt werden – Text ist kopiert, bitte mit Strg+V einfügen.',
      umNurKopieren: 'Die Markierung liegt nicht im Editor – Ergebnis bitte kopieren.',
      kiTitle: 'KI-Prüfung', kiBtn: 'Mit KI prüfen', kiRunning: 'KI prüft … (bis zu einer Minute)',
      kiDone: '%n KI-Hinweise.', kiNone: 'Die KI hat keine weiteren Verstöße gefunden.', kiTrunc: ' (nur der Anfang der Seite wurde geprüft)',
      kiSub: 'Prüft Stil-Hinweise und Beugungsformen, die keine feste Regel abdeckt. Der Seitentext wird dafür an die KI gesendet.',
      findPdf: 'PDFs auf der Seite', openViewer: 'PDF-Datei öffnen', noPdf: 'Kein PDF auf dieser Seite gefunden.',
      logout: 'Abmelden', source: 'Quelle', ruleErr: 'Fehlerhafte Regel übersprungen: %s',
      noAuftraege: 'Dir ist noch kein Auftrag zugewiesen. Bitte bei deinem Ansprechpartner bei FDS melden.',
    },
    en: {
      title: 'Proofreading', loginTitle: 'Sign in', loginSub: 'Please sign in with your FDS account.',
      loginEmail: 'Email', loginPass: 'Password', loginBtn: 'Sign in', forgot: 'Forgot password?',
      loginFail: 'Sign-in failed. Check email/password.',
      forgotNoMail: 'Please enter your email address first.',
      forgotSent: 'If an account exists for this email, a reset link has been sent.',
      noPerm: 'Your account is not authorised for this tool. Please contact an administrator.',
      auftrag: 'Client job', chooseAuftrag: '– Select job –', check: 'Check page', live: 'Check while typing',
      rulesInfo: '%n rules · version %v', rulesGlobal: ' (+ house rules v%g)', rulesOffline: ' · offline (cached)',
      noRules: 'No approved rules for this job yet.',
      checking: 'Checking …', done: '%n issues found.', done1: '1 issue found.', clean: 'No issues found.',
      noTab: 'No checkable tab active.', permText: 'This site is not yet allowed.', permBtn: 'Allow this site',
      fehler: 'Errors', hinweise: 'Notes', ki: 'AI', ignore: 'Ignore', copy: 'Copy', copied: 'Copied',
      white: 'Whitelist', whiteTip: 'Never mark this word again (Settings → Whitelist)',
      replace: 'Replace', replaceTip: 'Replace with the correct form (Ctrl+Z to undo)',
      replaceAll: 'Replace all %n safe matches', replaceConfirm: 'Replace %n matches (style guide/blacklist) in the editor?\n\nSpelling and AI notes are not replaced automatically. Undo in the editor with Ctrl+Z.',
      replaced: '%n replaced.', replaceKopiert: '“%s” copied – click into the text and paste with Ctrl+V.', replaceFail: 'Cannot replace – the match is not inside the editor.',
      saErst: 'Please choose a style guide first – the lists belong to the style guide.', umGrossTip: 'Larger / smaller',
      rsOffline: 'spelling checked offline', updateText: 'New version %n available – you are using %a.', updateLink: 'Download now',
      saGespeichert: 'Saved to Teams ✓', saNichtGefunden: '“%s” was not (or no longer) in the list in Teams – list reloaded.',
      saFehler: 'List could not be saved to Teams: %s – change reverted.',
      undoTeilweise: 'Not every match could be found again (text changed meanwhile?).',
      undoTip: 'Undo: %s', redoTip: 'Redo: %s', undoLeer: 'Nothing to undo', redoLeer: 'Nothing to redo',
      saListen: 'Whitelist / blacklist of this style guide', saWortPh: 'Word (blacklist also “wrong → right”)', entfernen: 'Remove',
      saListeNeu: 'No list yet – created in Teams with the first entry (%d)', saSpeichert: 'Saving to Teams …',
      anzeigen: 'Show marks in the text',
      rsLimit: 'LanguageTool currently unavailable (limit) – spelling checked offline only, without grammar. Check again shortly.',
      kiRegelnFehlen: 'The AI was unavailable while reading; the AI notes (yellow) are missing. They will be added automatically – please re-select later. (%s)',
      kiTeil: 'AI is checking part %i of %n …', kiLimit: 'AI is busy – retrying in a few seconds …',
      findPdfTip: 'Finds PDFs embedded or linked in the current page (e.g. the WoodWing PDF preview) and opens them in the PDF checker',
      geprueft: '(%z characters checked)', keinText: 'No text found on this page. Click into the article and check again. Diagnostics: %d',
      umErgebnisTitel: 'AI suggestion – changes highlighted:', umBearbeiten: 'Edit', umFertig: 'Done',
      umTitle: 'Rewrite text', umSub: 'Select text in the editor, then choose what the AI should do with it.', umLeer: 'Nothing selected yet.',
      umKuerzen: 'Shorten', umVerlaengern: 'Lengthen', umUmformulieren: 'Rephrase', umEinfach: 'Simpler', umSachlich: 'More neutral',
      umJournalistisch: 'More lively', umLocker: 'More casual', umKorrigieren: 'Correct only', umUeberschrift: 'Headline',
      umFreiPh: 'Own instruction, e.g. “in three sentences”', umLos: 'Go', umUebernehmen: 'Apply', umVerwerfen: 'Discard',
      umLaeuft: 'AI is rewriting …', umNichts: 'Please select text in the editor first.', umAnweisungFehlt: 'Please enter an instruction.',
      umUebernommen: 'Applied – undo in the editor with Ctrl+Z.', umKopiert: 'Could not insert directly – text copied, please paste with Ctrl+V.',
      umNurKopieren: 'The selection is not inside the editor – please copy the result.',
      kiTitle: 'AI check', kiBtn: 'Check with AI', kiRunning: 'AI is checking … (up to a minute)',
      kiDone: '%n AI notes.', kiNone: 'The AI found no further issues.', kiTrunc: ' (only the beginning of the page was checked)',
      kiSub: 'Checks style notes and inflected forms not covered by a fixed rule. The page text is sent to the AI.',
      findPdf: 'PDFs on page', openViewer: 'Open PDF file', noPdf: 'No PDF found on this page.',
      logout: 'Sign out', source: 'Source', ruleErr: 'Invalid rule skipped: %s',
      noAuftraege: 'No job has been assigned to you yet. Please contact your FDS contact person.',
    },
  };
  let lang = 'de';
  root.I18n = {
    async init() {
      try { lang = (await chrome.storage.local.get('fds_lang')).fds_lang || 'de'; } catch (e) { /* */ }
      this.apply();
    },
    t(k, vars) {
      let s = (T[lang] && T[lang][k]) || T.de[k] || k;
      for (const [n, v] of Object.entries(vars || {})) s = s.split('%' + n).join(v);
      return s;
    },
    set(l) { lang = l; chrome.storage.local.set({ fds_lang: l }); this.apply(); },
    get lang() { return lang; },
    apply() {
      document.documentElement.lang = lang;
      for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = this.t(el.dataset.i18n);
      for (const el of document.querySelectorAll('[data-i18n-placeholder]')) el.placeholder = this.t(el.dataset.i18nPlaceholder);
      for (const el of document.querySelectorAll('[data-i18n-title]')) el.title = this.t(el.dataset.i18nTitle);
      if (root.Uebersetzung) root.Uebersetzung.aktiv(lang);   // alle übrigen festen Texte
      const de = document.getElementById('de'), en = document.getElementById('en');
      if (de) de.className = lang === 'de' ? 'active' : '';
      if (en) en.className = lang === 'en' ? 'active' : '';
      document.dispatchEvent(new Event('langchange'));
    },
  };
})(globalThis);

// Englische Oberfläche: Übersetzung aller festen deutschen Texte (Panel, PDF-Viewer, Einstellungen).
// Schlüssel = deutscher Text (getrimmt). Endet ein Schlüssel auf „: “, „ (“ oder „ “, passt er auch als Anfang (Text mit Zusatz).
// Inhalte (Treffer, markierter Text, Satzanweisungs-Hinweise) werden nie übersetzt: Container mit data-no-tr.
(function (root) {
  const EN = {
    'FDS Lektorat': 'FDS Proofreading',
    'Satzanweisung': 'Style guide',
    'aktualisieren': 'refresh',
    'Liste aus SharePoint neu laden': 'Reload list from Teams',
    'Regeln': 'Rules',
    'Regeln anzeigen': 'Show rules',
    'Regeln anzeigen (': 'Show rules (',
    'Häkchen entfernen = diese Regel für dich ausschalten.': 'Untick = switch this rule off for you.',
    'Erneut versuchen': 'Try again',
    'Seite erneut prüfen': 'Check page again',
    'PDF-Checker': 'PDF checker',
    'Satzanweisung wählen, PDF hineinziehen, kommentiertes PDF herunterladen.': 'Choose style guide, drop in the PDF, download the annotated PDF.',
    'PDF prüfen': 'Check PDF',
    'Einstellungen': 'Settings',
    'Lektorat · PDF · FDS': 'Proofreading · PDF · FDS',
    'PDF hierher ziehen': 'Drop PDF here',
    'oder klicken, um eine Datei zu wählen': 'or click to choose a file',
    '1 · Satzanweisung': '1 · Style guide',
    'Dieses PDF enthält (fast) keinen Text – vermutlich ein Scan. Es muss vorher per OCR in durchsuchbaren Text umgewandelt werden.':
      'This PDF contains (almost) no text – probably a scan. Run OCR first to make the text searchable.',
    'Bitte zuerst im Lektorat-Plugin (Klick auf das Symbol in der Chrome-Leiste) mit dem FDS-Konto anmelden.':
      'Please sign in with your FDS account in the plugin first (click the icon in the Chrome toolbar).',
    'links hineinziehen oder anklicken.': 'drop on the left or click.',
    '3 · Ergebnis': '3 · Result',
    'als kommentiertes PDF herunterladen.': 'download as annotated PDF.',
    'Kommentiertes PDF herunterladen': 'Download annotated PDF',
    'Einstellungen · FDS Lektorat': 'Settings · FDS Proofreading',
    'Lektorat ·': 'Proofreading ·',
    'Willkommen': 'Welcome',
    'Das Plugin ist installiert. So startest du:': 'The plugin is installed. To get started:',
    'Oben rechts in Chrome auf das': 'In the top right of Chrome, click the',
    'Puzzle-Symbol': 'puzzle icon',
    'klicken und': 'and',
    '„FDS Lektorat“ anpinnen': 'pin “FDS Lektorat”',
    'Einen Artikel in': 'Open an article in',
    'öffnen und auf das grüne Lektorat-Symbol klicken.': 'and click the green proofreading icon.',
    'Mit dem': 'Sign in with the',
    'FDS-Konto': 'FDS account',
    'anmelden, das du von FDS bekommen hast. Passwort vergessen? Im Plugin auf „Passwort vergessen?“ klicken.':
      'you received from FDS. Forgot your password? Click “Forgot password?” in the plugin.',
    'Im Plugin die': 'In the plugin, choose the',
    'Satzanweisung (Kürzel)': 'style guide (short name)',
    'wählen – Fehler werden sofort rot unterstrichen. Stelle anklicken: Das Plugin zeigt die richtige Schreibweise.':
      '– issues are underlined immediately. Click a match to see the correct spelling.',
    'PDF-Checker:': 'PDF checker:',
    'im Plugin „PDF prüfen“ → Satzanweisung wählen → PDF hineinziehen → kommentiertes PDF herunterladen.':
      'in the plugin “Check PDF” → choose style guide → drop in the PDF → download the annotated PDF.',
    'Konto': 'Account',
    'Verbindung testen': 'Test connection',
    'Abmelden': 'Sign out',
    'Darstellung der Fundstellen': 'How matches are shown',
    'Nur unterstreichen': 'Underline only',
    'Wie die Markierungen im WoodWing-Editor – stört beim Lesen am wenigsten.': 'Like the marks in the WoodWing editor – least distracting.',
    'Unterstreichen und farbig hinterlegen': 'Underline and highlight',
    'Fällt stärker auf, gut für lange Texte.': 'More visible, good for long texts.',
    'Farben': 'Colours',
    'So wird angestrichen – im Browser, im PDF-Viewer und im kommentierten PDF.': 'How matches are marked – in the browser, the PDF viewer and the annotated PDF.',
    'Rot': 'Red',
    '– Rechtschreibung (Wörterbuch)': '– spelling (dictionary)',
    'Blau': 'Blue',
    '– Fehler laut Satzanweisung': '– error according to the style guide',
    'Grün': 'Green',
    '– deine Blacklist (Wörter der Whitelist werden nie angestrichen)': '– your blacklist (whitelist words are never marked)',
    'Gelb': 'Yellow',
    '– KI-Hinweis, bitte prüfen': '– AI note, please check',
    '– KI-Hinweis aus der Satzanweisung, bitte prüfen': '– AI note from the style guide, please check',
    'Lila': 'Purple',
    '(gestrichelt) – Ergebnis von „Mit KI prüfen“': '(dashed) – result of “Check with AI”',
    'Prüfen': 'Checking',
    'Allgemeine Rechtschreibprüfung': 'General spell check',
    'Zusätzlich zur Satzanweisung: Tippfehler mit deutschem Wörterbuch finden. Läuft komplett im Plugin – der Text verlässt den Rechner nicht. Wörter aus der Satzanweisung und der Whitelist gelten als richtig.':
      'In addition to the style guide: find typos with a German dictionary. Runs entirely in the plugin – the text never leaves your computer. Words from the style guide and the whitelist count as correct.',
    'Nur den Text im Editor prüfen': 'Check only the text in the editor',
    'Menüs, Listen und Paletten von WoodWing werden nicht angestrichen – nur der Artikeltext, in dem man schreiben kann. Ausschalten, um normale Webseiten zu prüfen.':
      'WoodWing menus, lists and panels are not marked – only the editable article text. Switch off to check normal web pages.',
    'Eigene Rechtschreib-Markierungen des Browsers im Editor ausblenden': 'Hide the browser’s own spelling marks in the editor',
    'Chrome unterstreicht sonst zusätzlich Wörter wie „dbb“ rot gepunktet. Solange das Lektorat aktiv ist, zeigt nur das Plugin Fehler an.':
      'Otherwise Chrome also underlines words like “dbb” with red dots. While proofreading is active, only the plugin shows issues.',
    'Beim Tippen automatisch mitprüfen': 'Check automatically while typing',
    'Markierungen werden nach jeder Änderung im Editor aktualisiert.': 'Marks are updated after every change in the editor.',
    'Tastenkürzel': 'Keyboard shortcuts',
    'Nächster / voriger Treffer: Alt+Shift+N / Alt+Shift+B': 'Next / previous match: Alt+Shift+N / Alt+Shift+B',
    'Ändern': 'Change',
    'Wörter, die': 'Words that are',
    'nie': 'never',
    'angestrichen werden (Namen, Marken, Fachbegriffe). Ein Wort pro Zeile. Groß-/Kleinschreibung egal. Schneller: im Plugin oder im Tooltip auf „Whitelist“ klicken.':
      'marked (names, brands, technical terms). One word per line, case-insensitive. Quicker: click “Whitelist” in the plugin or the tooltip.',
    'immer': 'always',
    'angestrichen werden – zusätzlich zur Satzanweisung. Eine pro Zeile, optional mit richtiger Form:':
      'marked – in addition to the style guide. One per line, optionally with the correct form:',
    'falsch → richtig': 'wrong → right',
    '(oder': '(or',
    'Hilfe': 'Help',
    'Anleitung': 'Guide',
    'Lektorat-Seite': 'Proofreading page',
    'Datenschutz': 'Privacy',
    'Datenschutzerklärung': 'Privacy policy',
    'Gespeichert': 'Saved',
    'Lade Satzanweisungen …': 'Loading style guides …',
    'In Teams wurde keine Satzanweisung gefunden.': 'No style guide found in Teams.',
    '– Satzanweisung wählen –': '– Choose style guide –',
    'Die Satzanweisung wird gelesen und ausgewertet … (beim ersten Mal 1–3 Minuten, ': 'Reading and analysing the style guide … (1–3 minutes the first time, ',
    'Lade Regeln …': 'Loading rules …',
    'Offline – zwischengespeicherte Regeln.': 'Offline – cached rules.',
    'In der Satzanweisung wurden keine prüfbaren Regeln gefunden.': 'No checkable rules found in the style guide.',
    'Alle Anweisungen der Satzanweisung zum Nachlesen (': 'All instructions of the style guide for reference (',
    'Bitte zuerst eine Satzanweisung wählen.': 'Please choose a style guide first.',
    'Bitte oben eine Satzanweisung wählen.': 'Please choose a style guide above.',
    'PDF wird geladen …': 'Loading PDF …',
    'PDF konnte nicht aus der Seite gelesen werden.': 'Could not read the PDF from the page.',
    'PDF konnte nicht geladen werden: ': 'Could not load PDF: ',
    'Text wird gelesen …': 'Reading text …',
    'Rechtschreibprüfung nicht verfügbar: ': 'Spell check not available: ',
    'Nicht im Wörterbuch': 'Not in dictionary',
    'Rechtschreibung (Wörterbuch)': 'Spelling (dictionary)',
    'Rechtschreibung wird geprüft …': 'Checking spelling …',
    'Jetzt das PDF links hineinziehen.': 'Now drop the PDF on the left.',
    'FDS-Konto: nicht angemeldet – zum Anmelden auf das Lektorat-Symbol in der Chrome-Leiste klicken.': 'FDS account: not signed in – click the proofreading icon in the Chrome toolbar to sign in.',
    'FDS-Konto: ': 'FDS account: ',
    'Prüfe …': 'Checking …',
    'Server erreichbar? Bitte zuerst anmelden.': 'Please sign in first.',
    'Angemeldet, aber das Konto ist nicht für das Lektorat freigeschaltet.': 'Signed in, but the account is not enabled for proofreading.',
    'Verbunden, aber in Teams wurde keine Satzanweisung gefunden.': 'Connected, but no style guide was found in Teams.',
    'Keine Verbindung. Internet/Firewall prüfen.': 'No connection. Check internet/firewall.',
    'Alles in Ordnung – ': 'All good – ',
    'Lade Regeln … (beim ersten Mal wird die Satzanweisung gelesen, bis zu 1 Minute)': 'Loading rules …',
    'Vorschläge: ': 'Suggestions: ',
    'Steht auf deiner Blacklist': 'On your blacklist',
    'Quelle: ': 'Source: ',
    'Zur Whitelist': 'Add to whitelist',
    'Ersetzen': 'Replace',
    'Einsetzen': 'Insert',
    'Im Text ersetzen': 'Replace in text',
    'Dieses Wort nie mehr anstreichen': 'Never mark this word again',
    'Keine Verbindung zum Server.': 'No connection to the server.',
    'Bitte anmelden.': 'Please sign in.',
    'Der Server hat nicht rechtzeitig geantwortet (HTTP ': 'The server did not respond in time (HTTP ',
    'Die Satzanweisung wird noch gelesen – bitte in ein paar Minuten noch einmal auswählen.': 'The style guide is still being read – please choose it again in a few minutes.',
    'feste Regeln, ': 'fixed rules, ',
    ' KI-Hinweise': ' AI notes',
    'Version': 'Version',
    'Whitelist / Blacklist': 'Whitelist / blacklist',
    'Jede Satzanweisung hat ihre eigene Whitelist und Blacklist. Sie liegt in Teams neben der Word-Datei und gilt für alle Lektoren. Bearbeiten: im Plugin unter „Regeln“ oder per Klick auf „Whitelist“ bei einer Fundstelle.':
      'Each style guide has its own whitelist and blacklist. It is stored in Teams next to the Word file and applies to all proofreaders. Edit it in the plugin under “Rules” or click “Whitelist” on a match.',
    'Umschreib-Anweisungen (für alle)': 'Rewrite instructions (shared)',
    '+ Anweisung': '+ Instruction',
    'In Teams speichern': 'Save to Teams',
    'Bitte zuerst im Plugin anmelden.': 'Please sign in in the plugin first.',
    'Lade aus Teams …': 'Loading from Teams …',
    'Noch keine eigene Liste – das sind die Standard-Anweisungen.': 'No custom list yet – these are the default instructions.',
    'Speichere in Teams …': 'Saving to Teams …',
    'Gespeichert – gilt jetzt für alle.': 'Saved – now applies to everyone.',
    'Die Knöpfe unter „Text umschreiben“. Name = Beschriftung, Anweisung = was die KI tun soll. Gespeichert in Teams (': 'The buttons under “Rewrite text”. Name = label, instruction = what the AI should do. Stored in Teams (',
    ') – alle Lektoren sehen dieselben.': ') – all proofreaders see the same.',
  };
  const PRAEFIXE = Object.keys(EN).filter(k => /[:( ]$/.test(k)).sort((a, b) => b.length - a.length);

  /** deutschen Text ins Englische (nur wenn Englisch eingestellt); unbekannte Texte bleiben wie sie sind */
  function tr(text, lang) {
    if (lang !== 'en' || !text) return text;
    const t = String(text);
    const kern = t.replace(/\s+/g, ' ').trim();              // Zeilenumbrüche im HTML zählen nicht
    const rand = (/^\s/.test(t) ? ' ' : '') + '%' + (/\s$/.test(t) ? ' ' : '');
    if (EN[kern]) return rand.replace('%', EN[kern]);
    for (const p of PRAEFIXE) if (kern.startsWith(p)) return rand.replace('%', EN[p] + kern.slice(p.length));
    return t;
  }

  const original = new WeakMap();   // Knoten -> deutscher Originaltext
  const ATTR = ['title', 'placeholder', 'aria-label'];
  function uebersetzeBaum(wurzel, lang) {
    if (!wurzel) return;
    const walker = document.createTreeWalker(wurzel, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: n => n.nodeType === 1 && (n.closest('[data-no-tr]') || /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.tagName)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    for (let n = walker.currentNode; n; n = walker.nextNode()) {
      if (n.nodeType === 3) {
        if (!n.data.trim() || (n.parentElement && n.parentElement.hasAttribute('data-i18n'))) continue;
        if (!original.has(n)) original.set(n, n.data);
        const neu = lang === 'en' ? tr(original.get(n), 'en') : original.get(n);
        if (n.data !== neu) n.data = neu;
      } else if (n.nodeType === 1) {
        for (const a of ATTR) {
          if (!n.hasAttribute(a) || n.hasAttribute('data-i18n-' + a)) continue;
          const key = 'tr' + a.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, c => c.toUpperCase());   // trTitle, trAriaLabel
          if (!n.dataset[key]) n.dataset[key] = n.getAttribute(a);
          n.setAttribute(a, lang === 'en' ? tr(n.dataset[key], 'en') : n.dataset[key]);
        }
      }
    }
  }
  let beobachter = null;
  function aktiv(lang) {
    uebersetzeBaum(document.body, lang);
    if (document.title) { if (!original.has(document)) original.set(document, document.title); document.title = lang === 'en' ? tr(original.get(document), 'en') : original.get(document); }
    if (beobachter) beobachter.disconnect();
    if (lang !== 'en') return;
    // später eingefügte Texte (Statusmeldungen, Listen) ebenfalls übersetzen
    beobachter = new MutationObserver(muts => {
      beobachter.disconnect();
      for (const m of muts) {
        if (m.type === 'characterData') { original.delete(m.target); uebersetzeBaum(m.target.parentElement, 'en'); }
        for (const n of m.addedNodes) uebersetzeBaum(n.nodeType === 3 ? n.parentElement : n, 'en');
      }
      beobachter.observe(document.body, { subtree: true, childList: true, characterData: true });
    });
    beobachter.observe(document.body, { subtree: true, childList: true, characterData: true });
  }
  root.Uebersetzung = { tr, aktiv, EN };
})(globalThis);

/* FDS Lektorat für Microsoft Word – Aufgabenbereich (gleicher Aufbau wie die Seitenleiste des Chrome-Plugins).
 * Gleiche Daten wie das Chrome-Plugin (FDS-Konto, Satzanweisungen und Listen in Teams, n8n-Workflow „Lektorat“).
 * Spar-Regeln (n8n-Ausführungen und Claude-Tokens):
 *  – Liste, Regeln, Listen und Umschreib-Anweisungen werden zwischengespeichert; Öffnen kostet meist 0 Ausführungen
 *  – Regeln werden nur neu geholt, wenn sich die Word-Datei der Satzanweisung geändert hat
 *  – beim ersten Einlesen wird mit wachsendem Abstand nachgefragt
 *  – KI-Prüfung über „ki-spar“: größere Textstücke + Prompt-Caching auf dem Server
 */
/* global Office, Word, I18n, Uebersetzung */
(function () {
  'use strict';
  const CFG = { supa: 'https://embgcxwzupnizkinrpdc.supabase.co', key: 'sb_publishable_iyaxPiYADN0tegVHfQ7f2Q_ATplW2r0', api: 'https://embgcxwzupnizkinrpdc.supabase.co/functions/v1/lektorat' };
  const E = window.KorrekturEngine;
  const $ = id => document.getElementById(id);
  const t = (k, v) => I18n.t(k, v);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pause = ms => new Promise(r => setTimeout(r, ms));
  const MIN = 60e3, STUNDE = 60 * MIN;

  const speicher = {
    get(k, d) { try { const v = localStorage.getItem('fdslw_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('fdslw_' + k, JSON.stringify(v)); } catch (e) { /* voll/gesperrt */ } },
    del(k) { try { localStorage.removeItem('fdslw_' + k); } catch (e) { /* */ } },
  };

  // Feste Farben wie im Chrome-Plugin (lib/settings.js)
  const FARBEN = { rechtschreibung: '#e0301e', fehler: '#1e6fd9', blacklist: '#2e9d3a', hinweis: '#c88a00', ki: '#8e24aa' };
  const KRITIK = { rechtschreibung: 'Red', fehler: 'Blue', blacklist: 'Green', hinweis: 'Berry', ki: 'Lavender' };
  const ARTEN = [['fehler', 'Satzanweisung', 'Style guide'], ['hinweis', 'Hinweise', 'Notes'], ['rechtschreibung', 'Rechtschreibung', 'Spelling'],
    ['blacklist', 'Blacklist', 'Blacklist'], ['ki', 'KI-Prüfung', 'AI check']];
  const artName = k => { const a = ARTEN.find(x => x[0] === k) || [k, k, k]; return I18n.lang === 'en' ? a[2] : a[1]; };
  const STANDARD_VORLAGEN = [
    { id: 'kuerzen', name: 'Kürzen', prompt: 'Kürze den Text deutlich (etwa um ein Drittel), ohne Inhalt, Fakten, Namen oder Zahlen zu verlieren.' },
    { id: 'umformulieren', name: 'Umformulieren', prompt: 'Formuliere den Text um: gleicher Inhalt, gleiche Länge, flüssigere Sätze.' },
    { id: 'korrigieren', name: 'Nur korrigieren', prompt: 'Korrigiere nur Rechtschreibung, Grammatik und Zeichensetzung. Ändere sonst nichts.' },
  ];
  // Word-eigene Texte für die englische Oberfläche
  Object.assign(Uebersetzung.EN, {
    'Dokument prüfen': 'Check document', 'Einstellungen': 'Settings', 'Rechtschreibung & Grammatik (LanguageTool)': 'Spelling & grammar (LanguageTool)',
    'Ersetzungen als Änderungen nachverfolgen': 'Track replacements as changes',
    'Text im Dokument markieren, dann wählen, was die KI damit machen soll.': 'Select text in the document, then choose what the AI should do with it.',
    'Prüft Stil-Hinweise und Beugungsformen, die keine feste Regel abdeckt. Der Text des Dokuments wird dafür an die KI gesendet.':
      'Checks style notes and inflected forms not covered by a fixed rule. The document text is sent to the AI.',
    'Vorherige Stelle': 'Previous match', 'Nächste Stelle': 'Next match', 'Bitte zuerst Text im Dokument markieren.': 'Please select text in the document first.',
  });

  const S = {
    session: speicher.get('sitzung', null), liste: [], ki: false, umschreiben: true, lt: null,
    auswahl: null, regeln: null, frisch: false, listen: { whitelist: [], blacklist: [] }, vorlagen: null,
    absaetze: [], treffer: [], kiTreffer: [], ignore: new Set(), current: -1, annoMap: new Map(),
    verlauf: [], vor: [], um: { auswahl: null, range: null, ergebnis: '' },
    opt: Object.assign({ lt: true, nachverfolgen: false, anzeigen: true, live: false }, speicher.get('optionen', {})),
  };

  // ---------------------------------------------------------------- Status / Rädchen
  function setStatus(el, text, cls) {
    el.textContent = text || ''; el.className = 'status ' + (cls || '');
    const laeuft = Array.from(document.querySelectorAll('.status.load')).find(x => x.textContent);
    $('busy').classList.toggle('hidden', !laeuft);
    $('busyText').textContent = laeuft ? laeuft.textContent : '';
  }
  const show = (id, an) => $(id).classList.toggle('hidden', !an);
  async function kopieren(text) {
    try { await navigator.clipboard.writeText(text); return; } catch (e) { /* in Word oft gesperrt */ }
    const ta = document.createElement('textarea'); ta.value = text; document.body.append(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* */ } ta.remove();
  }

  // ---------------------------------------------------------------- FDS-Konto (Supabase)
  async function supa(pfad, init) {
    const r = await fetch(CFG.supa + pfad, init);
    let j = null; try { j = await r.json(); } catch (e) { /* leer */ }
    if (!r.ok) throw new Error((j && (j.msg || j.error_description || j.message || j.error)) || ('HTTP ' + r.status));
    return j;
  }
  function sitzung(d) {
    S.session = { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: Date.now() + d.expires_in * 1000,
      email: (d.user && d.user.email) || (S.session && S.session.email) || '' };
    speicher.set('sitzung', S.session);
  }
  async function token() {
    if (!S.session) throw Object.assign(new Error('Bitte anmelden.'), { status: 401 });
    if (S.session.expires_at - MIN > Date.now()) return S.session.access_token;
    const d = await supa('/auth/v1/token?grant_type=refresh_token', { method: 'POST',
      headers: { apikey: CFG.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: S.session.refresh_token }) });
    sitzung(d);
    return S.session.access_token;
  }
  async function hatRecht() {
    const p = await supa('/rest/v1/tool_permissions?select=tool_key&tool_key=eq.lektorat&can_use=is.true',
      { headers: { apikey: CFG.key, Authorization: 'Bearer ' + await token() } });
    return (p || []).length > 0;
  }
  async function api(body) {
    const r = await fetch(CFG.api, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + await token() },
      body: JSON.stringify(Object.assign({}, body, { geraet: 'Word-Add-in' })) });
    const txt = await r.text(); let j = null; try { j = JSON.parse(txt); } catch (e) { /* */ }
    if (!r.ok) {
      const fehler = Object.assign(new Error((j && j.error) || ([502, 504, 524].includes(r.status)
        ? 'Der Server hat nicht rechtzeitig geantwortet (HTTP ' + r.status + ') – bitte gleich noch einmal versuchen.' : 'HTTP ' + r.status)), { status: r.status, grund: j && j.grund });
      // Sitzungsregel (anderes Gerät, Inaktivität, vom Admin beendet): abmelden, Grund auf der Anmeldeseite
      if (r.status === 409 || (r.status === 401 && fehler.grund)) abmelden(fehler.message);
      throw fehler;
    }
    return j;
  }

  // ---------------------------------------------------------------- Sitzungsregeln: 15 Minuten Inaktivität, ein Gerät (00_Grundlagen/Sitzungen.sql)
  const sitzungUhr = { zuletzt: 0, gemeldet: 0, takt: null };
  const aktiv = () => { sitzungUhr.zuletzt = Date.now(); };
  function sitzungStarten() {
    sitzungUhr.zuletzt = sitzungUhr.gemeldet = Date.now();
    clearInterval(sitzungUhr.takt);
    sitzungUhr.takt = setInterval(() => {
      if (!S.session) return;
      if (Date.now() - sitzungUhr.zuletzt >= 15 * MIN) return abmelden('Wegen 15 Minuten Inaktivität abgemeldet.');
      // gearbeitet seit der letzten Meldung: höchstens alle 2 Minuten „Ich bin aktiv“ an den Server
      if (sitzungUhr.zuletzt > sitzungUhr.gemeldet && Date.now() - sitzungUhr.gemeldet >= 2 * MIN) {
        sitzungUhr.gemeldet = Date.now();
        api({ action: 'aktiv' }).catch(() => {});
      }
    }, 30000);
  }

  async function anmelden() {
    const em = $('email').value.trim(), pw = $('pass').value;
    if (!em || !pw) return setStatus($('loginErr'), 'Bitte E-Mail und Passwort eingeben.', 'err');
    $('loginBtn').disabled = true;
    try {
      const d = await supa('/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: CFG.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em, password: pw }) });
      sitzung(d);
      if (!(await hatRecht())) { abmelden(); return setStatus($('loginErr'), t('noPerm'), 'err'); }
      await api({ action: 'aktiv' });   // Sitzungsregel: ein Konto nur einmal gleichzeitig im Lektorat
      $('pass').value = '';
      await starten();
    } catch (e) {
      if (e.status === 409 || e.grund) { if (S.session) abmelden(); setStatus($('loginErr'), e.message, 'err'); }
      else setStatus($('loginErr'), t('loginFail'), 'err');
    }
    finally { $('loginBtn').disabled = false; }
  }
  function abmelden(meldung) {
    const alt = S.session;
    clearInterval(sitzungUhr.takt);
    S.session = null; speicher.del('sitzung');
    show('app', false); show('settingsCard', false); show('login', true);
    setStatus($('loginErr'), typeof meldung === 'string' ? meldung : '', 'err');
    if (alt) {   // Lektorat freigeben, nur diesen Login beenden (andere Geräte/Tools bleiben angemeldet)
      const h = { apikey: CFG.key, Authorization: 'Bearer ' + alt.access_token, 'Content-Type': 'application/json' };
      fetch(CFG.supa + '/rest/v1/rpc/sitzung_beenden', { method: 'POST', headers: h, body: JSON.stringify({ p_tool: 'lektorat' }) })
        .catch(() => {}).then(() => fetch(CFG.supa + '/auth/v1/logout?scope=local', { method: 'POST', headers: h })).catch(() => {});
    }
  }

  // ---------------------------------------------------------------- 2) Satzanweisungen (zwischengespeichert)
  async function ladeListe(frisch) {
    const c = speicher.get('liste');
    let d = !frisch && c && Date.now() - c.t < 6 * STUNDE ? c : null;
    if (!d) {
      setStatus($('pickStatus'), 'Lade Satzanweisungen …', 'load');
      try {
        const r = await api({ action: 'liste', frisch: !!frisch });
        d = { t: Date.now(), liste: r.liste || [], ki: !!r.ki, umschreiben: r.umschreiben !== false, lt: r.lt || null };
        speicher.set('liste', d);
        setStatus($('pickStatus'), d.liste.length ? '' : 'In Teams wurde keine Satzanweisung gefunden.', d.liste.length ? '' : 'err');
      } catch (e) {
        setStatus($('pickStatus'), e.message + (c ? ' (zuletzt geladene Liste)' : ''), 'err');
        d = c || { liste: [], ki: false, umschreiben: true, lt: null };
      }
    }
    S.liste = d.liste; S.ki = d.ki; S.umschreiben = d.umschreiben; S.lt = d.lt;
    const sel = $('recent');
    sel.innerHTML = '';
    sel.append(new Option('– Satzanweisung wählen –', ''));
    for (const sa of S.liste) sel.append(new Option(sa.kuerzel, sa.item_id));
    show('umCard', S.umschreiben);
    const vorher = S.liste.find(x => x.item_id === speicher.get('letzte'));
    if (vorher) { sel.value = vorher.item_id; if (!S.auswahl || S.auswahl.item_id !== vorher.item_id) await waehle(vorher, true); }
  }

  const kiFehlte = r => (r.hinweise || []).some(h => /^KI-(Auswertung|Antwort)|^KI hat die Auswertung/.test(String(h)));
  async function holeRegeln(sa, lesen) {
    const c = speicher.get('regeln_' + sa.item_id);
    // Zwischenspeicher gilt, solange die Word-Datei unverändert ist (Datum kommt mit der Liste)
    // … und mit dem aktuellen Word-Leser gelesen wurde (sonst einmal neu vom Server holen)
    if (!S.frisch && c && c.geaendert === sa.geaendert && c.daten && c.daten.rules && (c.daten.leser || 0) >= E.LESER_VERSION && !(kiFehlte(c.daten) && Date.now() - c.t > 30 * MIN)) return c.daten;
    const warte = [4, 6, 8, 12, 15, 20, 25, 30, 30, 30];   // wachsender Abstand = weniger n8n-Ausführungen
    for (let i = 0; ; i++) {
      let r;
      try { r = await api({ action: 'regeln', drive_id: sa.drive_id, item_id: sa.item_id, geaendert: sa.geaendert || '' }); }
      catch (e) { if (![502, 504, 524].includes(e.status)) throw e; r = { status: 'in_arbeit' }; }
      if (r.status !== 'in_arbeit') {
        if (r.rules) speicher.set('regeln_' + sa.item_id, { t: Date.now(), geaendert: sa.geaendert, daten: r });
        return r;
      }
      if (i >= warte.length) throw new Error('Die Satzanweisung wird noch gelesen – bitte in ein paar Minuten noch einmal auswählen.');
      lesen();
      await pause(warte[i] * 1000);
    }
  }

  /** Satzanweisung gewählt: Regeln laden, Listen laden, aktivieren, Dokument prüfen (wie im Chrome-Plugin). */
  async function waehle(sa, pruefenDanach) {
    S.auswahl = sa; S.regeln = null; S.treffer = []; S.kiTreffer = []; S.ignore = new Set(); S.verlauf = []; S.vor = []; verlaufKnoepfe();
    speicher.set('letzte', sa.item_id);
    show('rulesCard', true); show('checkCard', false); show('results', false); show('kiCard', false);
    renderRules();
    const t0 = Date.now();
    const lesen = () => setStatus($('rulesStatus'), 'Die Satzanweisung wird gelesen und ausgewertet … (beim ersten Mal 1–3 Minuten, ' +
      Math.round((Date.now() - t0) / 1000) + ' s)', 'load');
    setStatus($('rulesStatus'), 'Lade Regeln …', 'load');
    show('createBtn', false);
    try {
      S.regeln = await holeRegeln(sa, lesen);
      setStatus($('rulesStatus'), '');
    } catch (e) {
      S.regeln = null; setStatus($('rulesStatus'), e.message, 'err'); show('createBtn', true);
    }
    renderRules();
    await ladeSaListen();
    if (S.regeln && S.regeln.rules) aktivieren(pruefenDanach !== false);
  }

  const abgewaehlt = () => new Set((S.auswahl && speicher.get('aus_' + S.auswahl.item_id, [])) || []);
  function renderRules() {
    const r = S.regeln, pill = $('rulesPill');
    show('unklarBox', false);
    $('rulesList').innerHTML = '';
    $('rulesText').textContent = S.auswahl ? (S.auswahl.datei || '') : '';
    if (!r || !r.rules) { pill.textContent = ''; pill.className = 'pill'; return; }
    const fest = r.rules.filter(x => x.schwere !== 'hinweis').length, gelb = r.rules.length - fest;
    pill.textContent = r.rules.length + ' Regeln'; pill.className = 'pill ok';
    $('rulesText').textContent = (S.auswahl.datei ? S.auswahl.datei + ' · ' : '') + fest + ' feste Regeln, ' + gelb + (gelb === 1 ? ' KI-Hinweis' : ' KI-Hinweise');
    const kiFehler = (r.hinweise || []).find(h => /^KI-(Auswertung|Antwort)|^KI hat die Auswertung/.test(String(h)));
    if (kiFehler) setStatus($('rulesStatus'), '⚠ ' + t('kiRegelnFehlen', { s: kiFehler }), 'err');
    const off = abgewaehlt();
    for (const rule of r.rules) {
      const row = document.createElement('label');
      row.className = 'rule';
      const falsch = rule.typ === 'schreibweise' ? 'abweichende Schreibung' : rule.typ === 'baustein' ? 'feste Prüfung (' + rule.ersetzen + ')' : (rule.falsch || []).join(', ');
      row.innerHTML = `<input type="checkbox" ${off.has(rule.id) ? '' : 'checked'}>
        <span><span class="r" style="${rule.schwere === 'hinweis' ? 'color:#8a5f00' : ''}">${esc(rule.richtig || (rule.typ === 'stil' ? 'Stil' : ''))}</span>
        ${falsch ? ' <span class="f">statt ' + esc(falsch) + '</span>' : ''}
        ${rule.hinweis ? '<br><span class="f">' + esc(rule.hinweis) + '</span>' : ''}</span>`;
      row.querySelector('input').addEventListener('change', ev => {
        const set = abgewaehlt();
        if (ev.target.checked) set.delete(rule.id); else set.add(rule.id);
        speicher.set('aus_' + S.auswahl.item_id, Array.from(set));
        aktivieren(S.treffer.length > 0);
      });
      $('rulesList').append(row);
    }
    if (!r.rules.length) $('rulesList').innerHTML = '<div class="muted">In der Satzanweisung wurden keine prüfbaren Regeln gefunden.</div>';
    $('rulesDetails').querySelector('summary').textContent = 'Regeln anzeigen (' + r.rules.length + ')';
    if ((r.hinweise || []).length) {
      $('unklarBox').querySelector('summary').textContent = 'Alle Anweisungen der Satzanweisung zum Nachlesen (' + r.hinweise.length + ')';
      $('unklarList').innerHTML = r.hinweise.map(h => '<li>' + esc(h) + '</li>').join('');
      show('unklarBox', true);
    }
  }
  const aktiveRegeln = () => { const off = abgewaehlt(); return ((S.regeln && S.regeln.rules) || []).filter(x => !off.has(x.id)); };
  function aktivieren(pruefenDanach) {
    const n = aktiveRegeln().length, aus = S.regeln.rules.length - n;
    show('checkCard', true);
    show('kiCard', S.ki);
    $('activeSet').innerHTML = `<b>${esc(S.auswahl.kuerzel)}</b> · ${n} Regeln aktiv` + (aus ? ' · ' + aus + ' abgewählt' : '');
    if (pruefenDanach) pruefen();
  }

  // ---------------------------------------------------------------- White-/Blacklist der Satzanweisung (Teams)
  async function ladeSaListen() {
    const sa = S.auswahl;
    if (!sa) return;
    const c = speicher.get('listen_' + sa.item_id);
    if (!S.frisch && c && Date.now() - c.t < 10 * MIN) { S.listen = c.l; return zeigeSaListen(); }
    try {
      const r = await api({ action: 'listen', drive_id: sa.drive_id, item_id: sa.item_id, frisch: S.frisch });
      S.listen = { whitelist: r.whitelist || [], blacklist: r.blacklist || [], datei: r.datei, vorhanden: r.vorhanden };
      speicher.set('listen_' + sa.item_id, { t: Date.now(), l: S.listen });
      setStatus($('saListenStatus'), '');
    } catch (e) { S.listen = c ? c.l : { whitelist: [], blacklist: [] }; setStatus($('saListenStatus'), e.message, 'err'); }
    zeigeSaListen();
  }
  function zeigeSaListen() {
    const chip = (art, w) => `<span>${esc(w)}<button data-art="${art}" data-w="${esc(w)}" title="${esc(t('entfernen'))}">×</button></span>`;
    const leer = '<span class="muted" style="background:none;padding:0">–</span>';
    $('saWhite').innerHTML = S.listen.whitelist.map(w => chip('whitelist', w)).join('') || leer;
    $('saBlack').innerHTML = S.listen.blacklist.map(w => chip('blacklist', w)).join('') || leer;
    $('saListenInfo').textContent = S.listen.datei ? (S.listen.vorhanden ? 'Teams: ' + S.listen.datei : t('saListeNeu', { d: S.listen.datei })) : '';
  }
  // sofort anzeigen und prüfen, dann der Reihe nach in Teams speichern
  let listenKette = Promise.resolve();
  function listeAendern(art, op, wort) {
    if (!S.auswahl) return setStatus($('saListenStatus'), t('saErst'), 'err');
    const sa = S.auswahl, gleich = (a, b) => String(a).toLowerCase().trim() === String(b).toLowerCase().trim();
    const andere = art === 'whitelist' ? 'blacklist' : 'whitelist';
    const vorher = Object.assign({}, S.listen, { whitelist: S.listen.whitelist.slice(), blacklist: S.listen.blacklist.slice() });
    if (op === 'add') { if (!S.listen[art].some(w => gleich(w, wort))) S.listen[art].push(wort); S.listen[andere] = S.listen[andere].filter(w => !gleich(String(w).split(/\s*(?:→|->)\s*/)[0], wort)); }
    else S.listen[art] = S.listen[art].filter(w => !gleich(w, wort));
    zeigeSaListen(); if (S.treffer.length) pruefen(true);
    setStatus($('saListenStatus'), t('saSpeichert'), 'load');
    listenKette = listenKette.then(() => api({ action: 'listen', drive_id: sa.drive_id, item_id: sa.item_id, aenderung: { art, op, wort } }))
      .then(r => { if (S.auswahl !== sa) return; S.listen = { whitelist: r.whitelist || [], blacklist: r.blacklist || [], datei: r.datei, vorhanden: true };
        speicher.set('listen_' + sa.item_id, { t: Date.now(), l: S.listen }); zeigeSaListen(); setStatus($('saListenStatus'), t('saGespeichert'), 'ok'); },
      e => { if (S.auswahl !== sa) return; S.listen = vorher; zeigeSaListen(); if (S.treffer.length) pruefen(true); setStatus($('saListenStatus'), t('saFehler', { s: e.message }), 'err'); });
  }

  // ---------------------------------------------------------------- LanguageTool (Rechtschreibung + Grammatik)
  const LT_KAT = new Set(['TYPOS', 'GRAMMAR', 'PUNCTUATION', 'CASING', 'CONFUSED_WORDS', 'COMPOUNDING', 'MISC', 'SEMANTICS', 'EMPFOHLENE_RECHTSCHREIBUNG', 'OLD_SPELLING']);
  const LINK_RE = /\bhttps?:\/\/\S+|\bwww\.\S+|[\w.+-]+@[\w-]+\.[\w.-]+/gu;
  const ltCache = new Map();
  let ltGesperrt = 0;
  async function languageTool(texte) {
    if (Date.now() < ltGesperrt) throw new Error('LanguageTool-Limit');
    const out = {}, offen = [];
    texte.forEach((x, i) => { if (!x.trim()) out[i] = []; else if (ltCache.has(x)) out[i] = ltCache.get(x); else offen.push({ i, t: x.slice(0, 18000) }); });
    const pakete = []; let p = [], n = 0;
    for (const x of offen) { if (p.length && n + x.t.length + 2 > 18000) { pakete.push(p); p = []; n = 0; } x.s = n; p.push(x); n += x.t.length + 2; }
    if (p.length) pakete.push(p);
    const premium = S.lt && S.lt.user && S.lt.key;
    for (const pk of pakete) {
      const form = new URLSearchParams({ text: pk.map(x => x.t).join('\n\n'), language: 'de-DE', motherTongue: 'de-DE' });
      if (premium) { form.set('username', S.lt.user); form.set('apiKey', S.lt.key); }
      const r = await fetch(premium ? 'https://api.languagetoolplus.com/v2/check' : 'https://api.languagetool.org/v2/check', { method: 'POST', body: form });
      if (r.status === 429 || r.status === 403) { ltGesperrt = Date.now() + MIN; throw new Error('LanguageTool-Limit'); }
      if (!r.ok) throw new Error('LanguageTool: HTTP ' + r.status);
      const d = await r.json();
      for (const x of pk) out[x.i] = [];
      for (const m of d.matches || []) {
        const kat = m.rule && m.rule.category && m.rule.category.id;
        if (!LT_KAT.has(kat)) continue;
        const x = pk.find(y => m.offset >= y.s && m.offset < y.s + y.t.length);
        if (!x) continue;
        out[x.i].push({ offset: m.offset - x.s, length: m.length, message: m.message || '', vorschlaege: (m.replacements || []).slice(0, 5).map(v => v.value),
          kategorie: kat, kategorieName: (m.rule.category && m.rule.category.name) || kat, regel: m.rule.id });
      }
      for (const x of pk) ltCache.set(texte[x.i], out[x.i]);
    }
    return out;
  }

  // ---------------------------------------------------------------- 4) Prüfen
  async function absaetzeLesen() {
    return Word.run(async ctx => {
      const ps = ctx.document.body.paragraphs; ps.load('items/text,items/style'); await ctx.sync();
      // Formatvorlage je Absatz (z. B. „Überschrift 1“) – geht bei „Mit KI prüfen“ mit, „Standard“ zählt nicht
      S.formate = ps.items.map(p => /^(standard|normal|default paragraph font)$/i.test(p.style || '') ? '' : (p.style || ''));
      return ps.items.map(p => p.text || '');
    });
  }
  let pruefLaeuft = false;
  async function pruefen(still) {
    if (!S.regeln || !S.regeln.rules || pruefLaeuft) return;
    pruefLaeuft = true;
    $('checkBtn').disabled = true;
    if (!still) setStatus($('status'), t('checking'), 'load');
    try {
      S.absaetze = await absaetzeLesen();
      const compiled = E.compile(aktiveRegeln().concat(E.blacklistRules(S.listen.blacklist)));
      const weiss = E.whitelistSet(S.listen.whitelist);
      const bekannt = new Set([...E.regelWoerter(S.regeln.rules), ...weiss]);
      const treffer = [], schutz = {};
      S.absaetze.forEach((text, p) => {
        if (!text.trim()) return;
        schutz[p] = [];
        for (const h of E.check(text, compiled, { ignore: S.ignore, whitelist: weiss, schutz: schutz[p] })) {
          treffer.push(Object.assign(h, { p, kategorie: E.kategorie(h), vorschlaege: h.richtig ? [h.richtig] : [], einzeln: !!h.richtig && !!h.ersetzbar }));
        }
      });
      let ltHinweis = '';
      if (S.opt.lt) {
        try {
          const lt = await languageTool(S.absaetze);
          S.absaetze.forEach((text, p) => {
            const belegt = treffer.filter(h => h.p === p).map(h => [h.start, h.end]).concat(schutz[p] || [],
              Array.from(text.matchAll(LINK_RE), m => [m.index, m.index + m[0].length]));
            for (const m of lt[p] || []) {
              const s = m.offset, e = s + m.length, wort = text.slice(s, e);
              if (!wort.trim() || belegt.some(([a, z]) => s < z && a < e) || weiss.has(wort.toLowerCase())) continue;
              if (m.kategorie === 'TYPOS' && !E.rsAnfragen(wort, 0, bekannt).length) continue;
              const key = 'lt|' + m.regel + '|' + wort;
              if (S.ignore.has(key)) continue;
              treffer.push({ p, start: s, end: e, match: wort, richtig: m.vorschlaege[0] || '', vorschlaege: m.vorschlaege, hinweis: m.message,
                schwere: 'rechtschreibung', kategorie: 'rechtschreibung', quelle: 'LanguageTool · ' + m.kategorieName, key, einzeln: !!m.vorschlaege.length });
            }
          });
        } catch (e) { ltHinweis = ' ⚠ ' + t('rsLimit'); }
      }
      // KI-Treffer behalten, solange ihr Absatz unverändert ist
      S.kiTreffer = S.kiTreffer.filter(h => S.absaetze[h.p] === h.text && !S.ignore.has(h.key));
      S.treffer = treffer.concat(S.kiTreffer).sort((a, b) => a.p - b.p || a.start - b.start);
      S.current = -1;
      await markieren();
      renderHits();
      const n = S.treffer.length;
      setStatus($('status'), (n === 1 ? t('done1') : n ? t('done', { n }) : t('clean')) + ltHinweis, ltHinweis ? 'err' : n ? '' : 'ok');
    } catch (e) { setStatus($('status'), e.message, 'err'); }
    finally { $('checkBtn').disabled = false; pruefLaeuft = false; }
  }

  // ---------------------------------------------------------------- Markieren: farbige Wellenlinien in Word (WordApi 1.7), Dokument bleibt unverändert
  const annotationen = () => { try { return Office.context.requirements.isSetSupported('WordApi', '1.7'); } catch (e) { return false; } };
  async function markieren() {
    if (!annotationen()) return;
    try {
      await Word.run(async ctx => {
        const ps = ctx.document.body.paragraphs; ps.load('items'); await ctx.sync();
        const alte = ps.items.map(p => p.getAnnotations()); alte.forEach(a => a.load('items')); await ctx.sync();
        alte.forEach(a => a.items.forEach(x => x.delete()));
        await ctx.sync();
        S.annoMap = new Map();
        if (!S.opt.anzeigen || !S.treffer.length) return;
        const proAbsatz = new Map();
        for (const h of S.treffer) { if (!proAbsatz.has(h.p)) proAbsatz.set(h.p, []); proAbsatz.get(h.p).push(h); }
        const titel = h => h.richtig ? h.match + ' → ' + h.richtig : h.beispiel ? artName(h.kategorie) + ' – z. B. ' + h.beispiel : artName(h.kategorie);
        const kritik = (h, mitPopup) => Object.assign({ colorScheme: KRITIK[h.kategorie] || 'Red', start: h.start, length: h.end - h.start },
          mitPopup ? { popupOptions: { brandingTextResourceId: 'Lektorat.Brand', title: titel(h),
            subtitle: String(h.hinweis || h.quelle || '').slice(0, 140), suggestions: (h.einzeln || h.ki ? h.vorschlaege || [] : []).slice(0, 4) } } : {});
        const setze = async mitPopup => {
          const ergebnis = [];
          for (const [p, hs] of proAbsatz) { const par = ps.items[p]; if (par) ergebnis.push({ hs, ids: par.insertAnnotations({ critiques: hs.map(h => kritik(h, mitPopup)) }) }); }
          await ctx.sync();
          ergebnis.forEach(e => (e.ids.value || []).forEach((id, i) => S.annoMap.set(id, e.hs[i])));
        };
        try { await setze(true); } catch (e) { await setze(false); }   // ältere Word-Versionen ohne Popup
      });
    } catch (e) { console.warn('Markieren nicht möglich:', e); }
  }
  function klickAufMarkierung(args) {
    const h = S.annoMap.get(args && args.id);
    if (!h) return;
    S.current = S.treffer.indexOf(h); renderHits();
    const el = $('hits').children[S.current]; if (el) el.scrollIntoView({ block: 'nearest' });
  }

  // ---------------------------------------------------------------- Trefferliste (wie im Chrome-Plugin)
  function renderHits() {
    const list = $('hits');
    list.innerHTML = '';
    show('results', S.treffer.length > 0);
    $('counts').innerHTML = ARTEN.map(([k]) => {
      const n = S.treffer.filter(h => h.kategorie === k).length, f = FARBEN[k];
      return n ? `<span class="pill" style="background:${f}1f;color:${f};border:1px solid ${f}55">${n} ${esc(artName(k))}</span>` : '';
    }).join('');
    const nErs = S.treffer.filter(h => h.alle).length;
    $('alleErsetzen').textContent = t('replaceAll', { n: nErs });
    show('alleErsetzen', nErs > 0);
    S.treffer.forEach((h, idx) => {
      const text = S.absaetze[h.p] || '';
      const li = document.createElement('li');
      li.className = 'hit' + (idx === S.current ? ' active' : '');
      li.style.borderLeftColor = FARBEN[h.kategorie] || FARBEN.fehler;
      const vs = (h.vorschlaege || []).filter(Boolean);
      const einzeln = (h.einzeln || h.ki) && vs.length;
      li.innerHTML = `<div><span class="w">${esc(h.match)}</span> → <span class="r">${esc(h.richtig || (h.beispiel ? 'z. B. ' + h.beispiel : '?'))}</span></div>
        <div class="ctx">${esc(text.slice(Math.max(0, h.start - 40), h.start))}<mark>${esc(h.match)}</mark>${esc(text.slice(h.end, h.end + 40))}</div>
        ${h.hinweis ? `<div class="ctx">${esc(h.hinweis)}</div>` : ''}
        <div class="meta"><span class="q" title="${esc(h.quelle)}">${h.ki ? 'KI' : esc(t('source')) + ': ' + esc(h.quelle || '–')}</span>
          <span class="row" style="flex:none">${einzeln && vs.length > 1
            ? vs.slice(0, 4).map((v, i) => `<button class="ghost" data-a="replace" data-v="${i}" title="${esc(t('replaceTip'))}" style="color:#3d7a1e;font-weight:600">${esc(v)}</button>`).join('')
            : einzeln ? `<button class="ghost" data-a="replace" data-v="0" title="${esc(t('replaceTip'))}">${esc(t('replace'))}</button>` : ''}
          <button class="ghost" data-a="copy">${esc(t('copy'))}</button>
          <button class="ghost" data-a="ignore">${esc(t('ignore'))}</button>
          ${h.ki ? '' : `<button class="ghost" data-a="white" title="${esc(t('whiteTip'))}">${esc(t('white'))}</button>`}</span></div>`;
      li.addEventListener('click', ev => {
        const a = ev.target.dataset && ev.target.dataset.a;
        if (a === 'copy') { kopieren(h.richtig || ''); ev.target.textContent = t('copied'); return; }
        if (a === 'ignore') { S.ignore.add(h.key); return pruefen(true); }
        if (a === 'replace') return ersetzen(h, vs[Number(ev.target.dataset.v)]);
        if (a === 'white') return listeAendern('whitelist', 'add', h.match);
        gehe(idx);
      });
      list.append(li);
    });
  }

  // ---------------------------------------------------------------- Stelle finden, ersetzen, rückgängig
  const vorkommenVor = (text, m, start) => { let n = 0, i = text.indexOf(m); while (i >= 0 && i < start) { n++; i = text.indexOf(m, i + m.length); } return n; };
  async function stelleSuchen(ctx, p, text, start, wort) {
    const ps = ctx.document.body.paragraphs; ps.load('items/text'); await ctx.sync();
    let par = ps.items[p];
    if (!par || par.text !== text) { const i = ps.items.findIndex(x => x.text === text); if (i < 0) return null; par = ps.items[i]; }
    const rs = par.search(wort.slice(0, 250), { matchCase: true }); rs.load('items'); await ctx.sync();
    return rs.items[vorkommenVor(text, wort, start)] || null;
  }
  async function gehe(idx) {
    if (!S.treffer.length) return;
    S.current = (idx + S.treffer.length) % S.treffer.length;
    renderHits();
    const el = $('hits').children[S.current]; if (el) el.scrollIntoView({ block: 'nearest' });
    const h = S.treffer[S.current];
    try { await Word.run(async ctx => { const r = await stelleSuchen(ctx, h.p, S.absaetze[h.p], h.start, h.match); if (r) { r.select(); await ctx.sync(); } }); }
    catch (e) { /* Stelle inzwischen geändert */ }
  }
  async function tausche(p, text, start, alt, neu) {
    return Word.run(async ctx => {
      const r = await stelleSuchen(ctx, p, text, start, alt);
      if (!r) return false;
      if (S.opt.nachverfolgen) { try { ctx.document.changeTrackingMode = 'TrackAll'; } catch (e) { /* ältere Word-Version */ } }
      r.insertText(neu, 'Replace');
      await ctx.sync();
      return true;
    });
  }
  async function ersetzen(h, text, ohneNeuPruefen) {
    const neu = text || h.richtig;
    if (!neu) return false;
    let ok = false;
    try { ok = await tausche(h.p, S.absaetze[h.p], h.start, h.match, neu); } catch (e) { ok = false; }
    if (!ok) { setStatus($('status'), 'Stelle nicht gefunden – Text inzwischen geändert? Bitte neu prüfen.', 'err'); return false; }
    const neuerText = S.absaetze[h.p].slice(0, h.start) + neu + S.absaetze[h.p].slice(h.end);
    S.verlauf.push({ p: h.p, alt: h.match, neu, start: h.start, textVorher: S.absaetze[h.p], textNachher: neuerText });
    if (S.verlauf.length > 10) S.verlauf.shift();
    S.vor = []; verlaufKnoepfe();
    S.absaetze[h.p] = neuerText;
    if (!ohneNeuPruefen) await pruefen(true);
    return true;
  }
  async function alleErsetzen() {
    const sicher = S.treffer.filter(h => h.alle).sort((a, b) => b.p - a.p || b.start - a.start);   // von hinten, damit Positionen stimmen
    if (!sicher.length) return;
    setStatus($('status'), 'Ersetze …', 'load');
    let n = 0;
    for (const h of sicher) if (await ersetzen(h, null, true)) n++;
    await pruefen(true);
    setStatus($('status'), t('replaced', { n }), 'ok');
  }
  function verlaufKnoepfe() {
    const u = S.verlauf[S.verlauf.length - 1], r = S.vor[S.vor.length - 1];
    $('undoBtn').disabled = !u; $('redoBtn').disabled = !r;
    $('undoBtn').title = u ? t('undoTip', { s: u.alt + ' → ' + u.neu }) : t('undoLeer');
    $('redoBtn').title = r ? t('redoTip', { s: r.alt + ' → ' + r.neu }) : t('redoLeer');
  }
  async function zurueck() {
    const s = S.verlauf.pop(); if (!s) return;
    if (await tausche(s.p, s.textNachher, s.start, s.neu, s.alt).catch(() => false)) S.vor.push(s);
    else setStatus($('status'), t('undoTeilweise'), 'err');
    verlaufKnoepfe(); await pruefen(true);
  }
  async function vorwaerts() {
    const s = S.vor.pop(); if (!s) return;
    if (await tausche(s.p, s.textVorher, s.start, s.alt, s.neu).catch(() => false)) S.verlauf.push(s);
    verlaufKnoepfe(); await pruefen(true);
  }

  // ---------------------------------------------------------------- KI-Prüfung (Spar-Variante: größere Stücke, Prompt-Caching auf dem Server)
  async function kiPruefen() {
    if (!S.regeln || !S.regeln.regel_id) return setStatus($('kiStatus'), 'Bitte zuerst eine Satzanweisung wählen.', 'err');
    $('kiBtn').disabled = true;
    try {
      S.absaetze = await absaetzeLesen();
      const bloecke = S.absaetze.map((x, i) => Object.assign({ id: 'p' + i, text: x }, (S.formate || [])[i] ? { format: S.formate[i] } : {}))
        // kurze Absätze nur mit Formatvorlage (Überschriften wie „Urteile“): die KI braucht sie für Rubrik-Ausnahmen
        .filter(b => b.text.trim().length >= 20 || (b.format && b.text.trim()));
      const teile = []; let teil = [], n = 0;
      for (const b of bloecke) { if (teil.length && n + b.text.length > 8000) { teile.push(teil); teil = []; n = 0; } teil.push(b); n += b.text.length; }
      if (teil.length) teile.push(teil);
      const treffer = [];
      const ART = { satzanweisung: 'Satzanweisung', rechtschreibung: 'Rechtschreibung', grammatik: 'Grammatik', zeichensetzung: 'Zeichensetzung' };
      for (let i = 0; i < teile.length; i++) {
        setStatus($('kiStatus'), teile.length > 1 ? t('kiTeil', { i: i + 1, n: teile.length }) : t('kiRunning'), 'load');
        let r;
        for (let v = 0; v < 3; v++) {
          try { r = await api({ action: 'ki-spar', regel_id: S.regeln.regel_id, blocks: teile[i], gedaechtnis: { whitelist: S.listen.whitelist, blacklist: S.listen.blacklist } }); break; }
          catch (e) { if (v === 2 || !/rate_limit|overloaded|502|504|524/i.test(e.message + e.status)) throw e; setStatus($('kiStatus'), t('kiLimit'), 'load'); await pause(8000 * (v + 1)); }
        }
        for (const k of r.treffer || []) {
          const p = Number(String(k.block).slice(1)); const text = S.absaetze[p] || '';
          const s = text.indexOf(k.zitat); if (s < 0) continue;
          treffer.push({ p, start: s, end: s + k.zitat.length, match: k.zitat, richtig: k.vorschlag, vorschlaege: k.vorschlag ? [k.vorschlag] : [],
            hinweis: k.begruendung, quelle: 'KI · ' + (ART[k.art] || 'Prüfung'), kategorie: 'ki', ki: true, key: 'ki|' + k.zitat, text });
        }
      }
      S.kiTreffer = treffer.filter(h => !S.ignore.has(h.key));
      await pruefen(true);
      setStatus($('kiStatus'), treffer.length ? t('kiDone', { n: treffer.length }) : t('kiNone'), 'ok');
    } catch (e) { setStatus($('kiStatus'), e.message, 'err'); }
    finally { $('kiBtn').disabled = false; }
  }

  // ---------------------------------------------------------------- Text umschreiben
  function wortDiff(alt, neu) {
    const teile = s => s.match(/\s+|[\p{L}\p{N}’'-]+|[^\s\p{L}\p{N}]/gu) || [];
    const a = teile(alt), b = teile(neu);
    if (a.length * b.length > 4e6) return esc(neu);
    const L = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
    for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    let i = 0, j = 0, out = '', weg = '', dazu = '';
    const flush = () => { if (weg) out += '<del>' + esc(weg) + '</del>'; if (dazu) out += '<ins>' + esc(dazu) + '</ins>'; weg = dazu = ''; };
    while (i < a.length || j < b.length) {
      if (i < a.length && j < b.length && a[i] === b[j]) { flush(); out += esc(a[i]); i++; j++; }
      else if (j < b.length && (i >= a.length || L[i][j + 1] >= L[i + 1][j])) dazu += b[j++];
      else weg += a[i++];
    }
    flush();
    return out;
  }
  const zeigeDiff = () => { $('umDiff').innerHTML = wortDiff(S.um.auswahl ? S.um.auswahl.text : '', $('umText').value); };
  function zeigeAuswahl() {
    const a = S.um.auswahl;
    $('umAuswahl').textContent = a ? (a.text.length > 400 ? a.text.slice(0, 400) + ' …' : a.text) : t('umLeer');
    $('umAuswahl').classList.toggle('muted', !a);
  }
  // Markierung im Dokument merken (Word meldet jede Änderung). Der Bereich wird „verfolgt“, damit „Übernehmen“
  // genau diese Stelle ersetzt, auch wenn der Klick in den Aufgabenbereich die Markierung in Word verändert.
  async function holeAuswahl() {
    try {
      await Word.run(async ctx => {
        const sel = ctx.document.getSelection(); sel.load('text'); await ctx.sync();
        const text = String(sel.text || '').replace(/\r/g, '\n').trim();
        if (!text) return;
        sel.track(); await ctx.sync();
        S.um.range = sel; S.um.auswahl = { text: text.slice(0, 8000), laenge: text.length };
      });
    } catch (e) { /* ohne Word-Verbindung */ }
    zeigeAuswahl();
    return S.um.auswahl;
  }
  async function ladeVorlagen(frisch) {
    const c = speicher.get('vorlagen');
    if (!frisch && c && Date.now() - c.t < 24 * STUNDE) S.vorlagen = c.v;
    else {
      try { const r = await api({ action: 'vorlagen', frisch: !!frisch }); S.vorlagen = r.vorlagen || STANDARD_VORLAGEN; speicher.set('vorlagen', { t: Date.now(), v: S.vorlagen }); }
      catch (e) { S.vorlagen = c ? c.v : STANDARD_VORLAGEN; }
    }
    const box = $('umAktionen');
    box.innerHTML = '';
    for (const v of S.vorlagen) {
      const b = document.createElement('button');
      b.className = 'ghost'; b.textContent = v.name; b.title = v.prompt;
      b.addEventListener('click', () => umschreiben(v));
      box.append(b);
    }
  }
  async function umschreiben(v) {
    const anweisung = $('umFrei').value.trim();
    if (v === 'frei' && !anweisung) return setStatus($('umStatus'), t('umAnweisungFehlt'), 'err');
    await holeAuswahl();
    if (!S.um.auswahl) return setStatus($('umStatus'), 'Bitte zuerst Text im Dokument markieren.', 'err');
    show('umErgebnis', false);
    setStatus($('umStatus'), t('umLaeuft'), 'load');
    for (const b of document.querySelectorAll('#umAktionen button, #umFreiBtn')) b.disabled = true;
    try {
      const r = await api({ action: 'umschreiben', text: S.um.auswahl.text, aktion: v === 'frei' ? 'frei' : 'vorlage', aufgabe: v === 'frei' ? '' : v.prompt, anweisung,
        regel_id: (S.regeln && S.regeln.regel_id) || 0, gedaechtnis: { whitelist: S.listen.whitelist, blacklist: S.listen.blacklist } });
      S.um.ergebnis = r.text;
      $('umText').value = r.text;
      $('umText').classList.add('hidden'); $('umDiff').classList.remove('hidden'); $('umBearbeiten').textContent = t('umBearbeiten');
      zeigeDiff();
      $('umHinweis').textContent = r.hinweis || '';
      show('umErgebnis', true);
      setStatus($('umStatus'), '');
    } catch (e) { setStatus($('umStatus'), e.message, 'err'); }
    finally { for (const b of document.querySelectorAll('#umAktionen button, #umFreiBtn')) b.disabled = false; }
  }
  async function umUebernehmen() {
    const neu = $('umText').value, alt = S.um.auswahl && S.um.auswahl.text;
    const setzen = async (ctx, r) => {
      if (S.opt.nachverfolgen) { try { ctx.document.changeTrackingMode = 'TrackAll'; } catch (e) { /* */ } }
      r.insertText(neu, 'Replace'); await ctx.sync();
    };
    let ok = false;
    try {
      if (S.um.range) {
        ok = await Word.run(S.um.range, async ctx => {
          S.um.range.load('text'); await ctx.sync();
          if (String(S.um.range.text || '').replace(/\r/g, '\n').trim() !== alt) return false;   // Stelle inzwischen geändert
          await setzen(ctx, S.um.range); return true;
        });
      }
    } catch (e) { ok = false; }
    try {
      if (!ok && alt && alt.length <= 250) {
        ok = await Word.run(async ctx => {
          const rs = ctx.document.body.search(alt, { matchCase: true }); rs.load('items'); await ctx.sync();
          if (!rs.items.length) return false;
          await setzen(ctx, rs.items[0]); return true;
        });
      }
    } catch (e) { ok = false; }
    if (!ok) { await kopieren(neu); return setStatus($('umStatus'), t('umKopiert'), 'err'); }
    setStatus($('umStatus'), t('umUebernommen'), 'ok');
    show('umErgebnis', false); S.um.auswahl = null; S.um.range = null; zeigeAuswahl();
    if (S.treffer.length) pruefen(true);
  }

  // ---------------------------------------------------------------- Start
  let liveTimer = null, auswahlTimer = null;
  function auswahlGeaendert() {
    aktiv();   // Arbeiten im Dokument (Cursor, Tippen) zählt als Aktivität
    clearTimeout(auswahlTimer); auswahlTimer = setTimeout(holeAuswahl, 250);
    if (S.opt.live && S.regeln) { clearTimeout(liveTimer); liveTimer = setTimeout(() => pruefen(true), 2000); }   // „Beim Tippen mitprüfen“
  }
  async function starten() {
    show('login', false); show('app', true);
    sitzungStarten();
    $('who').textContent = (S.session && S.session.email) || '';
    try {
      await Word.run(async ctx => { ctx.document.onAnnotationClicked.add(klickAufMarkierung); await ctx.sync(); });
    } catch (e) { /* ältere Word-Version: ohne Klick-Verknüpfung */ }
    try { Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, auswahlGeaendert); } catch (e) { /* */ }
    holeAuswahl();
    await ladeListe(false);
    ladeVorlagen();
  }

  function verdrahten() {
    const opt = () => speicher.set('optionen', S.opt);
    $('optLt').checked = S.opt.lt; $('optNachverfolgen').checked = S.opt.nachverfolgen; $('anzeigen').checked = S.opt.anzeigen; $('live').checked = S.opt.live;
    $('loginBtn').addEventListener('click', anmelden);
    $('pass').addEventListener('keydown', e => { if (e.key === 'Enter') anmelden(); });
    $('logout').addEventListener('click', () => abmelden());
    ['keydown', 'mousedown', 'wheel'].forEach(n => document.addEventListener(n, aktiv, { passive: true, capture: true }));
    $('de').addEventListener('click', () => { I18n.set('de'); renderHits(); });
    $('en').addEventListener('click', () => { I18n.set('en'); renderHits(); });
    $('settingsBtn').addEventListener('click', () => show('settingsCard', $('settingsCard').classList.contains('hidden')));
    $('recent').addEventListener('change', () => { const sa = S.liste.find(x => x.item_id === $('recent').value); if (sa) waehle(sa, true); });
    // „aktualisieren“: Liste, Regeln und Listen neu aus Teams holen (sonst Zwischenspeicher)
    $('reloadListe').addEventListener('click', async () => {
      S.frisch = true;
      try {
        const vorher = S.auswahl && S.auswahl.item_id;
        S.auswahl = null;
        await ladeListe(true);
        const sa = S.liste.find(x => x.item_id === vorher);
        if (sa && (!S.auswahl || S.auswahl.item_id !== sa.item_id)) await waehle(sa, true);
      } finally { S.frisch = false; }
      ladeVorlagen(true);
    });
    $('createBtn').addEventListener('click', () => S.auswahl && waehle(S.auswahl, true));
    $('rulesKlapp').open = !!speicher.get('regeln_offen', false);
    $('rulesKlapp').addEventListener('toggle', () => speicher.set('regeln_offen', $('rulesKlapp').open));
    $('checkBtn').addEventListener('click', () => pruefen());
    $('prev').addEventListener('click', () => gehe(S.current < 0 ? S.treffer.length - 1 : S.current - 1));
    $('next').addEventListener('click', () => gehe(S.current + 1));
    $('alleErsetzen').addEventListener('click', alleErsetzen);
    $('kiBtn').addEventListener('click', kiPruefen);
    $('undoBtn').addEventListener('click', zurueck);
    $('redoBtn').addEventListener('click', vorwaerts);
    $('optLt').addEventListener('change', () => { S.opt.lt = $('optLt').checked; opt(); if (S.treffer.length) pruefen(); });
    $('optNachverfolgen').addEventListener('change', () => { S.opt.nachverfolgen = $('optNachverfolgen').checked; opt(); });
    $('anzeigen').addEventListener('change', () => { S.opt.anzeigen = $('anzeigen').checked; opt(); markieren(); });
    $('live').addEventListener('change', () => { S.opt.live = $('live').checked; opt(); });
    $('umGross').addEventListener('click', () => $('umCard').classList.toggle('gross'));
    $('umFreiBtn').addEventListener('click', () => umschreiben('frei'));
    $('umFrei').addEventListener('keydown', e => { if (e.key === 'Enter') umschreiben('frei'); });
    $('umUebernehmen').addEventListener('click', umUebernehmen);
    $('umKopieren').addEventListener('click', async () => { await kopieren($('umText').value); setStatus($('umStatus'), t('copied'), 'ok'); });
    $('umVerwerfen').addEventListener('click', () => show('umErgebnis', false));
    $('umBearbeiten').addEventListener('click', () => {
      const an = $('umText').classList.contains('hidden');
      $('umText').classList.toggle('hidden', !an); $('umDiff').classList.toggle('hidden', an);
      $('umBearbeiten').textContent = an ? t('umFertig') : t('umBearbeiten');
      if (!an) zeigeDiff();
    });
    $('saAdd').addEventListener('click', () => { const w = $('saWort').value.trim(); if (w) { listeAendern($('saArt').value, 'add', w); $('saWort').value = ''; } });
    $('saWort').addEventListener('keydown', e => { if (e.key === 'Enter') $('saAdd').click(); });
    for (const id of ['saWhite', 'saBlack']) $(id).addEventListener('click', e => { const b = e.target.closest('button[data-w]'); if (b) listeAendern(b.dataset.art, 'remove', b.dataset.w); });
  }

  async function init() {
    await I18n.init();
    verdrahten();
    if (S.session) {
      try { if (await hatRecht()) { await api({ action: 'aktiv' }); return starten(); } }
      catch (e) { if (e.status === 409 || e.grund) return; /* api() hat mit Grund abgemeldet */ }
      abmelden();
    } else { show('login', true); }
  }
  window.FDSLektoratWord = { S, pruefen, ersetzen, kiPruefen, wortDiff, init };   // für Tests
  if (window.Office && Office.onReady) Office.onReady(() => init());
  else document.addEventListener('DOMContentLoaded', init);
})();

