import dayjs from "dayjs";

import { BaseAbsence } from "@/types";
import { DATE_FORMAT } from "@/config";

type Props = BaseAbsence & {
  title: string;
};

const EmployeeAbsenceDetail = (props: Props) => {
  const startDate = dayjs(props.startDate);
  const formatAbsenceString = props.absenceType.replace(/_/g, ' ');

  return (
    <div className="flex flex-col gap-1">
      <h5>{props.title}:</h5>
      <div className="ml-2">
        <p>
          Period: {startDate.format(DATE_FORMAT)} to{" "}
          {startDate.add(props.days, "day").format(DATE_FORMAT)}
        </p>
        <p>Number of days: {props.days}</p>
        <p>Status: {props.approved ? "Approved" : "Pending"}</p>
        <p>Absence Type: {formatAbsenceString}</p>
      </div>
    </div>
  );
};

export default EmployeeAbsenceDetail;
