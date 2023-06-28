import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const MainFooter = () => {
  const {t} = useTranslation();

  return (
    <Container sx={{ mt: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Stack textAlign="left">
            <Typography variant="h5" my={2}>Ken Kun Family's Car</Typography>
            <Typography>{t('common.phoneNumberText')}</Typography>
            <Typography>
              {t('common.addressText')}
            </Typography>
            <Typography>Email: duynguyen.saigoncartour@gmail.com</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box textAlign="center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15679.807692329865!2d106.6519615!3d10.7381889!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe870ebba6f%3A0x8b747ae5e3baaf62!2sKENKUN%20Family%20Cars!5e0!3m2!1svi!2s!4v1687866120244!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={6}>
        <Typography>Ken Kun Family's Car - Skytech©2023</Typography>
      </Box>
    </Container>
  );
};

export default MainFooter;
