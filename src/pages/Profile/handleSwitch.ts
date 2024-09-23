import {
  AccountBlackListResponseType,
  AccountResponseType,
} from '@/api/services/userService/types';

export const handleSwitch = (
  checked: boolean,
  data: AccountBlackListResponseType,
  setLocalData: React.Dispatch<React.SetStateAction<AccountResponseType[]>>,
  blackList: (data: { _id: string; isBlackListed: boolean }) => void,
) => {
  setLocalData((prevData) =>
    prevData.map((item) =>
      item._id === data._id ? { ...item, isBlackListed: checked } : item,
    ),
  );
  blackList({ _id: data._id, isBlackListed: checked });
};
