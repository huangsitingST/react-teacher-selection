import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import { IIndicator } from "../type";
import {  Form, Select } from "antd";

interface IndicatorFormProps {
  indicatorList: IIndicator[];
}
interface IndicatorFormParams {
  indicatorId: number;
  indicatorChildId: number;
  fileUrl: string;
}

export type IndicatorFormHandle = {
  getFormValues: () => Promise<IndicatorFormParams>;
};

const IndicatorForm = forwardRef<IndicatorFormHandle, IndicatorFormProps>((props, ref) => {
  const [form] = Form.useForm<IndicatorFormParams>();
  const indicatorId = Form.useWatch("indicatorId", form);

  const indicatorChildList = useMemo(() => {
    return props.indicatorList.find(
      (indicator) => indicator.indicatorId === indicatorId
    )?.children;
  }, [indicatorId, props.indicatorList]);

  useEffect(() => {
    // 当一级指标变化时，清空二级指标的选中值
    form.setFieldValue("indicatorChildId", null);
  }, [indicatorId]);

  useImperativeHandle(ref, () => ({
    getFormValues: async () => await getFormValues(),
  }));

  const getFormValues = async () => {
    return form
      .validateFields()
      .then((values) => {
        return values as IndicatorFormParams;
      })
  };


  return (
    <Form
      name="indicator-form"
      layout="horizontal"
      form={form}
    >
      <Form.Item<IndicatorFormParams["indicatorId"]>
        layout="vertical"
        label="一级指标"
        name="indicatorId"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="select"
          options={props.indicatorList.map((indicator) => ({
            value: indicator.indicatorId,
            label: indicator.indicatorName,
          }))}
        />
      </Form.Item>
      <Form.Item<IndicatorFormParams["indicatorChildId"]>
        layout="vertical"
        label="二级指标"
        name="indicatorChildId"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="select"
          options={indicatorChildList?.map((child) => ({
            value: child.indicatorId,
            label: child.indicatorName,
          }))}
        />
      </Form.Item>

    </Form>
  );
});

export default IndicatorForm;
