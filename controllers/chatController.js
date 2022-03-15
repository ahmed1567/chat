const { con } = require("../models/datbaseModel");

const chat = (req, res)=>{
    var sql = "select Name,user_id from users where user_id !=? ";
    con.query(sql,[req.session.user], function (err, result, fields){
      if (err){
        throw err;
      }else {
        return res.render('chat/chat_list',{ users:result, title:'my chat',session:req.session.user})
      }
    });
    
}

const chat_box = (req, res)=>{
    var sql = "select content from messages where (f=? and t=?) or (t=? and f=?) ";
    con.query(sql,[req.session.user,req.query.id,req.session.user,req.query.id], function (err, result, fields) {
      if (err){throw err;
      }
      return res.render('chat/socket',{session:req.session.user ,from:req.session.user,to:req.query.id,messages:result});
    });
    
}

module.exports={
    chat,
    chat_box
}