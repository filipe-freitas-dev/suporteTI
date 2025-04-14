import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig";

interface Chamado {
  id: number;
  nome: string;
  descricao: string;
  prioridade: string;
  resolvido: string;
  created_at: string;
}

export default function Admin() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const navigate = useNavigate();

  function formatDate(date: string) {
    const isoDate = date;
    const parsedDate = parseISO(isoDate);
    const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
    return formattedDate
  }

  async function handleClick(e: FormEvent, url: string) {
    e.preventDefault();

    try {
      const response = await axiosInstance.get(url);
      setChamados(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gradient-to-t from-rose-950 to-blue-950 font-montserrat">
      <header className="w-full flex flex-col items-center justify-center mt-10">
        <nav className="w-2/3 flex flex-col items-center justify-center rounded-lg bg-slate-100 mb-2 p-5">
          <ul className="flex justify-between gap-20 text-slate-700">
            <li
              className="text-3xl font-bold p-4 cursor-pointer transition-all hover:opacity-80 rounded-full"
              onClick={(e) => handleClick(e, 'http://localhost:5000/buscar-chamados?resolvido=0')}
            >
              Pendentes
            </li>

            <li
              className="text-3xl font-bold p-4 cursor-pointer transition-all hover:opacity-80 rounded-full"
              onClick={(e) => handleClick(e, 'http://localhost:5000/buscar-chamados?resolvido=1')}
            >
              Resolvidos
            </li>

            <li
              className="text-3xl font-bold p-4 cursor-pointer transition-all hover:opacity-80 rounded-full"
              onClick={(e) => handleClick(e, 'http://localhost:5000/buscar-chamados/all')}
            >
              Todos
            </li>
          </ul>
        </nav>
      </header>
      <section className="gap-3 md:w-8/12 w-11/12 h-11/12 rounded-lg bg-slate-100 p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resolvido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado Em
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chamados && chamados.map((chamado) => (
                <tr key={chamado.id} className="cursor-pointer transition-all hover:opacity-80" onClick={() => navigate(`/chamado/${chamado.id}`)}>
                  <td className="flex flex-col items-center justify-center h-full whitespace-nowrap py-10 text-sm font-medium text-gray-900 text-center">
                    {chamado.id}
                  </td>
                  <td className="px-6 py-4 pwhitespace-nowrap text-sm text-gray-500">
                    {chamado.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                    {chamado.descricao}
                  </td>
                  <td className={
                    `px-6 py-4 whitespace-nowrap text-sm
                    ${chamado?.prioridade === 'baixa' && 'text-green-500'}
                    ${chamado?.prioridade === 'media' && 'text-orange-500'}
                    ${chamado?.prioridade === 'alta' && 'text-red-500'}

                    `}>
                    {chamado.prioridade.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {chamado.resolvido ? 'SIM' : 'NÃO'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(chamado.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
