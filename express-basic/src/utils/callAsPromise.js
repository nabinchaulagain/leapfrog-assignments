const callAsPromise = (func, ...args) => {
  return new Promise((resolve, reject) => {
    func(...args, (err, resolveData) => {
      if (err) {
        reject(err);
      }
      resolve(resolveData);
    });
  });
};

module.exports = callAsPromise;
