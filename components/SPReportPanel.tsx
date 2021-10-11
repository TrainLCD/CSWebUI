import dayjs from "dayjs";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { Report } from "../store/atoms/report";

type Props = {
  report: Report;
  onCheckChange: (checked: boolean) => void;
  disabledReportId: string | null;
};

const Root = styled.div`
  height: 64px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  padding-right: 8px;
`;
const Right = styled.div``;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.input<{ checked: boolean; disabled: boolean }>`
  margin-right: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ checked }) => (checked ? `#FF0075` : `white`)};
  width: 24px;
  height: 24px;
  appearance: none;
  border-radius: 12px;
  border: ${({ checked }) => (checked ? `solid 2px #fff` : `solid 2px #aaa`)};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.16);
`;

const Description = styled.p`
  font-weight: bold;
`;

const ReportDate = styled.p`
  color: #aaa;
  font-weight: bold; ;
`;

const SPReportPanel = ({ report, onCheckChange, disabledReportId }: Props) => {
  const [checked, setChecked] = useState(report.resolved);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const flag = e.currentTarget.value === "true";
    setChecked(flag);
    onCheckChange(flag);
  };

  useEffect(() => {
    if (report.resolved) {
      setChecked(report.resolved);
    }
  }, [report.resolved]);

  const { description } = report;

  return (
    <Root>
      <Left>
        <CheckboxContainer>
          <Checkbox
            disabled={report.id === disabledReportId}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
        </CheckboxContainer>
        <Link passHref href={`/reports/${report.id}`}>
          <Description>{description}</Description>
        </Link>
      </Left>
      <Right>
        <ReportDate>
          {dayjs(new Date()).diff(report.createdAt.toDate(), "days")}日
        </ReportDate>
      </Right>
    </Root>
  );
};

export default SPReportPanel;
