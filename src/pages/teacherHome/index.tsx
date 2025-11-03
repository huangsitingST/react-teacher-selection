import styles from "./index.module.less";
import { Button } from "antd";
import { useNavigate } from "umi";

const TeacherHome: React.FC = () => {
  const navigate = useNavigate();
  const toApply = () => {
    navigate("/apply?activityId=" + 86);
  };
  return (
    <div className={styles.teacherHome}>
      <Button type="primary" onClick={toApply}>
        点击申请
      </Button>
    </div>
  );
};

export default TeacherHome;
