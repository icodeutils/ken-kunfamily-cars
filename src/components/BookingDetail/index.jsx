import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Grid,
  Tooltip,
  Button,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";

const defaultValues = {
  fullName: "",
  phoneNumber: "",
};

const TYPE_CARS = {
  "4_CHO": "common.formTransportTypeOption4",
  "7_CHO": "common.formTransportTypeOption7",
};

const SERVICE_CARS = {
  "1_CHIEU": "common.formServiceTypeOption1",
  "2_CHIEU": "common.formServiceTypeOption2",
};

const BookingDetail = ({
  pickTime,
  originLocation,
  waitingLocation,
  destinationLocation,
  service,
  distanceText,
  journeyFee,
  typeCar,
  onHandleClose,
  isOpen,
}) => {
  const { t } = useTranslation();

  const hookForm = useForm({
    defaultValues,
    resolver: yupResolver(
      yup.object({
        fullName: yup
          .string()
          .nullable()
          .required(t('common.dialogRequiredFullnameText')),
        phoneNumber: yup
          .string()
          .nullable()
          .required('common.dialogRequiredPhoneNumberText'),
      })
    ),
    shouldFocusError: true,
  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onResetBookingInfo = () => {
    hookForm.reset(defaultValues);
  };

  const mOnRecordingBook = useMutation(
    () =>
      fetch(
        "https://v1.nocodeapi.com/tonght/google_sheets/KogFafCtqiMyyfYI?tabId=A1",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify([
            [
              hookForm.watch("fullName"),
              hookForm.watch("phoneNumber"),
              originLocation,
              destinationLocation,
              waitingLocation,
              pickTime,
              journeyFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            ],
          ]),
        }
      ),
    {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          text: t("common.dialogBookingSuccessText"),
          showConfirmButton: false,
          timer: 2500,
        });

        onResetBookingInfo();
        onHandleClose();
      },
    }
  );

  const onBookingToTravel = () => {
    mOnRecordingBook.mutateAsync();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="md"
      open={Boolean(isOpen)}
      onClose={onHandleClose}
      PaperProps={{
        sx: {
          backgroundColor: "#132023",
          color: "#ffffff",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" textAlign="center">
          {t("common.dialogBookingTitle")}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onHandleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{t("common.formTimePickupTitle")}</Typography>
          <Typography textAlign="right">
            {moment(pickTime).format("HH:MM DD-MM-YYYY")}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ minWidth: "100px" }}>
            {t("common.formPickupTitle")}
          </Typography>
          <Typography textAlign="right">{originLocation}</Typography>
        </Stack>

        {waitingLocation && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ minWidth: "100px" }}>
              {t("common.formPauseOptionTitle")}
            </Typography>
            <Typography textAlign="right">{waitingLocation}</Typography>
          </Stack>
        )}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ minWidth: "100px" }}>
            {t("common.formDestinationTitle")}
          </Typography>
          <Typography textAlign="right">{destinationLocation}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{t("common.formTransportTypeTitle")}</Typography>
          <Typography textAlign="right">{t(TYPE_CARS[typeCar])}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{t("common.formServiceTypeTitle")}</Typography>
          <Typography textAlign="right">{t(SERVICE_CARS[service])}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{t("common.dialogDistanceInfoText")}</Typography>
          <Typography textAlign="right">{distanceText}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Typography>{t("common.totalFee")} </Typography>
            <Tooltip
              sx={{ cursor: "pointer" }}
              title="Lưu ý: Đối với dịch vụ 2 chiều thì chi phí khứ hồi sẽ bằng 60% chi phí lúc đi."
            >
              <InfoIcon />
            </Tooltip>
          </Box>
          <Typography textAlign="right">
            {journeyFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
          </Typography>
        </Stack>
        <Box>
          <Typography variant="h4" textAlign="center" my={2}>
            Thông tin khách hàng
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack direction="column" spacing={1} textAlign="left">
              <Box>{t("common.dialogFullnameText")} </Box>
              <TextField
                {...hookForm.register("fullName")}
                name="fullName"
                size="small"
                label=""
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent"
                    }
                  }
                }}
                fullWidth
                placeholder={t("common.dialogFullnamePlaceholderText")}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="column" spacing={1} textAlign="left">
              <Box>{t("common.dialogPhoneNumberText")}</Box>
              <TextField
                {...hookForm.register("phoneNumber")}
                name="phoneNumber"
                size="small"
                label=""
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent"
                    }
                  }
                }}
                fullWidth
                inputProps={{
                  maxLength: 10,
                }}
                onChange={(event) => {
                  const regex = /^[0-9\b]+$/;
                  if (
                    event.target.value === "" ||
                    regex.test(event.target.value)
                  ) {
                    hookForm.setValue("phoneNumber", event.target.value);
                  }
                }}
                placeholder={t("common.dialogPhoneNumberPlaceholderText")}
              />
            </Stack>
          </Grid>
        </Grid>
        <Box mt={5} mb={2} textAlign="center">
          <Button
            size="medium"
            sx={{
              background: "#30a555",
              color: "#fff",
              padding: "8px 24px",
              borderRadius: "30px",
              letterSpacing: "1px",
              fontSize: "16px",
            }}
            onClick={hookForm.handleSubmit(onBookingToTravel)}
          >
            {t("common.dialogBookingBtn")}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetail;
