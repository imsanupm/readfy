



const loadDashBoard = async (req,res)=>{
    try {
        
        res.render('dashboard');
    } catch (error) {
        console.log(`error during ${error}`);
    }
}

module.exports = {
    loadDashBoard
}
