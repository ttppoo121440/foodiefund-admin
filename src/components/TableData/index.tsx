import { useState, useMemo } from 'react';
import Search from '@/components/Search';
import { Checkbox, Divider, Space, Table } from 'antd';
import type { CheckboxOptionType } from 'antd';
import { TableDataProps } from './types';
import LocalStorageService from '@/utils/LocalStorageService';

const localStorageService = LocalStorageService.getInstance();
const TableData = <T extends object>({
  data,
  name,
  columns,
  isLoading,
  setSearch,
  currentPage,
  pageSize,
  total,
  handlePageChange,
  children,
}: TableDataProps<T>) => {
  const defaultCheckedList = columns.map((item) => item.key as string);
  const [checkedList, setCheckedList] = useState(
    localStorageService.getItem(`${name}filteredColumns`)
      ? JSON.parse(
          localStorageService.getItem(`${name}filteredColumns`) as string,
        )
      : defaultCheckedList,
  );
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const filteredColumns = useMemo(() => {
    const filtered = columns.filter((col) => {
      return checkedList.includes(col.key as string);
    });
    localStorageService.setItem(
      `${name}filteredColumns`,
      JSON.stringify(checkedList),
    );
    return filtered;
  }, [columns, checkedList, name]);

  const columnsWithSorter = filteredColumns.map((col) => ({
    ...col,
    sorter: (a: T, b: T) => {
      if (
        typeof a[col.key as keyof T] === 'number' &&
        typeof b[col.key as keyof T] === 'number'
      ) {
        return (
          (a[col.key as keyof T] as number) - (b[col.key as keyof T] as number)
        );
      }
      return String(a[col.key as keyof T]).localeCompare(
        String(b[col.key as keyof T]),
      );
    },
  }));

  return (
    <>
      <Divider>{name}</Divider>
      <Space direction="vertical" size="large">
        <Search isLoading={isLoading} setSearch={setSearch} />
        {children}
        <Checkbox.Group
          disabled={isLoading}
          value={checkedList}
          options={options as CheckboxOptionType[]}
          onChange={(value) => {
            setCheckedList(value as string[]);
          }}
        />
      </Space>
      <Table
        columns={columnsWithSorter}
        dataSource={data.map((item, index) => ({ ...item, key: index }))}
        loading={isLoading}
        style={{ marginTop: 24 }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: handlePageChange,
        }}
      />
    </>
  );
};

export default TableData;
