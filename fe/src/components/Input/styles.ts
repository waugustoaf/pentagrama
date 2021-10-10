import styled, { css } from 'styled-components';

interface Props {
  error?: string;
}

export const Container = styled.div<Props>`
  > span {
    color: ${props => props.theme.colors.danger.main};
    margin-top: 8px;
    display: block;
    font-size: 12px;
  }

  & + & {
    margin-top: 1rem;
  }

  input {
    width: 100%;
    background: #fff;
    height: 52px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    border: 2px solid transparent;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
    appearance: none;

    &:focus {
      border-color: ${props => props.theme.colors.primary.main};
    }

    ${props =>
      props.error &&
      css`
        border-color: ${props.theme.colors.danger.main} !important;
        color: ${props.theme.colors.danger.main};
      `}
  }
`;
