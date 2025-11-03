import { useEffect, useState } from "react";
import ExamForm from "./ExamForm";
import { ISearch, Sex } from "./type";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getExamineList } from "@/services/user/UserController";
import { IExamineListParams } from "@/services/user/user.types";
import { history } from "umi";
import ExamTab from "./ExamTab";
import { exportExcel } from "@/utils/excel";
import { Icon } from 'umi';
const { Column } = Table;

const toDetail = (record: IDataType) => {
  history.push({
    pathname: "/workbench/examine/examDetail",
    search: `user_id=${record.user_id}`,
  });
};
interface IDataType {
  key: React.Key;
  user_name: string;
  school_name: number;
  status: string;
  identity_card: string;
  final_score: number;
  user_id: string;
}
const columns: ColumnsType<IDataType> = [
  {
    title: "姓名",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
  },
  {
    title: "学校名称",
    dataIndex: "school_name",
    key: "school_name",
    align: "center",
  },
  {
    title: "身份证号",
    dataIndex: "identity_card",
    key: "identity_card",
    align: "center",
  },
  {
    title: "最终得分",
    dataIndex: "final_score",
    key: "final_score",
    align: "center",
  },
  {
    title: "用户ID",
    dataIndex: "user_id",
    key: "user_id",
    align: "center",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: () => {
      return 1;
    },
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record: IDataType) => (
      <Space size="middle">
        <Button type="link" onClick={() => toDetail(record)}>
          查看详情
        </Button>
      </Space>
    ),
    align: "center",
  },
];


const ExaminePage: React.FC = () => {
  const [data, setData] = useState<IDataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pageInfo, setPageInfo] = useState({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  });

  const getSearchData = async (searchParam?: ISearch) => {
    let param: IExamineListParams;
    param = {
      page: pageInfo.pageIndex,
      limit: pageInfo.pageSize,
      user_name: searchParam?.name,
      subject_code: searchParam?.subjectCode,
      school_id: "",
      status: 0,
      user_sex: searchParam?.sex === Sex.MALE ? 1 : 2,
    };
    const response = await getExamineList(param);
    setData(
      (response.data.list || []).map((item: any, index: number) => ({
        key: index,
        user_name: item.user_name,
        school_name: item.school_name,
        status: item.status,
        identity_card: item.identity_card,
        final_score: item.final_score,
        user_id: item.user_id,
      }))
    );
    setPageInfo({
      ...pageInfo,
      total: response.data.total,
    });
  };

  const onExport = () => {
    console.log(selectedRowKeys);
    const exportData = data.filter((item: IDataType) =>
      selectedRowKeys.includes(item.key)
    );

    let dataColumn: any[] = columns
      .slice(0, columns.length - 1)
      .map((item: any) => ({
        title: item.title,
        dataIndex: item.dataIndex,
      }));
    console.log(dataColumn, exportData);
    exportExcel(dataColumn, exportData, '表格', 'xlsx')
  };
  useEffect(() => {
    getSearchData();
  }, []);

  const changeTab = (key: string) => {
    console.log(key);

    // onExport(data);
  };

  return (
    <div className=" w-full">
      <Icon icon="fa-solid:angle-double-right" width="20" height="20" />
      <div className="rounded-lg h-min p-4 bg-white w-full mb-6">
        <ExamForm onFinish={getSearchData} />
      </div>

      <div className="rounded-lg h-min p-4 bg-white w-full">
        <Button type="primary" onClick={onExport}>
          导出
        </Button>
        <ExamTab changeTab={changeTab} />
        <Table
          columns={columns}
          dataSource={data}
          pagination={pageInfo}
          bordered
          scroll={{ x: 800 }}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys);
            },
          }}
        >
          <Column
            title="Action"
            key="action"
            render={(_: any, record: IDataType) => JSON.stringify(record)}
          />
        </Table>
      </div>
    </div>
  );
};

export default ExaminePage;
