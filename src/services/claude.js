const rules = [
  {
    keywords: ['case study', 'portfolio', 'research', 'interview', 'synthesis', 'ux', 'findings', 'qualitative', 'user research'],
    skills: [
      {
        name: 'NotebookLM',
        category: 'AI',
        rationale: 'Upload your transcripts and research sources — it finds the patterns and themes so you are not doing it manually.',
        estimatedHours: 3,
      },
      {
        name: 'Claude for analysis',
        category: 'AI',
        rationale: 'Builds a structured analysis workflow with verification layers so your findings are rigorous, not just fast.',
        estimatedHours: 4,
      },
    ],
  },
  {
    keywords: ['website', 'portfolio site', 'personal site', 'web', 'landing page', 'online presence', 'build'],
    skills: [
      {
        name: 'Vibe coding',
        category: 'AI',
        rationale: 'Describe what you want to build and watch it appear — no framework knowledge required.',
        estimatedHours: 4,
      },
      {
        name: 'Claude Code',
        category: 'AI',
        rationale: 'Your personal developer that writes, debugs, and deploys — you just tell it what you need.',
        estimatedHours: 5,
      },
    ],
  },
  {
    keywords: ['presentation', 'deck', 'slides', 'pitch', 'capstone', 'report', 'communicate'],
    skills: [
      {
        name: 'NotebookLM',
        category: 'AI',
        rationale: 'Condenses your sources into the three points your deck actually needs — no more staring at a blank slide.',
        estimatedHours: 3,
      },
      {
        name: 'AI image generation',
        category: 'AI',
        rationale: 'Creates visuals that match your narrative — faster and more specific than stock photos.',
        estimatedHours: 2,
      },
    ],
  },
  {
    keywords: ['automate', 'automation', 'workflow', 'productivity', 'repetitive', 'process', 'tool', 'script', 'agent'],
    skills: [
      {
        name: 'AI agents with n8n',
        category: 'AI',
        rationale: 'Builds automated flows that do the repetitive work for you — runs in the background without you touching it.',
        estimatedHours: 5,
      },
      {
        name: 'Claude Code',
        category: 'AI',
        rationale: 'Turns your workflow idea into a working tool without needing a developer.',
        estimatedHours: 4,
      },
    ],
  },
  {
    keywords: ['image', 'visual', 'illustration', 'graphic', 'creative', 'art', 'design asset', 'brand', 'identity'],
    skills: [
      {
        name: 'AI image generation',
        category: 'AI',
        rationale: 'Generates exactly the visual you have in your head — without needing illustration skills.',
        estimatedHours: 3,
      },
      {
        name: 'Midjourney prompting',
        category: 'AI',
        rationale: 'Learning to prompt well is the difference between generic output and something that actually looks like you.',
        estimatedHours: 4,
      },
    ],
  },
  {
    keywords: ['video', 'film', 'edit', 'reel', 'content', 'motion', 'animation', 'explainer'],
    skills: [
      {
        name: 'AI video generation',
        category: 'AI',
        rationale: 'Turns your script or images into moving content without a production setup.',
        estimatedHours: 4,
      },
      {
        name: 'AI image generation',
        category: 'AI',
        rationale: 'Creates the visual assets your video needs — faster than sourcing or shooting them.',
        estimatedHours: 2,
      },
    ],
  },
  {
    keywords: ['write', 'writing', 'content', 'copy', 'article', 'blog', 'essay', 'document', 'narrative'],
    skills: [
      {
        name: 'Claude for writing',
        category: 'AI',
        rationale: 'Structures your thinking and drafts with your voice — you edit, it does the heavy lifting.',
        estimatedHours: 3,
      },
      {
        name: 'NotebookLM',
        category: 'AI',
        rationale: 'Pulls from your source material so what you write is grounded, not generic.',
        estimatedHours: 2,
      },
    ],
  },
  {
    keywords: ['product', 'pm', 'product manager', 'roadmap', 'feature', 'spec', 'requirements', 'user story', 'prioritise'],
    skills: [
      {
        name: 'AI agents with n8n',
        category: 'AI',
        rationale: 'Automates the research and synthesis tasks that eat your PM time so you can focus on decisions.',
        estimatedHours: 4,
      },
      {
        name: 'Claude for analysis',
        category: 'AI',
        rationale: 'Analyses user feedback, synthesises patterns, and drafts specs with the rigour of a senior researcher.',
        estimatedHours: 3,
      },
    ],
  },
  {
    keywords: ['app', 'prototype', 'mvp', 'interface', 'ui', 'interaction', 'experience'],
    skills: [
      {
        name: 'Vibe coding',
        category: 'AI',
        rationale: 'Gets you from idea to interactive prototype in hours — no dev handoff needed.',
        estimatedHours: 5,
      },
      {
        name: 'AI image generation',
        category: 'AI',
        rationale: 'Creates UI assets and mockup visuals on demand — faster than Figma for early exploration.',
        estimatedHours: 3,
      },
    ],
  },
]

const FALLBACK = [
  {
    name: 'Claude for analysis',
    category: 'AI',
    rationale: 'The fastest way to go from scattered information to structured insight — whatever your project needs.',
    estimatedHours: 3,
  },
  {
    name: 'AI image generation',
    category: 'AI',
    rationale: 'Creates the visual layer your project needs without slowing you down.',
    estimatedHours: 2,
  },
]

export async function suggestSkills(project) {
  await new Promise(resolve => setTimeout(resolve, 1500))

  const haystack = `${project.title} ${project.goal}`.toLowerCase()

  const match = rules.find(rule =>
    rule.keywords.some(kw => haystack.includes(kw))
  )

  return match ? match.skills : FALLBACK
}
