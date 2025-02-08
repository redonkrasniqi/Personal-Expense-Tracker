import { Popover, Button } from "antd";
import ProfileIcon from "../static/ProfileIcon.png";
import "./style/Profile.css";

const Profile = () => {
    const content = (
        <div className="profile-container">
            <h2>Redon Krasniqi</h2>
            <div className="button-row">
                <Button type="link">User Settings</Button>
                <Button type="link" danger>Log out</Button>
            </div>
        </div>
    );

    return (
        <Popover content={content} trigger="click" placement="bottomRight">
            <img src={ProfileIcon} alt="Profile Icon" style={{ cursor: 'pointer', width: '70px' }} />
        </Popover>
    );
}

export default Profile;