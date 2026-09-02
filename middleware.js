export async function middleware(request) {
  const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
  try {
    if (!process.env.OPENAI_API_KEY) return json({ error: "La connexion à l’aide intelligente n’est pas encore activée." }, 503);
    const { text, image, level } = await request.json();
    if (!text?.trim() && !image) return json({ error: "Ajoute une photo ou un énoncé." }, 400);
    if (image && (!image.startsWith("data:image/") || image.length > 5_000_000)) return json({ error: "La photo est trop volumineuse ou invalide." }, 400);
    const content = [{ type: "input_text", text: `Tu es un professeur patient pour un élève de niveau ${level || "collège"}. Analyse l’exercice fourni. Réponds en français simple avec exactement ces parties : 1. Ce qu’on cherche, 2. La méthode, 3. Les étapes détaillées, 4. La réponse, 5. Une petite vérification à faire seul. N’invente pas les informations illisibles : demande une photo plus nette si nécessaire. Énoncé recopié : ${text?.trim() || "voir la photo"}` }];
    if (image) content.push({ type: "input_image", image_url: image, detail: "high" });
    const apiResponse = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-5.4-mini", input: [{ role: "user", content }], max_output_tokens: 1400 }) });
    const data = await apiResponse.json();
    if (!apiResponse.ok) return json({ error: data.error?.message || "L’analyse a échoué. Réessaie dans un instant." }, apiResponse.status);
    const answer = data.output_text || data.output?.flatMap((item) => item.content || []).find((part) => part.type === "output_text")?.text;
    return answer ? json({ answer }) : json({ error: "Aucune explication n’a été reçue." }, 502);
  } catch { return json({ error: "Impossible d’analyser cet exercice pour le moment." }, 500); }
}

export const config = { matcher: "/api/aide" };
