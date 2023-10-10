// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
// import SignIn from './components/signIn';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
