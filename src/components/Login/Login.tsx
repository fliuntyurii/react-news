import { Button, TextField } from '@mui/material';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LOGIN_SUCCESS } from '../../constants/actions';
import { login } from "../../store/authReducer";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username, password).then((success: boolean) => {
      if (success) {
        dispatch({ type: LOGIN_SUCCESS });
        setUsername("");
        setPassword("");
        setIsSuccess(true);
        return;
      }
    });
    setIsError(true);
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={styles.field}
          label={t("login.user")}
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          className={styles.field}
          label={t("login.password")}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        { isError && username && password && <p className={styles.error}>Something went wrong!</p> }
        <Button type="submit" variant="contained" color="primary">
          {t("login.login")}
        </Button>
      </form>
      { isSuccess && <Navigate to="/react-news/profile" /> }
    </div>
  );
}