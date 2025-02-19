const API_KEY = 'AIzaSyCneyK_cu8HByPETu7LhviiedMoJHQi21k'; // 여기에 본인의 API 키를 입력하세요.
const SPREADSHEET_ID = '1IobwmmI-zhvliF1y-_mlmYu0n19JSRsp6NMpQlyz-gM'; // 구글 시트의 ID를 입력하세요.
const RANGE = 'Inventory!A1:F8'; // 데이터를 가져올 범위를 설정합니다.

function getMenuData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    $.get(url, function(data) {
        const rows = data.values;
        if (rows && rows.length > 0) {
            rows.forEach(row => {
                const time = row[0];
                const inventory = row[1];
                const food = row[2];
                const place = row[3];

                // food가 비어있지 않을 때만 리스트에 추가
                if (food) {
                    $('#menu-list').append(`
                        <li>
                            ${time} - ${food} (${inventory}개) @ ${place} 
                            <button onclick="handleButtonClick('${food}')">주문하기</button>
                        </li>
                    `);
                }
            });
        } else {
            $('#menu-list').append('<li>메뉴가 없습니다.</li>');
        }
    }).fail(function() {
        console.error('데이터를 가져오는 데 실패했습니다.');
    });
}

// 버튼 클릭 시 동작할 함수
function handleButtonClick(food) {
    alert(`${food}가 주문되었습니다!`);
}

// 페이지가 로드되면 메뉴 데이터를 가져옵니다.
$(document).ready(function() {
    getMenuData();
});
