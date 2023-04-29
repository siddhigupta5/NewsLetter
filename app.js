const express=require("express");
const bodyParser= require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){
   response.sendFile(__dirname+"/signup.html");
});

app.post("/",function(request,response){
   var fname=request.body.fname;
   var lname=request.body.lname;
   var email=request.body.email;
   var data={
    members: [
        {
        email_address: email,
        status: "subscribed",
        merge_fields:{
            FNAME: fname,
            LNAME:lname
        }
        }
        
    ]
   };
   const jsonData=JSON.stringify(data);

   const url="https://us8.api.mailchimp.com/3.0/lists/907aaf8789";
   const options={
      method: "POST",
      auth: "siddhi:e2fc2d2e601d43c2a8ea992b272e8498-us8"
   }
   const req=https.request(url,options,function(res){

    if(res.statusCode===200){
        response.sendFile(__dirname+"/success.html");
    }
    else{
        response.sendFile(__dirname+"/failure.html");
    }

    res.on("data",function(data){
    console.log(JSON.parse(data));
})
   })
   req.write(jsonData);
   req.end();
});

app.post("/success",function(request,response){
    response.redirect("/");
})
app.post("/failure",function(request,response){
    response.redirect("/");
})

app.listen(process.env.PORT|| 3000,function(){
    console.log("Server is running at port 3000.");
});
//API key- 1a8e5386af40bfadc608ccf6ce741ca1-us8
//Audience id- 907aaf8789
