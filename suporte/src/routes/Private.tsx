import axios from 'axios';
import { ReactNode, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

interface PrivateProps{
  children: ReactNode;
}

interface TokenJSON {
  token: string | null;
}

const PrivateRoute = ({children}: PrivateProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@token');

    if (!token) {
      navigate('/login')
    }

    const tokenStruct: TokenJSON = {
      token,
    } 

    const tokenJSON = JSON.stringify(tokenStruct)

    async function validateToken(tokenJSON: string) {
      try {
        const response = await axios.post('http://localhost:5000/validate-token', tokenJSON)


        if (response.status <= 200 || response.status >= 300){
          navigate('/login')
        }

        return;
        
      } catch (error) {
        navigate('/login')
      }
    }
    validateToken(tokenJSON);

  })
  return (
    <>
      {children}
    </>
  );
};

export default PrivateRoute;
