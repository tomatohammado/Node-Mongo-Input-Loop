const mongo = require('mongodb').MongoClient
const prompt = require('prompt-sync')()
const url = 'mongodb://localhost:27017/restaurant_db'

mongo.connect(url, function (err, database) {
  const db = database.db('restaurant_db')
  const collection = db.collection('restaurants')
  // let number = prompt("Type 1 and press enter to display all restaurants' names: ")
  let input = getUserInput()
  // process.nextTick(_ => handleInput(input, collection))

  handleInput(input, collection)
})

function getUserInput () {
  const messageBorder = '\n********************************\n'
  const message = messageBorder + "Type 1 and press enter to display all restaurants' names.\n" +
    "\nType 2 to select a specific restaurant and display all information.\n" +
    "\nType 0 to exit." + messageBorder + 'Input: '
  return prompt(message)
}

function handleInput (input, collection) {
  switch (input) {
    case '1':
      collection.find().project({ name: 1, _id: 0 }).toArray(function (err, results){
        console.log(results)
        input = getUserInput()
        handleInput(input, collection)
      })
      break
    case '2':
      // console.log('another option')
      const inputRestaurant = prompt('Enter the name of a restaurant: ')
      collection.find({ name: inputRestaurant }).toArray(function (err, results) {
        console.log(results)
        input = getUserInput()
        handleInput(input, collection)
      })
      break
    case '0':
      process.exit()
      break
    default:
      console.log('\nInvalid Input\n')
      input = getUserInput()
      handleInput(input, collection)
  }
}