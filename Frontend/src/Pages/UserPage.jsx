import { Helmet } from 'react-helmet-async';

import { UserView } from '../Org_Dashboard/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User Org | Jobber </title>
      </Helmet>

      <UserView />
    </>
  );
}
