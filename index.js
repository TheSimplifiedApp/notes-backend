const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}
app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('Welcome to the Notes App')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: 'no match found' })
  }
})

// generate random id
// const generateID = (max) => {
//   return Math.floor(Math.random() * max)
// }

const generateID = () => Math.max(...notes.map(n => n.id)) + 1

app.post('/api/notes', (req, res) => {
  const body = req.body
  if (!body.content) {
    return res.status(400).json({ error: 'missing content' })
  }

  const note = {
    id: generateID(),
    content: body.content,
    important: body.important || false
  }

  notes = notes.concat(note)
  res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(n => n.id !== id)
  res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  const newNote = { ...note, important: !note.important }
  notes = notes.map(n => n.id === id ? newNote : n)
  res.json(newNote)
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})