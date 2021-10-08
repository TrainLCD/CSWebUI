import { signInWithEmailAndPassword } from "@firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import media from "styled-media-query";
import AppIcon from "../components/AppIcon";
import ExclamationIcon from "../components/ExclamationIcon";
import { auth } from "../lib/firebase";
import authState from "../store/atoms/auth";

const BG_IMAGES: BGImage[] = [
  {
    src: "/login-bg/pexels-jerry-wang-3787405.jpg",
    alt: "Photo by Jerry Wang on Pexels",
  },
];
const bgImgIndex = Math.floor(Math.random() * BG_IMAGES.length);
const bgImg = BG_IMAGES[bgImgIndex];

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  ${media.greaterThan("small")`
    background-color: #212121;
    background-image: url(${bgImg.src});
    background-size: cover;
    background-position: center;
  `}
`;
const BGOverlay = styled.div`
  ${media.greaterThan("small")`
    background: rgba(0, 0, 0, 0.75);
  `}
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormPanel = styled.div<{ hasError: boolean }>`
  background-color: white;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  transition: height 0.2s ease-in-out;
  ${media.greaterThan<{ hasError: boolean }>("small")`
    max-width: 480px;
    max-height: 640px;
    height: ${({ hasError }) => (hasError ? "640px" : "572px")};
    border-radius: 8px;
  `}
`;

const FormHeader = styled.div`
  width: 100%;
  height: 180px;
  color: white;
  background-color: #2196f3;
  display: flex;
  justify-content: space-between;
`;
const FormHeaderTexts = styled.div`
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
const FormHeaderAppName = styled.h1`
  margin: 0;
  font-size: 2rem;
`;
const FormHeaderSubtitle = styled.h2`
  margin: 0;
  line-height: 1.2;
  font-size: 1.25rem;
`;
const LogoContainer = styled.div`
  margin-right: 32px;
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  height: calc(100% - 180px);
  align-items: center;
  justify-content: center;
  ${media.greaterThan("small")`
    padding: 48px 32px;
    height: auto;
`}
`;
const InputLabel = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 8px 0;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;
const Input = styled.input`
  appearance: none;
  border: 1px solid #ccc;
  height: 48px;
  font-size: 1rem;
  border-radius: 4px;
  width: 100%;
  padding: 0 16px;

  :focus {
    outline: none;
  }

  ${media.greaterThan("small")`
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
    transition: box-shadow 0.2s ease-in-out;
    :focus {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
    }
  `}
`;

const SubmitButton = styled.input`
  appearance: none;
  height: 64px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  transition: box-shadow 0.2s ease-in-out;
  width: 100%;
  padding: 0 16px;
  background-color: #2196f3;
  color: white;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 1.25rem;
  font-weight: bold;
  border: none;

  :focus {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
    outline: none;
  }
`;

const ErrorMessageContainer = styled.div<{ visible: boolean }>`
  margin-bottom: 32px;
  align-items: center;
  display: ${({ visible }) => (visible ? "flex" : "none")};
`;
const ErrorMessageText = styled.p`
  font-weight: bold;
  margin: 0 0 0 8px;
`;

type BGImage = {
  src: string;
  alt: string;
};

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);

  const setAuth = useSetRecoilState(authState);

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        router.replace("/");
      } else {
        setInitialized(true);
      }
    });
  }, [router, setAuth]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    } catch (err) {
      setHasError(true);
      setPassword("");
      console.error(err);
    }
  };

  const submittable = email.length > 0 && password.length > 0;

  if (!initialized) {
    return null;
  }

  return (
    <>
      <Head>
        <title>ログイン - CS男</title>
      </Head>

      <Main>
        <BGOverlay>
          <FormPanel hasError={hasError}>
            <FormHeader>
              <FormHeaderTexts>
                <FormHeaderAppName>TrainLCD</FormHeaderAppName>
                <FormHeaderSubtitle>
                  Feedback
                  <br />
                  Management Console
                </FormHeaderSubtitle>
              </FormHeaderTexts>

              <LogoContainer>
                <AppIcon />
              </LogoContainer>
            </FormHeader>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <InputLabel>EMAIL</InputLabel>
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  type="text"
                  placeholder="メールアドレス"
                />
              </InputGroup>
              <InputGroup>
                <InputLabel>PASSWORD</InputLabel>
                <Input
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="パスワード"
                />
              </InputGroup>
              <ErrorMessageContainer visible={hasError}>
                <ExclamationIcon />
                <ErrorMessageText>ログインに失敗しました</ErrorMessageText>
              </ErrorMessageContainer>
              <SubmitButton
                disabled={!submittable}
                value="ログイン"
                type="submit"
              />
            </Form>
          </FormPanel>
        </BGOverlay>
      </Main>
    </>
  );
};

export default Home;
