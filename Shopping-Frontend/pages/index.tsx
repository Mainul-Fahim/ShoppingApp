import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Tabs, Tab, ThemeProvider, createTheme } from "@mui/material";
import Footer from "../components/Layouts/Footer";
import ItemTable from "../components/ItemTable/ItemTable";
import AddItem from "../components/AddItem/AddItem";


const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#fe5530",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});
//home page display
// @ts-ignore
const Home: NextPage = ({ user }) => {

  let srnm: any, srNumber: any;

  if (typeof window !== "undefined") {
    srNumber = localStorage.getItem("srNumber");
  }

  if (!srNumber) {
    srnm = 0
  } else {
    srnm = parseInt(srNumber);
  }

  const [selectedTab, setSelectedTab] = useState(srnm);

  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    await localStorage.removeItem("srNumber");
    await localStorage.setItem("srNumber", `${newValue}`);
    srnm = await localStorage.getItem("srNumber");
    setSelectedTab(parseInt(srnm));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container">


          <>
            <ThemeProvider theme={theme}>
              <div className="container">
                <Tabs
                  value={selectedTab}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  <Tab label="All Items" />
                  <Tab label="Add Items" />
                </Tabs>
                {selectedTab === 0 && (
                  <>
                    <ItemTable />
                  </>
                )}
                {selectedTab === 1 && (
                  <>
                    <AddItem />
                  </>
                )}
              </div>
            </ThemeProvider>
          </>
        </div>
      </ThemeProvider>
    </>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
