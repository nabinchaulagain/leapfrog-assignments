export function accuracy(preds, labels) {
  let correct = 0;
  for (let i = 0; i < preds.length; i++) {
    if (preds[i] === labels[i]) {
      correct++;
    }
  }
  return (correct / preds.length) * 100;
}

export function crossEntropy(preds, labels) {
  const [rows] = preds.shape;
  let result = 0;
  for (let i = 0; i < rows; i++) {
    const pred = preds.data[i][0];
    const label = labels.data[i][0];
    result += label * Math.log(pred) + (1 - label) * Math.log(1 - pred);
  }
  return result;
}
