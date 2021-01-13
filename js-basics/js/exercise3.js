var myInfo = {
  name: "Nabin Chaulagain",
  address: "Nayabasti",
  emails: ["chaulagainnabin9@gmail.com"],
  interests: ["MMA", "cooking"],
  education: [
    { name: "BIT", enrolledDate: new Date("2018-03-01") },
    { name: "+2 Science", enrolledDate: new Date("2016-03-01") },
    { name: "SLC", enrolledDate: new Date("2000-01-01") },
  ],
};
var educationArray = myInfo.education;
var educationKeys = Object.keys(educationArray);
for (var i = 0; i < educationKeys.length; i++) {
  var educationKey = educationKeys[i];
  var education = educationArray[educationKey];
  console.log("Name: " + education.name + ", Date: " + education.enrolledDate);
}
