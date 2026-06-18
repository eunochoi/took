import { useCurrentUser } from "./useCurrentUser";

export const useCurrentUserEmail = () => {
  const { data: user } = useCurrentUser()
  const currentUserEmail: string = user?.email ?? '';

  return { currentUserEmail };
}
