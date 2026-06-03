export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { category, difficulty } = req.body;

  const prompt = `Génère une question de culture générale en français sur le thème : "${category}". Difficulté : ${difficulty}. Retourne UNIQUEMENT un JSON valide (sans markdown, sans explication) avec cette structure exacte : {"question": "La question ici ?", "answers": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"], "correct": 0, "explanation": "Explication courte."}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    let text = '';
    if (data && data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block && block.type === 'text' && block.text) {
          text += block.text;
        }
      }
    } else {
      return res.status(500).json({ error: 'Réponse API invalide' });
    }

    text = text.replace(/```json|```/g, '').trim();
    const question = JSON.parse(text);
    while (question.answers.length < 4) question.answers.push('— Sans réponse —');
    if (typeof question.correct !== 'number') question.correct = 0;
    return res.status(200).json(question);
  } catch (err) {
    console.error('Erreur:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
