import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TableData from '@/components/TableData';
import Dialog from '@/components/Dialog';
import { safeParseResponse } from '@/utils/zodUtils';
import { ShowDeleteConfirm } from '@/components/Dialog/ShowDeleteConfirm';
import { useData } from './useData';
import { getColumns } from './columns';
import { NewsResponseType } from '@/api/services/newsService/types';
import { newsResponseTypeSchema } from '@/schemas/newsSchema';
import { useState } from 'react';
import { useFetchUsers } from '@/hooks/useFetchLocalData';
import { handleSwitch } from './handleSwitch';
const Home = () => {
  const {
    getNewsQuery,
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
  } = useData();
  const methods = useForm<FormData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(newsResponseTypeSchema),
  });
  const openDialogEditData = (data: NewsResponseType) => {
    console.log(data);
    const result = safeParseResponse(newsResponseTypeSchema, data);
    updateIsOpen({ isOpen: true, currentItem: result, isEdit: true });
  };
  const openDialogDeleteData = (data: NewsResponseType) => {
    ShowDeleteConfirm({ title: data.title!, _id: data._id!, deleteData });
  };
  const [localData, setLocalData] = useState<NewsResponseType[]>([]);

  useFetchUsers(getNewsQuery, setLocalData);

  const switchHandler = (
    checked: boolean,
    data: NewsResponseType,
    key: keyof NewsResponseType,
  ) => {
    handleSwitch(checked, data, setLocalData, key, updateData);
  };

  const columns = getColumns(
    openDialogEditData,
    openDialogDeleteData,
    getNewsQuery.isFetching,
    switchHandler,
  );

  return (
    <FormProvider {...methods}>
      <div>
        <Dialog<NewsResponseType>
          btnTitle="新增資料"
          formItems={formItems}
          initialValues={initialValues}
          createData={createData}
          updateData={updateData}
          dialogState={dialogState}
          updateIsOpen={updateIsOpen}
          isLoading={getNewsQuery.isFetching}
        />
        <TableData<NewsResponseType>
          name="公告列表"
          data={localData ?? []}
          columns={columns}
          isLoading={getNewsQuery.isFetching}
          setSearch={setSearch}
          currentPage={currentPage}
          pageSize={pageSize}
          total={getNewsQuery.data?.pagination.total ?? 0}
          handlePageChange={handlePageChange}
        ></TableData>
      </div>
    </FormProvider>
  );
};
export default Home;
