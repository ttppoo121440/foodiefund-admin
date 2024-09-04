import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  blackList,
} from '@/api/services/userService';
import { AxiosError, AxiosResponse } from 'axios';
import { safeParseResponse } from '@/utils/zodUtils';
import { Notification } from '@/components/Notification';

import { ErrorResponse } from '@/types/errorResponse';
import {
  AccountBlackListResponseType,
  AccountIdResponseType,
  AccountQueryParams,
  AccountQueryResponse,
  AccountResponseType,
} from '@/api/services/userService/type';
import { accountQueryResponseSchema } from '@/schemas/accountSchema';

export const useGetUsers = (queryParams: AccountQueryParams) => {
  return useQuery<AccountQueryResponse, Error>({
    queryKey: ['Account', queryParams],
    queryFn: async () => {
      const response = await getUsers(queryParams);
      const result = safeParseResponse(
        accountQueryResponseSchema,
        response.data,
      );
      console.log('get users success', result);
      return result;
    },
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<AccountResponseType>,
    AxiosError<ErrorResponse>,
    AccountResponseType
  >({
    mutationFn: async (newUser: AccountResponseType) =>
      await createUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      Notification('success', '新增成功', '新增資料成功');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Error creating user:', error.response?.data.message);
      Notification('error', '新增失敗', error.response?.data.message as string);
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<AccountResponseType>,
    AxiosError<ErrorResponse>,
    AccountResponseType
  >({
    mutationFn: async (data: AccountResponseType) => await updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      Notification('success', '修改成功', '修改資料成功');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Error creating user:', error.response?.data.message);
      Notification('error', '修改失敗', error.response?.data.message as string);
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<AccountIdResponseType>,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationFn: async (id: string) => await deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      Notification('success', '刪除成功', '刪除資料成功');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Error creating user:', error.response?.data.message);
      Notification('error', '刪除失敗', error.response?.data.message as string);
    },
  });
};

export const useBlackListUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<AccountBlackListResponseType>,
    AxiosError<ErrorResponse>,
    AccountBlackListResponseType
  >({
    mutationFn: async (data: AccountBlackListResponseType) =>
      await blackList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      Notification('success', '修改成功', '修改成功');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error('Error creating user:', error.response?.data.message);
      Notification('error', '修改失敗', error.response?.data.message as string);
    },
  });
};
