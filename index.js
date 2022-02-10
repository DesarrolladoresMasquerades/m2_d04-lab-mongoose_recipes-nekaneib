require("dotenv/config");
const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PWD}@cluster0.xkqko.mongodb.net/recipe-app?retryWrites=true&w=majority`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.insertMany(data)
    .then(()=>{
      Recipe.findOneAndUpdate(
          { title: { $eq: "Rigatoni alla Genovese" } },
          { $set: { duration: 100 } },
          { new: true }
      ).then(res=>console.log(res))
    })
      .then(()=>{
        Recipe.deleteOne(
            {title: "Carrot Cake"}
        ) .then(()=> mongoose.connection.close())
      })

  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
