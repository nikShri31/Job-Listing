import './App.css'
import Auth from './Authentication/Auth'
// import Login from './Authentication/Login';
// import LoginBtn from './Authentication/LoginBtn';
// import BasicEditBtn from './Components/Job seeker Profile/BasicEditBtn'
import ProfilePage from './Pages/ProfilePage';
import JobDesc from './Components/JobDesc';
import AppliedJobs from './Components/Dashboard/AppliedJobs';
import Dashboard from './Pages/Dashboard';

function App() {
  return(
    <>
    <Dashboard/>
    {/* <AppliedJobs/> */}
    {/* <JobDesc/> */}
    {/* <ProfilePage/> */}
    {/* <Login/> */}
    {/* <BasicEditBtn/> */}
    {/* <LoginBtn/> */}
    <Auth/>
    </>
  )
}

export default App;
