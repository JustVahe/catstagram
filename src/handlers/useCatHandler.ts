import { setCats} from "../redux/slices/catSlice";
import { useAppDispatch } from "../redux/hooks/typedHooks";

export default function useCatHandler() {

    const dispatch = useAppDispatch();
   
    return function (id : number) {

        fetch("https://api.thecatapi.com/v1/images/search?limit=10&category_ids="+id)
        .then(res => res.json())
        .then(data => dispatch(setCats(data)));

    }
    
}
