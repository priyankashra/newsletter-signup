const express = require('express');

const request = require('request');
const https=require('node:https');
// const mailchimp = require("@mailchimp/mailchimp_marketing");
// mailchimp.setConfig({
//   apiKey: "cab3eb6b663b40d61612151309a892ef-us21",
//   server: "us21",
// });


const app = express();


  

const port = 3000;


app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res) => {
  res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    const firstName= req.body.fname;
    const lastName= req.body.lname;
    const email= req.body.email;
    
    const data={
      members: [
      {
          email_address:email,
          status:"subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }


    

      }
    ]
  };
  const jsonData= JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/bf26111812";
  const options = {
    method: "POST",
    auth:"priyank2:cab3eb6b663b40d61612151309a892ef-us21"
  }
  const request = https.request(url ,options ,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on('data',function(data){ 
      console.log(JSON.parse(data));
  
      })
    })
    request.write(jsonData);
    request.end();


  });


 

app.post("/failure",function(req,res){
  res.redirect("/")
})


app.listen(port, () => {
  console.log(" app listening on port 3000");
});
