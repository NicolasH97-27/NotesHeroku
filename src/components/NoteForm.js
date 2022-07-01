//aca se aplica destructuring, es destruturar un objeto
import ToggleSwitch from "./ToggleSwitch";
const Form1 = (args) =>{
    return(
    <form onSubmit={args.onSubmit} action="#"  name="formNotas">
	      <label for="mensaje">Notas</label>
	      <textarea  value={args.value} onChange={args.handleChange} name="mensaje" for="mensaje" maxlength="300"></textarea>
        <input   type="submit" name="enviar" value="enviar notas"/>

      <ToggleSwitch
          accion={() => args.accion}
          colorOff="gray"
          colorOn="black"
      />
    </form>
    )
}
export default Form1;
