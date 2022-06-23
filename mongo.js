//esto no se uso parece
//pero esta bueno porque manda una nueva nota al mongo db
const mongoose = require('mongoose')




if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} //ni idea

const password = process.argv[2] // agarra la contraseña

const url =
  `mongodb+srv://fullstack:${password}@cluster0.0wyxs.mongodb.net/note?retryWrites=true&w=majority`
  
mongoose.connect(url) // conecta con mongo db
//Podemos definir reglas de validación específicas para cada campo en el esquema:
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)  // crea el modelo

const note = new Note({
  content: 'CSS is hard',
  date: new Date(),
  important: false,
})

if ( false ) { //pregunta si salva
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}


Note.find({}).then(result => { 
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})



