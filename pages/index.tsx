import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useDispatchReports from "../hooks/useDispatchReports";
import reportState from "../store/atoms/report";
import LoggedInFooter from "../components/LoggedInFooter";
import useRestrict from "../hooks/useRestrict";

const Container = styled.div``;
const Main = styled.main``;

const Heading = styled.h1``;
const WithResolvedCheckboxContainer = styled.div``;
const WithResolvedCheckbox = styled.input``;
const WithResolvedCheckboxText = styled.p``;
const ReportList = styled.ul``;
const ReportListRow = styled.ul``;

const Home: NextPage = () => {
  const reportStateValue = useRecoilValue(reportState);
  const [withResolved, setWithResolved] = useState(false);

  useDispatchReports(withResolved);

  const loggedIn = useRestrict();

  const { reports } = reportStateValue;

  const handleWithResolvedChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWithResolved(e.target.checked);

  if (!loggedIn) {
    return null;
  }

  return (
    <Container>
      <Head>
        <title>CS男</title>
      </Head>

      <Main>
        <Heading>ようおこし</Heading>
        <WithResolvedCheckboxContainer>
          <WithResolvedCheckbox
            type="checkbox"
            checked={withResolved}
            onChange={handleWithResolvedChange}
          />
          <WithResolvedCheckboxText>解決済みも含む</WithResolvedCheckboxText>
        </WithResolvedCheckboxContainer>
        <ReportList>
          {reports.map((report) => (
            <ReportListRow key={report.id}>
              <Link href={`/reports/${report.id}`}>{report.description}</Link>
            </ReportListRow>
          ))}
          {!reports.length ? <ReportListRow>データなさげ</ReportListRow> : null}
        </ReportList>
      </Main>

      <LoggedInFooter />
    </Container>
  );
};

export default Home;
