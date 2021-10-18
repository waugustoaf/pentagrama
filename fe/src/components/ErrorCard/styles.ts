import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    width: 5.25rem;
  }

  > div {
    margin-left: 1.5rem;

    > span {
      display: block;
      font-size: 22px;
      font-weight: bold;
      color: ${props => props.theme.colors.danger.dark};
      margin-bottom: 1rem;
    }

    > a {
      display: inline-block;
      margin-top: 0.5rem;
      padding: 1rem 1.5rem;
      background-color: ${props => props.theme.colors.primary.main};
      color: #fff;
      border-radius: 4px;
      font-weight: bold;
      text-decoration: none;
      transition: background-color 0.2s;
      font-size: 1rem;

      &:hover {
        background-color: ${props => props.theme.colors.primary.dark};
      }

      &:active {
        background-color: ${props => props.theme.colors.primary.light};
      }
    }

    > button {
      border: none;
      margin-top: 0.5rem;
      padding: 1rem 1.5rem;
      background-color: ${props => props.theme.colors.primary.main};
      color: #fff;
      border-radius: 4px;
      font-weight: bold;
      transition: background-color 0.2s;
      font-size: 1rem;

      &:hover {
        background-color: ${props => props.theme.colors.primary.dark};
      }

      &:active {
        background-color: ${props => props.theme.colors.primary.light};
      }
    }
  }
`;
