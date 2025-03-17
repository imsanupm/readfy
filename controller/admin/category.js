
const category = require('../../models/category');


const categoryInfo = async(req,res)=>{
    try {
        const page  = parseInt(req.query.page) || 1;
        const limit = 0;
        const skip = (page-1)*limit;

        const categoryData = await category.find({})
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit);
         
        const totalCategories = await category.find({});
        const totalPages = Math.ceil(totalCategories/limit)
        res.render('category',{
            cat:categoryData,
            currentPage:page,
            totalPage:totalPages
        });
    } catch (error) {
        console.log(`error during categoryInfo functon in category${error}`);
        
    
    }
} 

const addCategory = async(req,res)=>{
    try {
        console.log('category add body ',req.body)
        const {categoryName,description} = req.body
        const existingCategory = await category.findOne({name:categoryName});
        if(existingCategory){
            return res.status(400).json({message:'Category Already Exisits',redirectUrl:"/admin/adminlogin"})
        }
       
       
        const newCategory = new category({
            name:categoryName,
            description:description
        })
           await newCategory.save();
           return res.status(200).json({message:'category added successfully',success:true,});

    } catch (error) {
        console.log(`error during adding the category`,error);
        return res.status(500).json({message:'internal Server error'})
    }
}


module.exports = {
    categoryInfo,
    addCategory
}