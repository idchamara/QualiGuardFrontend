import { Audit, Question, Section } from '../types/audit';
export function calculateSectionScore(section: Section): number {
  let earned = 0;
  let totalPossible = 0;
  section.questions.forEach(q => {
    if (q.result === 'Pass') {
      earned += q.weight;
      totalPossible += q.weight;
    } else if (q.result === 'Fail') {
      totalPossible += q.weight;
    }
    // N/A doesn't count towards total possible
  });
  return totalPossible === 0 ? 0 : Math.round(earned / totalPossible * 100);
}
export function calculateAuditScore(sections: Section[]): {
  score: number;
  result: 'Pass' | 'Fail' | 'Pending';
} {
  let earned = 0;
  let totalPossible = 0;
  let hasSafetyFail = false;
  let isComplete = true;
  sections.forEach(section => {
    section.questions.forEach(q => {
      if (q.result === null) {
        isComplete = false;
      }
      if (q.result === 'Pass') {
        earned += q.weight;
        totalPossible += q.weight;
      } else if (q.result === 'Fail') {
        totalPossible += q.weight;
        // Check if it's a safety section question (simplified logic)
        if (section.title.toLowerCase().includes('safety')) {
          hasSafetyFail = true;
        }
      }
    });
  });
  if (!isComplete) return {
    score: 0,
    result: 'Pending'
  };
  const score = totalPossible === 0 ? 0 : Math.round(earned / totalPossible * 100);
  let result: 'Pass' | 'Fail' = 'Pass';
  if (score < 80 || hasSafetyFail) {
    result = 'Fail';
  }
  return {
    score,
    result
  };
}