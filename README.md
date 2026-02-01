# HomeIntel AI

Upload a photo or short video of a home issue (e.g. plumbing, pipe damage). Get an AI assessment and a suggested path: **DIY**, **Video-Support (Gig-Worker)**, or **Profi**. Optional voice agent for booking a plumber (ElevenLabs).

---

## What it does

- **Upload** — Drag & drop or choose a photo or video.
- **Analyze** — Severity (low / medium / high) and repair route (DIY, Gig-Worker, Profi).
- **Blur check** — Asks for a clearer photo if the image is too blurry.
- **Video** — If the video can't be analyzed, it suggests uploading photos instead.
- **Voice agent** — Optional "Klempner bestellen" (book plumber) via ElevenLabs; see [Voice Agent docs](docs/VOICE-AGENT-INTEGRATION.md).

---

## Tech stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** · **Framer Motion** · **Lucide** · **react-markdown**
- **Image analysis** uses the **OpenAI Vision API** (GPT-4o) via `src/lib/analyzeDamage.ts` and `src/app/api/analyze/route.ts`. Blur detection and damage assessment are done from the actual image content, not the filename. An `OPENAI_API_KEY` is required (see [Quick start](#quick-start)).

---

## Quick start

**Prerequisites:** Node.js 18+ (LTS recommended).  
If `npm` is not found, see [SETUP.md](docs/SETUP.md) for install steps.

```bash
git clone <repo-url>
cd homeintel-ai
npm install
npm run dev
```

Open **http://localhost:3000**.

### Image analysis (OpenAI Vision API)

For real damage and blur analysis, set your OpenAI API key:

1. Copy `.env.example` to `.env.local` if you don’t have it yet.
2. In `.env.local`, set:
   ```bash
   OPENAI_API_KEY=your-openai-api-key
   ```
3. Restart the dev server. Image uploads are then analyzed by the OpenAI Vision API (GPT-4o).

Without `OPENAI_API_KEY`, the analyze API returns an error and the app falls back to a default result.

### Optional: Voice agent (ElevenLabs)

Copy `.env.example` to `.env.local` and set either:

- `NEXT_PUBLIC_ELEVENLABS_VOICE_AGENT_URL` (shareable page, opens in new tab), or  
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` (embed in a modal on the page).

Details: [docs/VOICE-AGENT-INTEGRATION.md](docs/VOICE-AGENT-INTEGRATION.md).

---

## Scripts

| Command       | Description        |
|--------------|--------------------|
| `npm run dev`  | Start dev server   |
| `npm run build`| Production build   |
| `npm run start`| Run production     |
| `npm run lint` | Run ESLint         |

---

## Project structure

```
src/
├── app/           # layout, page, globals
│   └── api/analyze/   # POST /api/analyze — OpenAI Vision API for image analysis
├── components/    # ResultView, BlurResultView, PhotoAngleTile, VoiceAgentModal, UI, etc.
└── lib/           # analyzeDamage (calls API), types, utils, voiceAgentConfig, mockGuides
docs/              # VOICE-AGENT-INTEGRATION.md, SETUP.md, vision-ai-knowledge-diy-rohrsystem.md
public/image/      # Static images (tips, results, pipe angles)
```

---

## License

Private project.
