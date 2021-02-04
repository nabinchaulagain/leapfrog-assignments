import { datasets, GEN_DATASET_NOISE } from '../constants.js';

/**
 *  generate random number in range
 * @param {number} min - mininum
 * @param {numer} max - maximum
 * @returns {number} random number
 */
export const random = (min, max) => Math.random() * (max - min) + min;

/**
 * generate random integer
 * @param {number} min - minimum
 * @param {number} max - maximum
 */
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * returns random dataset
 * @returns {Promise} promise that resolves to an  object having properties 'features' and 'labels'
 */
export async function genRandomDataset() {
  const randomDataset = datasets[randomInt(0, datasets.length - 1)];
  const response = await fetch(`assets/data/${randomDataset}.json`);
  const data = await response.json();
  data.features = data.features.map((row) => row.map((val) => val + random(-GEN_DATASET_NOISE, GEN_DATASET_NOISE))); // add random noise to each feature val
  return data;
}
