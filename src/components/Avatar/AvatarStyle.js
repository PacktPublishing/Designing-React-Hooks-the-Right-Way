import styled from 'styled-components'

const size = '32px'

const AvatarStyle = styled.div`
  display: inline-block;
  vertical-align: middle;
  img, div {
    border-radius: 50%;
    width: ${size};
    height: ${size};
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default AvatarStyle
