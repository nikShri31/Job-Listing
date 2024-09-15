import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}



/**
 * 
 * import { fCurrency, fShortenNumber, fPercent, fData } from './utils/numeralUtils';

function JobCard({ job }) {
  return (
    <div>
      <h2>{job.title}</h2>
      <p>Salary: {fCurrency(job.salary)}</p>
      <p>Number of Applicants: {fShortenNumber(job.applicants)}</p>
      <p>Application Success Rate: {fPercent(job.successRate)}</p>
      <p>File Size: {fData(job.resumeFileSize)}</p>
    </div>
  );
}
 */