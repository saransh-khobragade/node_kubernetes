const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'root',
     connectionLimit: 5,
     database:'test_database',
     port:3306
});
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	// const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	// console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}
console.log(process)
asyncFunction()