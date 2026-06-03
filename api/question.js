export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { category, difficulty } = req.body;

  const prompt = `Génère une question de culture générale en français sur le thème : "${category}".
Difficulté : ${difficulty}.
Retourne UNIQUEMENT un JSON valide (sans markdown, sans explication) avec cette structure exacte :
{
  "question": "La question ici ?",
  "answers": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
  "correct": 0,
  "explanation": "Explication courte (1 phrase)."
}
"correct" est l'index (0-3) de la bonne réponse dans le tableau "answers".
Varie les sujets, sois précis et intéressant.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    let text = data.content.map(b => b.text || '').join('');
    text = text.replace(/```json|```/g, '').trim();
    const question = JSON.parse(text);

    return res.status(200).json(question);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur de génération' });
  }
}
