import React from "react";
import { Card, Row, Col, Button } from "antd";
import { useNavigate, useSelector, useDispatch } from "umi";
import { RoleEnum } from "@/utils/constants";
import Parent from "./learn/Parent";

const ChoiceAccessPage: React.FC = () => {
  const { currentRole, user } = useSelector((state: any) => state.userState);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleEnterWorkbench = (role: number) => {
    dispatch({
      type: "userState/setCurrentRole",
      payload: role,
    });
    switch (role) {
      case RoleEnum.教师:
        navigator("/workbench/teacherHome");
        break;
      default:
        navigator("/workbench");
        break;
    }
  };
  return (
    <>
      <Parent />

      <div className="flex justify-center items-center h-full çw-full">
        <Row gutter={20}>
          {user.userRoles.map((role: number) => (
            <Col key={role}>
              <Card title={RoleEnum[role]}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleEnterWorkbench(role)}
                >
                  点击进入工作台
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ChoiceAccessPage;
