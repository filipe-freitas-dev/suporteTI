import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig";

interface Chamado {
  id?: string;
  nome?: string;
  descricao?: string;
  prioridade?: string;
  resolvido?: string;
  resolucao?: string;
  created_at?: string;
}

export default function ChamadoUnico() {
  const [chamado, setChamado] = useState<Chamado>();
  const [clicked, setClicked] = useState<boolean>(false);
  const [resolucao, setResolucao] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  function formatDate(date: string | undefined) {
    const isoDate = date;
    if (!isoDate) {
      navigate("/admin");
      return;
    }
    const parsedDate = parseISO(isoDate);
    const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    return formattedDate;
  }

  async function handleSubmit(e: FormEvent){
    e.preventDefault();

    const data: Chamado = {
      resolucao
    }
    
    const submitData = JSON.stringify(data)

    try {
      await axiosInstance.post(`http://localhost:5000/resolver-chamado/${id}`, submitData);
      navigate(`/admin`)
    } catch (error) {
      navigate('/admin')
    }
  }

  async function getData() {
    try {
      const response = await axiosInstance.get(`http://localhost:5000/buscar-chamado/${id}`);
      // Decodifica a resolucao Base64 para texto
      if (response.data.resolucao) {
        const resolucaoDecodificada = atob(response.data.resolucao);
        response.data.resolucao = resolucaoDecodificada;
      }
      setChamado(response.data);
    } catch (error) {
      console.error("Erro ao buscar chamado:", error);
      navigate("/admin");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full md:h-screen min-h-screen bg-gradient-to-t text-gray-500 from-rose-950 to-blue-950 font-montserrat">
      <section className="flex items-center justify-center md:w-8/12 w-11/12 text-2xl font-medium rounded-lg md:h-11/12 py-10 px-20 bg-slate-100 animacao">
        <table className="w-full">
          <tbody>
            <tr className="font-bold border-b border-slate-300">
              <td className="py-2 pr-4">Nº Chamado:</td>
              <td className="py-2">{chamado?.id || "N/A"}</td>
            </tr>
            <tr className="font-bold border-b border-slate-300">
              <td className="py-2 pr-4">Nome:</td>
              <td className="py-2">{chamado?.nome || "N/A"}</td>
            </tr>
            <tr className="font-bold border-b border-slate-300">
              <td className="py-2 pr-4">Descrição:</td>
              <td className="py-2">{chamado?.descricao || "N/A"}</td>
            </tr>
            <tr className="font-bold border-b border-slate-300">
              <td className="py-2 pr-4">Prioridade:</td>
              <td 
              className={
                `py-2 
                ${chamado?.prioridade === 'baixa' && 'text-green-500'}
                ${chamado?.prioridade === 'media' && 'text-orange-500'}
                ${chamado?.prioridade === 'alta' && 'text-red-500'}
                `
                
                }>
                  {chamado?.prioridade ? chamado.prioridade.toUpperCase(): 'N/A'}
              </td>
            </tr>
            <tr className="font-bold border-b border-slate-300">
              <td className="py-2 pr-4">Resolvido:</td>
              <td className="py-2">{chamado?.resolvido ? "SIM" : "NÃO"}</td>
            </tr>
            <tr className="font-bold border-b border-slate-300">
              <td className="py-2 pr-4">Criado em:</td>
              <td className="py-2">{chamado?.created_at ? formatDate(chamado.created_at) : "N/A"}</td>
            </tr>
            <tr className="font-bold border-b border-slate-300">
              <td className="py-2 pr-4">Resolução:</td>
              <td className="py-2">{chamado?.resolucao || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {!chamado?.resolvido && (<section className={`flex items-center justify-center gap-3 md:w-8/12 w-11/12 text-2xl font-medium rounded-lg ${clicked && "bg-slate-100"} md:h-11/12 py-5 px-20 mt-5 animacao`}>
        {!clicked && (
          <button
            className="p-10 bg-gray-300 transition-all hover:bg-gray-400 rounded-lg md:text-3xl text-zinc-700 text-base"
            onClick={() => setClicked(true)}
          >
            Resolver
          </button>
        )}

        {clicked && (
          <form className="p-5 w-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <textarea
              placeholder="Resolução do problema..."
              className="transition-all px-2 py-1 rounded-xl w-full md:w-11/12 h-28 shadow-sm text-zinc-700 hover:shadow-2xl focus:scale-105 outline-none"
              value={resolucao}
              onChange={(e) => setResolucao(e.target.value)}
            />
            <button
             type="submit"
             className="p-5 bg-gray-300 transition-all hover:bg-gray-400 rounded-lg mt-4 md:text-3xl text-zinc-700 text-base"
            >
              Resolvido
            </button>

          </form>
        )}
      </section>)}
    </main>
  );
}
