// 教育部「国家中小学智慧教育平台」官方电子教材 contentId 映射
// 数据来源：https://s-file-1.ykt.cbern.com.cn/zxx/ndrs/resources/tch_material/part_*.json
// 拉取时间：2026-04-12
// 注意：首次使用需免费注册 https://basic.smartedu.cn

function url(id) {
  return `https://basic.smartedu.cn/tchMaterial/detail?contentType=assets_document&contentId=${id}&catalogType=tchMaterial&subCatalog=tchMaterial`
}

export const TEXTBOOK_LINKS = {
  '语文': {
    publisher: '统编版',
    books: [
      { grade: 1, semester: '上', url: url('1c73b348-e8b6-47d6-84b0-6dbacbe28268') },
      { grade: 1, semester: '下', url: url('b87e153f-a64c-451a-aa6c-6ed9ac7d6821') },
      { grade: 2, semester: '上', url: url('2ce8f153-7bff-4c97-b6db-9aac414fea19') },
      { grade: 2, semester: '下', url: url('0f93b83e-b3c2-4a5d-8acd-ea460ab962d4') },
      { grade: 3, semester: '上', url: url('837f368e-fd4e-404a-ae3f-342d75bc0227') },
      { grade: 3, semester: '下', url: url('8e107655-5128-451f-84e5-d158725c537b') },
      { grade: 4, semester: '上', url: url('5cd7e623-5c38-4602-871a-3fba8a551db2') },
      { grade: 4, semester: '下', url: url('53d6315e-5f90-42c4-904f-2d4e95fe99ed') },
      { grade: 5, semester: '上', url: url('aabf2e4a-3ceb-4e86-8804-22c10223cc57') },
      { grade: 5, semester: '下', url: url('98172dc9-8fba-4da6-9fae-6a3d1166f038') },
      { grade: 6, semester: '上', url: url('2e3dc199-9c42-486b-bbee-7731bd0ee227') },
      { grade: 6, semester: '下', url: url('06422d77-21f1-45c3-b409-fa2947eee424') },
    ],
  },
  '数学': {
    publisher: '苏教版',
    books: [
      { grade: 1, semester: '上', url: url('932af069-bc0a-41b7-aa94-1eaff1c99323') },
      { grade: 1, semester: '下', url: url('e62ac75c-971b-4487-bbb3-ba6b5014172b') },
      { grade: 2, semester: '上', url: url('d9874022-3a12-40d0-88be-db1692079535') },
      { grade: 2, semester: '下', url: url('da861684-c034-4000-973d-d3f26120bdfd') },
      { grade: 3, semester: '上', url: url('c0cc18a9-e27d-40ab-96dd-b9236e19080c') },
      { grade: 3, semester: '下', url: url('5f8e164a-5510-466f-b58b-4728edd09eb2') },
      { grade: 4, semester: '上', url: url('07c75bda-7fff-4c4b-a271-9be638af37de') },
      { grade: 4, semester: '下', url: url('27458ba8-dbf1-4860-a6cc-a0571756292d') },
      { grade: 5, semester: '上', url: url('92406f69-3b1b-404a-82c8-95adecae875f') },
      { grade: 5, semester: '下', url: url('14d4c93e-0a6a-4e2f-8b7a-24f0be4c64fc') },
      { grade: 6, semester: '上', url: url('b75ce244-1cf7-4ae7-b256-c6036e4d83e5') },
      { grade: 6, semester: '下', url: url('5ed4f298-793d-4502-a4e3-f53bbf493deb') },
    ],
  },
  '英语': {
    publisher: '译林版（三年级起点）',
    books: [
      { grade: 3, semester: '上', url: url('1206a3aa-1969-9e64-b354-e6eae4325ed4') },
      { grade: 3, semester: '下', url: url('d87e8865-615a-4b3b-8d34-179b9fb33013') },
      { grade: 4, semester: '上', url: url('a9ce6662-f5a5-4561-944a-c3dbcc5a8192') },
      { grade: 4, semester: '下', url: url('a4fb0c8b-ebd6-4db9-bca0-705fca8126e4') },
      { grade: 5, semester: '上', url: url('06631d69-0865-4694-baf9-dccf22bff2fd') },
      { grade: 5, semester: '下', url: url('d3324da8-fe96-4a0d-9259-e60794e27491') },
      { grade: 6, semester: '上', url: url('32d2e60a-be5a-4c1c-92d6-8b99e00f6db3') },
      { grade: 6, semester: '下', url: url('2b63b996-3f8c-439a-bb0c-3f127c9507af') },
    ],
  },
}

export default TEXTBOOK_LINKS
