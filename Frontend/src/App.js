import { Fragment, useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, adminRoutes } from '~/routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

import defaultLayout from '~/Components/Layout/defaultLayout/defaultLayout';
import layoutAdmin from './Components/Layout/layoutAdmin';

import ScrollToTop from './routes/ScrollToTop';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';
import 'react-datetime/css/react-datetime.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
function App() {
  const [isActive, setActive] = useState(false);

  const user = useSelector((state) => state.permission);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isActive]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer style={{ fontSize: '0.9rem' }} />

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="App">
          <Routes>
            {(user.loggedInUser === false || user.loggedInUser === true) &&
              publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = defaultLayout;

                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                );
              })}
            {user.users.permission > 0 &&
              user.loggedInUser === true &&
              adminRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = layoutAdmin;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                );
              })}
          </Routes>
        </div>
      </LocalizationProvider>

      {isActive && (
        <div
          style={{
            position: 'fixed',
            right: '10px',
            bottom: '10px',
            zIndex: '1000',
            backgroundColor: 'white',
            borderRadius: '75px',
          }}
        >
          <FontAwesomeIcon
            size="4x"
            icon={faArrowAltCircleUp}
            onClick={scrollToTop}
            style={{
              display: 'visible' ? 'inline' : 'none',
              cursor: 'pointer',
              color: '#39B5E0',
            }}
          />
        </div>
      )}
    </Router>
  );
}

export default App;
