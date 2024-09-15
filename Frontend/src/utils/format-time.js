import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

/**
 * import { fDate, fDateTime, fTimestamp, fToNow } from './utils/dateUtils';

function JobCard({ job }) {
  return (
    <div>
      <h2>{job.title}</h2>
      <p>Location: {job.location}</p>
      <p>Posted on: {fDate(job.postedDate)}</p>
      <p>Last updated: {fDateTime(job.updatedDate)}</p>
      <p>Time since posted: {fToNow(job.postedDate)}</p>
      <p>Timestamp: {fTimestamp(job.postedDate)}</p>
    </div>
  );
}

-->[ If job.postedDate is 2024-09-12T12:00:00Z, the display will be:
Posted on: 12 Sep 2024 ]
 
-->[ If job.postedDate is 2024-09-12T14:30:00Z, the display will be:
Posted on: 12 Sep 2024 2:30 PM ]

-->[ If job.postedDate is 2024-09-01T12:00:00Z, the display will be:
Posted 11 days ago ]
 */