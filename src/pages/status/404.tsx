export default function Status404() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '72px', margin: '0', color: '#1890ff' }}>404</h1>
      <h2 style={{ margin: '20px 0', color: '#666' }}>页面未找到</h2>
      <p style={{ color: '#999', marginBottom: '30px' }}>
        抱歉，您访问的页面不存在或已被删除
      </p>
    </div>
  );
}
