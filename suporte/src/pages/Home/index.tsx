import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../axiosConfig';

interface DataProps {
  nome: string;
  descricao: string;
  prioridade: string;
}

interface NotifyPropos{
  title: string;
  content: string;
  color: string;
}

export default function Home() {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [prioridade, setPrioridade] = useState<string>('baixa'); 

  function NotifyComponent({title, content, color}: NotifyPropos){
    return(
      <>
        <h1 className={`text-md font-bold ${color}`}>{title}</h1>
        <p className='text-sm'>{content}</p>
      </>
    )
  }

  const navigate = useNavigate();

  const errorNotify = (title: string, content: string, color: string) => {
    toast.error(<NotifyComponent title={title} content={content} color={color}/>, {
      theme: 'dark'
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:5000/criar-chamado';

    const data: DataProps = {
      nome,
      descricao,
      prioridade,
    };
    
    for (const key in data) {
      if (data[key as keyof DataProps] === '') {
        errorNotify("Erro ao criar o chamado!", "Todos os campos devem ser preenchidos...", "text-red-500");
        return;
      }
    }

    const submitData = JSON.stringify(data);

    try {
      const response = await axiosInstance.post(apiUrl, submitData);
      if (response.status >= 200) {
        navigate('/chamado', {state: response.data});
      } else {
        errorNotify("Erro ao criar o chamado!", `Status Code: ${response.status}`, "text-red-500");
      }
    } catch (error) {
      console.log(error)
      navigate('/chamado');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full md:h-screen min-h-screen bg-gradient-to-t text-white from-rose-950 to-blue-950 font-montserrat">
      <section className="flex flex-col items-center justify-center gap-3 md:w-8/12 w-11/12 h-3/4 p-10 rounded-lg">
        <h1 className="mb-10 text-5xl font-bold">Suporte TI</h1>
        <form
          className="w-full md:w-11/12 flex flex-col items-center justify-center gap-4 md:gap-6 rounded-lg border-2 p-6 border-white"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Insira seu nome..."
            className="mt-5 transition-all px-2 py-1 rounded-xl w-full md:w-11/12 shadow-sm text-zinc-700 hover:shadow-2xl focus:scale-105 outline-none"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
            placeholder="Descreva seu problema..."
            className="transition-all px-2 py-1 rounded-xl w-full md:w-11/12 h-28 shadow-sm text-zinc-700 hover:shadow-2xl focus:scale-105 outline-none"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className="mt-4 flex flex-col md:flex-row items-center md:text-lg text-base justify-between gap-4 md:gap-6">
            <h1 className="md:w-auto">Prioridade:</h1>
            <div className="flex items-center gap-2 transition-all">
              <input
                type="radio"
                id="baixa"
                name="prioridade"
                value="baixa"
                className="transition-all hover:text-slate-700 cursor-pointer"
                checked={prioridade === 'baixa'}
                onChange={(e) => setPrioridade(e.target.value)}
              />
              <label
                htmlFor="baixa"
                className={`cursor-pointer ${prioridade === 'baixa' ? 'text-green-500' : ''}`}
              >
                Baixa
              </label>
            </div>
            <div className="flex items-center gap-2 transition-all">
              <input
                type="radio"
                id="media"
                name="prioridade"
                value="media"
                className="transition-all hover:text-slate-700 cursor-pointer"
                checked={prioridade === 'media'}
                onChange={(e) => setPrioridade(e.target.value)}
              />
              <label
                htmlFor="media"
                className={`cursor-pointer ${prioridade === 'media' ? 'text-orange-500' : ''}`}
              >
                Média
              </label>
            </div>
            <div className="flex items-center gap-2 transition-all">
              <input
                type="radio"
                id="alta"
                name="prioridade"
                value="alta"
                className="transition-all hover:text-slate-700 cursor-pointer"
                checked={prioridade === 'alta'}
                onChange={(e) => setPrioridade(e.target.value)}
              />
              <label
                htmlFor="alta"
                className={`cursor-pointer ${prioridade === 'alta' ? 'text-red-600' : ''}`}
              >
                Alta
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-gray-300 transition-all hover:bg-gray-400 rounded-lg mt-4 md:text-lg text-zinc-700 text-base"
          >
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
}

