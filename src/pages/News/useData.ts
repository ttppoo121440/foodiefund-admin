import { useMemo, useState } from 'react';
import { inputType } from '@/components/Forms/types';
import { usePagination } from '@/hooks/usePagination';
import { DialogState } from '@/types/dialog';
import {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useGetNews,
  useUpdateNewsMutation,
} from '@/hooks/useNews';
import { NewsResponseType } from '@/api/services/newsService/types';

export const useData = () => {
  const { currentPage, pageSize, handlePageChange } = usePagination();
  const [blackListedFilter, setBlackListedFilter] = useState<
    number | undefined
  >(undefined);
  const [dialogState, setDialogState] = useState<DialogState<NewsResponseType>>(
    {
      isOpen: false,
      currentItem: null,
      isEdit: false,
    },
  );

  const updateIsOpen = (newState: DialogState<NewsResponseType>) => {
    setDialogState(newState);
  };
  const [search, setSearch] = useState<string>('');

  const getNewsQuery = useGetNews({
    keyWord: search,
    page: currentPage,
    limit: pageSize,
  });
  const { mutate: createData } = useCreateNewsMutation();
  const { mutate: updateData } = useUpdateNewsMutation();
  const { mutate: deleteData } = useDeleteNewsMutation();

  const initialValues = useMemo(
    () => ({
      _id: '',
      title: '',
      content: '',
      isTop: false,
      isEnabled: true,
    }),
    [],
  );

  const commonItems: inputType[] = [
    {
      name: 'title',
      label: '標題',
      type: 'text',
    },
    {
      name: 'content',
      label: '內容',
      type: 'textarea',
    },
    {
      name: 'isEnabled',
      label: '是否啟用',
      type: 'switch',
    },
    {
      name: 'isTop',
      label: '是否置頂',
      type: 'switch',
    },
  ];

  const formItems: inputType[] = dialogState.isEdit ? commonItems : commonItems;

  return {
    getNewsQuery,
    dialogState,
    updateIsOpen,
    setSearch,
    createData,
    updateData,
    deleteData,
    initialValues,
    formItems,
    handlePageChange,
    currentPage,
    pageSize,
    setBlackListedFilter,
    blackListedFilter,
  };
};
