import { logout } from "@/common/auth/logout";
import { SnackBarAction } from "@/common/utils/snackBar/SnackBarAction";
import { closeSnackbar, enqueueSnackbar } from "notistack";

export const onLogout = () => {
  const logoutAction = () => (
    <>
      <SnackBarAction
        yesAction={() => {
          logout();
          closeSnackbar('logout');
        }}
        noAction={() => {
          closeSnackbar('logout');
        }} />
    </>
  );
  enqueueSnackbar('로그아웃 하시겠습니까?', { key: 'logout', persist: true, action: logoutAction });
};
