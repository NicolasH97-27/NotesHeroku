import React, { useState} from 'react'

const ToggleSwitch =({colorOff,colorOn,accion,feagre}) => {
  const [isToggle, setIsToggle] = useState(false)

  const clickHandler= () => {
    setIsToggle(!isToggle)
    accion()
  }  
  
  return (
    <div  className="caja-switch">
          <label>mostrar importantes</label>
          <label className="switch"> 
            <input type="checkbox" onClick={clickHandler} checked={isToggle}></input>
            <span style={{backgroundColor: isToggle ? colorOn : colorOff }} className="slider round"  ></span>
          </label>
      </div>
  )

}
export default  ToggleSwitch;