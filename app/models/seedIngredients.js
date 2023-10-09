//seedIngredients.js will run with the command 'npm run seed'
//this will seed the db with a bunch of ingredients

const mongoose = require('mongoose')
const Ingredient = require('./ingredient')
const db = require('../../config/db')

const startIngredients = [
  {name: 'flour', amount: '2 cups' },
  {name: 'sugar', amount: '4 cups'},
  {name: 'potato', amount: 3 },
  {name: 'leek', amount: 2 },
  {name: 'garlic', amount: '1 cup'},
  {name: 'egg', amount: 5 },
  {name: 'green pepper', amount: 1 }
]

//first connect to the db
//then remove all ingreidents without owners
//then insert the startingredients
//then ALWAYS close the connection from this file

mongoose.connect(db, {
  useNewUrlParser: true
})
  .then(() => {
    Ingredient.deleteMany({ owner: null })
      .then(deletedIngredients => {
        console.log('the deleted ingredients: \n', deletedIngredients)

        Ingredient.create(startIngredients)
          .then(newIngredients => {
            console.log('new ingredients added to db: \n', newIngredients)
            mongoose.connection.close()
          })
          .catch(error => {
            console.log('an error occured: \n', error)
            mongoose.connection.close()
          })
      })
      .catch(error => {
        console.log('an error occured: \n', error)
        mongoose.connection.close()
      })
  })

  .catch(error => {
    console.log('an error occured: \n', error)
    mongoose.connection.close()
  })