import dayjs from 'dayjs';
import clsx from 'clsx';

import { Absence } from '@/types';
import { DATE_FORMAT } from '@/config';
import { useCheckConflicts } from '../api';

type Props = Absence & { onSelectEmployee: () => void };

const AbsenceDetail = (props: Props) => {
  const { data, isLoading } = useCheckConflicts({ absenceId: props.id });

  const startDate = dayjs(props.startDate);

  const formatAbsenceString = props.absenceType.replace(/_/g, ' ');

  return (
    <div
      className={clsx(
        isLoading && 'bg-grey-5 animate-pulse',
        data?.conflicts && 'bg-red-10',
        'p-2 border flex justify-between cursor-pointer'
      )}
    >
      <div>
        <button
          aria-label={props.employee.firstName + props.id}
          onClick={props.onSelectEmployee}
          className="flex flex-col justify-start gap-2"
        >
          <p className="text-xl font-bold">
            {props.employee.firstName} {props.employee.lastName}
          </p>
          <p>Start Date: {startDate.format(DATE_FORMAT)}</p>
          <p>
            End Date: {startDate.add(props.days, 'day').format(DATE_FORMAT)}
          </p>
          <p>Absence Type: {formatAbsenceString}</p>
          <p
            className={clsx(
              props.approved
                ? 'text-secondary-60 font-semibold'
                : 'text-red-30 font-semibold'
            )}
          >
            Status: {props.approved ? 'Approved' : 'Pending'}
          </p>
        </button>
      </div>
      <div>
        {data?.conflicts && (
          <p className="text-red-60 font-semibold">Conflicted!</p>
        )}
      </div>
    </div>
  );
};

export default AbsenceDetail;
