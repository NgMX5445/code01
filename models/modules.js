const { query } = require('../database');
const {
    DUPLICATE_ENTRY_ERROR,
    EMPTY_RESULT_ERROR,
    MYSQL_ERROR_CODE,
    TABLE_ALREADY_EXISTS_ERROR,
} = require('../error');

module.exports.getUser = function getUser(username,password) {
    const sql = `SELECT * FROM nginvest.user WHERE username = ? AND password =?`;
    return query(sql, [username,password]).then(function (result) {
        const row = result[0];
        if (row.length === 0) {
            let result=`User does not exist`;
            throw result;
        }
        return row[0];
    })
};






module.exports.getAllUser = function getAllUser() {
    const sql = `SELECT * FROM code1.user`;
    return query(sql, []).then(function (result) {
        const rows = result[0];
        console.log(rows[0])
        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        return rows[0];
    });
};


module.exports.initTable = function initTable() {
    const sql = `CREATE TABLE modules_tab (
        id INT auto_increment primary key,
        code VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        credit DECIMAL(2,1) NOT NULL
    )`;
    return query(sql).catch(function (error) {
        if (error.errno === MYSQL_ERROR_CODE.TABLE_ALREADY_EXISTS) {
            throw new TABLE_ALREADY_EXISTS_ERROR(`modules_tab `);
        }
        throw error;
    });
};

module.exports.create = function create(code, name, credit) {
    const sql = `INSERT INTO modules_tab (code, name, credit) VALUES (?, ?, ?)`;
    return query(sql, [code, name, credit]).catch(function (error) {
        if (error.errno === MYSQL_ERROR_CODE.DUPLICATE_ENTRY) {
            throw new DUPLICATE_ENTRY_ERROR(`Module ${code} already exists`);
        }
        throw error;
    });
};

module.exports.retrieveByCode = function retrieveByCode(code) {
    const sql = `SELECT * FROM modules_tab WHERE code = ?`;
    return query(sql, [code]).then(function (result) {
        const rows = result[0];
        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        return rows[0];
    });
};

module.exports.deleteByCode = function deleteByCode(code) {
    // TODO implement delete by code
    const sql = `DELETE FROM modules_tab WHERE code=?`;
    return query(sql,[code]).then(function (result) {
        const rows = result;
        console.log("rows::"+rows)
        if (rows.length ==0) {
            throw (`Module ${code} not found!`+result);
        }
        if(rows.length>0){
            console.log(rows[1]);
        return ( `Module code:${code} deleted!!`+result[1]);
        }else {
            throw ("err ..."+result);
        }
    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
    // TODO implement update by code
    /*
    UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
    */
    const sql = ` UPDATE modules_tab SET credit=? WHERE code =?`;
    return query(sql, [credit,code]).then(function (result) {
        const rows = result[0];
        if (rows.length === 0) {
            throw new EMPTY_RESULT_ERROR(`Module ${code} not found!`);
        }
        return rows[0];
    });
};

module.exports.retrieveAll = function retrieveAll() {
    // TODO implement retrieve all
    const sql = "SELECT * FROM modules_tab";
    return query(sql,"")
    
    .then(function (results) {
        result=results[0]
   if(result.length!=0){

        return result;
   }else{
    var errMsg="No Result !!"
    throw errMsg;
   }
    });
};
