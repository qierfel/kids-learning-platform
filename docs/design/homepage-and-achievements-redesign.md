# 主页改版 & 成就系统 设计方案

> 版本：v1.1 | 日期：2026-04-24 | 状态：设计已确认，待进入实施

---

## 已确认决策（2026-04-24）

| 决策点 | 结论 |
|--------|------|
| **学习时长口径** | 有效时长：触发具体学习事件（背词、完成练习、提交作文等）才计入；页面空挂不计 |
| **计划层级** | 支持学期 → 月 → 周 → 日，上层计划可逐层拆分；日计划是唯一跟进执行的层级 |
| **各科计划粒度** | 见下方"计划粒度确认表" |
| **数学** | 暂不纳入计划系统（内容产出较少）|
| **多设备数据同步** | activityLog / sessionLog / achievements 全部同步到 Cloudflare KV |
| **成就通知方式** | A+C 组合：解锁瞬间弹庆祝 Modal（有动画）；若当次未看到，下次打开主页时再次提示；所有成就可在「我的成就」页查询 |

### 计划粒度确认表

| 学科 | 模块 | 当前计量单位 | 未来扩展 |
|------|------|------------|---------|
| 英语 | SRS 词汇 | 词/天 | — |
| 英语 | 写作批改 | 篇/周 + **手动指定具体日期** | — |
| 英语 | 听力 | 分钟 | KET/PET/FCE 题库上线后：题库部分改为篇数 |
| 英语 | 阅读 | 分钟 | KET/PET/FCE 题库上线后：题库部分改为篇数 |
| 英语 | 口语 | 分钟 | — |
| 语文 | 古诗词背诵 | 首 | — |
| 语文 | 听写练习 | 道数 | — |
| 语文 | 同音字/形近字练习 | 道数 | — |
| 错题本 | 复习（跨学科）| 道数 | — |
| 数学 | — | 暂不纳入 | — |

**写作批改说明**：用户在周计划中设置"本周写 N 篇，指定在某天"，系统在该日生成日任务；当天提交批改即标记完成。`unit` 字段设计为可扩展（`"minutes" | "passages" | "count"`），KET/PET/FCE 题库上线时无需改动计划数据结构。

---

## 目录

