import { useState } from "react";
import {
  Box,
  IconBUtton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch(); // dispatch actions from reducers
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // determines if screen width is below a min-width (React hook from mui)
  const isNonMobileScreens = useMediaQuery("(min-width: 10000px)");

  const theme = useTheme();

  return <div>NavBar</div>;
};

export default NavBar;
