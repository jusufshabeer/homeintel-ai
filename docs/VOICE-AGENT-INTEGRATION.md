# Sprachagent (ElevenLabs) mit „Klempner bestellen“ verbinden

Diese Anleitung erklärt Schritt für Schritt, wie Sie Ihren ElevenLabs-Sprachagenten (mit n8n und Google Kalender) an den Button **„Klempner bestellen“** im HomeIntel AI-Projekt anbinden.

---

## Was Sie mitbringen müssen

1. **ElevenLabs-Account** mit einem konfigurierten **Conversational AI Agent** (Ihr Klempner-Termin-Agent).
2. **Agent-ID** oder **Shareable Page URL** aus dem ElevenLabs-Dashboard.
3. (Bereits erledigt: n8n + Google Kalender Anbindung an den Agent.)

---

## Schritt-für-Schritt

### 1. Agent im ElevenLabs-Dashboard vorbereiten

1. Gehen Sie zu [ElevenLabs → Agents](https://elevenlabs.io/app/agents/dashboard).
2. Wählen Sie Ihren Klempner-Termin-Agent.
3. Unter **Advanced** → **Authentication**: **deaktivieren** (Widget braucht öffentlichen Agent ohne Auth).
4. Unter **Security** → **Allowlist** (optional): Ihre Website-Domain eintragen (z. B. `localhost`, `homeintel.vercel.app`), damit nur Ihre Seite den Agent nutzen kann.

### 2. URL oder Agent-ID holen

**Option A – Shareable Page (einfach)**  
- Im Agent-Dashboard: **Deploy** / **Widget** → **Shareable page**.  
- URL kopieren (z. B. `https://elevenlabs.io/app/convai/...`).

**Option B – Embed (Agent auf Ihrer Seite)**  
- Im Agent-Dashboard: **Deploy** / **Widget** → **Embed**.  
- Dort finden Sie die **Agent-ID** (z. B. eine Zeichenkette wie `abc123...`). Diese kopieren.

### 3. Umgebungsvariablen im Projekt setzen

Im Projektordner eine Datei `.env.local` anlegen (falls noch nicht vorhanden) und **eine** der beiden Optionen eintragen:

**Nur Option A (neuer Tab):**
```env
NEXT_PUBLIC_ELEVENLABS_VOICE_AGENT_URL=https://elevenlabs.io/app/convai/Ihre-Shareable-URL
```

**Nur Option B (Modal auf der Seite):**
```env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=Ihre-Agent-ID-aus-dem-Dashboard
```

- Wenn **beide** gesetzt sind, hat die **URL Vorrang** (Klick öffnet dann immer einen neuen Tab).
- Datei `.env.example` im Projekt zeigt die Variablennamen zur Orientierung.

### 4. Server neu starten

Nach Änderungen an `.env.local` den Next.js-Dev-Server neu starten:

```bash
npm run dev
```

### 5. Verhalten prüfen

1. Auf der Website ein Foto hochladen, das zu **„Mittel“** oder **„Gig-Worker“** führt (z. B. Dateiname mit `middle` oder `siphon`), damit die Analyse **„Klempner bestellen“** anzeigt.
2. Auf **„Klempner bestellen“** klicken:
   - **Mit Shareable URL:** Es öffnet sich ein neuer Tab mit Ihrem ElevenLabs-Agent.
   - **Mit Agent-ID:** Es öffnet sich ein Modal auf der Seite mit dem Sprachagenten (deutsche Texte: „Gespräch starten“, „Termin vereinbaren“ usw.).
3. Mit dem Agent sprechen und z. B. einen Termin vereinbaren – Ihr n8n-/Kalender-Flow sollte wie gewohnt laufen.

---

## Wo der Button erscheint

Der Button **„Klempner bestellen“** wird angezeigt, wenn:

- die Analyse fertig ist und  
- das Ergebnis **„Gig-Worker“** ist (z. B. Schwere **Mittel** – undichter Abfluss/Siphon).

Für **„Profi“** (z. B. Rohrbruch/extrem) zeigt die App aktuell die Meldung „Projekt beim Fachbetrieb angelegt“. Wenn Sie dort ebenfalls den Sprachagenten anbieten möchten, kann man einen zweiten CTA ergänzen.

---

## Sprache auf der Website

Alle sichtbaren Texte der Integration sind auf Deutsch (Button „Klempner bestellen“, Modal-Titel „Termin mit Sprachassistent vereinbaren“, Hinweistext unter dem Widget). Die Widget-Texte („Gespräch starten“, „Höre zu…“ usw.) sind in der Integration ebenfalls auf Deutsch gesetzt.

---

## Übersicht: Was Sie angeben müssen

| Was Sie angeben | Wo (ElevenLabs) | Wo (Projekt) |
|-----------------|-----------------|--------------|
| Shareable Page URL | Deploy → Widget → Shareable page | `.env.local`: `NEXT_PUBLIC_ELEVENLABS_VOICE_AGENT_URL=...` |
| Agent-ID (Embed) | Deploy → Widget → Embed / Agent-Einstellungen | `.env.local`: `NEXT_PUBLIC_ELEVENLABS_AGENT_ID=...` |

Mit einem der beiden Werte ist die Verbindung zwischen **„Klempner bestellen“** und Ihrem Voice-Agent hergestellt; der Rest (n8n, Google Kalender) bleibt unverändert.
