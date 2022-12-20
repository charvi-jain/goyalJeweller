const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.get("/signup",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
const fn=req.body.fname;
const ln=req.body.lname;
const email=req.body.email;

var data={
  members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: fn,
        LNAME: ln
      }
    }
  ]
};
const jsonData=JSON.stringify(data);
const url="https://us8.api.mailchimp.com/3.0/lists/32a3728f26";
const options={
  method: "POST",
  auth: "charvi:7ac3d23945ca80e3d467eebdd03c4c01-us8"

}
const request=https.request(url,options, function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});



app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
// key-dd6cfe316e0589e66b7be62070a08dc2-us8
// audience id-32a3728f26
