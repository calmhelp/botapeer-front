import { css } from "@emotion/react";
import React, {useEffect} from "react";
import LoginModal from "components/LoginModal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "redux/hook";
import { logout, selectAuth } from "redux/slice/authSlice";
import Link from "next/link";
import { signIn } from '../redux/slice/authSlice';
import { accountCreatePage, rootPage } from "constants/pageConstants";
import { getIdByAccessToken, Token } from "util/redux/apiBaseUtils";
import { fetchAuthUserById, selectAuthUser } from "redux/slice/authUserSlice";

const HeaderCss = css`
  background: #fff;
`;

const ToolBarCss =  {
    "@media screen and (min-width:960px)": {
      width: "960px", 
      margin: "0 auto",
    },
}

const Header = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const authUser = useAppSelector(selectAuthUser);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRegister = () => {
    router.push(accountCreatePage.path);
  };

  const handleModalClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleLogout = () => {
    router.push("/?logout=true").then(() => {
        dispatch(logout());
      })
  }

  const handleLoginMenu = () => {
    setAnchorEl(null);
    setIsOpen(true);
  }

  const handleLogin = (usernameOrEmail: string, password: string) => {
    const loginRequest = {
      usernameOrEmail,
      password,
    }
    dispatch(signIn(loginRequest))
    .unwrap().then((payload) => {
      if(payload.data.accessToken) {
          const userId = getIdByAccessToken(payload.data.accessToken);
          dispatch(fetchAuthUserById(userId))
          .unwrap().then((payload) => 
            router.push(rootPage.path + payload.data.name + "?login=true")
          )
        }
    })
  };

  return (
    <header css={HeaderCss}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="relative"
          style={{ backgroundColor: "#fff", color: "#333333" }}
        >
          <LoginModal 
            isOpen={isOpen} 
            onClose={handleModalClose}
            handleLogin={handleLogin}
          />
          <Toolbar css={ToolBarCss}>
            <Link href="/" as="/"><span><Image src="/images/logo.png" width="132" height="37" alt=""
                priority /></span></Link>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="start"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {auth.isLogin ? 
              <Box>
              <MenuItem sx={{cursor: "auto", "pointerEvents": "none"}}>{authUser.data?.name}</MenuItem>  
              <MenuItem onClick={() => router.push(rootPage.path + authUser.data?.name)}>アカウント</MenuItem>
              <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
              </Box>
              : 
              <Box>
              <MenuItem onClick={handleLoginMenu}>ログイン</MenuItem>
              <MenuItem onClick={handleRegister}>会員登録</MenuItem>
              </Box>
              }
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
