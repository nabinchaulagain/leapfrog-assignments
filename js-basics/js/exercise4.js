function searchByName(items, name) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.name.toLowerCase() === name.toLowerCase()) {
      return item;
    }
  }
}
var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];
console.log(searchByName(fruits, "Apple"));

// function searchByKey(items, value, key) {
//   for (var i = 0; i < items.length; i++) {
//     var item = items[i];
//     if (typeof item[key] === "string" && typeof value === "string") {
//       if (item[key].toLowerCase() === value.toLowerCase()) {
//         return item;
//       }
//     }
//     if (item[key] === value) {
//       return item;
//     }
//   }
// }
// console.log(searchByKey(fruits, 1, "id"));
