import styled from 'styled-components';

export const Container = styled.div`
  header {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;

    img {
      width: 14rem;
    }
  }

  div {
    h1 {
      font-size: 1.5rem;
      color: ${props => props.theme.colors.gray[900]};

    }

    form {
      margin-top: 1.5rem;
    }
  }
`;
