import { UseMutateFunction } from '@tanstack/react-query';
import { inputType } from '../Forms/types';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '@/types/errorResponse';

export interface DialogProps<T> {
  btnTitle: string;
  formItems: inputType[];
  initialValues: T;
  createData: UseMutateFunction<
    AxiosResponse<T, unknown>,
    AxiosError<ErrorResponse, unknown>,
    T,
    unknown
  >;
  updateData: UseMutateFunction<
    AxiosResponse<T, unknown>,
    AxiosError<ErrorResponse, unknown>,
    T,
    unknown
  >;
  dialogState: {
    isOpen: boolean;
    currentItem: T | null;
    isEdit: boolean;
  };
  updateIsOpen: (newState: {
    isOpen: boolean;
    currentItem: T | null;
    isEdit: boolean;
  }) => void;
  isLoading: boolean;
}

export interface DialogButtonProps {
  showModal: () => void;
  btnTitle: string;
  isLoading: boolean;
}

export interface ShowDeleteConfirmProps<T> {
  _id: string;
  title: string;
  text?: string;
  deleteData: (_id: T) => void;
}

export interface FormData extends Record<string, unknown> {
  id?: string;
}
