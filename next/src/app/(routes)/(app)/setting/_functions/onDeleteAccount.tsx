import { enqueueSnackbar } from "notistack";

export const onDeleteAccount = () => {
  enqueueSnackbar("회원탈퇴", { key: 'userDelete', persist: true, variant: 'deleteAccount' });
};
