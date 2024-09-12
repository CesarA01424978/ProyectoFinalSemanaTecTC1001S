import "../Styles/Botones.css"
import Home from "../assets/Home.svg"
import Temp from "../assets/Temp.svg"
import Bulb from "../assets/Bulb.svg"
const  Botones =({opcion,setOpcion}) => {  

  return (

    <div className="div-controlador-botones">
            <button className={opcion === 0 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(0)}><img src={Home}></img></button>
            <button className={opcion === 1 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(1)}><img src={Temp}></img></button>
            <button className={opcion === 2 ? 'boton-presionado' : 'boton'} onClick={() => setOpcion(2)}><img src={Bulb}></img></button>
    </div>    

  )
}

export default Botones;
