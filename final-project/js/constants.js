export const TILE_SIZE = 1;
export const PLOT_POINT_RADIUS = 5;

export const C1_BG_COLOR = [243, 195, 195]; // rgb colors
export const C2_BG_COLOR = [207, 246, 199]; // rgb colors
export const C1_COLOR = '#d10606';
export const C2_COLOR = '#029902';

export const HYPER_PARAM_TYPES = {
  NUMBER: 'number',
  ENUM: 'enum',
  RANGE: 'range'
};

export const UPLOAD_MAX_SIZE = 1000000; //1 megabyte

export const CONF_MAT_COL_SCHEME = [10, 50, 128]; //color scheme of confusion matrix in rgb
export const CLF_REPORT_COL_SCHEME = [140, 10, 50]; //color scheme of classification report in rgb

export const EPSILON = 0.00001; // for avoiding NaN and inifinity during division or logarithm

export const VIS_ANIM_SPEED = 3; // how quickly to visualize colored decision boundary
export const UPLOAD_ANIM_TIME = 20; // time delay to add points when uploading or randomly generating

export const datasets = ['3linear', 'blobs', 'dense', 'linear', 'non-linear', 'spiral'];
export const GEN_DATASET_NOISE = 10; //upper limit of noise to be added to generated dataset
