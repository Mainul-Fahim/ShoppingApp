import Navbar from "./Navbar";
import Alert from './Alert';

//designing layout 
const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <Alert />
      {children}
    </>
  );
};

export default Layout;
