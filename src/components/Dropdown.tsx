import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/typedHooks";
import { selectCategories, setCategories } from "../redux/slices/categorySlice";
import useCatHandler from "../handlers/useCatHandler"

const Dropdown = () => {

    const [clicked,setClicked] = useState(false);

    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/categories")
        .then(res => res.json())
        .then(data => dispatch(setCategories(data)))
        // eslint-disable-next-line
    }, [])

    const catHandler = useCatHandler();

    
    return ( 
        <>
        <div>
            <p className="text-xl font-bold uppercase relative cursor-pointer" onClick={() => {setClicked((prev) => !prev); console.log(clicked);}}>Categories</p>
            <div className={"w-[200px] absolute top-[45px] overflow-hidden origin-top transition-all " + (clicked ? "h-[300px]" : "h-0")}>
                <div className="w-full pt-4 rounded-md bg-slate-100 shadow-slate-300 shadow-sm absolute top-0 left-0">
                    {categories && categories.map((item) => {
                        return (
                            <button 
                            className="block p-2 pl-4 uppercase font-semibold hover:text-amber-500 transition-all"
                            onClick={()=>catHandler(item.id)}>
                                {item.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
            
        </>
     );
}
 
export default Dropdown;