import { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  isLoggedIn: boolean,
}

function Header({ isLoggedIn }: Props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <Suspense fallback="Loading...">
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => navigate('/')} color="inherit">
            {t("header.home")}
          </Button>
          <Button onClick={() => navigate('/news')} color="inherit">
            {t("header.news")}
          </Button> 
          <Button onClick={() => navigate(`/${ isLoggedIn ? 'profile' : 'login' }`)} color="inherit">
            { isLoggedIn ? t("header.profile") : t("header.login") }
          </Button>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="uk">Українська</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </Suspense>
  );
}

export default Header;