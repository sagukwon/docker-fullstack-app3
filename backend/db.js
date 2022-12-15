const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'root123',
    database: 'myapp'
});

// 다른 앱에서 사용할 수 있도록 exports 해준다
exports.pool = pool;
