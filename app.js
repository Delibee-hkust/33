const API_KEY = 'AIzaSyCneyK_cu8HByPETu7LhviiedMoJHQi21k'; // 여기에 본인의 API 키를 입력하세요.
const SPREADSHEET_ID = '1IobwmmI-zhvliF1y-_mlmYu0n19JSRsp6NMpQlyz-gM'; // 구글 시트의 ID를 입력하세요.
const RANGE = 'Inventory!A1:D8'; // 데이터를 가져올 범위를 설정합니다.

const map = L.map('map').setView([22.3964, 114.1099], 13); // 홍콩을 중심으로 설정
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let userMarker; // 사용자 위치 마커
let stockData = {}; // 재고 데이터 저장

// Google API 클라이언트 초기화
function initClient() {
    gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(() => {
        console.log('Google API Client initialized.');
    }).catch(error => {
        console.error('Error initializing Google API Client:', error);
    });
}

// 사용자의 위치 표시
function showUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // 사용자의 위치 마커 추가
            userMarker = L.marker([userLat, userLng]).addTo(map)
                .bindPopup('당신의 위치')
                .openPopup();

            map.setView([userLat, userLng], 13);
        }, () => {
            alert('사용자의 위치를 가져오는 데 실패했습니다.');
        });
    } else {
        alert('이 브라우저는 Geolocation을 지원하지 않습니다.');
    }
}

// 메뉴 데이터 가져오기
function getMenuData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    $.get(url, function(data) {
        const rows = data.values;
        if (rows && rows.length > 0) {
            const times = new Set();
            const foods = new Set();
            const places = new Set();

            rows.forEach(row => {
                times.add(row[0]);
                foods.add(row[2]);
                places.add(row[3]);
                stockData[row[0]] = parseInt(row[1]); // 재고 데이터 저장
            });

            // 시간, 음식, 장소 선택 옵션 추가
            times.forEach(time => {
                $('#time-select').append(`<option value="${time}">${time} (남은 재고: ${stockData[time]})</option>`);
            });

            foods.forEach(food => {
                $('#food-select').append(`<option value="${food}">${food}</option>`);
            });

            places.forEach(place => {
                $('#place-select').append(`<option value="${place}">${place}</option>`);
            });
        } else {
            $('#order-summary').text('메뉴가 없습니다.');
        }
    }).fail(function() {
        console.error('데이터를 가져오는 데 실패했습니다.');
    });
}

// 선택 변경 시 주문 정보 업데이트
function updateOrderSummary() {
    const time = $('#time-select').val();
    const food = $('#food-select').val();
    const place = $('#place-select').val();

    if (time && food && place) {
        $('#order-summary').text(`주문 내용: ${time} - ${food} @ ${place}`);
        $('#order-button').addClass('active').prop('disabled', false);
    } else {
        $('#order-summary').text('');
        $('#order-button').removeClass('active').prop('disabled', true);
    }
}

// 주문하기 버튼 클릭 시 PayPal로 리다이렉트
$('#order-button').on('click', function() {
    // 사용자는 아래 URL로 리다이렉션됨
    window.location.href = 'https://www.paypal.com/ncp/payment/4YQY88ZAWJM3A';
});

// 두 개의 마커 추가
const entranceMarker = L.marker([22.337371539151864, 114.26301347735318]).addTo(map)
    .bindPopup('Entrance')
    .openPopup();

const hall8Marker = L.marker([22.336805051422967, 114.26764054344805]).addTo(map)
    .bindPopup('Hall 8')
    .openPopup();

// 이벤트 리스너 추가
$('#time-select, #food-select, #place-select').on('change', updateOrderSummary);

// 사용자 위치 표시 함수 호출
showUserLocation();
// 메뉴 데이터 가져오기
getMenuData();
