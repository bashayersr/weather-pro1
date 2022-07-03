import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
        <p>Author: B</p>
        <Link to="/terms">terms and conditions</Link>
    </footer>

    // <footer className=" footer bg-orange fixed-down">
    //   <div className="" style={{ backgroundColor: "orange" }}></div>
    // </footer>
  );
};

export default Footer;