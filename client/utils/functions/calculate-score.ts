export default function calculateScore(answers: string[], selection: string[]) {
  const score = selection.filter((element) =>
    answers.includes(element)
  );

  return score.length;
}
