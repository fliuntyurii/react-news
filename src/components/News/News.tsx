import { CircularProgress, Grid, Typography, Box, Button } from '@mui/material';

import { Suspense, useEffect, useState, useMemo } from 'react';
import { AnyAction } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import { fetchNews, deletePost } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { MAIN_COLOR } from '../../constants/colors';

function News() {
  const [page, setPage] = useState<any>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstPageLoading, setFirstPageLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<any>([]);

  const { t } = useTranslation();
  const location = useLocation();
  const data = useSelector((state: RootState) => state.news.articles);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  params.set('page', String(!firstPageLoading ? page : searchParams.get('page')));

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setArticles(data);
    setPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  }, [data, searchParams]);

  useEffect(() => {
    const fetchPostsByPage = async () => {
      setLoading(true);
      await dispatch(fetchNews(!firstPageLoading ? page : searchParams.get('page')));
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
      setFirstPageLoading(false);
      setLoading(false);
    };
    fetchPostsByPage();
  }, [dispatch, page, firstPageLoading, params, searchParams]);

  const handleDelete = async (id: number) => {
    const result = await deletePost(id);
    if (result) {
      setArticles(articles.filter((article: any) => article.id !== id));
    }
  };

  return (
    <Suspense fallback="Loading...">
      <Box marginTop="5%">
        <Typography color={MAIN_COLOR} textAlign="center" variant="h3">{t("news.title")}</Typography>
        <Grid marginTop="24px" container spacing={2}>
          {articles.map((article: any) => (
            <Grid key={article.id} item xs={12} sm={6}>
              <Box padding="10px 40px">
                <Typography textAlign="center" fontWeight="bold" variant="h6" color={MAIN_COLOR}>
                  {t(article.title)}
                </Typography>
                <Typography>
                  {t(article.body)}
                </Typography>
                <Button variant="outlined" style={{ marginTop: "15px" }} onClick={() => handleDelete(article.id)}>
                  {t("news.del")}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "30px 0" }}>
          { loading && <CircularProgress /> }
          <Button variant="contained" disabled={loading} onClick={handleLoadMore} style={{ marginTop: "15px" }}>
            {t("news.load")}
          </Button>
        </div>
      </Box>
    </Suspense>
  );
}

export default News;
