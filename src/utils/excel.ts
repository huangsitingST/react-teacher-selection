import ExcelJS from 'exceljs'
export const exportExcel = async (
  column: { dataIndex: string; title: string; width?: number }[],
  data: any[],
  fileName: string,
  format: string
) => {
  // 创建工作簿
  const workbook = new ExcelJS.Workbook()
  // 设置工作簿属性
  workbook.creator = 'dsl'
  workbook.created = new Date()
  workbook.modified = new Date()
  workbook.title = fileName

  // 添加工作表
  const sheet = workbook.addWorksheet(fileName, {
    properties: {
      defaultColWidth: 20
    }
  })

  // 设置表头
  const headers = column.map(item => {
    return {
      header: item.title,
      key: item.dataIndex,
    }
  })

  sheet.columns = headers

  sheet.columns.forEach((_,  index) => {
    sheet.getColumn(index + 1).alignment = {
      horizontal: 'left',
      vertical: 'middle',
      wrapText: true
    }
  });

  sheet.columns.forEach((_, index) => {
    sheet.getColumn(index + 1).width = column[index].width || 30
  })
  // 设置行数据
  const rowData = data.map((item, index) => {
    return {
      ...item,
      id: index + 1
    }
  })

  sheet.addRows(rowData)

  const uint8Array = await workbook.xlsx.writeBuffer()
  const blob = new Blob([uint8Array], { type: 'application/octet-binary' })

  const link = document.createElement('a') // a标签下载
  link.href = window.URL.createObjectURL(blob) // href属性指定下载链接
  link.download = fileName + '.' + format // dowload属性指定文件名
  link.click() // click()事件触发下载
  window.URL.revokeObjectURL(link.href) // 释放内存
}

export const exportExcelWithMuitiHeader = async (
  column: { dataIndex: string; title: string }[],
  data: any[],
  fileName: string,
  format: string
) => {
  // 创建工作簿
  const workbook = new ExcelJS.Workbook()
  // 设置工作簿属性
  workbook.creator = 'huang'
  workbook.created = new Date()
  workbook.modified = new Date()
  workbook.title = fileName

  // 添加工作表
  const sheet = workbook.addWorksheet(fileName, {
    properties: {
      defaultColWidth: 24
    }
  })

  // 设置表头
  const headers = column.map(item => {
    return {
      header: item.title,
      key: item.dataIndex,
      with: 100
    }
  })
  sheet.columns = headers

  // 重设表头值
  sheet.getCell('C1').value = '个人信息'
  sheet.getCell('C2').value = '地址'
  sheet.getCell('D2').value = '邮箱'
  sheet.getCell('E2').value = '日期'

  // 合并表头
  sheet.mergeCells('A1:A2')
  sheet.mergeCells('B1:B2')
  sheet.mergeCells('C1:E1')
  sheet.mergeCells('F1:F2')

  // 设置行数据
  sheet.addRows(data)

  const uint8Array = await workbook.xlsx.writeBuffer()
  const blob = new Blob([uint8Array], { type: 'application/octet-binary' })

  const link = document.createElement('a') // a标签下载
  link.href = window.URL.createObjectURL(blob) // href属性指定下载链接
  link.download = fileName + '.' + format // dowload属性指定文件名
  link.click() // click()事件触发下载
  window.URL.revokeObjectURL(link.href) // 释放内存
}
