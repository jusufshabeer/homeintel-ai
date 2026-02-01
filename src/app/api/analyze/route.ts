import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ANALYSIS_SYSTEM_PROMPT = `You are an expert that analyzes photos of home plumbing and pipe damage. For each image, respond with a JSON object only (no markdown, no code block), with these exact keys:

- blur: boolean — true if the image is too blurry, out of focus, or unclear to assess; false otherwise.
- severity: "low" | "medium" | "high" — how serious the damage is (low = minor/DIY, medium = may need a gig worker, high = professional/plumber).
- type: "DIY" | "Gig-Worker" | "Profi" — suggested path: DIY for faucet/aerator/calcification, Gig-Worker for drain/siphon/leaks, Profi for pipe burst/water damage.
- description: string — short German description of what you see (e.g. "Kalkablagerung / Armatur-Bereich (Rohrsystem)").
- repairStyle: string — e.g. "iFixit", "Video-Support", "Plancraft".
- action: string (optional) — only if type is "Profi", e.g. "Push to Plancraft".

Guidelines:
- If the image is blurry or unreadable, set blur: true and use sensible defaults for the rest.
- DIY: faucet, aerator, perlator, calcification, minor leaks at fittings.
- Gig-Worker: siphon, drain, moderate leaks, parts that need disassembly.
- Profi: pipe burst, major water damage, structural, or when in doubt for safety.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not set in environment" },
      { status: 500 }
    );
  }

  let file: File;
  try {
    const formData = await request.formData();
    const uploaded = formData.get("image");
    if (!uploaded || !(uploaded instanceof File)) {
      return NextResponse.json(
        { error: "Missing or invalid 'image' file in request" },
        { status: 400 }
      );
    }
    file = uploaded;
  } catch {
    return NextResponse.json(
      { error: "Failed to parse form data" },
      { status: 400 }
    );
  }

  const type = file.type ?? "";
  if (!type.startsWith("image/")) {
    return NextResponse.json(
      { error: "File must be an image" },
      { status: 400 }
    );
  }

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const mime = type || "image/jpeg";
  const dataUrl = `data:${mime};base64,${base64}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 500,
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and respond with a single JSON object only.",
            },
            {
              type: "image_url",
              image_url: { url: dataUrl },
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) {
      return NextResponse.json(
        { error: "Empty response from vision API" },
        { status: 502 }
      );
    }

    // Strip optional markdown code fence
    const jsonStr = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
    const parsed = JSON.parse(jsonStr) as {
      blur?: boolean;
      severity?: "low" | "medium" | "high";
      type?: "DIY" | "Gig-Worker" | "Profi";
      description?: string;
      repairStyle?: string;
      action?: string;
    };

    if (parsed.blur === true) {
      return NextResponse.json({ blur: true });
    }

    const result = {
      severity: parsed.severity ?? "low",
      type: parsed.type ?? "DIY",
      description: parsed.description ?? "Kalkablagerung / Armatur-Bereich (Rohrsystem)",
      repairStyle: parsed.repairStyle ?? "iFixit",
      ...(parsed.type === "Profi" && parsed.action
        ? { action: parsed.action }
        : {}),
    };
    return NextResponse.json(result);
  } catch (err) {
    console.error("Vision API error:", err);
    const message = err instanceof Error ? err.message : "Vision API failed";
    return NextResponse.json(
      { error: message },
      { status: 502 }
    );
  }
}
