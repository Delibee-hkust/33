document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    const name = document.getElementById('name').value;
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;

    // 주문 내용 서버에 전송
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, product, quantity })
    });

    if (response.ok) {
        document.getElementById('confirmation').innerText = `주문이 접수되었습니다: ${name}님, ${product} ${quantity}개`;
        document.getElementById('orderForm').reset();
    } else {
        document.getElementById('confirmation').innerText = '주문 저장에 실패했습니다.';
    }
});
