# 🎮 Le Grand Quiz de Midi

Quiz de culture générale inspiré des 12 Coups de Midi, propulsé par l'IA Claude.

---

## 🚀 Déploiement sur Vercel (gratuit, 5 minutes)

### Étape 1 — Créer un compte GitHub
1. Va sur https://github.com
2. Crée un compte gratuit
3. Crée un nouveau dépôt (bouton vert "New")
   - Nom : `quiz-midi`
   - Visibilité : Public ou Private (au choix)
   - Clique "Create repository"

### Étape 2 — Uploader les fichiers
Dans ton nouveau dépôt GitHub, clique **"uploading an existing file"** et glisse-dépose :
```
quiz-midi/
├── api/
│   └── question.js
├── public/
│   └── index.html
└── vercel.json
```

### Étape 3 — Créer un compte Vercel
1. Va sur https://vercel.com
2. Clique "Sign Up" → "Continue with GitHub"
3. Autorise Vercel à accéder à GitHub

### Étape 4 — Déployer le projet
1. Dans Vercel, clique **"Add New Project"**
2. Importe ton dépôt `quiz-midi`
3. Vercel détecte automatiquement la config
4. Clique **"Deploy"** → attends 1 minute

### Étape 5 — Ajouter ta clé API Anthropic
1. Dans Vercel → ton projet → onglet **"Settings"**
2. Clique **"Environment Variables"**
3. Ajoute :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : ta clé (commence par `sk-ant-...`)
4. Clique **"Save"**
5. Va dans l'onglet **"Deployments"** → clique les 3 points → **"Redeploy"**

### Étape 6 — Partager avec tes amis !
Vercel te donne une URL du type :
`https://quiz-midi-xxxx.vercel.app`

🎉 **Copie ce lien et envoie-le à tes amis !**

---

## 🔑 Obtenir une clé API Anthropic
1. Va sur https://console.anthropic.com
2. Crée un compte
3. Clique "API Keys" → "Create Key"
4. Copie la clé (elle commence par `sk-ant-`)

> ⚠️ La clé est stockée côté serveur dans Vercel, tes amis n'y ont jamais accès.

---

## 🎮 Fonctionnalités
- Questions générées par l'IA (jamais les mêmes !)
- 6 thèmes : Histoire, Science, Géographie, Sport, Cinéma, Musique
- Minuteur 20 secondes avec alerte visuelle
- 3 vies, système de combo
- 3 jokers : 50/50, Passer, Double chance
- Record sauvegardé dans le navigateur
- 100% responsive mobile & desktop
