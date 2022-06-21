// const selectedStyle = "";
// const nonSelectedStyle ="";
// className={menu.selected ? selectedStyle : nonSelectedStyle}

//que piola esta usestate!
// styles
import "./app.css";
import Navbar from "./components/Navbar";
import Note from "./components/Note";
import Button from "./components/Button";
import Notification from "./components/Notification";
import ToggleSwitch from "./components/ToggleSwitch";


import ReactDOM from 'react-dom';
import React, { useState, useEffect} from 'react'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([]) //se declara un valor y un estado(una funcion segun entiendo)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('escribi tranquilo...')

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }


  useEffect(hook,[]) 

  

  const toggleImportanceOf = id => {
 
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    //En la práctica, {... note} crea un nuevo objeto con copias de todas las propiedades del objeto note
  
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    setErrorMessage(
      `Note '${note.content}' cambio su importancia`//con $se ecribe comentario
    ) 
        setTimeout(() => { //te muestra cuanto tiempo aparece el mensaje xdxdxdxd
          setErrorMessage(null)
        }, 5000)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()//previene que el formulario haga algo por defoult
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  return (
    <body>
      <div >
        <Navbar />
      </div>
      
      <Notification  message={errorMessage} />

      <form onSubmit={addNote} action="#"  name="formNotas">
	      <label for="mensaje">Notas</label>
	      <textarea  value={newNote} onChange={handleNoteChange} name="mensaje" for="mensaje" maxlength="300"></textarea>
        <input   type="submit" name="enviar" value="enviar notas"/>
        
        
        {/* <input  type="checkbox" className="ButtonToShow" onClick={() => setShowAll(!showAll)}>
          
        </input > */}
      <ToggleSwitch
          accion={() => setShowAll(!showAll)}
          colorOff="gray"
          colorOn="black"
      />
          

      </form> 
      
      {/* el que toma accion sobre lo que se escribe en text area es onChange */}
     
      <ul className="Notas">
        
        {notesToShow.map(note => 
          <div>
            <Note 
              key={note.id} 
              note={note} 
              />
            <Button
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          </div>
        )}
      </ul>
      
             
    </body>
  );
};

ReactDOM.render(<App  />, document.getElementById('root'))


