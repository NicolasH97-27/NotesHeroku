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
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


import ReactDOM from 'react-dom';
import React, { useState, useEffect} from 'react'
import noteService from './services/notes'
import loginService from './services/login'


const App = () => {
  const [notes, setNotes] = useState([]) //se declara un valor y un estado(una funcion segun entiendo)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('escribi tranquilo...')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }


  useEffect(hook,[]) 
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' cambio su importancia`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
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

      
      {user === null ?
        <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note">
            <NoteForm
              onSubmit={addNote}
              value={newNote}
              onChange={handleNoteChange}
              accion={setShowAll}
              
            />
          </Togglable>
        </div>
      }

      {/* PUEDO SACAR ESTO Y PONERLO EN OTRO COMPONENTE ? LOS FORMULARIOS */}
      <ToggleSwitch
          accion={() => setShowAll(!showAll)}
          colorOff="gray"
          colorOn="black"
      />
     
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


