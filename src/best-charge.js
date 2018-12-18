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

function orderObj(allItemsArr, inputArr) {
  let allOrderMessageArr = [];
  for (let i = 0; i < allItemsArr.length; i++) {
    if (judgeElementInArr(inputArr[0], allItemsArr[i].id)) {
      let index = inputArr[0].indexOf(allItemsArr[i].id);
      allItemsArr[i].count = inputArr[1][index];
      allItemsArr[i].itemSum = inputArr[1][index] * allItemsArr[i].price;
      allOrderMessageArr.push(allItemsArr[i]);
    }
  }
  return allOrderMessageArr;
}