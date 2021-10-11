import styled from "styled-components";
import media from "styled-media-query";

const Footer = styled.footer`
  background-color: #212121;
  height: 48px;
  ${media.greaterThan("small")`
    height: 72px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 0.5rem;
  ${media.greaterThan("small")`
    font-size: 1rem:
  `}
`;

const LoggedInFooter = () => {
  return (
    <Footer>
      <Text>
        Copyright © 2021 TrainLCD Team
        <br />
        このウェブサイトの一部または全部の転載を固く禁じます。
      </Text>
    </Footer>
  );
};

export default LoggedInFooter;
