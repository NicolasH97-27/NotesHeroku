//aca se aplica destructuring, es destruturar un objeto
const Button = (args) =>{
    const label = args.note.important //declaro un
      ? 'importante ' : 'no importante'
  
    return(
        <button onClick={args.toggleImportance}>{label}</button>
        
    )  
  }
export default Button;