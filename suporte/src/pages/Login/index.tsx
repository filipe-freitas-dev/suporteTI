import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance, setAuthToken } from "../../axiosConfig";

interface LoginProps{
  login: string;
  senha: string;
}

interface NotifyPropos{
  title: string;
  content: string;
  color: string;
}

export default function Login(){

  const [login, setLogin] = useState<string>('')
  const [senha, setSenha] = useState<string>('')
  
    const navigate = useNavigate();

  function NotifyComponent({title, content, color}: NotifyPropos){
    return(
      <>
        <h1 className={`text-md font-bold ${color}`}>{title}</h1>
        <p className='text-sm'>{content}</p>
      </>
    )
  }

  const errorNotify = (title: string, content: string, color: string) => {
    toast.error(<NotifyComponent title={title} content={content} color={color}/>, {
      theme: 'dark'
    });
  };

  async function handleSubmit(e: FormEvent){
    e.preventDefault();

    const data: LoginProps = {
      login, 
      senha,
    }

    const url = 'http://localhost:5000/login'
    const submitData = JSON.stringify(data)

    try {
      const response = await axiosInstance.post(url, submitData)
      const token = response.data
      setAuthToken(token)
      navigate('/admin')

    } catch (error) {
      navigate('/login')
      errorNotify('Erro ao logar!', 'Credenciais erradas', 'text-red-700')
    }

  }

  return(
    <main className="flex flex-col items-center justify-center w-full md:h-screen min-h-screen bg-gradient-to-t text-white from-rose-950 to-blue-950 font-montserrat">
      <section className="flex flex-col items-center justify-center gap-3 md:w-8/12 w-11/12 animacao">
        <h1 className="mb-10 text-5xl text-center font-bold">Acessar Admin</h1>
        <form 
         action="" 
         className="flex flex-col items-center justify-center gap-5 md:w-1/2 w-11/12 h-full rounded-lg border-2 py-10 border-white"
         onSubmit={handleSubmit}
         >
          <input 
           type="text" 
           className="outline-none rounded-xl md:w-2/3 w-10/12 px-3 py-1 text-center items-center justify-center text-zinc-700" 
           placeholder="Login"
           value={login}
           onChange={e => setLogin(e.target.value)}
           />
          <input 
           type="password" 
           className="outline-none rounded-xl md:w-2/3 w-10/12 px-3 py-1 text-center items-center justify-center text-zinc-700" 
           placeholder="***********"
           value={senha}
           onChange={e => setSenha(e.target.value)}
           />

          <button
            type="submit"
            className="px-4 py-2 bg-gray-300 transition-all hover:bg-gray-400 rounded-lg mt-4 md:text-lg text-zinc-700 text-base"
          >
            Entrar
          </button>
      
        </form>
      </section>
    </main>
  )
}