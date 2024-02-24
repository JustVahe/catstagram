import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/typedHooks";
import { selectCats, setCats, addCats} from "../redux/slices/catSlice";
import CatItem from "./CatItem";
import {v4} from "uuid"

const Catlist = () => {
    
    const cats = useAppSelector(selectCats);
    const dispatch = useAppDispatch();

    const [isSend,setIsSend] = useState(true);
    const sendHandler = useCallback(() => (poxos:boolean) => setIsSend(poxos),[setIsSend])

    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/images/search?limit=10")
        .then(res => res.json())
        .then(data => dispatch(setCats(data)))
    }, []);
  
    const handleInfinite = useCallback((isSend : boolean, sendHandler: (poxos:boolean) => void) => {

        const bodyHeight = document.body.offsetHeight;
        const scrollHeight = window.scrollY;
        const windowHeight = window.innerHeight;
console.log({isSend})
        if (isSend && (scrollHeight + windowHeight >= bodyHeight - 100)) {
            sendHandler(false)
            fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            .then(res => res.json())
            .then(data => {
                dispatch(addCats(data));
                sendHandler(true);
            })
        }
    },[dispatch]) 

    useEffect(() => {
        const sendEvent = () => handleInfinite(isSend, sendHandler)
        document.addEventListener("scroll", sendEvent);
        return () => document.removeEventListener("scroll", sendEvent);
    }, [handleInfinite,isSend,sendHandler]);


    return ( 
        <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="grid gap-5">
                {cats && cats.map((item, index) => {if (index % 2 === 0) {
                    return <CatItem key={v4()} src={item.url} />
                }})}
            </div>
            <div className="grid gap-5">
                {cats && cats.map((item, index) => {if (index % 2 === 1) {
                    return <CatItem key={v4()} src={item.url} />
                }})}
            </div>
        </div>
    );
}
 
export default Catlist;
