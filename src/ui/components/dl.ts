import styled from 'styled-components';

const Dl = styled.dl`
  display: flex;
  flex-wrap: wrap;

  dt,
  dd {
    width: 50%;
  }

  dt {
    font-weight: bold;
    &::after {
      content: ':';
    }
  }
`;

export default Dl;
