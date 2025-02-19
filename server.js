const mongoose = require('mongoose');

// 복사한 연결 문자열을 여기에 붙여넣기
const uri = 'mongodb://iwonjin32:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-y074nn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
