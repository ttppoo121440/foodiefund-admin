import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { safeParseResponse } from '@/utils/zodUtils';
import { Notification } from '@/components/Notification';

import { ErrorResponse } from '@/types/errorResponse';

import {
  NewsIdResponseType,
  NewsQueryParams,
  NewsQueryResponse,
  NewsResponseType,
} from '@/api/services/newsService/types';
import { newsQueryResponseSchema } from '@/schemas/newsSchema';
import {
  createNews,
  deleteNews,
  getNews,
  updateNews,
} from '@/api/services/newsService';

export const useGetNews = (queryParams: NewsQueryParams) => {
  return useQuery<NewsQueryResponse, Error>({
    queryKey: ['News', queryParams],
    queryFn: async () => {
      const response = await getNews(queryParams);
      const result = safeParseResponse(newsQueryResponseSchema, response.data);
      console.log('get News success', result);
      return result;
    },
  });
};

export const useCreateNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<NewsResponseType>,
    AxiosError<ErrorResponse>,
    NewsResponseType
  >({
    mutationFn: async (newsData: NewsResponseType) =>
      await createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['News'] });
      Notification('success', '新增成功', '新增資料成功');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Error creating News:', error.response?.data.message);
      Notification('error', '新增失敗', error.response?.data.message as string);
    },
  });
};

export const useUpdateNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<NewsResponseType>,
    AxiosError<ErrorResponse>,
    NewsResponseType
  >({
    mutationFn: async (data: NewsResponseType) => await updateNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['News'] });
      Notification('success', '修改成功', '修改資料成功');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Error creating News:', error.response?.data.message);
      Notification('error', '修改失敗', error.response?.data.message as string);
    },
  });
};

export const useDeleteNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<NewsIdResponseType>,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationFn: async (id: string) => await deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['News'] });
      Notification('success', '刪除成功', '刪除資料成功');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Error creating News:', error.response?.data.message);
      Notification('error', '刪除失敗', error.response?.data.message as string);
    },
  });
};
