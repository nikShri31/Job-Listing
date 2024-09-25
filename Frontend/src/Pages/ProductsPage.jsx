import { Helmet } from 'react-helmet-async';

import { ProductsView } from '../Org_Dashboard/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> JOBS Org | Jobber </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
