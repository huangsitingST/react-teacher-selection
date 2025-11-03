import { Layout, Button } from "antd";
import { useNavigate, useSelector } from "umi";
import logo from "../../assets/images/logo.png";
import { UserOutlined } from "@ant-design/icons";
const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { user } = useSelector((state: any) => state.userState);
  const navigate = useNavigate();
  const gotoChangeRole = () => {
    navigate("/choiceAccess");
  };

  return (
    <Header className="flex justify-between h-[var(--header-height)] shadow-xl">
      <div className="flex items-center">
        <img src={logo} alt="logo" width={30} height={30} className="mr-10" />
        <h4>名师申报平台系统</h4>
      </div>
      <div className="flex items-center">
        <Button
          type="link"
          icon={<UserOutlined className="text-[20px]" />}
          onClick={gotoChangeRole}
        >
          切换角色
        </Button>
        <span>{user.userName}</span>
      </div>
    </Header>
  );
};

export default AppHeader;
