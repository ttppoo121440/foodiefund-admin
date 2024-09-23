import { useMemo, useState } from 'react';
import { inputType } from '@/components/Forms/types';
import { usePagination } from '@/hooks/usePagination';
import {
  useBlackListUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsers,
  useUpdateUserMutation,
} from '@/hooks/useUsers';
import { DialogState } from '@/types/dialog';
import { AccountResponseType } from '@/api/services/userService/types';

export const useData = () => {
  const { currentPage, pageSize, handlePageChange } = usePagination();
  const [blackListedFilter, setBlackListedFilter] = useState<
    number | undefined
  >(undefined);
  const [isAdminFilter, setIsAdminFilter] = useState<string>('');
  const [dialogState, setDialogState] = useState<
    DialogState<AccountResponseType>
  >({
    isOpen: false,
    currentItem: null,
    isEdit: false,
  });

  const updateIsOpen = (newState: DialogState<AccountResponseType>) => {
    setDialogState(newState);
  };
  const [search, setSearch] = useState<string>('');

  const getUsersQuery = useGetUsers({
    keyWord: search,
    page: currentPage,
    limit: pageSize,
    isBlackListed: blackListedFilter,
    role: isAdminFilter,
  });
  const { mutate: createData } = useCreateUserMutation();
  const { mutate: updateData } = useUpdateUserMutation();
  const { mutate: deleteData } = useDeleteUserMutation();
  const { mutate: blackList } = useBlackListUserMutation();

  const initialValues = useMemo(
    () => ({
      _id: '',
      name: '',
      email: '',
      password: '',
      date_of_birth: '',
      phone: '',
      address: '',
      remarks: '',
    }),
    [],
  );

  const commonItems: inputType[] = [
    { name: 'name', label: '姓名', required: true, type: 'text' },
    { name: 'email', label: '信箱', type: 'email', required: true },
    { name: 'password', label: '密碼', type: 'password', required: true },
    { name: 'dateOfBirth', label: '生日', type: 'date' },
    { name: 'phone', label: '電話', type: 'text' },
    { name: 'address', label: '地址', type: 'text' },
    { name: 'remarks', label: '備註', type: 'text' },
  ];

  const formItems: inputType[] = dialogState.isEdit
    ? [
        ...commonItems.filter((item) => item.name !== 'password'),
        {
          name: 'role',
          label: '角色',
          type: 'select',
          options: [
            { label: 'user', value: 'user' },
            { label: 'admin', value: 'admin' },
          ],
        },
      ]
    : commonItems;

  return {
    getUsersQuery,
    dialogState,
    updateIsOpen,
    setSearch,
    createData,
    updateData,
    deleteData,
    blackList,
    initialValues,
    formItems,
    handlePageChange,
    currentPage,
    pageSize,
    setBlackListedFilter,
    blackListedFilter,
    setIsAdminFilter,
  };
};
