import styled from 'styled-components';

const Wrapper = styled.li`
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  border: none;

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;
