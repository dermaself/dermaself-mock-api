export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Simula un delay (come una vera API)
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

  // Mock response realistica
  const ageRange = req.body?.ageRange || req.body?.age_range || 'unknown';
  const gender = req.body?.gender || 'unknown';

  const metrics = generateMetrics(ageRange, gender);
  const benchmarks = generateBenchmarks(ageRange, gender);

  res.status(200).json({
    metrics,
    benchmarks,
    priorityCondition: metrics.wrinkles > 60 ? 'wrinkles' : 'acne',
    acneClassification: {
      acneType: ['no_acne', 'comedonal', 'inflammatory'][Math.floor(Math.random() * 3)],
      acneSeverity: ['none', 'mild', 'moderate', 'severe'][Math.floor(Math.random() * 4)],
      erythema: Math.random() > 0.5,
    },
    recommendations: generateRecommendations(),
  });
}

function generateMetrics(ageRange, gender) {
  const baseScore = ageRange?.includes('25') || ageRange?.includes('35') ? 60 : 70;
  return {
    wrinkles: baseScore + Math.random() * 30,
    acne: Math.random() * 100,
    spots: Math.random() * 80,
    redness: Math.random() * 60,
    dryness: Math.random() * 70,
    oiliness: Math.random() * 65,
    texture: Math.random() * 75,
    elasticity: baseScore + Math.random() * 20,
    radiance: baseScore + Math.random() * 25,
    smoothness: baseScore + Math.random() * 30,
  };
}

function generateBenchmarks(ageRange, gender) {
  const baseScore = ageRange?.includes('25') || ageRange?.includes('35') ? 75 : 80;
  return {
    wrinkles: baseScore,
    acne: 50,
    spots: 40,
    redness: 30,
    dryness: 40,
    oiliness: 45,
    texture: baseScore,
    elasticity: baseScore,
    radiance: baseScore + 10,
    smoothness: baseScore,
  };
}

function generateRecommendations() {
  return {
    user: { firstName: 'User', gender: 'F' },
    scoreField: 'score',
    skincareRoutine: [
      {
        category: 'cleansing',
        modules: [
          {
            module: 'cleanser',
            stepNumber: 1,
            mainProduct: {
              productId: 101,
              productName: 'Gentle Hydrating Cleanser',
              brand: 'Dermaself',
              bestPrice: 24.99,
              score: 95,
              fit: 5,
            },
          },
        ],
      },
      {
        category: 'treatment',
        modules: [
          {
            module: 'serum',
            stepNumber: 2,
            mainProduct: {
              productId: 201,
              productName: 'Vitamin C Serum',
              brand: 'Dermaself',
              bestPrice: 49.99,
              score: 92,
              fit: 4,
            },
          },
        ],
      },
    ],
    recommendationsVersion: 2,
  };
}
