import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./root";
import { useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
