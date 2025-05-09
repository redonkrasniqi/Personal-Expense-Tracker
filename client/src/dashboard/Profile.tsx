import { Popover, Button } from "antd";
import ProfileIcon from "../static/ProfileIcon.png";
import "./style/Profile.css";
import { useAuth } from "../services/useAuth";
import Loading from "../components/Loading";

const Profile = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) return <Loading />

    const content = (
        <div className="profile-container">
            <>
                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{user?.name}</div>
                <div style={{ color: '#666', fontSize: '0.8em' }}>{user?.email}</div>
            </>
            <div className="button-row">
                <Button color="purple" variant="solid" onClick={handleLogout}>Log out</Button>
            </div>
        </div>
    );

    return (
        <Popover content={content} trigger="click" placement="bottomRight">
            <img src={ProfileIcon} alt="Profile Icon" style={{ cursor: 'pointer', width: '100px' }} />
        </Popover>
    );
}

export default Profile;