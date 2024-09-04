import { useState, useEffect, useMemo, useCallback } from 'react';
import { Modal } from 'antd';
import { useFormContext } from 'react-hook-form';
import Forms from '../Forms';
import DialogButton from './DialogButton';
import { DialogProps, FormData } from './types';

const Dialog = <T extends Record<string, unknown>>({
  btnTitle,
  formItems,
  initialValues,
  createData,
  updateData,
  dialogState,
  updateIsOpen,
  isLoading,
}: DialogProps<T>) => {
  const {
    formState: { isValid, isDirty },
    reset,
    handleSubmit,
    trigger,
  } = useFormContext();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsFormValid(isFormValid);
  }, [isValid, isDirty, isFormValid]);

  useEffect(() => {
    if (dialogState.currentItem) {
      reset(dialogState.currentItem);
    } else {
      reset(initialValues);
    }
  }, [dialogState.currentItem, reset, initialValues]);

  const showModal = () => {
    updateIsOpen({ isOpen: true, currentItem: null, isEdit: false });
    trigger();
    reset(initialValues);
    console.log('reset:', initialValues);
  };

  const handleCancel = () => {
    updateIsOpen({ isOpen: false, currentItem: null, isEdit: false });
    reset();
  };

  const onSuccessAction = useCallback(() => {
    setIsSubmitting(false);
    updateIsOpen({ isOpen: false, currentItem: null, isEdit: false });
    reset();
    setIsFormValid(false);
  }, [setIsSubmitting, updateIsOpen, reset, setIsFormValid]);

  const handleSuccess = useCallback(() => {
    onSuccessAction();
  }, [onSuccessAction]);

  const handleError = useCallback(() => {
    setIsFormValid(false);
    setIsSubmitting(false);
  }, []);

  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      setIsSubmitting(true);
      if (dialogState.currentItem) {
        updateData(
          {
            id: dialogState.currentItem?.id,
            ...(data as T),
          } as T,
          {
            onSuccess: handleSuccess,
            onError: handleError,
          },
        );
      } else {
        createData(data as T, {
          onSuccess: handleSuccess,
          onError: handleError,
        });
      }
    },
    [
      createData,
      handleSuccess,
      handleError,
      dialogState.currentItem,
      updateData,
    ],
  );

  const handleOk = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(handleFormSubmit)();
    }
  };

  const modalContent = useMemo(
    () => <Forms formItems={formItems} initialValues={initialValues} />,
    [formItems, initialValues],
  );

  return (
    <>
      <DialogButton
        isLoading={isLoading}
        showModal={showModal}
        btnTitle={btnTitle}
      />
      <Modal
        title={dialogState.isEdit ? '編輯資料' : '新增資料'}
        cancelText="取消"
        okText="確定"
        onOk={handleOk}
        maskClosable={false}
        open={dialogState.isOpen}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !(isValid && isDirty) || isSubmitting }}
        cancelButtonProps={{ disabled: !(isValid && isDirty) || isSubmitting }}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default Dialog;
