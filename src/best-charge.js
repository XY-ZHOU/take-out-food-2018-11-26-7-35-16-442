function bestCharge(selectedItems) {
  let selectedObj = transformSelectedItems(selectedItems);
  let allItemsArr = loadAllItems();
  let discountType = loadPromotions();
  let allOrderMessage = orderObj(allItemsArr, selectedObj);
  let finalResultObj = caculateDiscountType(allOrderMessage, discountType);
  return output(finalResultObj);
}

function transformSelectedItems(selectedItems) {
  let selectedObj ={} ;
  let itemArr = [];
  let countArr = [];
  for(let element of selectedItems){
    itemArr.push(element.slice(0, element.indexOf("x") - 1));
    countArr.push(element.slice(element.indexOf("x") + 1));
  }
  selectedObj.items=itemArr;
  selectedObj.counts=countArr;
  return selectedObj;
}

function allMessageOfOrder(allItemsArr, selectedObj) {
  let allOrderMessage = [];
  for (let element of allItemsArr) {
    if (isElementInArr(selectedObj.items, element.id)) {
      let index = (selectedObj.items).indexOf(element.id);
      element.count = parseInt(selectedObj.counts[index]);
      element.itemSum = element.count * element.price;
      allOrderMessage.push(element);
    }
  }
  return allOrderMessage;
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
    if (isElementInArr(discountType[1].items, allOrderMessage[i].id)) {
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

function isElementInArr(arr, element) {
  return arr.includes(element);
}