import { AppBar, Box, Button, Stack, Typography } from "@mui/material";
import LogoDemo from "../../../assets/images/logo-demo.png";
import LanguageSelector from "../../langChangeSelector";
import { useTranslation } from "react-i18next";
import useOffSetTop from "../../hooks/useOffset";
import useResponsive from "../../hooks/useResponsive";
import Swal from "sweetalert2";

const MainHeader = () => {
  const { t } = useTranslation();
  const isOffSet = useOffSetTop(76);
  const isDesktop = useResponsive("up", "lg");

  return (
    <AppBar
      sx={{
        backgroundColor: isOffSet ? "#4a4a4ad6" : "transparent",
        boxShadow: "none",
        color: "#fff",
        transition: "0.5s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          px: isDesktop ? 4 : 3,
        }}
      >
        <Box sx={{ display: "inherit" }}>
          <img src={LogoDemo} width={isDesktop ? 210 : 140} />
        </Box>
        {isDesktop && (
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}
          >
            {[
              {
                name: t("common.dayTourText"),
                path: "/day-tour",
              },
              {
                name: t("common.multipleDayTourText"),
                path: "/multi-day-tour",
              },
            ].map((item) => (
              <Typography
                key={item.name}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  Swal.fire({
                    icon: "info",
                    text: t("common.comingSoonTitle"),
                    showConfirmButton: false,
                    background: "#1f342b",
                    color: "#fff",
                    timer: 1000,
                  });
                }}
              >
                {item.name}
              </Typography>
            ))}
          </Box>
        )}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <LanguageSelector />
          <Button
            size="small"
            sx={{
              borderRadius: 5,
              backgroundColor: "#000",
              color: "#fff",
              textTransform: "capitalize",
              px: 2,
              py: 0.25,
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
            onClick={() => {
              Swal.fire({
                icon: "info",
                text: t("common.comingSoonTitle"),
                showConfirmButton: false,
                background: "#1f342b",
                color: "#fff",
                timer: 1000,
              });
            }}
          >
            {t("common.signUpBtn")}
          </Button>
        </Stack>
      </Box>
    </AppBar>
  );
};

export default MainHeader;
