var db = require('../dbconnection'); //reference of dbconnection.js file

var AddToCart ={
  getCartProduct:function(callback)
    {
        return db.query("select * from cart", callback);     
    },
     getCartProductById:function(id, callback)
     {
      return db.query("select * from cart where id=?",[id],callback);
     },
  
     addCartProduct:function(form,callback)
      {
        return db.query("INSERT INTO cart(id,title,price,description,category,image,ratingrate,ratingcount) VALUES (?,?,?,?,?,?,?,?)",[     
        form.id,
        form.title, 
        form.price, 
        form.description,
        form.category,
        form.image,
        form.ratingrate,
        form.ratingcount
      ],callback );
      },

     deleteCartProduct:function(id,callback)
     {
        return db.query("delete from cart where id=?",[id],callback);
     },
    }


module.exports = AddToCart;