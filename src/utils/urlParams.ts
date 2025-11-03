/**
 * 从URL中获取查询参数
 * @param paramName 参数名称
 * @returns 参数值或null
 */
export function getUrlParam(paramName: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

/**
 * 从URL中获取userId和token
 * @returns 包含userId和token的对象
 */
export function getAuthParams(): { userId: string | null; token: string | null } {
  return {
    userId: getUrlParam('userId'),
    token: getUrlParam('token')
  };
}

