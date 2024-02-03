import mysql from 'mysql';

function crearConexion() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shouryugames_db"
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err.stack);
      process.exit(1);
    }
    console.log('Connected to database as id', connection.threadId);
  });

  return connection;
}

function cerrarConexion(connection) {
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err.stack);
    } else {
      console.log('Connection closed.');
    }
  });
}

export { crearConexion, cerrarConexion };
