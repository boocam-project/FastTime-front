// import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import SignIn from './components/signIn';

function App() {
  return (
    <>
      <Header />
      <SignIn />
      <Footer />
    </>
  );
}

export default App;
