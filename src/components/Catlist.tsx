import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/typedHooks";
import { selectCats, setCats, addCats} from "../redux/slices/catSlice";
import CatItem from "./CatItem";
import {v4} from "uuid"

const Catlist = () => {
    
    const cats = useAppSelector(selectCats);
    const dispatch = useAppDispatch();

    const [isSend,setIsSend] = useState(true);
    const sendHandler = useCallback((poxos:boolean) => setIsSend(poxos),[setIsSend])

    useEffect(() => {
        fetch("https://api.thecatapi.com/v1/images/search?limit=10")
        .then(res => res.json())
        .then(data => dispatch(setCats(data)));
    }, []);

    const lastCardObserver = new IntersectionObserver((entries) => {
        const lastCard = entries[0];
        if (!lastCard.isIntersecting) return;
        else handleInfinite();
    }, {})

    // const handleInfinite = (isSend : boolean, sendHandler: (poxos:boolean) => void) => {
    
    //     const bodyHeight = document.body.offsetHeight;
    //     const scrollHeight = window.scrollY;
    //     const windowHeight = window.innerHeight;

    //     if (isSend && (scrollHeight + windowHeight >= bodyHeight - 100)) {
    //         sendHandler(false)
    //         fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    //         .then(res => res.json())
    //         .then(data => {
    //             dispatch(addCats(data));
    //             sendHandler(true);
    //         })
    //     }
    // }

     function infiniteHandler() {
    
        const lastCard = cats && document.getElementById(`${cats[cats.length - 1].id}`);
        lastCard && lastCardObserver.observe(lastCard);
        console.log(lastCard);
    
    }

    useEffect(() => {
        infiniteHandler();
    }, [cats])

    const handleInfinite = useCallback(() => {

        const bodyHeight = document.body.offsetHeight;
        const scrollHeight = window.scrollY;
        const windowHeight = window.innerHeight;

        if (isSend && (scrollHeight + windowHeight >= bodyHeight - 100)) {
            sendHandler(false);
            fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            .then((response) => response.json())
            .then((data) => {
                dispatch(addCats(data))
                sendHandler(true);
            })
        }

    }, [isSend]);

    useEffect(() => {
        const sendEvent = () => handleInfinite()
        document.addEventListener("scroll", sendEvent);
        return () => document.removeEventListener("scroll", sendEvent);
    }, [handleInfinite,isSend,sendHandler]);


    return ( 
        <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="grid gap-5">
                {cats && cats.map((item, index) => {if (index % 2 === 0) {
                    return <CatItem key={v4()} src={item.url} id ={ item.id} />
                }})}
            </div>
            <div className="grid gap-5">
                {cats && cats.map((item, index) => {if (index % 2 === 1) {
                    return <CatItem key={v4()} src={item.url} id ={ item.id}/>
                }})}
            </div>
        </div>
    );
}
 
export default Catlist;
