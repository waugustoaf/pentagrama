import { createContext } from 'react';

interface OfficeContextProps {}

const OfficeContext = createContext<OfficeContextProps>(
  {} as OfficeContextProps,
);

const OfficeProvider: React.FC = ({ children }) => {
  return <OfficeContext.Provider value={{}}>{children}</OfficeContext.Provider>;
};

const useOffice = () => {
  
}