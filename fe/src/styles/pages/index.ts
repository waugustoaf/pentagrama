import styled from 'styled-components';

export const Container = styled.div`
  header {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;

    img {
      width: 14rem;
    }
  }

  > div {
    h2 {
      margin-top: 3rem;
      border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
    }

    .office-header {
      margin-top: 3rem;
      border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
      padding-bottom: 8px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        margin-top: 0;
        border: none;
      }

      a {
        text-decoration: none;
        padding: 0.675rem;
        font-weight: bold;
        color: ${props => props.theme.colors.primary.main};
        border: 2px solid ${props => props.theme.colors.primary.main};
        border-radius: 4px;
      }
    }
  }

  .last-offices-costs {
    margin-top: 1.5rem;
  }

  .offices-list {
    margin-top: 1.5rem;
  }
`;
