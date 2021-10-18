import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parseCookies, destroyCookie } from 'nookies';
import { ErrorCard } from '../components/ErrorCard';
import { OfficeCard } from '../components/OfficeCard';
import { OfficeCostCard } from '../components/OfficeCostCard';
import { OfficeCostsPerMonthDTO } from '../dtos/OfficeCostsPerMonthDTO';
import { OfficeDTO } from '../dtos/OfficeDTO';
import { api } from '../services/api';
import { Container } from '../styles/pages';

interface HomeProps {
  lastMonthOfficesCosts: OfficeCostsPerMonthDTO[];
  offices: OfficeDTO[];
}

const Home = ({ lastMonthOfficesCosts, offices }: HomeProps) => {
  return (
    <Container>
      <header>
        <img src='/logo.svg' alt='OfficeCOSTs' />
      </header>

      <div>
        {lastMonthOfficesCosts.length !== 0 && (
          <>
            <h2>Lançamentos desse mês</h2>
            <div className='last-offices-costs'>
              {lastMonthOfficesCosts.map(officeCost => (
                <OfficeCostCard key={officeCost.id} officeCost={officeCost} />
              ))}
            </div>
          </>
        )}

        <div className='office-header'>
          <h2>Escritórios</h2>

          <Link href='office/create'>
            <a>Novo escritório</a>
          </Link>
        </div>
        <div className='offices-list'>
          {offices.map(office => (
            <OfficeCard key={office.id} office={office} />
          ))}
        </div>
        {offices.length === 0 && (
          <ErrorCard
            message='Nenhum escritório cadastrado!'
            actionText='Cadastrar escritório'
            href='/office/create'
          />
        )}
      </div>
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async ctx => {
  const { '@OfficeCosts:token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  api.defaults.headers.authorization = `Bearer ${token}`;

  let lastMonthOfficesCosts = [];
  let offices: OfficeDTO[] = [];

  try {
    lastMonthOfficesCosts = (
      await api.get('/offices/list-month-costs', {
        params: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
      })
    ).data;

    offices = (await api.get('/offices')).data;
  } catch (err) {
    if (err.response.status === 401) {
      destroyCookie(ctx, '@OfficeCosts:token');
    }
    console.log(err);

    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      lastMonthOfficesCosts,
      offices,
    },
  };
};
