import AppHeader from "@/components/header";
import { useSearchParams, useNavigate } from "umi";
import { useEffect, useMemo, useState, createRef, useRef } from "react";
import { getActivityInfo } from "@/services/user/UserController";
import { IActivityInfo } from "./type";
import styles from "./apply.module.less";
import { Card, Spin, Button, message } from "antd";
import IndicatorForm, { IndicatorFormHandle } from "./components/indicatorForm";

type IndicatorFormRef = React.RefObject<IndicatorFormHandle>;

const ApplyPage: React.FC = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [activityInfo, setActivityInfo] = useState<IActivityInfo>({
    activity_id: 0,
    activity_name: "",
    description: "",
    url: "",
    indicatorList: [],
  });
  const [forms, setForms] = useState<IndicatorFormRef[]>([
    createRef<IndicatorFormHandle>(),
  ]);

  const addForm = () => {
    setForms((prev) => [...prev, createRef<IndicatorFormHandle>()]);
  };
  const deleteForm = (index: number) => {
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      Promise.all(
        forms.map((form) => form.current?.getFormValues())
      ).then((valuesList: any[]) => {
        message.success({
          content: "提交指标信息成功",
          duration: 1,
        }).then(() => {
          navigator("/workbench/teacherHome"); // TODO: 提交指标信息
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getActivityInfoRequest = async () => {
    const activityId = searchParams.get("activityId") || "";
    if (!activityId) {
      return;
    }
    setLoading(true);
    const res = await getActivityInfo({
      activity_id: activityId,
    });
    setActivityInfo(res);
    setLoading(false);
  };
  const showFileName = useMemo(() => {
    return activityInfo.url.split("/").pop();
  }, [activityInfo.url]);
  useEffect(() => {
    getActivityInfoRequest();
  }, []);

  return (
    <div>
      <AppHeader />
      <Spin spinning={loading}>
        <main className={styles.container}>
          <Card title="活动信息" size="small">
            <div>{activityInfo.activity_name}</div>
            <div>
              <a href={activityInfo.url} target="_blank">
                {showFileName}
              </a>
            </div>
          </Card>
          {forms.map((ref: IndicatorFormRef, index: number) => (
            <Card title="指标信息" size="small"  key={index}>
              <div>
                {index > 0 && (
                  <div className="flex justify-end">
                    {" "}
                    <Button type="link" onClick={() => deleteForm(index)}>
                      删除
                    </Button>
                  </div>
                )}
                <IndicatorForm
                 
                  ref={ref}
                  indicatorList={activityInfo.indicatorList}
                />
              </div>
            </Card>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button onClick={addForm}>新增一项</Button>
            <Button type="primary" onClick={handleSubmit}>
              提交
            </Button>
          </div>
        </main>
      </Spin>
    </div>
  );
};

export default ApplyPage;
