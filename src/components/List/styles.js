import styled from 'styled-components';

import { simpleFlex } from '../../styles/mixins';

export const Container = styled.div`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;
  opacity: ${({ done }) => (done ? 0.6: 1)};

  & + & {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

export const Header = styled.header`
  ${simpleFlex};
  justify-content: space-between;
  margin-bottom: 30px;

  h2 {
    font-weight: 500;
    font-size: 16px;
    padding: 0 10px;
  }

  button {
    height: 42px;
    width: 42px;
    border-radius: 50%;
    background: #3b5bfd;
    border: 0;
  }
`;
