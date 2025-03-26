
const Category = require('../../models/admin/category');
const productModel = require('../../models/admin/productSchema');
const fs = require('fs');
const path = require('path');
const User = require('../../models/user/userSchema');
const sharp = require('sharp');
const product = require('../../models/admin/productSchema');
const multer = require('multer');
const uploads = require('../../helpers/multer'); // Update with actual path

const getProductaddPage = async(req, res) => {
    try {
        const category = await Category.find({isListed: true});
        // console.log(category);
        res.render('addProduct', {
          categories: category
        });
    } catch (error) {
        console.log(`Problem on your getProductPage function IN PRODUCT CONTROLLER${error}`);
        res.status(500).json({message: 'Internal server error'});
    }
};

// add product function

const addProduct = async (req,res) => {
  console.log('your add product functioin is working ')
    
  try {
      
      const categories = await Category.find({});

      if(!categories){
          console.log('Error when finding category')
          return res.status(500).json({massege:'Error'})
      }
      const {
          name,
          writer,
          category_id,
          language,
          regularPrice,
          salePrice,
          availableQuantity,
          description,
          publishedDate
      } = req.body;
     console.log(req.body)

      if(!name ||!writer ||!category_id ||!language ||!regularPrice  ||!availableQuantity ||!description ){
          
          console.log('Problem with finding credentials in req.body in addProduct in productController')

          return res.render('Admin/addProduct',{categories,massege:'Need Credentials'})
      }

      const imagePaths = req.files.map(file => `/uploadedImages/${file.filename}`);

      if(!imagePaths){

          console.log('Problem with imagePaths newProduct in addProduct in productController')

          return res.render('Admin/addProduct',{categories,massege:'Problem with imagePaths newProduct '})

      }


      const newProduct = new productModel({
          productTitle:name,
          authorName:writer,
          category: category_id,
          language:language,
          regularPrice:regularPrice,
          salePrice:salePrice,
          quantity:availableQuantity,
          description:description,
          productImage: imagePaths,
          // publishedDate
      })

      if(!newProduct){
          console.log('Problem with Creating newProduct in addProduct in productController');
          return res.render('Admin/addProduct',{categories,massege:'Problem with Creating newProduct'})

      }

      await newProduct.save();
      console.log(`New Book Added
          name : ${name},`)

      // res.status(200).redirect('/addProducts');
      return res.status(201).json({ success: true, message: 'Product added successfully!' });


  } catch (error) {
      // res.render('500');
      console.log(`Error show in addProducts and the 
          Error is ${error}`)
  }
}

const listProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 4;
        const skip = (page - 1) * limit;

        const productData = await productModel.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
         
        const totalProducts = await productModel.countDocuments({});
        const totalPages = Math.ceil(totalProducts / limit);

        const paginationLinks = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationLinks.push({
                number: i,
                isActive: i === page
            });
        }

        res.render('listProduct', {
            products: productData,
            currentPage: page,
            totalPages,
            paginationLinks,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page - 1,
            nextPage: page + 1
        }); 
    } catch (error) {
        console.error(`Error during listing the product: ${error}`);
        res.status(500).render('error', { message: 'Failed to load products' });
    }
}

  const blockUnblockProduct = async (req,res)=>{
    try {
        const productId = req.params.id
        const product = await productModel.findById(productId)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        product.isBlocked = !product.isBlocked
        await product.save()
        res.status(200).json({ message: "product status updated", blocked: product.isBlocked });
    } catch (error) {
        console.error("Error toggling product block status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

 const getProductEdit = async(req,res)=>{
    try {
        const id = req.params.id;
        const product = await productModel.findOne({_id:id});
        const category = await Category.find({})
        // console.log('productData',product)
        res.render("updateProduct",{
            categories:category,
            product
        })
    } catch (error) {
        console.log(`error during getProductEditPage${error}`)
        //add page not found here
    }
 }


 const removeProductImage = async (req, res) => {
    try {
         console.log('fucntion worlasjdfisqanfvdqansvjpawggvio====')
        console.log(req.body)
        const productId = req.params.id;
        console.log(productId)
        const { imageUrl } = req.body;

        const product = await productModel.findById(productId);
        if (!productId) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.productImage = product.productImage.filter(img => img !== imageUrl);
        await product.save();

        res.json({ success: true, message: "Image removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const updateImg = async (req,res) => {
    try {
        // console.log('this body from updateImg function',req.body);
        console.log("your params are ",req.params.id)
    } catch (error) {
        console.log(`error during updateImage function ${error}`)
    }
}



const searchUser = async (req,res) => {
    try {
        const query = req.query.query;
        console.log(`data for searching from clint side${query}`);
        const product = await productModel.find({
            productTitle:{$regex:query,$options:"i"}});
            if(!product){
                return res.status(404).json({messge:"produt not found"});
            }
            console.log(`product for searching ${product}`);

            res.json(product)
    } catch (error) {
        console.log(`errord during search user${error}`)
    }
}




const editProduct = async (req, res) => {

    try {
        // console.log("Uploaded Files:", req.files);
        const productId = req.params.id;
        console.log(productId);
        
        const {
            name,
            writer,
            category_id,
            language,
            regularPrice,
            salePrice,
            availableQuantity,
            description,
            publishedDate
        } = req.body;
        const existingProduct = await productModel.findById(productId);

        if (!existingProduct) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        const categories = await Category.find({});
        if (!categories) {
            console.log('Error when finding categories');
            return res.status(500).json({ message: 'Error fetching categories' });
        }

       

        console.log('dats for edit the product',description);


        if (!name || !writer || !category_id || !language || !regularPrice || !availableQuantity || !description) {
            console.log('Problem with finding credentials in req.body in editProduct in productController');
            return res.render('Admin/editProduct', { 
                categories, 
                product: existingProduct, 
                message: 'Need Credentials' 
            });
        }



        const updateData=  {
            productTitle:name,
            authorName:writer,
                category_id,
                language,
                regularPrice,
                salePrice,
                availableQuantity,
                description,
                publishedDate
            }

        // Handle image updates
        let imagePaths = existingProduct.productImage; // Keep existing images by default
        if (req.files && req.files.length > 0) {
            updateData.imagePaths = req.files.map(file => `/uploadedImages/${file.filename}`);
        }
        console.log('updateData.imagePaths',updateData.imagePaths)

        if (!imagePaths || imagePaths.length < 3) {
            console.log('Problem with imagePaths in editProduct in productController');
            return res.render('Admin/updateProduct', { 
                categories, 
                product: existingProduct, 
                message: 'Problem with imagePaths - Minimum 3 images required' 
            });
        }

    

    console.log('updateData',updateData)
        // if (publishedDate) existingProduct.publishedDate = publishedDate;

        await productModel.findByIdAndUpdate(productId,updateData,{new:true})
        console.log(`Book Updated
            name: ${name}`);

        return res.status(200).json({ success: true, message: 'Product updated successfully!' });

    } catch (error) {
        console.log(`Error in editProduct: ${error}`);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


module.exports = {
    getProductaddPage,
    addProduct,
    listProduct,
    blockUnblockProduct,
    getProductEdit,
    removeProductImage,
    updateImg,
    editProduct,
    searchUser,
};