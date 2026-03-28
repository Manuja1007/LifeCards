export const generateStoryAI = async (data, name) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Missing VITE_GEMINI_API_KEY in .env");
    return getFallbackStory();
  }

  const { screenTime, answers, mood, focusSessions } = data;
  const moodLabels = { 5: "great", 4: "good", 3: "okay", 2: "low", 1: "bad" };
  const youtubeType = answers?.youtube_type || "unknown";
  const instagramType = answers?.instagram_type || "unknown";
  const energyLevel = answers?.energy_level || "unknown";

  const prompt = `You are a storytelling AI for a self-awareness app called LifeCards.

User Name: ${name}
Screen Time Today:
- YouTube: ${screenTime?.youtube || 0}h (content type: ${youtubeType})
- Instagram: ${screenTime?.instagram || 0}h (usage: ${instagramType})
- VS Code: ${screenTime?.vscode || 0}h
- WhatsApp: ${screenTime?.whatsapp || 0}h
Current Mood: ${moodLabels[mood] || "not logged"}
Energy Level: ${energyLevel}
Focus Sessions Completed: ${focusSessions || 0}

Write a short, emotional, personal story about ${name}'s day in exactly 5 sentences.
Each sentence should be on its own line.
Make it feel like a narrative - not a list.
Be warm, honest, slightly poetic, and motivating.
Reference the specific screen time data naturally.
End with something uplifting about tomorrow.
Do NOT use quotes or bullet points.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", result);
      throw new Error(result?.error?.message || "API request failed");
    }

    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    return lines.length > 0 ? lines : getFallbackStory();
  } catch (error) {
    console.error("AI Error:", error);
    return getFallbackStory();
  }
};

function getFallbackStory() {
  return [
    "You showed up today, and that already matters.",
    "The screens pulled you in, but you noticed.",
    "Awareness is the first step to change.",
    "Tomorrow, you'll carry this clarity forward.",
    "Your story is still being written.",
  ];
}
