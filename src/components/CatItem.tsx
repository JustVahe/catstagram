const CatItem = ({id,src} : {id: string,src : string}) => {
    return ( 
        <div id={id} className="m-4 mx-auto w-[400px] p-3 bg-slate-50 shadow-sm shadow-slate-300">
            <img src={src} alt="cat" className="w-full h-[400px]"/>
        </div>
     );
}
 
export default CatItem;