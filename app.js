var express = require("express"),
	app     = express(),
	bodyParser = require("body-parser"),
	//mongooes
	sgMail = require('@sendgrid/mail');
    
//=======SETTING Default App Config==========//

//setting view engine to ejs
app.set("view engine","ejs");
//serving custom resources
app.use(express.static(__dirname + '/public'));
//Including body-Parser for later use
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//===================ROUTES=================//

//HOMEPAGE
app.get("/",function(req,res){
    res.render("index");
});

//AMENITIES
app.get("/amenities",function(req,res){
	res.render("amenities");
});

//NEWS
app.get("/news",function(req,res){
	res.render("news1");
});

//FORMS ROUTE
app.get("/form_donor",function(req,res){
	res.render("form_donor");
});

app.get("/form_patient",function(req,res){
	res.render("form_patient");
});

//COMMON POOL
app.get("/common_pool",function(req,res){
	res.render("common_pool");
});

//PLASMA BANK
app.get("/plasma_bank",function(req,res){
	res.render("plasma_bank");
});


//===EXTRA ROUTES=====//
app.get("/technology",function(req,res){
	res.render("technology");
});

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
app.post("/email",function(req,res){
	var email =  req.body.email;
	var name =  req.body.name;
	var number = req.body.number;
	var age = req.body.age;
	var gender = req.body.gender;
	var country = req.body.country;
	var state = req.body.state;
	var city = req.body.city;
	var bg = req.body.bg;
	console.log(email);
	sgMail.setApiKey("");
	const msg = {
	to: email,
	from: 'xyz@gmail.com',
	subject: 'Team Plasma : Success',
	text: 'Dear '+name+', Your form has been successfully pushed into our database. It will expire in next 72 hours, hence take the required steps to comply with the same. The information that was pushed into this form : Age : <br>Gender : <br>Country : <br>State : <br>City : <br>Blood Group :'+ bg +' We will contact you @'+number+' in case of any emergency. Best Regards, Team Plasma ',
	html: 'Dear '+name+',<br><br>Your form has been successfully pushed into our database. It will expire in next <strong>72 hours</strong>, hence take the required steps to comply with the same.<br><br>The information that was pushed into this form :<br><p>Age : '+age+'<br>Gender : '+gender+'<br>Country : '+country+'<br>State : '+state+'<br>City : '+city+'<br>Blood Group : '+ bg +'<br></p>We will contact you @'+number+' in case of any emergency.<br><br> Best Regards,<br> Team Plasma',
	};
	sgMail.send(msg);
	res.render("index");
})


//=================lISTENER PROCESS============//

var port = process.env.PORT || 3000
app.listen(port,process.env.IP,function(){
	console.log("Server started at port:"+port);
})
