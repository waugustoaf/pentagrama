import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  > div {
    display: flex;
    justify-content: space-between;

    strong {
      font-weight: bold;
      font-size: 1.125rem;
    }

    small {
      font-weight: bold;
      font-size: 0.925rem;
    }
  }

  > span {
    display: block;
    margin-top: 1rem;
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  & + & {
    margin-top: 1rem;
  }
`;
