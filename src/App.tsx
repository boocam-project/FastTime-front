// import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
// import SignIn from './components/signIn';
import SignUp from './components/signUp';

function App() {
  return (
    <>
      <Header />
      <SignUp />
      <Footer />
    </>
  );
}

export default App;
