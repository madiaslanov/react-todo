import {AppDispatch, RootState} from "../../store/redux-store.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector : TypedUseSelectorHook<RootState> = useSelector;