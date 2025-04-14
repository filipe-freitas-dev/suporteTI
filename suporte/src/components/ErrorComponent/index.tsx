import { FaExclamationCircle } from 'react-icons/fa'
import './ErrorComponent.css'

export default function ErrorComponent() {
  return(
    <div className="flex flex-col items-center justify-center font-montserrat gap-3">
      <FaExclamationCircle size={200} color="red" className="animacao"/>
      <h2 className="text-4xl mt-10 font-bold text-white animate animacao">Ops! Houve algum erro ao criar o chamado...</h2>
      <h3 className='animacao'>Por gentileza, relatar ao Filipe</h3>
    </div>
  )
}