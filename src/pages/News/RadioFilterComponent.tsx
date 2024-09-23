import { Flex, Radio, RadioChangeEvent } from 'antd';

interface RadioFilterComponentProps {
  setBlackListedFilter: (value: number | undefined) => void;
  setIsAdminFilter: (value: string) => void;
  isLoading: boolean;
}

const blackListedOptions = [
  { value: undefined, label: '全部' },
  { value: 1, label: '黑名單' },
  { value: 0, label: '白名單' },
];

const isAdminOptions = [
  { value: '', label: '全部' },
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
];

const RadioFilterComponent = ({
  setBlackListedFilter,
  setIsAdminFilter,
  isLoading,
}: RadioFilterComponentProps) => {
  const handleBlackListedFilterChange = (value: RadioChangeEvent) => {
    setBlackListedFilter(value.target.value);
  };

  const handleIsAdminFilterChange = (value: RadioChangeEvent) => {
    setIsAdminFilter(value.target.value);
  };

  return (
    <Flex vertical gap="middle">
      <Radio.Group
        disabled={isLoading}
        defaultValue={undefined}
        buttonStyle="solid"
        onChange={handleBlackListedFilterChange}
      >
        {blackListedOptions.map((option) => (
          <Radio.Button
            key={String(option.value ?? 'all')}
            value={option.value}
          >
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
      <Radio.Group
        disabled={isLoading}
        defaultValue=""
        buttonStyle="solid"
        onChange={handleIsAdminFilterChange}
      >
        {isAdminOptions.map((option) => (
          <Radio.Button key={String(option.value)} value={option.value}>
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Flex>
  );
};

export default RadioFilterComponent;
