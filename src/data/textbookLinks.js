// 电子课本网（dzkbw.com）— 免登录、免费在线查看
// URL 从 dzkbw.com 目录页抓取，2026-04-12 更新

const BASE = 'http://www.dzkbw.com/books'

export const TEXTBOOK_LINKS = {
  '语文': {
    publisher: '统编版',
    books: [
      { grade: 1, semester: '上', url: `${BASE}/rjb/yuwen/xs1s_2024/` },
      { grade: 1, semester: '下', url: `${BASE}/rjb/yuwen/xs1x_2025/` },
      { grade: 2, semester: '上', url: `${BASE}/rjb/yuwen/xs2s_2025/` },
      { grade: 2, semester: '下', url: `${BASE}/rjb/yuwen/xs2x_2026/` },
      { grade: 3, semester: '上', url: `${BASE}/rjb/yuwen/xs3s_2025/` },
      { grade: 3, semester: '下', url: `${BASE}/rjb/yuwen/xs3x_2026/` },
      { grade: 4, semester: '上', url: `${BASE}/rjb/yuwen/xs4s_2019/` },
      { grade: 4, semester: '下', url: `${BASE}/rjb/yuwen/xs4x_2019/` },
      { grade: 5, semester: '上', url: `${BASE}/rjb/yuwen/xs5s_2019/` },
      { grade: 5, semester: '下', url: `${BASE}/rjb/yuwen/xs5x_2019/` },
      { grade: 6, semester: '上', url: `${BASE}/rjb/yuwen/xs6s_2019/` },
      { grade: 6, semester: '下', url: `${BASE}/rjb/yuwen/xs6x_2019/` },
    ],
  },
  '数学': {
    publisher: '苏教版',
    books: [
      { grade: 1, semester: '上', url: `${BASE}/sjb/shuxue/xs1s_2024/` },
      { grade: 1, semester: '下', url: `${BASE}/sjb/shuxue/xs1x_2025/` },
      { grade: 2, semester: '上', url: `${BASE}/sjb/shuxue/xs2s_2025/` },
      { grade: 2, semester: '下', url: `${BASE}/sjb/shuxue/xs2x_2026/` },
      { grade: 3, semester: '上', url: `${BASE}/sjb/shuxue/xs3s_2025/` },
      { grade: 3, semester: '下', url: `${BASE}/sjb/shuxue/xs3x_2026/` },
      { grade: 4, semester: '上', url: `${BASE}/sjb/shuxue/xs4s/` },
      { grade: 4, semester: '下', url: `${BASE}/sjb/shuxue/xs4x/` },
      { grade: 5, semester: '上', url: `${BASE}/sjb/shuxue/xs5s/` },
      { grade: 5, semester: '下', url: `${BASE}/sjb/shuxue/xs5x/` },
      { grade: 6, semester: '上', url: `${BASE}/sjb/shuxue/xs6s/` },
      { grade: 6, semester: '下', url: `${BASE}/sjb/shuxue/xs6x/` },
    ],
  },
  '英语': {
    publisher: '译林版（三年级起点）',
    books: [
      { grade: 3, semester: '上', url: `${BASE}/yilin/yingyu/3a_2024/` },
      { grade: 3, semester: '下', url: `${BASE}/yilin/yingyu/3b_2025/` },
      { grade: 4, semester: '上', url: `${BASE}/yilin/yingyu/4a_2025/` },
      { grade: 4, semester: '下', url: `${BASE}/yilin/yingyu/4b_2026/` },
      { grade: 5, semester: '上', url: `${BASE}/yilin/yingyu/5a/` },
      { grade: 5, semester: '下', url: `${BASE}/yilin/yingyu/5b/` },
      { grade: 6, semester: '上', url: `${BASE}/yilin/yingyu/6a/` },
      { grade: 6, semester: '下', url: `${BASE}/yilin/yingyu/6b/` },
    ],
  },
}

export default TEXTBOOK_LINKS
