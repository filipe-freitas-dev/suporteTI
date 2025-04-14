import { useLocation } from "react-router-dom";
import Success from "../../components/Success";
import ErrorComponent from "../../components/ErrorComponent";

export default function Chamado(){
  const location = useLocation();
  const chamadoData = location.state

  let sla;

  switch (chamadoData?.prioridade) {
    case 'baixa':
      sla = '2 horas'
      break;
    
    case 'media':
      sla = '1 horas'
      break

    default:
      sla = '30 minutos'
      break;
  }

  return(
    <main className="flex flex-col items-center justify-center w-full md:h-screen min-h-screen bg-gradient-to-t  text-white from-rose-950 to-blue-950 font-montserrat">
      <section className="flex flex-col items-center justify-center gap-3 md:w-8/12 w-11/12 rounded-lg border-2 md:h-11/12 py-10 border-white animacao">
        {chamadoData ? (<Success idChamado={chamadoData?.id} sla={sla}/>): (<ErrorComponent/>)}
      </section>
    </main>
  )
}