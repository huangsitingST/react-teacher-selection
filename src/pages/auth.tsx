import { useEffect, useState } from "react";
import { useNavigate, useDispatch } from "umi";
import { IUser } from "@/services/user/user.types";
import { Card, Alert, Typography, Button, Space, Spin } from "antd";
import { getSubjectList, getUserInfo } from "../services/user/UserController";

const { Title, Text } = Typography;

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const initUserInfo = async () => {
      // 获取用户信息
    const userInfo: IUser = await getUserInfo();
    dispatch({
      type: "userState/setUserInfo",
      payload: userInfo,
    });

    const response = await getSubjectList();
    const subjectList = response.data.subject_list;
    
    dispatch({
      type: "userState/setSubjectMap",
      payload: subjectList,
    });
  };
  const initData = async () => {
    try {
      await initUserInfo();
      // 保存用户信息到全局状态
      setLoading(false);
      setIsValid(true);
      setTimeout(() => {
        navigate("/choiceAccess");
      }, 1000);

      // 跳转到根目录
    } catch (error) {
      setLoading(false);
      setIsValid(false);
      setTimeout(() => {
        navigate("/401");
      }, 1000);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  useEffect(() => {
    initData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Spin size="large" />
        <Text style={{ marginTop: "16px" }}>正在验证认证信息...</Text>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "500px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
          用户认证
        </Title>

        {isValid ? (
          <Alert
            message="认证成功"
            description={
              <div>
                <p>正在跳转到首页...</p>
              </div>
            }
            type="success"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        ) : (
          <Alert
            message="认证失败"
            description={
              <div>
                <p>认证失败，请重新认证。</p>
              </div>
            }
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}

        <Space style={{ width: "100%", justifyContent: "center" }}>
          <Button type="primary" onClick={handleRetry}>
            重新验证
          </Button>
          <Button onClick={() => navigate("/")}>返回首页</Button>
        </Space>
      </Card>
    </div>
  );
};

export default AuthPage;
