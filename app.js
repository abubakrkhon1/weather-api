import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "d89e43475ffc45b589241412240306";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",async (req,res)=>{
  res.render("landing.ejs");
})

app.get("/request-form",(req,res)=>{
  res.render("request-form.ejs");
})

app.get("/contact-me",(req,res)=>{
  res.render("contact-me.ejs");
})

app.post("/submit-info",async (req,res)=>{
  const body = req.body.city;
  try {
    const weatherapi = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${body}`);
    res.render("view-data.ejs", { content: JSON.stringify(weatherapi.data),city:body });
  } catch (error) {
    res.render("view-data.ejs");
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});