import Icon from "@ant-design/icons";
import PETLogo from "../static/PETLogo.svg";

// Desc: Logo for the Navbar component
function LogoNavbar() {
  return (
    <Icon component={() => <img src={PETLogo} alt="PET Logo" style={{ width: 'auto', height: '100px' }} />} />
  );
}

export default LogoNavbar;
