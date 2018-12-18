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

function caculateDiscountType(allOrderMessage, discountType) {
  let orderContent = [];
  let sum = 0;
  let discount = 0;
  let itemName = [];
  let fullReductionDiscount;
  let finalResultObj = {};
  for (let i = 0; i < allOrderMessage.length; i++) {
    orderContent.push(allOrderMessage[i].name + ' x' + allOrderMessage[i].count + ' = ' + allOrderMessage[i].itemSum + "元");
    sum += allOrderMessage[i].itemSum;
    if (judgeElementInArr(discountType[1].items, allOrderMessage[i].id)) {
      discount += allOrderMessage[i].itemSum / 2;
      itemName.push(allOrderMessage[i].name);
    }
  }
  finalResultObj.orderContent = orderContent;
  if (sum > 30) {
    fullReductionDiscount = parseInt(sum / 30) * 6;
  }
  if (sum < 30) {
    if (!discount) {
      finalResultObj.finalCharge = sum;
    } else {
      finalResultObj.finalCharge = sum - discount;
      finalResultObj.finalDiscount = outputDiscount(itemName, discount, fullReductionDiscount, 1);
    }
  } else if (sum >= 30) {
    if (discount && fullReductionDiscount < discount) {
      finalResultObj.finalCharge = sum - discount;
      finalResultObj.finalDiscount = outputDiscount(itemName, discount, fullReductionDiscount, 1);
    } else {
      finalResultObj.finalCharge = sum - fullReductionDiscount;
      finalResultObj.finalDiscount = outputDiscount(itemName, discount, fullReductionDiscount, -1);
    }
  }
  return finalResultObj;
}

function output(finalResultObj) {
  if (judgeObjectProperty(finalResultObj, "finalDiscount")) {
    return "============= 订餐明细 =============" + "\n" + finalResultObj.orderContent.join('\n') + "\n-----------------------------------" + "\n" + finalResultObj.finalDiscount + "\n" + "总计：" + finalResultObj.finalCharge + "元" + "\n" + "===================================";
  } else {
    return "============= 订餐明细 =============" + "\n" + finalResultObj.orderContent.join('\n') + "\n-----------------------------------" + "\n" + "总计：" + finalResultObj.finalCharge + "元" + "\n" + "===================================";
  }
}

function outputDiscount(itemName, discount, fullReductionDiscount, param) {
  if (param == 1) {
    return "使用优惠:\n" + "指定菜品半价(" + itemName.join('，') + ")，省" + discount + "元" + "\n" + "-----------------------------------";
  } else if (param == -1) {
    return "使用优惠:\n" + '满30减6元，省' + fullReductionDiscount + "元" + "\n" + "-----------------------------------";
  }
}

function judgeObjectProperty(obj, property) {
  return obj.hasOwnProperty(property);
}