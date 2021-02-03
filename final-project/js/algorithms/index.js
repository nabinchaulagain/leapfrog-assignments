import KNearestNeigbors from './KNearestNeighbors.js';
import LogisticRegression from './LogisticRegression.js';
import MultiLayerPerceptron from './MultiLayerPerceptron.js';
import DecisionTree from './DecisionTree.js';
import RandomForest from './RandomForest.js';
import Adaboost from './Adaboost.js';

const algorithms = {
  'Logistic regression': LogisticRegression,
  'Multi-layer perceptron': MultiLayerPerceptron,
  'K-nearest neighbors': KNearestNeigbors,
  'Decision tree': DecisionTree,
  'Random Forest': RandomForest,
  Adaboost
};

export default algorithms;
