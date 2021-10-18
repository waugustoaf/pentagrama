export const officeErrorsFormat = (errMessage: string) => {
  switch (errMessage) {
    case 'Office already exits!':
      return 'Já existe um escritório com esse nome';
    default:
      return 'Houve um erro ao cadastrar';
  }
};
