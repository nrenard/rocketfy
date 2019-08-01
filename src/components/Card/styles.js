import styled, { css } from 'styled-components';

import { simpleFlex } from '../../styles/mixins';

export const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  cursor: grab;

  & + div, & + & {
    margin-top: 10px;
  }

  p {
    font-weight: 500;
    line-height: 20px;
  }
  
  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 5px;
  }

  ${props => props.isDragging && css`
    border: 2px dashed rgba(0,0,0, 0.2);
    padding-top: 31px;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    cursor: grabbing;

    * {
      opacity: 0;
    }
  `};
`;

export const Header = styled.header`
  ${simpleFlex};
  position: absolute;
  top: -20px;
  left: 15px;
  height: 20px;
`;

export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  background: ${({ color }) => color};
`;

export const EmptyContent = styled.div`
  border: 2px dashed rgba(0,0,0, 0.2);
  height: 102px;
  width: 100%;
  background: transparent;
  display: block;
`;
