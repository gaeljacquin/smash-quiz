export default function calculateScore(answers: string[], selection: string[]) {
  const score = selection.filter((fighter) =>
    answers.includes(fighter)
  );

  return score.length;
}
