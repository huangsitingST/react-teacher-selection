import React from "react";
import { Tabs } from "antd";
import { useState, useMemo } from "react";
import styles from "./index.modules.less";
import type { TabsProps } from "antd";
import Chart1 from "./components/Chart1";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "获奖人数比例",
  },
  {
    key: "2",
    label: "申报人数比例",
  },
  {
    key: "3",
    label: "各年获奖情况",
  },
];

const WorkStoragePage: React.FC = () => {
  const [activeKey, setActiveKey] = useState(items[0].key);
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const CurrentActiveComponent = useMemo(() => {
    switch (activeKey) {
      case items[0].key:
        return <Chart1 />;
      case items[1].key:
        return <div>申报人数比例</div>;
      case items[2].key:
        return <div>各年获奖情况</div>;
      default:
        return ;
    }
  }, [activeKey]);
  return (
    <div className={styles.workStoragePage}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {CurrentActiveComponent}
    </div>
  );
};

export default WorkStoragePage;
