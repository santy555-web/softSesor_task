var express = require('express');
var router = express.Router();
var Task = require('../module/AddToCart');

router.get('/', function (req, res, next) {
    Task.getCartProduct(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.get('/:id?', function(req, res, next) {
    Task.getCartProductById(req.params.id, function(err, rows)
    {  
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
}); 
router.post('/',function(req,res,next){
    console.log(req.body)
    Task.addCartProduct(req.body, function(err,rows)
    {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    
    });
});
router.delete('/:id?', function(req, res, next) {
    Task.deleteCartProduct(req.params.id, function(err, rows)
    {  
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
}); 

module.exports = router;