import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { FormEvent, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { OfficeDTO } from '../../../dtos/OfficeDTO';
import { PersonDTO } from '../../../dtos/PersonDTO';
import { api } from '../../../services/api';
import { Container } from '../../../styles/pages/register-costs';

interface RegisterCostsProps {
  people: PersonDTO[];
  office: OfficeDTO;
}

interface PersonRegisterData {
  personId: string;
  officeId: string;
  hours: number;
}

const RegisterCosts = ({ people, office }: RegisterCostsProps) => {
  const [selectedPeople, setSelectedPeople] = useState<PersonRegisterData[]>(
    [],
  );
  const router = useRouter();

  const findPerson = (personId: string) => {
    return people.find(person => person.id === personId);
  };

  const changePersonId = (index: number, personId: string) => {
    setSelectedPeople(prevState =>
      prevState.map((person, personIndex) =>
        personIndex === index
          ? {
              hours: selectedPeople[index].hours ?? 0,
              officeId: office.id,
              personId,
            }
          : person,
      ),
    );
  };

  const changePersonHour = (index: number, hours: number) => {
    setSelectedPeople(prevState =>
      prevState.map((person, personIndex) =>
        personIndex === index
          ? {
              hours,
              officeId: office.id,
              personId: selectedPeople[index].personId ?? '',
            }
          : person,
      ),
    );
  };

  const addPerson = () => {
    // @ts-ignore
    setSelectedPeople(prevState => [
      ...prevState,
      {
        hours: '',
        officeId: office.id,
        personId: '',
      },
    ]);
  };

  const removePerson = (index: number) => {
    setSelectedPeople(prevState =>
      prevState.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const totalPrice = useMemo(() => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(
      selectedPeople.reduce((prevValue, currentItem) => {
        return (
          prevValue +
          Number(
            findPerson(currentItem.personId)?.profession_type.monthly_wage ?? 0,
          )
        );
      }, 0),
    );
  }, [selectedPeople]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      selectedPeople.some(
        // @ts-ignore
        person => person.personId === '' || person.hours === '',
      )
    ) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (selectedPeople.length === 0) {
      toast.error('Deve haver pelo menos um lançamento');
      return;
    }

    try {
      await api.post('/offices/register-month-costs', {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        registers: selectedPeople,
      });
      toast.success('Lançamento cadastrado com sucesso!');
    } catch (err) {
      if (err.response.data?.error === 'Passthrough hours work limit') {
        toast.error(
          `${
            err.response.data?.erroredPeople?.length ?? 0
          } usuário(s) excederia o limite de 160 horas mensais.`,
        );

        return;
      }
      toast.error('Não foi possível salvar o lançamento. Lembre-se das regras');
      return;
    }
    router.push('/');
  };

  return (
    <Container>
      <header>
        <img src='/logo.svg' alt='OfficeCOSTs' />
      </header>

      <div>
        <h2>Lançar custo</h2>
        <Button
          style={{ width: '10rem' }}
          containerStyle={{ marginTop: 0 }}
          onClick={addPerson}
        >
          Nova pessoa
        </Button>
      </div>
      <p>{office.name}</p>

      <form onSubmit={handleSubmit}>
        <h4>Total:&ensp; {totalPrice}</h4>

        {selectedPeople.map((person, index) => (
          <div key={`${person.personId}${Math.random()}`}>
            <select
              defaultValue={person.personId}
              onChange={event => changePersonId(index, event.target.value)}
            >
              <option value='' disabled>
                Selecione uma pessoa
              </option>
              {people.map(currentPerson => (
                <option
                  key={currentPerson.id}
                  value={currentPerson.id}
                >{`${currentPerson.name} - ${currentPerson.profession_type.monthly_wage}`}</option>
              ))}
            </select>
            <Input
              placeholder='Horas'
              type='number'
              containerStyle={{ width: '7rem', marginLeft: '1rem' }}
              onChange={event =>
                changePersonHour(index, Number(event.target.value))
              }
              value={person.hours}
            />
            <button
              className='close'
              type='button'
              onClick={() => removePerson(index)}
            >
              X
            </button>
          </div>
        ))}
        <Button type='submit'>Salvar</Button>
      </form>
    </Container>
  );
};

export default RegisterCosts;

export const getServerSideProps: GetServerSideProps<RegisterCostsProps> =
  async ctx => {
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

    let people: PersonDTO[] = [];
    let office: OfficeDTO;

    try {
      people = (await api.get('/people')).data;
      office = (await api.get(`/offices/${ctx.params?.slug}/info`)).data;
    } catch (error) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        people,
        office,
      },
    };
  };
