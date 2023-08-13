var connection = require("../../Config/db/config");
const crypto = require('crypto');
exports.placeorder = async (req, res) => {
  try {

    if (!req.body.symbol) {
      return res.status(400).json({ success: 0, message: "Please Enter  symbol" });
    }
    if (!req.body.quantity) {
      return res.status(400).json({ success: 0, message: "Please Enter  quantity" })
    }

    var cr = crypto.randomUUID();

    var sql = `insert into order_data (order_id,symbol,requested_quantity,status) values('${cr}','${req.body.symbol}','${req.body.quantity}','open')`;
    connection.query(sql, function (err, result) {
      if (err) console.log(err);
      return res.status(200).json({ success: 1, message: "Data Inserted !!!!" })

    });
  } catch (error) {
    // console.log(error)
    res.json({ success: 0, data: error });
  }
};

exports.modifyorder = async (req, res) => {
  try {
    if (!req.body.new_quantity) {
      return res.status(400).json({ success: 0, message: "Please Enter quantity" })
    }
    if (!req.body.order_id) {
      return res.status(400).json({ success: 0, message: "Please Enter orderid" })
    }
    try {
      var sql = `select * from  order_data where order_id = '${req.body.order_id}' and status='open'`;
      connection.query(sql, function (err, result, fields) {
        if (err) console.log(err);
        if (result.length > 0) {
          var sql = `update order_data set requested_quantity='${req.body.new_quantity}' where order_id='${req.body.order_id}'`;
          connection.query(sql, function (err, result) {
            if (err)
              console.log(err);
            return res.status(200).json({ success: 1, message: "Status Updated Successfully!!", data: result.entries })
          });
        }
        else {
          return res.status(400).json({ success: 0, message: "your order is not in open state" })
        }
      })
    } catch (error) {
      // console.log(err)
      return res.status(400).json({ success: 0, data: error });
    }

  } catch (error) {
    // console.log(error)

    return res.status(400).json({ success: 0, data: error });
  }

}

exports.cancelorder = async (req, res) => {
  try {
    if (!req.body.order_id) {
      return res.status(400).json({ success: 0, message: "Please Enter orderid" })
    }
    var sql = `select * from  order_data where order_id = '${req.body.order_id}' and status='open'`;
    connection.query(sql, function (err, result, fields) {
      if (err) console.log(err);
      if (result.length > 0) {
        var sql = `delete from order_data where order_id = '${req.body.order_id}'`;
        connection.query(sql, function (err, result) {
          if (err) console.log(err);
          else {
            return res.status(200).json({ success: 1, message: "Data Deleted Successfully !!!!!" });
          }
        });
      }
      else {
        return res.status(400).json({ success: 0, message: "your order is not in open state" })
      }
    })
  } catch (error) {
    // console.log(error)
    return res.status(400).json({ success: 0, data: error });
  }
}




exports.showorder = async (req, res) => {

  try {
    if (!req.body.order_id) {
      return res.status(400).json({ success: 0, message: "Please Enter orderid" })
    }

    var sql = `select * from  order_data where order_id = '${req.body.order_id}'`;
    connection.query(sql, function (err, result) {
      if (err) console.log(err);
      else {
        if (result.length > 0) {
          return res.status(200).json({ success: 1, data: result });

        }
        else {
          return res.status(400).json({ success: 0, message: "No Record Found" });
        }
      }
    })
  } catch (error) {
    // console.log(err)
    return res.status(400).json({ success: 0, data: error });
  }
}


exports.showorders = async (req, res) => {

  try {
    if (!req.body.order_id) {
      return res.status(400).json({ success: 0, message: "Please Enter orderid" })
    }
    var sql = `select * from  order_data where order_id IN (?)`;
    var dataarr = req.body.order_id;
    var qdata = [dataarr];
    connection.query(sql, qdata, function (err, result) {
      if (err) console.log(err);
      else {
        if (result.length > 0) {
          return res.status(200).json({ success: 1, data: result });
        }
        else {
          return res.status(400).json({ success: 0, message: "No Record Found" });
        }
      }
    })

  } catch (error) {
    // console.log(err)
    return res.status(400).json({ success: 0, data: error });
  }
}
