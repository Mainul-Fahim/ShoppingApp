import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Tabs, Tab, ThemeProvider, createTheme } from "@mui/material";
import ItemTable from "../../components/ItemTable/ItemTable";
import AddItem from "../../components/AddItem/AddItem";


//create theme for confessions
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

const Items = () => {
 

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container">
          
              <AddItem />
        
        </div>
      </ThemeProvider>
    </>
  )
}

export default Items;
