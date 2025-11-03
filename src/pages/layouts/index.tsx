import React, { useEffect, useMemo, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { connect, Outlet, useLocation, useNavigate, useSelector } from "umi";
import { MenuList } from "@/utils/constants";
import { Button, Layout, Menu } from "antd";
import AppHeader from "@/components/header";
import MyBreadcrumb from "@/components/breadcrumb";
const { Sider, Content } = Layout;

const LayoutPage: React.FC = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);

  const { currentRole } = useSelector((state: any) => state.userState);

  const accessMenuList = useMemo(() => {
    return MenuList.filter((menu) => menu.role.includes(currentRole));
  }, [currentRole]);

  const onMenuClick = (path: string) => {
    navigator(path);
  };

  useEffect(() => {
    const fundItem = accessMenuList.find((item) => location.pathname.includes(item.key));
    if (fundItem) {
      setCurrent(fundItem.key);
    }
  }, [navigator]);

  return (
    <Layout className="h-full">
      <AppHeader />
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ position: "relative" }}
        >
          <Menu
            mode="inline"
            items={accessMenuList}
            onSelect={(item) => {
              setCurrent(item.key);
              onMenuClick(item.key);
            }}
            selectedKeys={[current]}
          />
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: "#fff" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "#fff" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          />
        </Sider>

        <Content className="m-2  overflow-y-auto ">
          <MyBreadcrumb />
          <div className="flex-1 ">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
