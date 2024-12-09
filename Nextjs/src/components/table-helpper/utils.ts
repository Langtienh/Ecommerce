// obj to array number if true
export function getIndexSelectedRow(rowSelection: Object) {
  return Object.keys(rowSelection).map(Number)
}

export function getSelectedRow<T>(rowSelection: Object, data: T[]) {
  const indexs = getIndexSelectedRow(rowSelection)
  return indexs.map((index) => data[index])
}
