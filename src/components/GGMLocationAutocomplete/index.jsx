import * as React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";


export default function GGMLocationAutocomplete({ type, hookForm: { register }, name }) {
  const { t } = useTranslation();
  
  const mapSettingRef = React.useRef();

  const inputSearchLocationRef = React.useRef();

  const optionsMap = {
    componentRestrictions: { country: "vn" },
    fields: ["formatted_address", "geometry", "icon", "name"],
    types: ["establishment"],
  };

  React.useEffect(() => {
    if (typeof window.google !== "undefined") {
      mapSettingRef.current = new window.google.maps.places.Autocomplete(
        inputSearchLocationRef.current,
        optionsMap
      );

      mapSettingRef.current.addListener("place_changed", async function () {
        const place = await mapSettingRef.current.getPlace();
      });
    }
  }, []);

  return (
    <TextField
      {...register(name)}
      name={name}
      fullWidth
      inputRef={inputSearchLocationRef}
      size="small"
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "30px",
      }}
      placeholder={
        type === "origin"
          ? t("common.formPickupPlaceholder")
          : type === "waiting"
          ? t("common.formPauseLocationPlaceholder")
          : t("common.formDestinationLocationPlaceholder")
      }
    />
  );
}
