# HomeIntel AI – Setup

## Fehler: "npm wurde nicht als Name eines Cmdlet erkannt"

Das bedeutet: **Node.js** ist nicht installiert oder nicht in der PATH.

### 1. Node.js installieren (Windows)

1. Öffne **https://nodejs.org**
2. Lade die **LTS-Version** herunter (z.B. "20.x LTS")
3. Installiere mit den Standardeinstellungen (Haken bei **"Add to PATH"** setzen)
4. **Cursor/VS Code und alle geöffneten Terminals schließen und neu starten**

### 2. Prüfen, ob es funktioniert

Neues Terminal öffnen (PowerShell oder CMD) und ausführen:

```powershell
node -v
npm -v
```

Es sollten Versionsnummern erscheinen (z.B. `v20.x.x` und `10.x.x`).

### 3. Projekt starten

Im Projektordner:

```powershell
cd C:\Users\Neu\homeintel-ai
npm install
npm run dev
```

Danach im Browser **http://localhost:3000** öffnen.

### Wenn Node schon installiert ist, aber npm trotzdem nicht gefunden wird

- **Terminal neu öffnen** (nach der Node-Installation)
- Oder **Cursor komplett beenden und neu starten**, damit die neue PATH übernommen wird
- Oder in einer **neuen CMD** (nicht PowerShell) testen: `Win+R` → `cmd` → `npm -v`

### Optional: Beispielbilder im Tipp „Scharfe Fotos“ (3 Winkel, Rohr)

Die drei Winkel-Beispiele (Von vorne, Seitlich, Detail nah) nutzen Bilder aus `public/image/`: `rohr-vorne.png`, `rohr-seitlich.png`, `rohr-detail.png`. Sie sind als Kopien von `easy.png`/`middle.png` angelegt – für echte Rohr-Perspektiven können Sie sie durch eigene Fotos ersetzen.
