export function fuzzyScore(query: string, text: string): number | null {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return 0;
  const target = text.toLowerCase();
  let qi = 0;
  let score = 0;
  let consecutive = 0;
  let lastIndex = -1;

  for (let ti = 0; ti < target.length && qi < q.length; ti++) {
    if (target[ti] === q[qi]) {
      const gap = ti - lastIndex;
      if (lastIndex >= 0 && gap > 1) {
        score -= gap;
      }
      if (gap === 1) {
        consecutive += 1;
        score += consecutive * 2;
      } else {
        consecutive = 0;
        score += 1;
      }
      if (ti === 0 || /[\s-_]/.test(target[ti - 1] ?? "")) {
        score += 3;
      }
      lastIndex = ti;
      qi += 1;
    }
  }

  return qi === q.length ? score : null;
}

export type FuzzyMatchable = {
  label: string;
  keywords?: string;
};

export function fuzzyFilterItems<T extends FuzzyMatchable>(
  items: readonly T[],
  query: string,
): T[] {
  const trimmed = query.trim();
  if (trimmed.length === 0) return [...items];

  return items
    .map((item) => {
      const labelScore = fuzzyScore(trimmed, item.label) ?? -1;
      const keywordScore = item.keywords
        ? (fuzzyScore(trimmed, item.keywords) ?? -1)
        : -1;
      return { item, score: Math.max(labelScore, keywordScore) };
    })
    .filter((row) => row.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((row) => row.item);
}
