module.exports.decifrarInvString = (s) => {
  if (typeof s != "string") return;
  var items = s.split("/");
  var quantity = s.split(".");
  var c = 0;
  var itemsnew = [];
  for (let i = 1; i < items.length; i += 2) {
    itemsnew[c] = items[i];
    c++;
  }

  c = 0;
  var quantitynew = [];
  for (let i = 1; i < quantity.length; i += 2) {
    quantitynew[c] = quantity[i];
    c++;
  }

  quantity = quantitynew;
  items = itemsnew;

  return { items, quantity };
};
