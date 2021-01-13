function sortBy(arr, key) {
  var sorted = arr.slice(0, arr.length);
  for (var i = 0; i < sorted.length; i++) {
    var minIdx = i;
    for (var j = i + 1; j < sorted.length; j++) {
      if (sorted[j][key] < sorted[minIdx][key]) {
        minIdx = j;
      }
    }
    var temp = sorted[i];
    sorted[i] = sorted[minIdx];
    sorted[minIdx] = temp;
  }
  return sorted;
}

var arr = [
  {
    id: 3,
    name: "Andrew",
  },
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
];
console.log(sortBy(arr, "name"));
