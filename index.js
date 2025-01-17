const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {

  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    // ITERATION 2
    const paella = {
      title: "paella" ,
      level:"Amateur Chef",
      ingredients:["rice", "chicken stock", ],
      cuisine:"spanish",
      dishType: "main_course",
      image:  "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 90,
      creator: "jordi",
      created: undefined
    }
  
    return Recipe.create(paella)

  })
.then(recipe => console.log(recipe.title))
  
.then(() => {
    //ITERATION 3
   return Recipe.insertMany(data)
    
  })

.then(arr => {for(recipe of arr)console.log(recipe.title)})


    //ITERATION 4
.then(() => {

   return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese" }, {duration: 100} , {new:true})
    
  })
.then((updatedElement)=> console.log(updatedElement))
    //ITERATION 5
.then(() => {
     return Recipe.deleteOne({title:"Carrot Cake"})
    
  })
.then((deletedElement) => console.log(deletedElement))
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close();