import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-row gap-20 bg-yellow-200 h-15 rounded-xl border-4 border-white">
        <div className="flex items-center  ml-6">
          <h2 className="text-3xl text-blue-800 font-bold">
            <Link to={"/"}>Lingua Lab</Link>
          </h2>
        </div>
        <ul className="flex items-center gap-10 text-gray-500 text-base font-semibold ">
          <li className="p-2 pl-4 pr-4  rounded-lg hover:bg-yellow-100">
            <Link to={"/homework"}>Homework</Link>
          </li>
          <li className="p-2  pl-4 pr-4  rounded-lg hover:bg-yellow-100">
            <Link to={"/games"}>Games</Link>
          </li>
          <li className="p-2  pl-4 pr-4  rounded-lg hover:bg-yellow-100">
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>

    // <nav className="z-50 w-full bg-white">
    //   <div className="h-10vh flex gap-8 border-b px-4 py-4 lg:py-5">
    //     <div className="flex flex-1 items-center">
    //       <h2 className="text-3xl font-bold text-pink-500">BOWANA</h2>
    //     </div>
    //     <ul className="flex items-center justify-between gap-8 text-[18px]">
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/blogs">Blogs</Link>
    //       </li>
    //       <li>
    //         <Link to="/services">Services</Link>
    //       </li>
    //       <li>
    //         <Link to="/appointments">Book An Appointment</Link>
    //       </li>
    //       <li>
    //         <Link to="/contact">Contact Us</Link>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Navbar;
