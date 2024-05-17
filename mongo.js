const mongoose = require('mongoose')

// console.log(process.argv)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.vk4geaf.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: false
})

note.save().then(result => {
  console.log(result)
  mongoose.connection.close()
})

// Note.find({}).then(result => {
//   result.forEach(note => console.log(note))
//   mongoose.connection.close()
// })