// import { Outlet } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import SignUp from './components/signUp';
// import SignIn from './components/signIn';

function App() {
  return (
    <>
      <Header />
      {/* <Outlet /> */}
      <SignUp />
      <Footer />
    </>
  );
}

export default App;
