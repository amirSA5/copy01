import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import Home from "@mui/icons-material/Home";


import { Link } from "react-router-dom";


const drawerWidth = 240;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        <Link to="/">
          <IconButton aria-label="Home">
            <Home sx={{ color: "primary" }} />
          </IconButton>
        </Link>
        MENU
      </Typography>
      <Divider />
      <List>
        <ListItem key={"step1_devis"} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/step1_devis">
              <Button
                className="calcul_devis"
                size="large"
                variant="contained"
                color="success"
              >
                <CalculateOutlinedIcon /> &nbsp; Calcul Devis
              </Button>
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem key={"parametres_profiler"} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/parametres_profiler">
              <Button
                className="paramétres_profiler"
                size="large"
                variant="contained"
                color="secondary"
              >
                <SettingsOutlinedIcon /> Paramétres Profiler
              </Button>
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem key={"Historique_devis"} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/Historique_devis">
              <Button
                className="historique_devis"
                size="large"
                variant="contained"
                color="error"
              >
                <WorkHistoryOutlinedIcon /> &nbsp; Historiques
              </Button>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Box sx={{ display: "inline" }}>
              <Link to="/">
                <IconButton aria-label="Home">
                  <Home sx={{ color: "white" }} />
                </IconButton>
              </Link>
              Bienvenue
            </Box>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/step1_devis">
            <Button 
              key={"step1_devis"} 
              sx={{ color: "#fff" }}
              className="calcul_devis"
              size="large"
              variant="contained"
              color="success">
                  <CalculateOutlinedIcon /> &nbsp; Calcul Devis
            </Button>
            </Link>
            <Link to="/parametres_profiler">
            <Button
              key={"parametres_profiler"}
              sx={{ color: "#fff" }}
              className="paramétres_profiler"
              size="large"
              variant="contained"
              color="secondary">
                <SettingsOutlinedIcon /> Paramétres Profiler
            </Button>
            </Link>
             <Link to="/Historique_devis">
            <Button 
              key={"Historique_devis"} 
              sx={{ color: "#fff" }}
              className="historique_devis"
              size="large"
              variant="contained"
              color="error">
                <WorkHistoryOutlinedIcon /> &nbsp; Historiques
            </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {/* <Typography>
         sam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography> */}
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;