var db = require('../dbconnection'); //reference of dbconnection.js file

var Task ={
  getProduct:function(callback)
  {
      return db.query("select * from mytable", callback);     
  },
   getProductById:function(id, callback)
   {
    return db.query("select * from mytable where id=?",[id],callback);
   },

  //  addProduct:function(form,callback)
  //   {
  //     return db.query("Insert into mytable () values(?,?,?,?,?)",[    
  //     form.slot_time,
  //     form.first_name, 
  //     form.last_name, 
  //     form.mobileNo,
  //     form.date_now
  //   ],callback );
  //   },

  //  deleteProduct:function(id,callback)
  //  {
  //     return db.query("delete from mytable where id=?",[id],callback);
  //  },
  }

module.exports = Task;