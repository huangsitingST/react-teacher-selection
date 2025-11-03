export default function Status401() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '72px', margin: '0', color: '#ff4d4f' }}>403</h1>
      <h2 style={{ margin: '20px 0', color: '#666' }}>未授权访问</h2>
      <p style={{ color: '#999', marginBottom: '30px' }}>
        抱歉，您没有权限访问此页面
      </p>
    </div>
  );
}
