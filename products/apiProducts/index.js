const sqlite3 = require('sqlite3');
const express = require("express");
const cors = require('cors');



var app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))


const HTTP_PORT = 8080
app.listen(HTTP_PORT, () => {
  console.log("Server is listening on port " + HTTP_PORT);
});

process.on('SIGINT', function () {
  console.log('Do not shut down the app on user log-off');
  //server.close();
});

const db = new sqlite3.Database('./db_products.db', (err) => {
  if (err) {
    console.error("Erro opening database " + err.message);
  }
  console.log("Connectd to database ");

});

app.all("/All/", (req, res, next) => {

  let sql = 'SELECT * FROM products_name'
  db.all(sql, (error, results, fields) => {

    if (error) return res.status(500).json({
      "status": 500,
      "message": "Internal Server Error" // error.sqlMessage
    })

    const result = {
      "status": 200,
      "data": results
    }

    return res.json(results)
  })
})

app.get("/aType/:id", (req, res, next) => {
  let _id = req.params.id;
  let sql = 'SELECT * FROM products_type WHERE type_id = ?'

  db.all(sql, _id, (error, results) => {

    if (error) return res.status(500).json({
      "status": 500,
      "message": "Internal Server Error" // error.sqlMessage
    })
    console.log(results.length);
    if (results.length <= 0) {
      return res.status(400).json({
        "status": 400,
        "message": "Not Found"
      });
    } else {
      const result = {
        "status": 200,
        "data": results
      }

      return res.json(results)
    }

  })
})

app.get("/aName/:id", (req, res, next) => {
  let _id = req.params.id;
  let sql = 'SELECT * FROM products_name WHERE pd_id = ?'

  db.all(sql, _id, (error, results) => {

    if (error) return res.status(500).json({
      "status": 500,
      "message": "Internal Server Error" // error.sqlMessage
    })
    console.log(results.length);
    if (results.length <= 0) {
      return res.status(400).json({
        "status": 400,
        "message": "Not Found"
      });
    } else {
      const result = {
        "status": 200,
        "data": results
      }

      return res.json(results)
    }

  })
})

app.get("/gTypes/", (req, res, next) => {

  let sql = 'SELECT * FROM products_type'
  db.all(sql, (error, results, fields) => {

    if (error) return res.status(400).json({
      "status": 400,
      "message": "Internal Server Error" // error.sqlMessage
    })

    const result = {
      "status": 200,
      "data": results
    }

    return res.json(results)
  })
})

app.post("/psTypes/", (req, res, next) => {
  var reqBody = req.body;
  console.log(reqBody);
  db.run("INSERT INTO products_type(type_name) VALUES( ? )",
    [reqBody.name],
    function (err, results) {
      if (err) {
        res.status(400).json({
          "status": 400,
          "error": err.message
        })
        return;
      }
      res.status(200).json({
        "type_id": this.lastID,
        "type_name": reqBody.name
      })
    });
});

app.post("/psNames/", (req, res, next) => {
  var reqBody = req.body;
  console.log(reqBody);
  db.run("INSERT INTO products_name(pd_name,pd_type) VALUES(?,?)",
    [reqBody.name, reqBody.type], // [producName],
    function (err, result) {
      if (err) {
        res.status(400).json({
          "status": 400,
          "error": err.message
        })
        return;
      }
      res.status(200).json({
        "status": 200,
        "id": this.lastID,
        "name": req.body.name,
        "type": req.body.type
      })
    });
});


app.put("/puTypes/:id", (req, res, next) => {
  let _id = req.params.id;
  var reqBody = req.body;
  var data = [reqBody.name, _id]
  console.log(data);

  db.run(`UPDATE products_type SET type_name = ? WHERE type_id = ?`,
    data,
    function (err, results) {
      if (err) {
        res.status(400).json({
          "error": res.message
        })
        return;
      }
      res.status(200).json({
        "status": 200,
        "id": this.changes,
        "data": results
      });
    });
});

app.put("/puNames/:id", (req, res, next) => {
  let _id = req.params.id;
  var reqBody = req.body;
  var data = [reqBody.name, reqBody.type, _id]
  console.log(data);

  db.run(`UPDATE products_name SET pd_name = ?,pd_type = ? WHERE pd_id = ?`,
    data,
    function (err, results) {
      if (err) {
        res.status(400).json({
          "error": res.message
        })
        return;
      }
      res.status(200).json({
        "status": 200,
        "id": this.changes,
        "data": results
      });
    });
});


app.delete("/delType/:id", (req, res, next) => {
  db.run(`DELETE FROM products_type WHERE type_id = ?`,
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({
          "error": res.message
        })
        return;
      }
      res.status(200).json({
        deletedID: req.params.id
      })
    });
});

app.delete("/delName/:id", (req, res, next) => {
  db.run(`DELETE FROM products_name WHERE pd_id = ?`,
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({
          "error": res.message
        })
        return;
      }
      res.status(200).json({
        deletedID: req.params.id
      })
    });
});
