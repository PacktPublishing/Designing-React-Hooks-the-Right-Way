import styled from 'styled-components'

const TooltipStyle = styled.span`
  cursor: help;
  position: relative;
  .__tooltip {
    position: absolute;
    z-index: 10;
    left: 0;
    top: -100%;
  }

`

export default TooltipStyle
