import { Navigate, Outlet, useSelectedRoutes, useSelector } from "umi";

export default () => {
  const { user, currentRole } = useSelector((s: any) => s.userState);
  const matches = useSelectedRoutes() as any[];
  const lastMatch = matches[matches.length - 1];
  const meta = lastMatch?.route?.meta;
  const roleList = meta?.roleList || []

  if (!user) return <Navigate to="/auth" />;
  // 如果需要基于 meta.roleList 做鉴权：
  if (roleList.length && !roleList.includes(currentRole)) {
    return <Navigate to="/403" />;
  }
  return <Outlet />;
};
