import axiosClient from '@/api/axiosClient';

import { AxiosResponse } from 'axios';
import { AccountQueryParams, AccountQueryResponse } from '../userService/types';
import { NewsIdResponseType, NewsResponseType } from './types';

export const getNews = ({
  keyWord = '',
  page,
  limit = 10,
}: AccountQueryParams) => {
  return axiosClient.get<AccountQueryResponse>('/news', {
    params: { keyWord, page, limit },
  });
};

export const createNews = (
  news: NewsResponseType,
): Promise<AxiosResponse<NewsResponseType>> => {
  return axiosClient.post('/news/admin', news);
};

export const updateNews = (
  news: NewsResponseType,
): Promise<AxiosResponse<NewsResponseType>> => {
  console.log(news);
  return axiosClient.put(`/news/admin/${news._id}`, news);
};

export const deleteNews = (
  newsId: string,
): Promise<AxiosResponse<NewsIdResponseType>> => {
  return axiosClient.delete(`/news/admin/${newsId}`);
};
