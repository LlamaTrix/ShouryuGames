function listaJuegosServidor(connection) {
    return new Promise((resolve, reject) => {
      const consulta = "SELECT * FROM juego;";
      connection.query(consulta, (error, resultado) => {
        if (error) {
          console.error('Error en consulta:', error.stack);
          reject(error);
        } else {
          console.log('Juegos cargados exitosamente.');
          resolve(resultado);
        }
      });
    });
  }
  
  
  export { listaJuegosServidor };