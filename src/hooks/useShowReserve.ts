import { useBoolSetting } from "./useBoolSetting";

export const useShowReserve = () => {
  const { value, setValue, loading } = useBoolSetting("show_reserve_button", true);
  return { showReserve: value, setShowReserve: setValue, loading };
};
