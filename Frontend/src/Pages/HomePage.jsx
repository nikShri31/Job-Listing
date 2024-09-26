import React from 'react'

import Home from '../Home Components/Home';


import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const HomePage = () => {
  return (
    < >
    <Helmet>
    <title> Jobs | Jobber </title>
  </Helmet>
    <Home/>
    </>
  )
}

export default HomePage;