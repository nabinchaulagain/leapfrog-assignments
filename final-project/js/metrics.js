function accuracy(preds, labels) {
  let correct = 0;
  for (let i = 0; i < preds.length; i++) {
    if (preds[i] === labels[i]) {
      correct++;
    }
  }
  return (correct / preds.length) * 100;
}

function crossEntropy(preds, labels) {
  let result = 0;
  for (let i = 0; i < preds.length; i++) {
    const pred = preds[i];
    const label = labels[i];
    result += label * Math.log(pred) + (1 - label) * Math.log(1 - pred);
  }
  return result;
}
