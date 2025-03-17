

const User = require('../../models/user/userSchema');

const  loadUserList = async(req,res)=>{

    try {
        const userData = await User.find().sort({name:1})
        res.render('usersList',{userData})
         console.log(userData)
    } catch (error) {
        console.log(`error during loading LoadUserList function ${error}`)
    }
}



const searchUser = async(req,res)=>{
    try {
        console.log(req.body.searchUser);
    } catch (error) {
        console.log(`error during ${error}`);
    }
}

module.exports = {
    loadUserList,
    searchUser
}

