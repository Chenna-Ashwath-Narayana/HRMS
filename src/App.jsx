import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Adminlogin from './assets/loginpage/Adminlogin';
import Frontpage from './assets/mainpage/Frontpage';
import Employeelogin from './assets/loginpage/Employeelogin';
import Admindashboard from './assets/admincomponents/Admindashboard';
import Adminmainpage from './assets/admincomponents/Adminmainpage';
import Adminprojects from './assets/admincomponents/Adminprojects';
import Adminemployees from './assets/admincomponents/Adminemployees';
import Adminleavemanagement from './assets/admincomponents/Adminleavemanagement';
import Adminattendance from './assets/admincomponents/Adminattendance';
import Adminclients from './assets/admincomponents/Adminclients';
import Adminpayroll from './assets/admincomponents/Adminpayroll';
import Adminevents from './assets/admincomponents/Adminnotices';
import Admincalendar from './assets/admincomponents/Admincalendar';
import PrivateRoute from './Privateroute';
import Employeemainpage from './assets/employeecomponents/Employeemainpage';
import Employeedashboard from './assets/employeecomponents/Employeedashboard';
import Viewprofile from './assets/employeecomponents/Viewprofile';
import Updateprofile from './assets/employeecomponents/Updateprofile';
import Payrolldetails from './assets/employeecomponents/Payrolldetails';
import Leaverequest from './assets/employeecomponents/Leaverequest';
import Attendance from './assets/employeecomponents/Attendance';
import { EmployeeProvider } from './assets/Context/EmployeeContext';
import { AdminUserProvider } from './assets/Context/AdminUserContext'; 
import EmployeePrivate from './EmployeePrivate';
import Adminnotices from './assets/admincomponents/Adminnotices';
import Notice from './assets/employeecomponents/Notice';
import AdminForgotPassword from './assets/admincomponents/AdminForgotPassword';
import EmployeeForgotPassword from './assets/employeecomponents/EmployeeForgotPassword';

function App() {
  return (
    <BrowserRouter>
      {/* Combine all Routes inside BrowserRouter */}
      <AdminUserProvider>
        <EmployeeProvider>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Frontpage />} />
            <Route path='/adminlogin' element={<Adminlogin />} />
            <Route path='/employeelogin' element={<Employeelogin />} />
            <Route path='/adminforgotpassword' element={<AdminForgotPassword />} />
            <Route path='/employeeforgotpassword' element={<EmployeeForgotPassword />} />

            {/* Private Admin Routes */}
            <Route
              path='/adminmainpage'
              element={
                <PrivateRoute>
                  <Adminmainpage />
                </PrivateRoute>
              }
            >
              <Route index element={<Admindashboard />} />
              <Route path='admindashboard' element={<Admindashboard />} />
              <Route path='adminprojects' element={<Adminprojects />} />
              <Route path='adminemployees' element={<Adminemployees />} />
              <Route path='adminleavemanagement' element={<Adminleavemanagement />} />
              <Route path='adminattendance' element={<Adminattendance />} />
              <Route path='adminclients' element={<Adminclients />} />
              <Route path='adminpayroll' element={<Adminpayroll />} />
              <Route path='adminnotices' element={<Adminnotices />} />
              <Route path='admincalendar' element={<Admincalendar />} />
            </Route>

            {/* Private Employee Routes */}
            <Route
              path='/employeepage'
              element={
                // <EmployeePrivate>
                  <Employeemainpage />
                // </EmployeePrivate>
              }
            >
              <Route index element={<Employeedashboard />} />
              <Route path='employeedashboard' element={<Employeedashboard />} />
              <Route path='view-profile' element={<Viewprofile />} />
              <Route path='update-profile' element={<Updateprofile />} />
              <Route path='payroll' element={<Payrolldetails />} />
              <Route path='leave-requests' element={<Leaverequest />} />
              <Route path='notices' element={<Notice />}></Route>
              <Route path='attendance-management' element={<Attendance />} />
            </Route>
          </Routes>
        </EmployeeProvider>
      </AdminUserProvider>
    </BrowserRouter>
  );
}

export default App;
