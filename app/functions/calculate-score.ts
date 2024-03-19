export default function calculateScore(answers: string[], selection: string[]) {
  console.log(answers);
  console.log(selection);
  const score = selection.filter((fighter) =>
    answers.includes(fighter)
  );

  return score.length;
}
