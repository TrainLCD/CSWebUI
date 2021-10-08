import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  resolved: boolean;
};

const StatusTag = ({ children, resolved }: Props) => (
  <Root resolved={resolved}>{children}</Root>
);

const Root = styled.div<{ resolved: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ resolved }) => (resolved ? "#ccc" : "#ff0075")};
`;

export default StatusTag;
