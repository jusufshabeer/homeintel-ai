/**
 * Konfiguration für den ElevenLabs-Sprachagenten (Klempner-Termin).
 * Entweder Shareable-URL ODER Agent-ID setzen – siehe docs/VOICE-AGENT-INTEGRATION.md
 */

const VOICE_AGENT_URL = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_AGENT_URL ?? "";
const VOICE_AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? "";

export const voiceAgentConfig = {
  /** Öffnet den Sprachagenten in neuem Tab (Shareable Page URL aus dem ElevenLabs-Dashboard) */
  shareableUrl: VOICE_AGENT_URL.trim() || null,
  /** Embed-Modus: Agent-ID für das Widget (aus dem ElevenLabs-Dashboard) */
  agentId: VOICE_AGENT_ID.trim() || null,
};

export const hasVoiceAgent =
  Boolean(voiceAgentConfig.shareableUrl) || Boolean(voiceAgentConfig.agentId);
