import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container } from '../../styles/pages/office/create';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { api } from '../../services/api';
import { useRouter } from 'next/router';
import { officeErrorsFormat } from '../../utils/officeErrosFormat';

interface SubmitDataProps {
  name: string;
  description: string;
  address: string;
}

const shape = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  address: Yup.string().required('Endereço é obrigatório'),
});

const OfficeCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shape),
  });

  const router = useRouter();

  const handleCreateOffice = async ({
    address,
    description,
    name,
  }: SubmitDataProps) => {
    try {
      await api.post('/offices', {
        name,
        description,
        address,
      });

      router.push('/');
    } catch (err) {
      if (err.response.status === 401) {
        destroyCookie(null, '@OfficeCosts:token');
        return router.push('/');
      }

      toast.error(officeErrorsFormat(err.response?.data?.message));
    }
  };

  return (
    <Container>
      <header>
        <img src='/logo.svg' alt='OfficeCOSTs' />
      </header>

      <div>
        <button id='back'>
          <img src='/images/arrow.svg' alt='Voltar' />
          <span>Voltar</span>
        </button>
        <h2>Novo escritório</h2>

        <form onSubmit={handleSubmit(handleCreateOffice)}>
          <Input
            placeholder='Nome'
            name='name'
            error={errors.name?.message}
            register={register}
          />
          <Input
            placeholder='Descrição'
            name='description'
            error={errors.description?.message}
            register={register}
          />
          <Input
            placeholder='Endereço'
            name='address'
            error={errors.address?.message}
            register={register}
          />

          <Button type='submit'>Criar</Button>
        </form>
      </div>
    </Container>
  );
};

export default OfficeCreate;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { '@OfficeCosts:token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
