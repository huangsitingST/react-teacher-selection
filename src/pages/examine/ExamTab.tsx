import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "全部申报",
  },
  {
    key: "2",
    label: "待审核",
  },
  {
    key: "3",
    label: "已审核",
  },
];

interface IProps {
  changeTab: (key: string) => void;
}
const ExamTab: React.FC<IProps> = (props: IProps) => {
  const { changeTab } = props;
  return (
    <Tabs defaultActiveKey={items[0].key} items={items} onChange={changeTab} />
  );
};

export default ExamTab;