1. [背景与目标](#1-背景与目标)
2. [现状分析](#2-现状分析)
3. [一、主页改版](#3-一主页改版)
   - [信息架构](#31-信息架构)
   - [页面布局（文字版 Wireframe）](#32-页面布局文字版-wireframe)
   - [关键用户流程](#33-关键用户流程)
4. [二、成就系统](#4-二成就系统)
   - [信息架构](#41-信息架构)
   - [页面布局（文字版 Wireframe）](#42-页面布局文字版-wireframe)
   - [关键用户流程](#43-关键用户流程)
5. [数据模型](#5-数据模型)
6. [与现有模块的对接点](#6-与现有模块的对接点)
7. [实施步骤建议](#7-实施步骤建议)
8. [可能的坑与开放问题](#8-可能的坑与开放问题)

---

## 1. 背景与目标

当前主页是学科卡片的平铺列表，缺乏对「学习过程」的感知，用户进来不知道今天该干什么、干了多少。本次改版希望将主页升级为**学习驾驶舱**，让孩子和家长一眼看清：

- 今天计划了什么 / 完成了多少
- 各学习工具（错题本、单词本、讨论、练习）的当前状态
- 坚持打卡、积累时长带来的成就感

---

## 2. 现状分析

### 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| 前端 | React 19 + React Router 7 + Vite | 无全局状态管理，组件内 useState |
| 持久化（客户端） | localStorage | session token、SRS 进度、单词本、写作历史等 |
| 持久化（服务端） | Cloudflare KV | 用户、错题、讨论帖 |
| AI | Anthropic Claude API（流式）+ OpenAI Realtime | 讨论、批改、口语 |

### 现有可聚合数据

| 功能 | 数据位置 | 可提取字段 |
|------|----------|-----------|
| 错题本 | KV `mistakes:list:{uid}` → 逐条 `mistake:{id}` | `status`（new/reviewing/mastered）、`createdAt` |
| SRS 单词（英语） | localStorage `srs_{userId}_{level}` | SM-2 进度，可算出今日已复习数 |
| 词汇速练 / 默写 | 暂无持久化，错题通过 `pending_mistakes` 进 KV | 今日完成题数无法直接读 |
| AI 练习（写作批改） | localStorage `writing_history`（最近 20 条） | 有 timestamp，可算今日提交数 |
| 讨论帖 | KV `threads:list:{uid}` → 逐条 `thread:{id}` | `updatedAt`、`messages`（含 assistant 最后回复时间） |

### 现有主页文件

```
src/pages/Home.jsx          主页组件，~200行
src/pages/Home.module.css   样式
```

---

## 3. 一、主页改版

### 3.1 信息架构

```
主页 /
├── 顶部问候语 + 日期（轻量，不占太多空间）
├── 板块 A：学习计划
│   ├── 今日计划（卡片，显示进度条）
│   ├── 本周计划（卡片，显示进度条）
│   └── [制定/修改计划] 入口
└── 板块 B：学习状态（今日快照）
    ├── 错题本  → 待复习 N 道
    ├── 问题讨论 → X 个学科有 AI 最新回复 / 今日提问 Y 条
    ├── 单词记忆 → 今日已背 N 词
    └── AI 练习  → 今日完成 N 题
```

学科入口不从主页删除，而是**收进导航栏（现有 Layout.jsx）**，或在主页下方以更紧凑的"快速入口"形式保留，不再是主视觉焦点。

---

### 3.2 页面布局（文字版 Wireframe）

```
┌─────────────────────────────────────────────────────────┐
│  🏠 快乐学习屋           [导航栏，学科下拉 + 工具链接]      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  早上好，小明！今天是 2026-04-24 周五                        │
│  ──────────────────────────────────────────             │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  📅  学习计划                        [制定/修改]   │  │
│  │                                                   │  │
│  │  今日计划：数学口算 10题 · 英语 SRS 20词 · 语文默写  │  │
│  │  ███████████░░░░░░  完成 2/3 项               67% │  │
│  │                                                   │  │
│  │  本周计划（4/24–4/30）：                           │  │
│  │  英语写作 3篇 · 数学测试 2次 · 单词 100词           │  │
│  │  ████░░░░░░░░░░░░░  完成 1/3 项               33% │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  📊  今日学习状态                                  │  │
│  │                                                   │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ │  │
│  │  │ 📕 错题本 │ │ 💬 讨论  │ │ 📖 单词  │ │🧠练习│ │  │
│  │  │ 待复习   │ │ 英语·数学 │ │ 今日已背 │ │今日完│ │  │
│  │  │  12 道   │ │ 有新回复 │ │  24 词   │ │成 8题│ │  │
│  │  │          │ │ 今日提问3│ │          │ │      │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  🏆  成就                           [查看全部 →]  │  │
│  │  连续打卡 7 天  ·  本周学习 2h 34min  ·  错题达人  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ─────────────── 快速入口 ────────────────────────────  │
│  [语文] [数学] [英语] [物理] [化学] [历史] [地理]          │
│  [错题本] [问题讨论]                                      │
└─────────────────────────────────────────────────────────┘
```

**响应式**：在手机端，板块 A/B 纵向堆叠；今日状态 4 格变 2×2 宫格。

---

### 3.3 关键用户流程

#### 流程 1：制定/修改计划

```
主页 → 点击 [制定/修改计划]
  → 打开 PlanEditor（页面或 Modal）
  │
  ├─ 选择计划类型：日计划 / 周计划
  ├─ 选择学科（多选）
  ├─ 每个学科下选具体模块（SRS 词汇 / 口算练习 / 默写……）
  ├─ 设置目标量（词数 / 题数 / 篇数）
  │
  ├─ [系统自动生成建议]（可选，Phase 2 实现）
  │   根据：错题数量、SRS 到期词数、上次练习时间，给出推荐配置
  │
  ├─ 用户确认/手动调整
  └─ [确认] → 写入计划数据 → 主页刷新进度
```

#### 流程 2：系统跟进执行情况

```
用户在各模块完成操作
  → 模块触发 "学习事件"（见第 6 节）
  → 事件写入当日 activityLog
  → 主页读取 activityLog，与 plan.items 比对，实时更新进度条
```

#### 流程 3：查看当天学习状态

```
主页加载
  → useHomeStats() hook 并发读取：
    ├─ KV mistakes:list → 过滤 status=new|reviewing → 得到待复习数
    ├─ KV threads:list → 找 lastAssistantAt > 上次用户查看时间 → 有新回复的学科
    ├─ localStorage srs_{uid}_{level} → 今日 reviewedToday
    └─ localStorage writing_history + activityLog → 今日练习数
  → 渲染状态卡片（四格）
```

---

## 4. 二、成就系统

### 4.1 信息架构

```
成就页面 /achievements
├── 学习日历（热力图 / 打卡日历）
│   └── 有使用记录的日期点亮，连续天数高亮
├── 成就勋章墙
│   ├── 坚持类：连续打卡 7/30/100 天
│   ├── 时长类：累计学习 1h/10h/50h/100h
│   ├── 错题类：掌握 50/200 道错题（状态→mastered）
│   ├── 单词类：背完 100/500/2000 词
│   └── 练习类：完成 50/200 道 AI 练习
└── 本周 / 本月统计摘要
    ├── 总学习时长
    ├── 各学科用时占比（饼图或横条图）
    └── 错题新增 vs 已掌握趋势
```

主页底部的「成就」小区块只展示最近获得的 2–3 个勋章 + 连续打卡天数，完整页面通过 `[查看全部 →]` 进入。

---

### 4.2 页面布局（文字版 Wireframe）

```
┌─────────────────────────────────────────────────────────┐
│  🏆 我的成就                                             │
│                                                         │
│  ┌── 学习日历 ─────────────────────────────────────┐    │
│  │  4月                                             │    │
│  │  Mo Tu We Th Fr Sa Su                           │    │
│  │  [·][·][●][●][●][○][○]  ← ●=有记录 ○=未来/空    │    │
│  │  [●][●][●][●][●][○][○]                          │    │
│  │  [●][●][●][●][今][  ]                           │    │
│  │                                                  │    │
│  │  连续打卡：12 天  历史最长：28 天                  │    │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌── 本月统计 ──────────────────────────────────────┐   │
│  │  总时长 8h 23min   英语 45% 数学 30% 语文 25%    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌── 勋章墙 ────────────────────────────────────────┐   │
│  │  [⭐已解锁] 初学者  – 第一次使用平台              │   │
│  │  [⭐已解锁] 坚持一周  – 连续打卡 7 天             │   │
│  │  [🔒未解锁] 坚持一月  – 连续打卡 30 天  (12/30)  │   │
│  │  [⭐已解锁] 单词达人 100  – 背完 100 词           │   │
│  │  [🔒未解锁] 单词达人 500  – 背完 500 词  (240/500)│   │
│  │  [🔒未解锁] 错题清理工  – 掌握 50 道  (23/50)    │   │
│  │  ...                                              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

### 4.3 关键用户流程

#### 流程：查看成就

```
主页 → 点击 [查看全部 →]（成就区块）或导航栏 /achievements
  → 加载 achievementsPage
  → useAchievements() hook：
    ├─ 读 activityLog（所有日期）→ 渲染日历，计算连续天数
    ├─ 读 sessionLog（每条有 start/end）→ 计算各日学习时长
    ├─ 读 KV mistakes + localStorage SRS → 计算各勋章进度
    └─ 检查勋章解锁条件 → 渲染勋章墙
```

#### 流程：打卡日历自动点亮

```
用户打开任意页面（含学科模块）
  → App.jsx 在路由变更时触发 trackSession()
  → 记录当日 date 到 activityLog（去重）
  → 记录会话开始时间到 sessionLog
用户离开页面（beforeunload / visibility change）
  → 记录会话结束时间
  → 累计当日学习时长
```

---

## 5. 数据模型

所有新增数据以 **localStorage** 为主（保持现有架构风格，不增加 KV 依赖），关键数据可按需同步到 KV。

### 5.1 学习计划 `learning_plans_{userId}`

```javascript
// localStorage key: learning_plans_{userId}
[
  {
    id: "plan_20260424_daily",
    userId: string,
    type: "daily" | "weekly",
    startDate: "2026-04-24",        // YYYY-MM-DD
    endDate: "2026-04-24",          // daily: same; weekly: +6 days
    status: "active" | "completed" | "abandoned",
    items: [
      {
        id: "item_001",
        subject: "英语",
        module: "SRS词汇",
        moduleKey: "srs",
        targetValue: 20,
        targetUnit: "词",            // "词" | "分钟" | "首" | "道" | "篇"（未来加 passages 时扩展）
        scheduledDate: null,         // YYYY-MM-DD；日计划或指定日期时填写，周/月计划留 null
        completedValue: 0,
        done: false
      },
      {
        id: "item_002",
        subject: "英语",
        module: "写作批改",
        moduleKey: "writing",
        targetValue: 1,
        targetUnit: "篇",
        scheduledDate: "2026-04-30", // 用户手动指定具体日期（写作必填）
        completedValue: 0,
        done: false
      }
    ],
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
```

**说明**：`moduleKey` 是对接现有模块的关键——各模块完成操作后，以 `moduleKey` 为索引写入 `activityLog`，主页读取时按 `moduleKey` 聚合。

---

### 5.2 活动日志 `activity_log_{userId}`

```javascript
// localStorage key: activity_log_{userId}
// 仅保留最近 90 天，超期自动清理
[
  {
    date: "2026-04-24",             // YYYY-MM-DD
    events: [
      {
        type: "srs_review",          // 事件类型（见下方枚举）
        subject: "英语",
        moduleKey: "srs",
        count: 15,                   // 本次完成量
        timestamp: 1745500000000
      },
      {
        type: "arithmetic_drill",
        subject: "数学",
        moduleKey: "arithmetic",
        count: 10,
        timestamp: 1745501000000
      },
      {
        type: "mistake_review",
        subject: "英语",
        moduleKey: "mistakes",
        count: 3,
        timestamp: 1745502000000
      },
      {
        type: "discussion_ask",
        subject: "数学",
        moduleKey: "notebook",
        count: 1,
        timestamp: 1745503000000
      },
      {
        type: "writing_submit",
        subject: "英语",
        moduleKey: "writing",
        count: 1,
        timestamp: 1745504000000
      }
    ]
  }
]
```

**事件类型枚举**（`type` 字段）：

| type | 触发时机 | 计量单位 |
|------|----------|----------|
| `srs_review` | SRS 学习完成一轮 | 词数 |
| `srs_new_word` | SRS 新词学习 | 词数 |
| `arithmetic_drill` | 口算练习完成 | 题数 |
| `dictation_session` | 默写练习完成 | 字/词数 |
| `word_quiz` | 词汇速练完成 | 题数 |
| `writing_submit` | AI写作批改提交 | 篇数 |
| `mistake_review` | 错题本标记复习/掌握 | 道数 |
| `discussion_ask` | 讨论提问 | 条数 |
| `reading_finish` | 阅读一篇完成 | 篇数 |
| `speaking_session` | 口语练习完成 | 分钟数 |

---

### 5.3 学习会话 `session_log_{userId}`

```javascript
// localStorage key: session_log_{userId}
// 用于统计学习时长；保留最近 90 天
[
  {
    date: "2026-04-24",
    sessions: [
      { start: 1745500000000, end: 1745502600000 }  // 43 min
    ],
    totalMinutes: 43   // 缓存计算结果
  }
]
```

**时长统计口径**（需 Rita 决策，见第 8 节）：记录页面 focus/blur 事件，连续 3 分钟无操作则自动结束当前 session。

---

### 5.4 成就状态 `achievements_{userId}`

```javascript
// localStorage key: achievements_{userId}
{
  unlockedIds: ["first_login", "streak_7", "words_100"],  // 已解锁勋章 ID
  notifiedIds: ["first_login", "streak_7"],               // 已弹窗通知的勋章
  streakInfo: {
    currentStreak: 12,
    longestStreak: 28,
    lastActiveDate: "2026-04-24"
  },
  totalLearningMinutes: 503
}
```

**勋章定义表**（硬编码在前端 `src/data/achievements.js`，不需要后端）：

```javascript
const ACHIEVEMENTS = [
  { id: "first_login",  label: "初学者",    condition: { type: "login_count", value: 1 } },
  { id: "streak_7",     label: "坚持一周",  condition: { type: "streak", value: 7 } },
  { id: "streak_30",    label: "坚持一月",  condition: { type: "streak", value: 30 } },
  { id: "streak_100",   label: "坚持百日",  condition: { type: "streak", value: 100 } },
  { id: "words_100",    label: "单词达人100", condition: { type: "total_words", value: 100 } },
  { id: "words_500",    label: "单词达人500", condition: { type: "total_words", value: 500 } },
  { id: "mistakes_50",  label: "错题清理工", condition: { type: "mastered_mistakes", value: 50 } },
  { id: "study_1h",     label: "学习一小时", condition: { type: "total_minutes", value: 60 } },
  { id: "study_10h",    label: "十小时勤学", condition: { type: "total_minutes", value: 600 } },
  { id: "study_50h",    label: "五十小时学霸", condition: { type: "total_minutes", value: 3000 } },
  { id: "exercises_50", label: "练习达人",  condition: { type: "total_exercises", value: 50 } },
];
```

---

### 5.5 讨论"未读 AI 回复"标记 `notebook_read_marks_{userId}`

现有 KV 中线程已有 `updatedAt`，但缺少"用户上次查看时间"。新增：

```javascript
// localStorage key: notebook_read_marks_{userId}
{
  "thread_abc123": 1745500000000,  // 用户上次打开该 thread 的时间
  "thread_def456": 1745490000000
}
```

主页读取逻辑：遍历线程列表，若 `thread.updatedAt > readMark[thread.id]` 且最后一条消息是 assistant，则标记为"有新回复"，并按学科聚合。

---

## 6. 与现有模块的对接点

### 6.1 对接原则

- **不修改现有模块的核心逻辑**，只在关键操作完成后追加一行 `logActivity(...)` 调用
- 新建 `src/utils/activityLogger.js`，统一封装写 `activity_log_{userId}` 的逻辑
- 主页通过 `src/hooks/useHomeStats.js` 聚合所有状态，不散落在 Home.jsx

### 6.2 各模块对接清单

#### 错题本（`src/pages/Mistakes.jsx`）

| 需要的数据 | 现有位置 | 对接方式 |
|-----------|----------|----------|
| 待复习数量 | KV `mistakes:list:{uid}` → 过滤 `status !== 'mastered'` | 现有 fetch 逻辑已拉取全量，主页直接复用接口或缓存结果 |
| 今日复习数 | 无 | 在 Mistakes.jsx 的 `handleStatusChange()` 内追加 `logActivity({ type: 'mistake_review', count: 1 })` |

#### 单词本 / SRS（`src/pages/english/SRSStudy.jsx`）

| 需要的数据 | 现有位置 | 对接方式 |
|-----------|----------|----------|
| 今日已背词数 | localStorage `srs_{uid}_{level}`，有 `reviewedToday` 字段 | `useHomeStats` 中遍历所有 level 的 SRS key，累加 `reviewedToday`（注意跨 level）|
| SRS 完成事件 | SRSStudy.jsx 中 `finishSession()` 或每次 review 后 | 追加 `logActivity({ type: 'srs_review', count: N })` |

> **注意**：现有 SRS localStorage key 格式为 `srs_{userId}_{level}`，其中 level 是英语分级（如 g3, g4, ket 等）。主页需要遍历已知 level 列表来聚合，或在 logActivity 中写明当日累计。

#### AI 练习（写作批改 `src/pages/english/Writing.jsx`）

| 需要的数据 | 现有位置 | 对接方式 |
|-----------|----------|----------|
| 今日提交篇数 | localStorage `writing_history`（最近 20 条，含 timestamp）| `useHomeStats` 过滤今日日期即可，无需新增埋点 |
| 今日口算/默写题数 | 无持久化 | 在 `ArithmeticDrill.jsx`、`Dictation.jsx` 完成后追加 `logActivity(...)` |

#### 问题讨论（`src/pages/Notebook.jsx`）

| 需要的数据 | 现有位置 | 对接方式 |
|-----------|----------|----------|
| 有新 AI 回复的学科 | KV `threads:list:{uid}` + 各 thread `updatedAt` | 对比 `notebook_read_marks_{uid}`（见 5.5 节） |
| 今日提问数 | KV threads，`createdAt` 或 `messages[0].time` | 过滤今日创建或今日有新 user 消息的线程 |
| 用户打开线程时更新已读标记 | Notebook.jsx 中进入线程详情时 | 追加 `updateReadMark(threadId, Date.now())` |

### 6.3 新增文件

```
src/utils/activityLogger.js   // logActivity(), getActivityForDate(), calcTodayStats()
src/utils/sessionTracker.js   // trackSession(), getTotalMinutes(), getStreakDays()
src/hooks/useHomeStats.js     // 聚合主页所需数据，返回 { plan, todayStats, achievements }
src/hooks/usePlan.js          // 计划 CRUD，对比 activityLog 更新完成度
src/data/achievements.js      // 勋章定义表（静态数据）
src/pages/Achievements.jsx    // 成就页面
src/pages/PlanEditor.jsx      // 计划制定/修改页面
src/pages/Home.jsx            // 重构（原有约 200 行，改版后约 150 行）
src/pages/Home.module.css     // 更新样式
```

---

## 7. 实施步骤建议

### Phase 1：学习状态看板（2–3 天）

**目标**：主页下半区显示今日已完成的工作，不动计划功能。

**交付内容**：
1. 新建 `src/utils/activityLogger.js`（写日志、读今日汇总）
2. 新建 `src/utils/sessionTracker.js`（记录打开/关闭时间，累计时长）
3. 在 SRSStudy、Writing（直接读 writing_history）、Mistakes、Notebook 中追加埋点
4. 新建 `src/hooks/useHomeStats.js`（聚合今日状态）
5. 改版 `Home.jsx`：下半区改为四格状态卡片，上半区保留学科入口
6. 新建 `src/pages/Achievements.jsx`：基础版，只有日历和连续打卡天数

**不做**：计划功能、勋章墙（除日历外）。

---

### Phase 2：成就系统（2–3 天）

**目标**：完整成就页面，主页顶部新增成就区块。

**交付内容**：
1. 新建 `src/data/achievements.js`（勋章定义）
2. 完善 `Achievements.jsx`：勋章墙 + 本月统计
3. 在 `sessionTracker.js` 中加入勋章解锁检测，解锁时触发通知弹窗
4. 主页底部新增成就小区块（连续天数 + 最近解锁勋章）
5. 路由加 `/achievements`

---

### Phase 3：学习计划（3–5 天，最复杂）

**目标**：完整的计划制定→执行→跟进闭环。

**交付内容**：
1. 新建 `src/pages/PlanEditor.jsx`（选学科、选模块、设目标）
2. 新建 `src/hooks/usePlan.js`（计划 CRUD，读 activityLog 更新进度）
3. 主页顶部加学习计划区块（进度条）
4. 路由加 `/plan`

**推荐 Phase 3 分两步做**：
- 3a：手动制定计划（选模块、设目标、保存）+ 主页显示进度条
- 3b：系统自动推荐计划（根据错题量、SRS 到期词数等生成建议）

---

## 8. 可能的坑与开放问题

### 8.1 已决策（存档）

| 问题 | 决策 |
|------|------|
| **学习时长口径** | ✅ 有效时长：触发具体学习事件才计，空挂不算 |
| **计划粒度** | ✅ 模块级 + 数量；写作需指定具体日期；听力/阅读统一按分钟，KET/PET/FCE 题库上线后再加篇数 |
| **计划层级** | ✅ 学期→月→周→日，支持逐层拆分 |
| **多设备同步** | ✅ activityLog / sessionLog / achievements 同步到 KV |
| **成就通知** | ✅ A+C：解锁瞬间弹 Modal，若未看到则下次打开主页再提示；所有成就在「我的成就」页可查 |
| **数学** | ✅ 暂不纳入计划系统 |

### 8.2 技术风险

| 风险 | 影响 | 缓解方式 |
|------|------|----------|
| **SRS key 遍历** | 现有 `srs_{uid}_{level}` 没有统一索引，主页需知道有哪些 level | 在 logActivity 中额外写一个 `srs_levels_{uid}` 索引，记录已使用过的 level |
| **Mistakes 数据量大** | 全量拉取 KV mistakes 用于主页统计，可能有延迟 | 新增一个 `mistakes_stats_{uid}` KV 缓存（由 mistakes-api.js 维护），只存 `{new:N, reviewing:N, mastered:N}` |
| **讨论帖"未读"逻辑复杂** | 全量拉取线程列表再本地过滤，线程多时慢 | 同上，KV 维护 `threads_unread_{uid}` 计数，在 threads.js 中更新 |
| **localStorage 容量** | 90 天 activity_log 数据量约 200–500KB，加上 session_log 可能接近 5MB 上限 | 超过 60 天的数据只保留日汇总（去掉 events 数组，只保留 totalByModule），压缩历史 |
| **计划与实际执行对比精度** | `activityLog` 记录的是"总完成量"，无法区分"这道题属于今日计划的哪一项" | Phase 3a 只做粗粒度匹配（按 moduleKey 聚合今日完成量 vs 计划目标），足够 MVP 用 |

### 8.3 依赖外部模块的假设

- **SRS 今日复习数**：当前 `srs.js` 中 `getTodayPlan()` 返回 `todayWords`，但没有"今日已完成"字段。需确认 SRSStudy.jsx 在完成一词时是否更新 localStorage，还是只在 session 结束时批量写。
- **口算练习 / 默写**：当前完成后只有错题写入 `pending_mistakes`，没有"完成题数"持久化。Phase 1 埋点时需要在 `ArithmeticDrill.jsx` 和 `Dictation.jsx` 新增计数。
- **讨论帖 AI 回复时间**：当前 thread 的 `messages` 数组存在 KV，`updatedAt` 是线程整体更新时间。主页读取最后一条 message 的 `time` 字段判断是否是今日/最近 AI 回复，需要确认 `time` 字段格式和时区。

---

## 附录：文件变更汇总

### 新增文件

```
src/utils/activityLogger.js
src/utils/sessionTracker.js
src/hooks/useHomeStats.js
src/hooks/usePlan.js
src/data/achievements.js
src/pages/Achievements.jsx
src/pages/PlanEditor.jsx
```

### 修改文件

```
src/pages/Home.jsx                     重构主页布局（三大区块）
src/pages/Home.module.css              更新样式
src/pages/english/SRSStudy.jsx         追加 logActivity 埋点
src/pages/english/Writing.jsx          （可能不需要，直接读 writing_history）
src/pages/math/ArithmeticDrill.jsx     追加 logActivity 埋点
src/pages/chinese/Dictation.jsx        追加 logActivity 埋点
src/pages/Mistakes.jsx                 追加 logActivity 埋点 + mistakes_stats 缓存
src/pages/Notebook.jsx                 追加 updateReadMark + logActivity 埋点
src/components/Layout.jsx              导航栏加成就入口 /achievements
src/App.jsx                            新增路由 /achievements, /plan
```

### 新增后端接口（可选，Phase 2+）

```
functions/api/stats.js        mistakes_stats 缓存的读写
functions/api/activity-sync.js  activityLog 云端备份（解决多设备问题）
```
