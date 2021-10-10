import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0 16px;
  height: 52px;
  border: none;
  background-color: ${props => props.theme.colors.primary.main};
  font-size: 16px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: #fff;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${props => props.theme.colors.primary.light};
  }

  &:active {
    background-color: ${props => props.theme.colors.primary.dark};
  }

  &[disabled] {
    background-color: #cccccc;
    cursor: default;
  }
`;
