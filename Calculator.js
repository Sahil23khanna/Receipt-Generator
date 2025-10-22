let Products = {}
let cart = []


function showMessage(msg) {

    let message = document.getElementById("message");
    message.innerText = msg;
    message.style.color = "red";

    setTimeout(() => {                      /* Removes text after 2 seconds */
        message.innerText = '';
    }, 2000);
}


function addProduct() {

    let ProductName = document.getElementById("productName").value

    if (ProductName) {
        if (Products.hasOwnProperty(ProductName)) {
            showMessage("Product Already Exists !!")
        }
        else {
            Products[ProductName] = 0
            document.getElementById("productList").innerHTML += `<option value="${ProductName}"> ${ProductName} </option>`
            showMessage("Product Added Successfully !!")
        }
        document.getElementById("productName").value = "";
    }
}


function addPrice() {

    let ProductList = document.getElementById("productList").value
    let Price = document.getElementById("productPrice").value

    if (ProductList && Price) {
        Products[ProductList] = Price;
        showMessage("Price Added Successfully !!")
        document.getElementById("productPrice").value = ""
    }
}

console.log(Products);

function newTransaction() {
    cart = []
    document.getElementById("unit").value = 0

    let Dropdown = document.getElementById("getList");
    Dropdown.innerHTML = ''

    for (let x in Products) {
        let option = document.createElement('option');
        option.value = x;
        option.textContent = `${x} ($${Products[x]}/Unit)`
        Dropdown.appendChild(option);
    }
}


function setUnit(num) {
    document.getElementById('unit').value = num;
}


function addToCart() {
    let name = document.getElementById("getList").value
    let units = document.getElementById("unit").value

    if (name && units > 0) {
        let price = Products[name] * units;
        cart.push({ name, units, price, perUnit: Products[name] })
        console.log(cart);
        alert("Added To Cart Successfully")
    }
    else {
        alert("Please Enter Valid Products and Units")
    }
}



function pay() {

    document.getElementById("table").style.display = "block";
    let tableBody = document.getElementById("tablebody");
    tableBody.innerHTML = ''

    let totalamount = 0;

    cart.forEach(item => {
        let row = `<tr>
        <td>${item.name}</td>
        <td>${parseFloat(item.perUnit).toFixed(2)}</td>
        <td>${item.units}</td>
        <td>${parseFloat(item.price).toFixed(2)}</td>
                   </tr>`
        tableBody.innerHTML += row;
        totalamount += item.price;
    })

    let taxespay = totalamount * 0.05;
    let amountpending = totalamount + taxespay;

    document.getElementById("totalamount").innerText = `Total Price: ${totalamount.toFixed(2)}`;
    document.getElementById("taxespay").innerText = `Taxes: ${taxespay.toFixed(2)}`;
    document.getElementById("amountpending").innerText = `Amount Due: ${amountpending.toFixed(2)}`;

    let date = new Date();
    document.getElementById("time").innerHTML = `Time : ${date.toLocaleTimeString()}`;
    document.getElementById("date").innerHTML = `Date : ${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()}`

    cart = [];

}

