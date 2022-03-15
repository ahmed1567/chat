const { con } = require("../models/datbaseModel");
const bcrypt = require('bcrypt');


//for sign up

const sign_up_get = (req, res)=>{
    return res.render('auth/sign_up',{title:'sign up'});
}
const sign_up_post = (req, res)=>{
    let phone=req.body.phone;
    let name=req.body.name;
    let password=req.body.password;
    if(req.body.submit=='submit'){
      bcrypt.genSalt(10, function (err, Salt) {
        // The bcrypt is used for encrypting password.
        bcrypt.hash(password, Salt, function (err, hash) {
            if (err) {
                return console.log('Cannot encrypt');
            }
            hashedPassword = hash;
            var sql = "INSERT INTO users (user_id,Password,Name) VALUES (?,?,?)";
            con.query(sql,[phone,hashedPassword,name], function (err, result) {
            if (err) throw err;
            });
            return res.render('home',{title:'home' ,exp:"successful operation please sign in"});
        })
    })

    }
}

//for sign in

const sign_in_get = (req, res)=>{
    return res.render('auth/sign_in',{title:'sign in'})
}
const sign_in_post = (req, res)=>{
    if(req.body.sign_in=='sign_in'){  
        let phone=req.body.phone;
        let password=req.body.password;
    
        var sql = "select * from users where user_id=?";
        con.query(sql,[phone], function (err, result, fields) {
          if (err){throw err;
          }else if (result.length===0){
            return res.render('auth/sign_in',{title:'sign in',exp:'please sign up first'});
          }
        bcrypt.genSalt(10, function (err, Salt) {
                bcrypt.compare(password, result[0].Password, 
                    async function (err, isMatch) {
                    // Comparing the original password to
                    // encrypted password   
                    if (isMatch) {
                          req.session.user=phone;
                          return res.render('home',{title:'home',session:req.session.user})
                    }
                    if (!isMatch) {
                          return res.render('auth/sign_in',{title:'sign in',exp:'please enter the correct password'});
                    }
                })
            })
      });
    }
  }

//for sign out 
const sign_out = (req, res)=>{
    req.session.destroy();
    res.redirect('/');
}

module.exports={
    sign_up_get,
    sign_in_get,
    sign_up_post,
    sign_in_post,
    sign_out
}