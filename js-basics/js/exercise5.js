function transform(collection, transFunc) {
  var newArray = [];
  for (var i = 0; i < collection.length; i++) {
    newArray[i] = transFunc(collection[i]);
  }
  return newArray;
}
console.log(
  transform([1, 2, 3, 4], function (num) {
    return num * 2;
  })
);
