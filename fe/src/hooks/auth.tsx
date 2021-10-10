import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { parseCookies, setCookie } from 'nookies';
import { api } from '../services/api';
import Router from 'next/router';

interface SignInData {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
}

interface SignInResponse {
  token: string;
  user: User;
}

interface AuthContextProps {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  signIn(data: SignInData): Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useMemo(() => !!user, [user]);

  useEffect(() => {
    (async () => {
      const { '@OfficeCosts:token': token } = parseCookies();

      if (token) {
        try {
          const { data: user } = await api.get('/sessions/info');

          setUser(user);
        } catch {
          Router.push('/auth');
        }
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async ({ username, password }: SignInData) => {
    const { data } = await api.post<SignInResponse>('/sessions', {
      username,
      password,
    });
    const { token, user } = data;

    setCookie(undefined, '@OfficeCosts:token', token, {
      maxAge: 60 * 60 * 2, // 2 days
    });

    api.defaults.headers.authorization = `Bearer ${token}`;

    setUser(user);

    Router.push('/');
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
