const sqlite = require('sqlite3');
const database = new sqlite.Database(__dirname + '/../DB/data.sqlite');

const dataMapper = {

    getAllFigurine: (callback) => {
        // SELECT * FROM FIGURINE;
        // La méthode "all" permet de récupérer 0 ou N enregistrements
        database.all('SELECT * FROM FIGURINE', [], (error, rows) => {
            if (error) {
                console.error(error);
                return;
            } else {
                callback(rows);
            }
        });
    },

    getOneFigurineById: (id, callback) => {
        // SELECT * FROM FIGURINEWHERE ID = id
        // La méthode "get" permet de récupérer 0 ou 1 enregistrement

        const queryStr = `
            SELECT 
            FIGURINE.*,
            REVIEW.TITLE,
            REVIEW.MESSAGE,
            REVIEW.AUTHOR,
            REVIEW.NOTE 
            FROM FIGURINE 
            JOIN REVIEW ON REVIEW.FIGURINE_ID = FIGURINE.ID
            WHERE FIGURINE.ID = ?
        `;

        database.all(queryStr, [id], (error, rows) => {
            if (error) {
                console.log(error);
                return;
            } else {
                callback(rows);
            }
        });

    }

};

module.exports = dataMapper;