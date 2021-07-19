import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { useHistory, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WalletConnect from "../WalletConnect";
import Settings from "../Settings";
import { nanoid } from "nanoid";
import { Tab, Tabs } from "@material-ui/core";
import { useSmallScreen } from "../../utils/utils";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/MenuOpen";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import clsx from "clsx";
import { useLocalStorageState } from "../../utils/utils";
import HomeIcon from "@material-ui/icons/Home";
import BarChartIcon from "@material-ui/icons/BarChart";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    marginTop: "40px",
    background: "transparent",
  },
  logo: {
    paddingLeft: "100px",
    cursor: "pointer",
  },
  buttonContainer: {
    paddingRight: "100px",
  },
  audacesPerpetual: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
  },
  tab: {
    color: "white",
    fontSize: 14,
  },
  indicator: {
    backgroundColor: "#00ADB5",
  },
});
const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    AppBar: {
      marginTop: "40px",
      background: "transparent",
    },
    logo: {
      color: "black",
    },
    audacesPerpetual: {
      fontSize: 20,
      fontWeight: 500,
      color: "black",
    },
    indicator: {
      backgroundColor: "#00ADB5",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    inputRoot: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    walletConnect: { position: "absolute", right: 85, zIndex: 1 },
    settingsButton: { position: "absolute", right: 10, zIndex: 1 },
  })
);

const topBarElement = [
  {
    name: "home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    name: "trade",
    href: "/trade/BTCUSDC",
    icon: <BarChartIcon />,
  },
  {
    name: "nodes",
    href: "/nodes",
    icon: <AllInclusiveIcon />,
  },
];

//  For white label UIs change this
const Logo = () => {
export const Logo = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        justify="center"
        alignItems="center"
        spacing={5}
        // spacing={5}
      >
        <Grid item>{/* Put Logo here */}</Grid>
        {/* <Grid item>Put Logo here</Grid> */}
        <Grid item>
          <Typography className={classes.audacesPerpetual}>
          <Typography align="center" className={classes.audacesPerpetual}>
            LIQ Protocol | Bonfida Audaces Perpetuals
          </Typography>
        </Grid>
@@ -77,19 +125,13 @@ const Logo = () => {
  );
};

const TABS = topBarElement.map(({ href }) => href);

const TopBar = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const smallScreen = useSmallScreen();

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
    history.push(TABS[newValue]);
  };
  const [open, setOpen] = useLocalStorageState("showDrawer", true);

  useEffect(() => {
    if (location.pathname.includes("trade")) {
@@ -98,6 +140,8 @@ const TopBar = () => {
      setTab(2);
    } else if (location.pathname.includes("ref")) {
      setTab(0);
    } else {
      setTab(0);
    }
  }, [location.pathname]);

@@ -109,59 +153,73 @@ const TopBar = () => {
        elevation={0}
        style={{ marginTop: 20 }}
      >
        <Grid
          container
          direction="row"
          justify={smallScreen ? "center" : "space-between"}
          alignItems="center"
        <div style={{ position: "static", zIndex: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => {
              setOpen(true);
            }}
            style={{ color: "black" }}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon style={{ color: "white", fontSize: 35 }} />
          </IconButton>
        </div>
        {!smallScreen && (
          <div className={classes.walletConnect}>
            <WalletConnect />
          </div>
        )}
        <div className={classes.settingsButton}>
          <Settings />
        </div>
      </AppBar>
      {open && <div style={{ marginTop: "59px" }} />}
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => setOpen(false)}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "5%",
          }}
        >
          {!smallScreen && (
            <>
              <Grid item>
                <Logo />
              </Grid>
            </>
          )}
          <Grid item>
            <AppBar
              className={classes.AppBar}
              position="static"
              elevation={0}
              style={{ marginTop: 0 }}
            >
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                centered
                classes={{ indicator: classes.indicator }}
          <WalletConnect />
        </div>
        <Divider />
        <List>
          {topBarElement.map((e, i) => {
            return (
              <ListItem
                button
                key={e.name}
                onClick={() => history.push(e.href)}
                selected={i === tab}
              >
                {topBarElement.map((e, i) => {
                  return (
                    <Tab
                      disableRipple
                      label={e.name}
                      className={classes.tab}
                      key={nanoid()}
                    />
                  );
                })}
              </Tabs>
            </AppBar>
          </Grid>
          {!smallScreen && (
            <Grid item className={classes.buttonContainer}>
              <Grid container justify="center" alignItems="center" spacing={4}>
                <Grid item>
                  <WalletConnect />
                </Grid>
                <Grid item>
                  <Settings />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </AppBar>
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText
                  primary={e.name}
                  style={{ textTransform: "capitalize" }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

export default TopBar;
