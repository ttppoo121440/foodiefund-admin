import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TableData from '@/components/TableData';
import Dialog from '@/components/Dialog';
import { safeParseResponse } from '@/utils/zodUtils';
import { useData } from './useData';
import { getColumns } from './columns';
import { ShowDeleteConfirm } from '@/components/Dialog/ShowDeleteConfirm';

import { useState } from 'react';
import { useFetchUsers } from '@/hooks/useFetchLocalData';
import RadioFilterComponent from './RadioFilterComponent';
import { handleSwitch } from '@/utils/handleSwitch';
import {
  AccountBlackListResponseType,
  AccountResponseType,
} from '@/api/services/userService/type';
import {
  accountRegistrationSchema,
  accountResponseTypeSchema,
} from '@/schemas/accountSchema';
const Home = () => {
  const {
    getUsersQuery,
    setSearch,
    createData,
    updateData,
    deleteData,
    initialValues,
    formItems,
    handlePageChange,
    currentPage,
    pageSize,
    dialogState,
    updateIsOpen,
    setBlackListedFilter,
    blackListedFilter,
    blackList,
    setIsAdminFilter,
  } = useData();
  const methods = useForm<FormData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: dialogState.isEdit
      ? zodResolver(accountResponseTypeSchema)
      : zodResolver(accountRegistrationSchema),
  });
  const openDialogEditData = (data: AccountResponseType) => {
    console.log(data);
    const result = safeParseResponse(accountResponseTypeSchema, data);
    updateIsOpen({ isOpen: true, currentItem: result, isEdit: true });
  };
  const openDialogDeleteData = (data: AccountResponseType) => {
    ShowDeleteConfirm({ title: data.name, _id: data._id, deleteData });
  };
  const [localData, setLocalData] = useState<AccountResponseType[]>([]);

  useFetchUsers(getUsersQuery, setLocalData);

  const switchHandler = (
    checked: boolean,
    data: AccountBlackListResponseType,
  ) => {
    handleSwitch(checked, data, setLocalData, blackList);
  };

  const columns = getColumns(
    openDialogEditData,
    openDialogDeleteData,
    blackListedFilter,
    switchHandler,
    getUsersQuery.isFetching,
  );

  return (
    <FormProvider {...methods}>
      <div>
        <Dialog<AccountResponseType>
          btnTitle="新增資料"
          formItems={formItems}
          initialValues={initialValues}
          createData={createData}
          updateData={updateData}
          dialogState={dialogState}
          updateIsOpen={updateIsOpen}
          isLoading={getUsersQuery.isFetching}
        />
        <TableData<AccountResponseType>
          name="會員列表"
          data={localData ?? []}
          columns={columns}
          isLoading={getUsersQuery.isFetching}
          setSearch={setSearch}
          currentPage={currentPage}
          pageSize={pageSize}
          total={getUsersQuery.data?.pagination.total ?? 0}
          handlePageChange={handlePageChange}
        >
          <RadioFilterComponent
            setBlackListedFilter={setBlackListedFilter}
            setIsAdminFilter={setIsAdminFilter}
            isLoading={getUsersQuery.isFetching}
          />
        </TableData>
      </div>
    </FormProvider>
  );
};
export default Home;
