function bestCharge(selectedItems) {
  let selectedObj = transformSelectedItems(selectedItems);
  let allItemsArr = loadAllItems();
  let discountType = loadPromotions();
  let allOrderMessage = allMessageOfOrder(allItemsArr, selectedObj);
  let finalResultObj = calculateDiscountType(allOrderMessage, discountType);
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

function calculateDiscountType(allOrderMessage, discountType) {
  let orderContent = [];
  let notDiscountPrice = 0;
  let halfDiscount = 0;
  let halfDiscountItem = [];
  let fullReductionDiscount;
  let finalResultObj = {};
  for (let i = 0; i < allOrderMessage.length; i++) {
    orderContent.push(allOrderMessage[i].name + ' x ' + allOrderMessage[i].count + ' = ' + allOrderMessage[i].itemSum + "元");
    notDiscountPrice += allOrderMessage[i].itemSum;
    if (isElementInArr(discountType[1].items, allOrderMessage[i].id)) {
      halfDiscount += allOrderMessage[i].itemSum / 2;
      halfDiscountItem.push(allOrderMessage[i].name);
    }
  }
  finalResultObj.orderContent = orderContent;
  if (notDiscountPrice > 30) {
    fullReductionDiscount = parseInt(notDiscountPrice / 30) * 6;
  }
  if (notDiscountPrice < 30) {
    if (!halfDiscount) {
      finalResultObj.finalCharge = notDiscountPrice;
    } else {
      finalResultObj.finalCharge = notDiscountPrice - halfDiscount;
      finalResultObj.finalDiscount = outputDiscount(halfDiscountItem, halfDiscount, fullReductionDiscount, 1);
    }
  } else if (notDiscountPrice >= 30) {
    if (halfDiscount && fullReductionDiscount < halfDiscount) {
      finalResultObj.finalCharge = notDiscountPrice - halfDiscount;
      finalResultObj.finalDiscount = outputDiscount(halfDiscountItem, halfDiscount, fullReductionDiscount, 1);
    } else {
      finalResultObj.finalCharge = notDiscountPrice - fullReductionDiscount;
      finalResultObj.finalDiscount = outputDiscount(halfDiscountItem, halfDiscount, fullReductionDiscount, -1);
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

function outputDiscount(halfDiscountItem, halfDiscount, fullReductionDiscount, param) {
  if (param == 1) {
    return "使用优惠:\n" + "指定菜品半价(" + halfDiscountItem.join('，') + ")，省" + halfDiscount + "元" + "\n" + "-----------------------------------";
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