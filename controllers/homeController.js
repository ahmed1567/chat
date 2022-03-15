const home = (req, res)=>{
    if (req.session.user){
        return res.render('home',{title:'home',session:req.session.user})
      }else{
        return res.render('home',{title:'home'})
      }
}

module.exports={
    home
}