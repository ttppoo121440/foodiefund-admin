import { NewsResponseType } from '@/api/services/newsService/types';

export const handleSwitch = (
  checked: boolean,
  data: NewsResponseType,
  setLocalData: React.Dispatch<React.SetStateAction<NewsResponseType[]>>,
  key: keyof NewsResponseType,
  updateData: (data: {
    _id: string;
    isEnabled?: NewsResponseType['isEnabled'];
    isTop?: NewsResponseType['isTop'];
  }) => void,
) => {
  if (key === 'isEnabled') {
    console.log('isEnabled');
    {
      setLocalData((prevData) =>
        prevData.map((item) =>
          item._id === data._id ? { ...item, isEnabled: checked } : item,
        ),
      );
      updateData({ _id: data._id, isEnabled: checked });
    }
  } else {
    console.log('isTop');

    setLocalData((prevData) =>
      prevData.map((item) =>
        item._id === data._id ? { ...item, isTop: checked } : item,
      ),
    );
    updateData({ _id: data._id, isTop: checked });
  }
};
