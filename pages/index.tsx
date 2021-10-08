import { signOut } from "@firebase/auth";
import dayjs from "dayjs";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import CheckIcon from "../components/CheckIcon";
import LoggedInFooter from "../components/LoggedInFooter";
import LogoutIcon from "../components/LogoutIcon";
import StatusTag from "../components/StatusTag";
import UndoIcon from "../components/UndoIcon";
import useDispatchReports from "../hooks/useDispatchReports";
import useReport from "../hooks/useReport";
import useRestrict from "../hooks/useRestrict";
import { auth } from "../lib/firebase";
import authState from "../store/atoms/auth";
import reportState, { Report } from "../store/atoms/report";

const Container = styled.div`
  background-color: #e5e5e5;
  min-height: 100vh;
`;
const Main = styled.main`
  min-height: calc(100vh - 72px);
  margin-bottom: 32px; ;
`;

const Header = styled.header`
  background-color: #2196f3;
  display: flex;
  align-items: center;
  color: white;
  height: 96px;
  padding: 0 32px;
  justify-content: space-around;
`;
const LeftContainer = styled.div``;
const AppNameContainer = styled.div``;
const AppName = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;
const AppNameSub = styled.p`
  font-weight: bold;
  margin: 0;
`;
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const EmailText = styled.p`
  font-weight: bold;
  margin-right: 12px;
`;
const LogoutButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
`;

const SubHeader = styled.div`
  background-color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
`;
const SubHeaderInner = styled.div`
  max-width: 960px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const Title = styled.h2``;

const WithResolvedCheckboxContainer = styled.div`
  margin-left: 100px;
  display: flex;
  align-items: center;
`;
const WithResolvedCheckbox = styled.input``;
const WithResolvedCheckboxText = styled.p`
  margin-left: 8px;
`;
const ReportTableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px; ;
`;
const ReportTable = styled.table`
  background-color: white;
  border-radius: 8px;
  width: 960px;
  border-collapse: collapse;
`;
const ReportTableHeader = styled.thead`
  border-bottom: 1px solid #ccc;
`;
const ReportTableBody = styled.tbody``;
const ReportTableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  &:last-child {
    border: none;
  }
`;
const ReportTableTH = styled.th`
  padding: 0 32px;
  height: 72px;
  &:first-child {
    width: calc(100% / 2);
  }
`;
const ReportTableTHText = styled.p`
  color: #aaa;
  font-weight: bold;
  margin: 0;
  text-align: left;
`;
const ReportTableTD = styled.td`
  padding: 0 32px;
  height: 72px;
`;
const ReportTableTDText = styled.p`
  font-weight: bold;
  margin: 0;
  text-align: left;
`;
const ReportTableTDDate = styled.time`
  font-weight: bold;
  margin: 0;
  text-align: right;
  display: block;
`;
const ReportTableTDButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
`;
const StatusTagText = styled.p`
  color: white;
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

const Home: NextPage = () => {
  const [reportStateValue, setReportStateValue] = useRecoilState(reportState);
  const [withResolved, setWithResolved] = useState(false);
  const authStateValue = useRecoilValue(authState);

  // TODO: ログアウト確認を出す
  const handleLogout = () => signOut(auth);

  useDispatchReports(withResolved);
  const { closeTicketLazy, reopenTicketLazy } = useReport();

  const loggedIn = useRestrict();

  const { reports } = reportStateValue;

  const handleWithResolvedChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWithResolved(e.target.checked);

  const handleUndo = async (report: Report) => {
    const reopenedTicket = await reopenTicketLazy(report);
    setReportStateValue((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === report.id ? reopenedTicket : r
      ),
    }));
  };
  const handleResolve = async (report: Report) => {
    const closedTicket = await closeTicketLazy(report, "クイック解決");
    setReportStateValue((prev) => ({
      ...prev,
      reports: prev.reports.map((r) => (r.id === report.id ? closedTicket : r)),
    }));
  };

  const renderReports = () => {
    return reports.map((report) => {
      if (!withResolved && report.resolved) {
        return null;
      }

      return (
        <ReportTableRow key={report.id}>
          <ReportTableTD>
            <ReportTableTDText>
              <Link href={`/reports/${report.id}`}>{report.description}</Link>
            </ReportTableTDText>
          </ReportTableTD>
          <ReportTableTD key={report.id}>
            <ReportTableTDText>
              <StatusTag resolved={report.resolved}>
                <StatusTagText>
                  {report.resolved ? "解決済" : "未解決"}
                </StatusTagText>
              </StatusTag>
            </ReportTableTDText>
          </ReportTableTD>
          <ReportTableTD key={report.id}>
            <ReportTableTDButton
              onClick={() =>
                report.resolved ? handleUndo(report) : handleResolve(report)
              }
            >
              {report.resolved ? <UndoIcon /> : <CheckIcon />}
            </ReportTableTDButton>
          </ReportTableTD>
          <ReportTableTD key={report.id}>
            <ReportTableTDDate>
              {dayjs(new Date()).diff(report.createdAt.toDate(), "days")}日
            </ReportTableTDDate>
          </ReportTableTD>
        </ReportTableRow>
      );
    });
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <Container>
      <Head>
        <title>CS男</title>
      </Head>

      <Main>
        <Header>
          <LeftContainer>
            <AppNameContainer>
              <AppName>TrainLCD</AppName>
              <AppNameSub>
                Feedback
                <br />
                Management Console
              </AppNameSub>
            </AppNameContainer>
          </LeftContainer>
          <RightContainer>
            <EmailText>{authStateValue.currentUser?.email}</EmailText>
            <LogoutButton onClick={handleLogout}>
              <LogoutIcon />
            </LogoutButton>
          </RightContainer>
        </Header>
        <SubHeader>
          <SubHeaderInner>
            <Title>報告</Title>
            <WithResolvedCheckboxContainer>
              <WithResolvedCheckbox
                type="checkbox"
                checked={withResolved}
                onChange={handleWithResolvedChange}
              />
              <WithResolvedCheckboxText>
                解決済みも含む
              </WithResolvedCheckboxText>
            </WithResolvedCheckboxContainer>
          </SubHeaderInner>
        </SubHeader>
        <ReportTableContainer>
          <ReportTable>
            <ReportTableHeader>
              <ReportTableRow>
                <ReportTableTH>
                  <ReportTableTHText>タイトル</ReportTableTHText>
                </ReportTableTH>
                <ReportTableTH>
                  <ReportTableTHText>ステータス</ReportTableTHText>
                </ReportTableTH>
                <ReportTableTH>
                  <ReportTableTHText>アクション</ReportTableTHText>
                </ReportTableTH>
                <ReportTableTH>
                  <ReportTableTHText>経過日数</ReportTableTHText>
                </ReportTableTH>
              </ReportTableRow>
            </ReportTableHeader>
            <ReportTableBody>{renderReports()}</ReportTableBody>
          </ReportTable>
        </ReportTableContainer>
      </Main>

      <LoggedInFooter />
    </Container>
  );
};

export default Home;
