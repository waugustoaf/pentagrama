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

  > div {
    > button {
      display: flex;
      align-items: center;
      background: none;
      transition: all 0.2s;
      border: none;
      border-bottom: 2px solid transparent;
      padding-bottom: 0.25rem;
      transition: all 0.2s;

      span {
        margin-left: 0.5rem;
        color: ${props => props.theme.colors.primary.main};
        font-weight: bold;
      }

      &:hover {
        border-color: ${props => props.theme.colors.primary.light};
      }
    }

    form {
      margin-top: 1rem;
    }
  }
`;
