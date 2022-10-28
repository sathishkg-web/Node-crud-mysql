const mysql=require("mysql");

const con=mysql.createPool({
    connectionLimit : 10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

// Read data from database
exports.view=(req,res)=>{
   con.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from store",(err,rows)=>{
        connection.release();
        if(!err){
            res.render('home',{rows,name:req.session.username});
        }
        else{
            console.log("error in listing data"+ err);
        }
    })
});
}

//create data in db
exports.addproduct=(req,res)=>{
con.getConnection((err,connection)=>{
    if(err) throw err

    const {title,author,price}=req.body;

    connection.query("insert into store (TITLE,AUTHOR,PRICE) values(?,?,?)",[title,author,price],(err,rows)=>{
        connection.release();
        if(!err){
            res.render('add-product',{msg:"Product Added",name:req.session.username});
        }
        else{
            console.log("error in listing data"+ err);
        }
    })
});

}

//delete data in db
exports.deleteproduct=(req,res)=>{
con.getConnection((err,connection)=>{
    if(err) throw err
//get id from url
    let id=req.params.id;
    connection.query("delete from store where id=?",[id],(err,rows)=>{
        connection.release();
        if(!err){
            res.redirect('/');
        }
        else{
            console.log("error in listing data"+ err);
        }
    })
});
}

//get data to edit
exports.editproduct=(req,res)=>{
   con.getConnection((err,connection)=>{
    if(err) throw err
    let id=req.params.id;
    connection.query("select * from store where id=?",[id],(err,rows)=>{
        connection.release();
        if(!err){
            res.render('edit-product',{rows,name:req.session.username});
        }
        else{
            console.log("error in listing data"+ err);
        }
    })
});
  
}

//update data in db
exports.edit=(req,res)=>{
    con.getConnection((err,connection)=>{
    if(err) throw err

    const {title,author,price}=req.body;
    let id=req.params.id;

    connection.query("update store set TITLE=?,AUTHOR=?,PRICE=? where ID=?",[title,author,price,id],(err,rows)=>{
        connection.release();
        if(!err){
            con.getConnection((err,connection)=>{
             if(err) throw err
             let id=req.params.id;
             connection.query("select * from store where id=?",[id],(err,rows)=>{
             connection.release();
               if(!err){
               res.render('edit-product',{rows,msg:"Product Updated",name:req.session.username});
               }
              else{
               console.log("error in listing data"+ err);
               }
             })
            });
        }
        else{
            console.log("error in listing data"+ err);
        }
    });
});

}


exports.login=(req, res)=> {
    con.getConnection((err,connection)=>{
    if(err) throw err
    let username = req.body.username;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/');
			} else {
				res.render('login',{msg:'Incorrect Username and/or Password!'});
			}			
		
		});
	} else {
		res.render('login',{msg:'Please enter Username and Password!'});
	}
    });
		
}

exports.auth=(request, response,next) =>{
	// If the user is loggedin
	if (!request.session.loggedin) {
		// Output username
		//response.send('Welcome back, ' + request.session.username + '!');
        response.redirect('/login');
	}
		// Not logged in
		//response.send('Please login to view this page!');
    next();
}

exports.logout=(req,res)=>{
    res.redirect('/login');
}