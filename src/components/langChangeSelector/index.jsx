import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import VietNamFlag from "../../assets/images/vietnam.png";
import useLocales from "../hooks/useLocales";

const ArrowStyle = styled("span")(({ arrow, theme }) => {
  const SIZE = 12;

  const POSITION = -(SIZE / 2);

  const borderStyle = `solid 1px #cacaca`;

  const topStyle = {
    borderRadius: "0 0 3px 0",
    top: POSITION,
    borderBottom: borderStyle,
    borderRight: borderStyle,
  };
  const bottomStyle = {
    borderRadius: "3px 0 0 0",
    bottom: POSITION,
    borderTop: borderStyle,
    borderLeft: borderStyle,
  };
  const leftStyle = {
    borderRadius: "0 3px 0 0",
    left: POSITION,
    borderTop: borderStyle,
    borderRight: borderStyle,
  };
  const rightStyle = {
    borderRadius: "0 0 0 3px",
    right: POSITION,
    borderBottom: borderStyle,
    borderLeft: borderStyle,
  };

  return {
    [theme.breakpoints.up("sm")]: {
      zIndex: 1,
      width: SIZE,
      height: SIZE,
      content: "''",
      position: "absolute",

      transform: "rotate(-135deg)",
      background: theme.palette.background.paper,
    },
    // Top
    ...(arrow === "top-left" && { ...topStyle, left: 20 }),
    ...(arrow === "top-center" && {
      ...topStyle,
      left: 0,
      right: 0,
      margin: "auto",
    }),
    ...(arrow === "top-right" && { ...topStyle, right: 20 }),
    // Bottom
    ...(arrow === "bottom-left" && { ...bottomStyle, left: 20 }),
    ...(arrow === "bottom-center" && {
      ...bottomStyle,
      left: 0,
      right: 0,
      margin: "auto",
    }),
    ...(arrow === "bottom-right" && { ...bottomStyle, right: 20 }),
    // Left
    ...(arrow === "left-top" && { ...leftStyle, top: 20 }),
    ...(arrow === "left-center" && {
      ...leftStyle,
      top: 0,
      bottom: 0,
      margin: "auto",
    }),
    ...(arrow === "left-bottom" && { ...leftStyle, bottom: 20 }),
    // Right
    ...(arrow === "right-top" && { ...rightStyle, top: 20 }),
    ...(arrow === "right-center" && {
      ...rightStyle,
      top: 0,
      bottom: 0,
      margin: "auto",
    }),
    ...(arrow === "right-bottom" && { ...rightStyle, bottom: 20 }),
  };
});

function LanguageSelector() {
  const { i18n } = useTranslation();
  const { allLang, currentLang, onChangeLang } = useLocales();

  const [open, setOpen] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <Box position="relative">
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: "action.selected" }),
        }}
      >
        <img src={currentLang.icon} alt="" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            position: "relative",
            p: 1,
            overflow: "inherit",
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <ArrowStyle arrow="top-right" />
        <Stack spacing={0.75}>
          {allLang.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => {
                onChangeLang(option.value);
                handleClose();
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: 'center'
                }}
              >
                <img src={option.icon} alt="" width={28} />
                {option.label}
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </Box>
  );
}

export default LanguageSelector;
