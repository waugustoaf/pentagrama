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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > form {
    margin-top: 2rem;

    > div {
      display: flex;
      margin-top: 1rem;

      select {
        width: 100%;
        background: #fff;
        height: 52px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 2px solid #fff;
        outline: none;
        padding: 0 16px;
        font-size: 16px;
        transition: border-color 0.2s ease-in;
        appearance: none;

        &:focus {
          border-color: ${props => props.theme.colors.primary.main};
        }
      }

      > button.close {
        width: 4rem;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        color: ${props => props.theme.colors.danger.main};
        transition: color 0.2s;

        &:hover {
          color: ${props => props.theme.colors.danger.light};
        }

        &:active {
          color: ${props => props.theme.colors.danger.light};
        }
      }
    }
  }
`;
