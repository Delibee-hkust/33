const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결

const uri = 'mongodb://iwonjin32:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-y074nn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 주문 스키마 정의
const orderSchema = new mongoose.Schema({
    name: String,
    product: String,
    quantity: Number
});

const Order = mongoose.model('Order', orderSchema);

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // HTML 파일 제공

// 주문 저장 API
app.post('/api/orders', async (req, res) => {
    const { name, product, quantity } = req.body;
    const newOrder = new Order({ name, product, quantity });
    await newOrder.save();
    res.status(201).send('주문이 저장되었습니다.');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
