import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import RegisterIcon from "@material-ui/icons/AccountBox";
import LoginIcon from "@material-ui/icons/ExitToApp";
import { Home } from "@material-ui/icons";
import LogoutIcon from "@material-ui/icons/Reply";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    // display: "flex",
    backgroundColor: "transparent",
    zIndex: "1000",
    position: "relative"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      sideMenuOpen: this.props.sideMenuOpen,
      isLoggedIn: false
    };
  }

  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { classes, theme } = this.props;

    const sidebar = (
      <List>
        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch({ type: "navigatorAdmin/clear" });

            this.props.dispatch({
              type: "navigatorAdmin/save",
              payload: {
                buyerShow: true
              }
            });
          }}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          Buyers
        </ListItem>

        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch({ type: "navigatorAdmin/clear" });

            this.props.dispatch({
              type: "navigatorAdmin/save",
              payload: {
                sellerShow: true
              }
            });
          }}
        >
          <ListItemIcon>
            <ProfileIcon />
          </ListItemIcon>
          Sellers
        </ListItem>

        <ListItem
          className={styles.logout__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch({
              type: "adminData/save",
              payload: {
                login: false,
                user: {}
              }
            });
            this.props.dispatch({ type: "navigatorAdmin/clear" });

            this.handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </ListItem>

        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(
              routerRedux.push({
                pathname: "/"
              })
            );
          }}
        >
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          Buyers Page
        </ListItem>

        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(
              routerRedux.push({
                pathname: "/sellers"
              })
            );
          }}
        >
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          Sellers Page
        </ListItem>
      </List>
    );
    const sidebarWithoutLogin = (
      <List>
        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(
              routerRedux.push({
                pathname: "/admin/login"
              })
            );
          }}
        >
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          Login
        </ListItem>

        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/" }));
          }}
        >
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          Buyers Page
        </ListItem>

        <ListItem
          className={styles.profile__text}
          onClick={e => {
            e.stopPropagation();
            this.props.dispatch(routerRedux.push({ pathname: "/sellers" }));
          }}
        >
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          Sellers Page
        </ListItem>
      </List>
    );

    const isLoggedIn = this.props.adminData.login;
    let displayMenu;
    if (isLoggedIn) {
      displayMenu = sidebar;
    } else {
      displayMenu = sidebarWithoutLogin;
    }

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        Admin Page
        <Divider />
        {displayMenu}
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return state;
}
SideBar = withStyles(styles, { withTheme: true })(SideBar);
export default connect(mapStateToProps)(SideBar);
