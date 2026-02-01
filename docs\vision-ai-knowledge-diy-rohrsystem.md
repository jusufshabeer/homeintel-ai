# Vision-AI Wissensbasis: DIY Armatur / Rohrsystem / Perlator

Dieses Dokument sammelt typische Fragen, Begriffe und Kontexte aus Foren, Reddit und YouTube, damit die Vision AI lernen kann: Bei „easy“-Fällen geht es nicht nur um den Perlator, sondern um den **ganzen Armatur-/Rohrbereich**. Für RAG, Fine-Tuning oder Prompt-Kontext nutzbar.

---

## 1. Typische Suchbegriffe & Forum-Fragen (zum Befüllen der AI)

### Reddit / r/HomeImprovement, r/Plumbing, r/DIY
- "Water pressure low at kitchen faucet" → oft Perlator verstopft oder Auslauf verkalkt
- "Faucet head won't come off" → Perlator/Auslauf fest, Rohrsystem unter Armatur prüfen
- "Brause tropft nach dem Duschen" → Dichtung Armatur, nicht nur Perlator
- "Wasserhahn sprudelt nicht mehr gleichmäßig" → Kalk im Perlator oder im Auslauf
- "Wie wechsel ich den Perlator?" → Nutzer meint oft ganzen Strahlregler + Dichtung, manchmal Auslauf
- "Armatur undicht wo anfangen?" → System: Ventile, Schläuche, Auslauf, Perlator
- "Kalk im Wasserhahn was tun?" → Entkalken oder tauschen: Perlator, Siebe, ggf. Auslauf
- "Faucet aerator stuck" → Rohrzange, WD-40, Gewinde nicht beschädigen (ganzer Bereich)
- "Strahlregler wechseln Anleitung" → Gewinde prüfen (M24, M22), Dichtung mit tauschen

### YouTube (typische Titel / Suchanfragen)
- "Perlator wechseln ohne Klempner"
- "Wasserhahn reparieren Kalk entfernen"
- "Armatur austauschen oder nur Perlator?"
- "Faucet aerator replacement entire assembly"
- "Wie oft Perlator tauschen – wann ganze Armatur?"
- "Rohr unter Spüle undicht" → Kontext: Siphon, Flexschlauch, oder Anschluss Armatur

### Deutsche Foren (z. B. Hausjournal, Frag-Mutti, Wer-weiss-was)
- "Wasserhahn tropft – Perlator oder Ventil?"
- "Kalkablagerung Armatur – nur Reinigung oder Teile tauschen?"
- "Welche Dichtungen brauche ich für Mischbatterie?"
- "Auslauf tauschen bei Einhebelmischer"
- "Rohrsystem Spüle – was kann ich selbst machen?"
- "Perlator festgerostet – Armatur beschädigt?"

---

## 2. Was die Vision AI unterscheiden soll (nicht nur „Perlator“)

| Erkennung auf dem Foto | Mögliche Maßnahme (DIY) | Hinweis für AI |
|------------------------|--------------------------|----------------|
| Nur Perlator/Strahlregler sichtbar | Perlator + Dichtung tauschen | Einfach |
| Auslauf (ganzes Rohr vorne) verkalkt/defekt | Perlator + Auslauf-Bereich, Dichtungen | Einfach–Mittel |
| Armatur-Oberteil (Griff, Kartusche) undicht | Kartusche/Dichtungen oder Fachbetrieb | Mittel |
| Rohre unter der Spüle, Anschlüsse | Siphon, Flexschläuche, Anschlüsse prüfen | Mittel |
| Riss im Rohr, Wasser läuft raus | Nicht DIY – Profi | Hoch |

**Lernziel für Vision AI:**  
Bei „easy“-Fällen: **Rohrsystem / Armatur-Bereich** (Perlator, Auslauf, Dichtungen) als Einheit verstehen – nicht nur „Perlator ersetzen“. Ersatzteilliste und Anleitung entsprechend breiter anlegen (Perlator, Dichtungen, ggf. Auslauf-Teile).

---

## 3. Begriffe für bessere Bilderkennung (Keywords)

- **Perlator, Strahlregler, Aerator, Brausekopf** (am Ende des Auslaufs)
- **Auslauf, Wasserlauf, Spülturm** (Rohr von Armatur bis Perlator)
- **Armatur, Mischbatterie, Einhebelmischer, Zweigriff**
- **Rohrsystem:** Anschlüsse, Flexschlauch, Steckverbindung, Siphon
- **Kalk, Verkalkung, Kalkablagerung**
- **Dichtung, O-Ring, Gewindedichtung**
- **Tropfen, undicht, schwacher Strahl, ungleichmäßig**

---

## 4. Quellen zum Nachpflegen (für echte Foren-/Reddit-/YouTube-Daten)

- **Reddit:** r/Plumbing, r/HomeImprovement, r/DIY – Suche: "faucet", "aerator", "perlator", "low water pressure", "drip"
- **YouTube:** Suche "Perlator wechseln", "Wasserhahn reparieren", "faucet aerator replacement"
- **Foren:** Hausjournal.de, Frag-Mutti, Wer-weiss-was – Themen Armatur, Wasserhahn, Kalk
- **Produktdaten:** Hersteller (Grohe, Hansgrohe, etc.) – Ersatzteilkataloge „Auslauf“, „Perlator“, „Dichtungsset“

Wenn die Vision AI später mit echten APIs (z. B. Embeddings + RAG) gefüttert wird: Diese Abschnitte als Chunks einlesen oder als Few-Shot-Beispiele in Prompts nutzen.
