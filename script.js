const menu = [
    { id: 1, name: '김치찌개', price: 8000 },
    { id: 2, name: '비빔밥', price: 7000 },
    { id: 3, name: '불고기', price: 10000 }
];

let orderList = [];

function displayMenu() {
    const menuDiv = document.getElementById('menu');
    menu.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <h3>${item.name} - ${item.price}원</h3>
            <button onclick="addToOrder(${item.id})">주문하기</button>
        `;
        menuDiv.appendChild(itemDiv);
    });
}

function addToOrder(id) {
    const item = menu.find(i => i.id === id);
    orderList.push(item);
    displayOrder();
}

function displayOrder() {
    const orderDiv = document.getElementById('order');
    orderDiv.innerHTML = '';
    orderList.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerText = `${item.name} - ${item.price}원`;
        orderDiv.appendChild(itemDiv);
    });
}

displayMenu();
