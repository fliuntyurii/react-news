import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { MAIN_COLOR } from '../../constants/colors';

function Home() {
  const { t } = useTranslation();

  return (
    <Grid marginTop="10%" textAlign="center" justifyContent="center" container spacing={3}>
      <Grid item xs={10}>
        <Typography color={MAIN_COLOR} variant="h2" component="h1">
          {t("home.welcome")}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1" component="p">
          {t("home.title")}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1" align="justify" component="p">
          {t("home.paragraph1")}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1" align="justify" component="p">
          {t("home.paragraph2")}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Home;