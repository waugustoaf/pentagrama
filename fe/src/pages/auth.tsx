import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/auth';
import { Container } from '../styles/pages/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

const formSchema = Yup.object().shape({
  username: Yup.string().required('O username é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

const Auth = () => {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleSignIn = async (data: { username: string; password: string }) => {
    setLoading(true);

    try {
      await signIn(data);
    } catch (error) {
      toast.error('Username e/ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <header>
        <img src='/logo.svg' alt='OfficeCOSTs' />
      </header>

      <div>
        <h1>LogIn</h1>

        <form onSubmit={handleSubmit(handleSignIn)}>
          <Input
            name='username'
            placeholder='Username'
            error={errors.username?.message}
            register={register}
          />
          <Input
            name='password'
            type='password'
            placeholder='Senha'
            error={errors.password?.message}
            register={register}
          />

          <Button type='submit'>{loading ? 'Carregando...' : 'Entrar'}</Button>
        </form>
      </div>
    </Container>
  );
};

export default Auth;
