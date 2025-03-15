



const loadDashBoard = async (req,res)=>{
    try {
        console.log('function is working ')
        res.render('dashboard');
    } catch (error) {
        console.log(`error during ${error}`);
    }
}

module.exports = {
    loadDashBoard
}
