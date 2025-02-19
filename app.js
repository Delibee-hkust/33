const API_KEY = 'AIzaSyBTGlhls1oKZIaZUWtL56FiXAV9h_P7wrQ'; // 여기에 본인의 API 키를 입력하세요.
const SPREADSHEET_ID = '1IobwmmI-zhvliF1y-_mlmYu0n19JSRsp6NMpQlyz-gM'; // 구글 시트의 ID를 입력하세요.
const RANGE = 'Inventory!B2:B8'; // 데이터를 가져올 범위를 설정합니다.

function getMenuData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    $.get(url, function(data) {
        const rows = data.values;
        if (rows && rows.length > 0) {
            rows.forEach(row => {
                $('#menu-list').append(`<li>${row[0]}원</li>`); // 가격만 표시
            });
        } else {
            $('#menu-list').append('<li>메뉴가 없습니다.</li>');
        }
    }).fail(function() {
        console.error('데이터를 가져오는 데 실패했습니다.');
    });
}

// 페이지가 로드되면 메뉴 데이터를 가져옵니다.
$(document).ready(function() {
    getMenuData();
});
