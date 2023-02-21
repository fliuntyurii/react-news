import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

interface User {
  name: string;
  email: string;
}

function Profile() {
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  const user: User = {
    name: 'Yurii',
    email: 'fake@gmail.com',
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <>
      { loading ?
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
        <CircularProgress />
      </div>
      :
      <Grid marginTop="5%" container spacing={3} justifyContent="center">
        <Grid item xs={8}>
          <Avatar src={`https://i.pravatar.cc/200?u=${user.email}`} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="body1" color="textSecondary">{user.email}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">
            {t("profile.bioTitle")}
          </Typography>
          <Typography variant="body1">
            {t("profile.bioText")}
          </Typography>
        </Grid>
      </Grid>
      }
    </>
  );
}

export default Profile;