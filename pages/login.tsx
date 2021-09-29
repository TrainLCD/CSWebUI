import { signInWithEmailAndPassword } from "@firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { auth } from "../lib/firebase";
import authState from "../store/atoms/auth";

const Container = styled.div``;
const Main = styled.main``;

const Heading = styled.h1``;
const Form = styled.form``;
const Input = styled.input``;
const ErrorMessage = styled.p``;

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initialized, setInitialized] = useState(false);

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
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    } catch (err) {
      console.error(err);
      setErrorMessage((err as { code: string }).code);
    }
  };

  const submittable = email.length > 0 && password.length > 0;

  if (!initialized) {
    return null;
  }

  return (
    <Container>
      <Head>
        <title>ログイン - CS男</title>
      </Head>

      <Main>
        <Heading>ログイン</Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={handleEmailChange}
            type="text"
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
          />
          <Input disabled={!submittable} type="submit" />
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Main>
    </Container>
  );
};

export default Home;
