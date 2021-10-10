import { GetServerSideProps } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
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
        <h2>Lançamentos desse mês</h2>
        <div className='last-offices-costs'>
          {lastMonthOfficesCosts.map(officeCost => (
            <OfficeCostCard key={officeCost.id} officeCost={officeCost} />
          ))}
        </div>

        <h2>Escritórios cadastrados</h2>
        <div className='offices-list'>
          {offices.map(office => (
            <OfficeCard key={office.id} office={office} />
          ))}
        </div>
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
