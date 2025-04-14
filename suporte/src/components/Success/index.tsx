import { BsCheckCircle } from "react-icons/bs"
import './Success.css'

interface SuccessProps{
  idChamado: number;
  sla: string;
}

export default function Success({idChamado, sla}: SuccessProps) {
  return(
    <div className="flex flex-col items-center justify-center font-montserrat gap-3">
      <BsCheckCircle size={200} color="green" className="animacao"/>
      <h2 className="text-4xl font-bold text-white animate animacao">Chamado criado com sucesso!</h2>
      <div className="cursor-pointer flex flex-col items-center justify-center bg-slate-900 p-5 mt-6 gap-3 rounded-lg transition-all hover:scale-105">
        <h3 className="text-2xl font-medium ">O numero do seu chamado é</h3>
        <strong className="text-5xl text-green-500">#{idChamado}</strong>
        <h3 className="text-2xl font-medium">O seu SLA de atendimento é de até <strong className="text-cyan-300">{sla}</strong></h3>
      </div>
    </div>
  )
}