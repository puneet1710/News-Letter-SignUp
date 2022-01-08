const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

  const firstName = req.body.fName;
  const lastName  = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/144d5ea611";

  const options = {
    method: "POST",
    auth: "puneet17:27f65fcb8882059af43419081bda344f-us20"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode ===200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  })

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req,res){
  res.redirect("/");
})





app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


//API Keys
//27f65fcb8882059af43419081bda344f-us20


//Audience ID
// 144d5ea611
