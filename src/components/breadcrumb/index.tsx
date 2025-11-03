import React from "react";
import { Breadcrumb } from "antd";
import { useSelectedRoutes, useSelector } from "umi";


const MyBreadcrumb: React.FC = () => {
  const { currentRole } = useSelector((state: any) => state.userState);
  const matches = useSelectedRoutes();

  const realRoutes = matches.filter((m: any) => {
    const name = m.route?.name as string;
    const roleList = m.route?.meta?.roleList as number[];
    return name && (roleList?.length > 0 ? roleList.includes(currentRole) : true);
  });

  const items = realRoutes.map((m, idx, arr) => {
    const isLast = idx === arr.length - 1;
    const title = (m as any).route.name as string;
    const href = (m as any).pathname as string;
    return isLast ? { title } : { title, href };
  });
console.log(matches);

  if (!items.length) return null;
  return (
    <div className="rounded-lg h-min p-4 bg-white w-full mb-6">
      <Breadcrumb items={items} />
    </div>
  );
};

export default MyBreadcrumb;
