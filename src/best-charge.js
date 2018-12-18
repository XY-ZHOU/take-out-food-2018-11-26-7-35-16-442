function bestCharge(selectedItems) {
  return /*TODO*/;
}

function transformSelectedItems(selectedItems) {
  let inputArr = [],
    itemArr = [],
    countArr = [];
  for (let i = 0; i < selectedItems.length; i++) {
    let itemId = selectedItems[i].slice(0, selectedItems[i].indexOf("x") - 1);
    let count = selectedItems[i].slice(selectedItems[i].indexOf("x") + 1);
    itemArr.push(itemId);
    countArr.push(count);
  }
  inputArr.push(itemArr);
  inputArr.push(countArr);
  return inputArr;
}