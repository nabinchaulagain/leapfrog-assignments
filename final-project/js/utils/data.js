import { datasets, GEN_DATASET_NOISE } from '../constants.js';
import { random, randomInt } from './misc.js';

/**
 * returns random dataset
 * @returns {Promise} promise that resolves to an  object having properties 'features' and 'labels'
 */
export async function genRandomDataset() {
  console.log(randomInt(0, datasets.length - 1));
  const randomDataset = datasets[randomInt(0, datasets.length - 1)];
  const response = await fetch(`assets/data/${randomDataset}.json`);
  const data = await response.json();
  data.features = data.features.map((row) => row.map((val) => val + random(-GEN_DATASET_NOISE, GEN_DATASET_NOISE))); // add random noise to each feature val
  return data;
}
