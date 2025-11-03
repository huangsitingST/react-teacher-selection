import React from "react";
import { useSelector } from "umi";
import { Button, Select, Form, Input } from "antd";
import { ISubject } from "@/models/userState";
import { ISearch, Sex } from "./type";

interface IProps {
  onFinish: (values: ISearch) => void;
}
const ExamForm: React.FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const subjectMap = useSelector((state: any) => state.userState.subjectMap);

  const onFinish = async (values: ISearch) => {
    props.onFinish(values);
  };

  return (
    <Form
      form={form}
      name="horizontal_exam_form"
      layout="inline"
      onFinish={onFinish}
      className="flex flex-wrap gap-3"
    >
      <Form.Item
        name="name"
        label="姓名"
        rules={[{ message: "请输入姓名搜索" }]}
      >
        <Input placeholder="请输入姓名搜索" />
      </Form.Item>
      <Form.Item name="sex" label="性别" rules={[{ message: "请选择性别" }]}>
        <Select
          placeholder="请选择性别"
          options={[
            { label: "男", value: Sex.MALE },
            { label: "女", value: Sex.FEMALE },
          ]}
          style={{ width: 120 }}
        />
      </Form.Item>
      <Form.Item
        name="schoolName"
        label="学校名称"
        rules={[{ message: "请输入学校名称搜索" }]}
      >
        <Input placeholder="请输入学校名称搜索" />
      </Form.Item>
      <Form.Item
        name="subjectCode"
        label="科目"
        rules={[{ message: "请选择科目" }]}
      >
        <Select style={{ width: 120 }} placeholder="请选择科目">
          {subjectMap.map((item: ISubject) => {
            return (
              <Select.Option key={item.subject_code} value={item.subject_code}>
                {item.subject_name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExamForm;
