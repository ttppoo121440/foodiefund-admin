import { Input } from 'antd';

interface SearchProps {
  setSearch: (value: string) => void;
  isLoading: boolean;
}
const search = ({ setSearch, isLoading }: SearchProps) => {
  const onSearch = (value: string) => {
    console.log('value:', value);
    setSearch(value);
  };
  return (
    <>
      <Input.Search
        disabled={isLoading}
        onSearch={onSearch}
        size="large"
        placeholder="搜尋"
        enterButton
        allowClear
      />
    </>
  );
};

export default search;
