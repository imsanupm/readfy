
const Product = require('../../models/admin/productSchema');

const loadProductPage = async (req,res)=>{
    try {
        console.log('addproduct function is working')
        res.render('addProduct')
    } catch (error) {
        console.log(`error during productInfo ${error}`);
    }
}

const addProduct = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}




module.exports = {
    loadProductPage,
}
