import Matrix from '../utils/Matrix.js';

class ClassificationAlgorithm {
  static requiresFeatureScaling = false;
  static requiresDesignMatrix = false;
  static hyperParamDefinition = {};

  /**
   * returns predictions of given features
   * @param {Matrix} X - feature matrix
   * @returns {Matrix} predictions
   */
  predictMany(X) {
    let result = X.data.map((feature) => this.predict(feature));
    return new Matrix([result]).transpose();
  }
}
export default ClassificationAlgorithm;
