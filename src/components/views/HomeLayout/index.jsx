import React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MainHeader from "../../common/main/header";
import MainFooter from "../../common/main/footer";
import BookingDetail from "../../BookingDetail";
import { useForm } from "react-hook-form";

import moment from "moment";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { get, first } from "lodash";

import GGMLocationAutocomplete from "../../GGMLocationAutocomplete";
import useResponsive from "../../hooks/useResponsive";

const defaultValues = {
  origin_location: "",
  destination_location: "",
  waiting_location: "",
  service: "1_CHIEU",
  type_car: "4_CHO",
  pick_time: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
  distance_text: "",
  journey_fee: 0,
};

const HomeLayout = () => {
  const { t } = useTranslation();
  const isDesktop = useResponsive("up", "lg");

  const hookForm = useForm({
    defaultValues,
    resolver: yupResolver(
      yup.object({
        origin_location: yup
          .string()
          .nullable()
          .required("Vui lòng nhập thông tin địa điểm đón."),
        destination_location: yup
          .string()
          .nullable()
          .required("Vui lòng nhập thông tin địa điểm đến."),
      })
    ),
    shouldFocusError: true,
  });

  const [open, setOpen] = React.useState(false);

  const cbBk = (response, status) => {
    console.log(response);
    if (status == "OK") {
      const routes = first(get(response, "routes"));

      var results = get(routes, "legs");

      console.log(results);

      let totalDistance = 0;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];

        totalDistance += element.distance.value;
      }

      let fee = 0;

      if (1000 <= totalDistance && totalDistance < 51000) {
        const feeDefault = 15000;
        fee = feeDefault * totalDistance;
      }

      if (51000 <= totalDistance && totalDistance < 101000) {
        const feeDefault = 12000;
        fee = feeDefault * totalDistance;
      }

      if (101000 <= totalDistance && totalDistance < 201000) {
        const feeDefault = 10000;
        fee = feeDefault * totalDistance;
      }

      if (201000 <= totalDistance && totalDistance < 301000) {
        const feeDefault = 9000;
        fee = feeDefault * totalDistance;
      }

      if (301000 <= totalDistance && totalDistance <= 9999999000) {
        const feeDefault = 8500;
        fee = feeDefault * totalDistance;
      }

      console.log("final fee: ", fee);
      switch (hookForm.watch("service")) {
        case "1_CHIEU":
          hookForm.setValue("journey_fee", fee / 1000);
          break;
        case "2_CHIEU":
          hookForm.setValue("journey_fee", (fee * 1.6) / 1000);
      }

      hookForm.setValue(
        "distance_text",
        Math.round(totalDistance / 1000) + " km"
      );

      setOpen(true);
    }
  };

  const onLetsGoBooking = (data) => {
    if (typeof window.google !== "undefined") {
      const originLocation = hookForm.watch("origin_location");
      const destinationLocation = hookForm.watch("destination_location");
      const waitingLocation = hookForm.watch("waiting_location");

      const distanceMatrixService = new window.google.maps.DirectionsService();

      distanceMatrixService.route(
        {
          origin: originLocation,
          destination: destinationLocation,
          waypoints: waitingLocation
            ? [
                {
                  location: waitingLocation,
                  stopover: true,
                },
              ]
            : [],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.metric,
          avoidHighways: false,
          avoidTolls: false,
        },
        cbBk
      );
    }
  };

  const onHandleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Box>
          <MainHeader />
          <Box
            sx={{
              position: "absolute",
              zIndex: 3,
              top: isDesktop ? "25%" : "15%",
              left: "5%",
              padding: "1em"
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <Stack spacing={3} textAlign="left">
                  <Box>
                    <Typography variant={isDesktop ? "h3" : "h6"} letterSpacing={1}>
                      {t("common.layoutTitle1")}
                    </Typography>
                    <Typography variant={isDesktop ? "h2" : "h5"} letterSpacing={1} fontWeight={600}>
                      {t("common.layoutTitle2")}
                    </Typography>
                    <Typography
                      variant={isDesktop ? "h1" : "h4"}
                      sx={{ color: "orange" }}
                      letterSpacing={1}
                      fontWeight={600}
                    >
                      {t("common.layoutTitle3")}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="paragraph">
                      {t('common.pageIntroduce')}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Button
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        px: 2.5,
                        py: 1,
                        borderRadius: 20,
                        color: "#fff",
                        backgroundColor: "#000",
                        "&:hover": {
                          backgroundColor: "#000",
                        },
                      }}
                    >
                      {t("common.discover")}
                    </Button>
                    {/* <Button
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 20,
                        color: "#fff",
                        backgroundColor: "#000",
                        "&:hover": {
                          backgroundColor: "#000",
                        },
                      }}
                    >
                      {t("common.bookingaway")}
                    </Button> */}
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-tropical-island-landscape-view-4692-large.mp4"
            muted
            loop
            autoPlay
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "685px",
              width: "100%",
              objectFit: "cover",
              opacity: "0.75",
            }}
          ></video>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "685px",
              background: "#8c9499",
              mixBlendMode: "overlay",
            }}
          />
        </Box>
      </Box>
      <Container sx={{ zIndex: 5, mx: isDesktop ? 0 : -2, p: 0 }}>
        <Box mt={isDesktop ? -5 : -15}>
          <Card sx={{ p: 2, backgroundColor: "#163c4557", color: "#fff", width: '100%' }}>
            <Box mb={4}>
              <Typography variant="h3" letterSpacing={1}>
                {t("common.formScheduleTitle")}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Stack spacing={1} textAlign="left">
                  <Box>{t("common.formPickupTitle")}</Box>
                  <Box>
                    <GGMLocationAutocomplete
                      type="origin"
                      hookForm={hookForm}
                      name="origin_location"
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1} textAlign="left">
                  <Box>{t("common.formPauseOptionTitle")}</Box>
                  <Box>
                    <GGMLocationAutocomplete
                      type="waiting"
                      hookForm={hookForm}
                      name="waiting_location"
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1} textAlign="left">
                  <Box>{t("common.formDestinationTitle")}</Box>
                  <Box>
                    <GGMLocationAutocomplete
                      type="destination"
                      hookForm={hookForm}
                      name="destination_location"
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1} textAlign="left">
                  <Box>{t("common.formServiceTypeTitle")}</Box>
                  <Box>
                    <Select
                      {...hookForm.register("service")}
                      name="service"
                      size="small"
                      fullWidth
                      sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: "30px",
                      }}
                      defaultValue="2_CHIEU"
                      placeholder={t("common.formServiceTypeTitle")}
                    >
                      <MenuItem value="1_CHIEU">
                        {t("common.formServiceTypeOption1")}
                      </MenuItem>
                      <MenuItem value="2_CHIEU">
                        {t("common.formServiceTypeOption2")}
                      </MenuItem>
                    </Select>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1} textAlign="left">
                  <Box>{t("common.formTransportTypeTitle")}</Box>
                  <Box>
                    <Select
                      {...hookForm.register("type_car")}
                      name="type_car"
                      size="small"
                      fullWidth
                      sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: "30px",
                      }}
                      defaultValue="4_CHO"
                      placeholder={t("common.formTransportTypeTitle")}
                    >
                      <MenuItem value="4_CHO">
                        {t("common.formTransportTypeOption4")}
                      </MenuItem>
                      <MenuItem value="7_CHO">
                        {t("common.formTransportTypeOption7")}
                      </MenuItem>
                    </Select>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1} textAlign="left">
                  <Box>{t("common.formTimePickupTitle")}</Box>
                  <Box>
                    <TextField
                      {...hookForm.register("pick_time")}
                      name="pick_time"
                      type="datetime-local"
                      defaultValue={moment(new Date()).format(
                        "YYYY-MM-DDTHH:mm:ss"
                      )}
                      InputLabelProps={{
                        shrink: false,
                      }}
                      fullWidth
                      sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: "30px",
                      }}
                      size="small"
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Box mt={5} mb={2}>
              <Button
                size="large"
                sx={{
                  background: "#30a555",
                  color: "#fff",
                  padding: "8px 25px",
                  borderRadius: "30px",
                  // fontWeight: 600,
                  letterSpacing: "1.5px",
                  fontSize: "20px",
                }}
                onClick={hookForm.handleSubmit(onLetsGoBooking)}
              >
                {t("common.letsGoBtnTitle")}
              </Button>
            </Box>
          </Card>
        </Box>
        {/* <Box my={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box textAlign="left">
                <Typography variant="h4" whiteSpace="break-spaces">
                  {t("common.whereDoYouWantToExplore")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "start",
                }}
              >
                <Typography
                  variant="h4"
                  whiteSpace="break-spaces"
                  textAlign="left"
                >
                  {t("common.explorePointTitle")}
                </Typography>
                <Box textAlign="left">
                  <Button
                    size="medium"
                    sx={{
                      textTransform: "capitalize",
                      px: 2.5,
                      py: 1,
                      borderRadius: 20,
                      color: "#fff",
                      backgroundColor: "#000",
                      "&:hover": {
                        backgroundColor: "#000",
                      },
                    }}
                  >
                    {t("common.discover")}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box> */}
      </Container>

      {open && (
        <BookingDetail
          pickTime={hookForm.watch("pick_time")}
          originLocation={hookForm.watch("origin_location")}
          waitingLocation={hookForm.watch("waiting_location")}
          destinationLocation={hookForm.watch("destination_location")}
          service={hookForm.watch("service")}
          distanceText={hookForm.watch("distance_text")}
          journeyFee={hookForm.watch("journey_fee")}
          typeCar={hookForm.watch("type_car")}
          onHandleClose={onHandleClose}
          isOpen={open}
        />
      )}

      <MainFooter />
    </>
  );
};

export default HomeLayout;
