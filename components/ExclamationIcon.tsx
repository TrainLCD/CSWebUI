import styled from "styled-components";

const Root = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background-color: #ff0075;
  border-radius: 8px;
  user-select: none;
`;
const ExclamationText = styled.p`
  color: white;
  font-weight: bold;
  margin: 0;
`;

const ExclamationIcon = () => (
  <Root>
    <ExclamationText>!</ExclamationText>
  </Root>
);

export default ExclamationIcon;
