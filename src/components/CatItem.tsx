const CatItem = ({src} : {src : string}) => {
    return ( 
        <div className="m-4 mx-auto w-[400px] p-3 bg-slate-50 shadow-sm shadow-slate-300">
            <img src={src} alt="cat" className="w-full"/>
        </div>
     );
}
 
export default CatItem;