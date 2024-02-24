import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const Navbar = () => {
    return ( 
        <div className="w-full shadow-slate-300 shadow-sm">
            <div className="container flex justify-between items-center p-3">
                <Link to={"/"}> 
                    <p className="font-bold text-2xl"> <span className="text-amber-500">Cat</span>stagram</p>
                </Link>
                <Dropdown/>
            </div>
        </div>
    );
}
 
export default Navbar;