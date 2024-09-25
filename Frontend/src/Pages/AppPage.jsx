import { Helmet } from 'react-helmet-async';

import { AppView } from '../Org_Dashboard/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> HomeOrg | Jobber </title>
      </Helmet>

      <AppView />
    </>
  );
}
