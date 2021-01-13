var input = {
  1: {
    id: 1,
    name: "John",
    children: [
      { id: 2, name: "Sally" },
      { id: 3, name: "Mark", children: [{ id: 4, name: "Harry" }] },
    ],
  },
  5: {
    id: 5,
    name: "Mike",
    children: [{ id: 6, name: "Peter" }],
  },
};
function normalizeEntity(obj, entity) {
  var newEntity = Object.assign({}, entity);
  var childrenIds = [];
  if (entity.children) {
    for (var i = 0; i < entity.children.length; i++) {
      childrenIds.push(entity.children[i].id);
      obj[entity.children[i].id] = normalizeEntity(obj, entity.children[i]);
    }
  }
  newEntity.children = childrenIds;
  return newEntity;
}

function normalize(obj) {
  var newObj = {};
  var objKeys = Object.keys(obj);
  for (var i = 0; i < objKeys.length; i++) {
    var key = objKeys[i];
    var entity = obj[key];
    newObj[key] = normalizeEntity(newObj, entity);
  }
  return newObj;
}
