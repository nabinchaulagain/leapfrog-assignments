var numLines = 5;
for (var i = numLines; i > 0; i--) {
  var pattern = "";
  for (var j = i; j > 0; j--) {
    pattern += "*";
  }
  console.log(pattern);
}
