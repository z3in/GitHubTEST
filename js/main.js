var itemlist = "";
fetch("./storage.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.product.forEach(function (item) {
      itemlist += `<div class="itemListContainer">
                        <div>
                            <img src="img/menu${item.id}.jpg" class="itemImage"></img>
                        </div>
                            <div class="itemName">
                                <p id="itemName${item.id}">${item.name}</p>
                            </div>
                            <div class="itemPrize">
                                <p id="itemPrize${item.id}">${item.price}</p>
                            </div>
                        <div class="classQuantity">Quantity</div>
                        <div><input type="number" value="1" class="quantityBox" onKeyDown="if(this.value.length==2 && event.keyCode!=8) return false;"></div>
                        <input type="button" onclick='getID(event)'  class="itemButton" value="Add to Cart" id="itemButton${item.id}">
                  </div>`;
    });
    document.getElementById("itemList").innerHTML = itemlist;
  })
  .catch((err) => {
    console.log(err);
  });

function getID(e) {
  const itemname = document.getElementById(`itemName${e.target.id.slice(-2)}`)
    .innerText;
  const price = document.getElementById(`itemPrize${e.target.id.slice(-2)}`)
    .innerText;
  const verifyElement = document.getElementById(
    `orderlist${e.target.id.slice(-2)}`
  );
  if (!verifyElement) {
    var node = document.createElement("div");
    node.setAttribute("class", "orderList");
    node.setAttribute("id", `orderlist${e.target.id.slice(-2)}`);
    node.setAttribute("onmouseover", "showDelete(event)");
    node.setAttribute("onmouseout", "hideDelete(event)");
    // var textnode = document.createTextNode(`${itemname} : ${price}`);
    // node.appendChild(textnode);

    var itemNode = document.createElement("div");
    itemNode.setAttribute("class", "itemNode");
    node.appendChild(itemNode);
    var textnode = document.createTextNode(`${itemname} . . .x1`);
    itemNode.appendChild(textnode);

    var priceNode = document.createElement("div");
    priceNode.setAttribute("class", "priceNode");
    node.appendChild(priceNode);
    var numNode = document.createTextNode(`P ${price}`);
    priceNode.appendChild(numNode);

    document.getElementById("orderItems").appendChild(node);
    var deleteItem = document.createElement("div");
    deleteItem.setAttribute("class", "deleteItem");
    deleteItem.setAttribute("id", `deleteItem${e.target.id.slice(-2)}`);
    deleteItem.setAttribute("onclick", "deleteMe(event)");
    deleteItem.setAttribute("onmouseover", "showDelete(event)");
    deleteItem.setAttribute("onmouseout", "hideDelete(event)");
    var deleteMSG = document.createTextNode("Delete");
    deleteItem.appendChild(deleteMSG);
    document.getElementById("orderItems").appendChild(deleteItem);
  } else {
    var item = verifyElement.getElementsByClassName("itemNode")[0].innerHTML;
    var count = item.slice(item.indexOf("x") + 1);
    datacount = parseInt(count);
    datacount++;
    verifyElement.getElementsByClassName(
      "itemNode"
    )[0].innerHTML = `${itemname} . . . x${datacount}`;
    total = price * datacount;
    verifyElement.getElementsByClassName(
      "priceNode"
    )[0].innerHTML = `P ${total}`;
  }
}
function deleteMe(e) {
  var myobj = document.getElementById(`orderlist${e.target.id.slice(-2)}`);
  myobj.remove();
  var DDelete = document.getElementById(`deleteItem${e.target.id.slice(-2)}`);
  DDelete.remove();
}

function showDelete(e) {
  document.getElementById(`deleteItem${e.target.id.slice(-2)}`).style.display =
    "block";
  document.getElementById(
    `orderlist${e.target.id.slice(-2)}`
  ).style.backgroundColor = "#eec31b";
  document.getElementById(`orderlist${e.target.id.slice(-2)}`).style.fontColor =
    "#000000";
}
function hideDelete(e) {
  document.getElementById(`deleteItem${e.target.id.slice(-2)}`).style.display =
    "none";
  document.getElementById(
    `orderlist${e.target.id.slice(-2)}`
  ).style.backgroundColor = "#222235";
  document.getElementById(`orderlist${e.target.id.slice(-2)}`).style.fontColor =
    "#ffffff";
}
