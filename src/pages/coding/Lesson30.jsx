import { useState } from 'react'
import LessonNewStructure, { InfoCard, SectionTitle, AiCallButton, AiResult, OutputCard } from './LessonNewStructure'
import PromptCompareLab from './PromptCompareLab'

const accent = '#6366f1'

const COMPARE_PROMPTS = [
  {
    id: 'vague',
    label: '模糊的问法（Claude 扮演"懒老师"）',
    text: '帮我做个网页',
    tone: 'weak',
  },
  {
    id: 'medium',
    label: '普通的问法（Claude 扮演"普通老师"）',
    text: '我想做一个介绍自己爱好的网页，先做什么？',
    tone: 'medium',
  },
  {
    id: 'good',
    label: '清晰的问法（Claude 扮演"好老师"）',
    text: '我是10岁的初学者，想用HTML做一个介绍我爱好的网页。我会一点点HTML。请只告诉我最重要的第一步，用简单的话解释，不要写代码。',
    tone: 'strong',
  },
]

const PREFERENCE_OPTIONS = [
  { id: 'A', label: '喜欢直接给代码的老师', emoji: '💻' },
  { id: 'B', label: '喜欢先解释思路的老师', emoji: '🧠' },
  { id: 'C', label: '喜欢用比喻和故事说话的老师', emoji: '📖' },
  { id: 'D', label: '喜欢简短直接、不废话的老师', emoji: '⚡' },
]

export default function Lesson30({ onBack }) {
  const [preferChoice, setPreferChoice] = useState(null)
  const [preferReason, setPreferReason] = useState('')
  const [cardSaved, setCardSaved] = useState(false)

  function saveCard() {
    if (!preferChoice) return
    const choice = PREFERENCE_OPTIONS.find(o => o.id === preferChoice)
    const card = { choice: choice?.label, reason: preferReason, date: new Date().toLocaleDateString('zh-CN') }
    localStorage.setItem('l30_ai_preference', JSON.stringify(card))
    setCardSaved(true)
  }

  const sections = [
    /* 0. 今天做什么 */
    <div>
      <InfoCard accent={accent}>
        <h3 style={{ color: accent, margin: '0 0 8px' }}>🎯 今天，你要当一回评委</h3>
        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 14, color: '#cbd5e1' }}>
          你会向 AI 提同一个问题，但用 <strong style={{ color: '#f8fafc' }}>3 种不同的方式</strong> 提问，看看 AI 的回答有什么差别。
          最后，你来评判：哪种问法最有用？哪种适合初学者？
        </p>
      </InfoCard>
      <SectionTitle accent={accent}>📋 今天的流程</SectionTitle>
      {[
        '用 3 种提示词问 AI "我想做一个介绍爱好的网页"',
        '比较 3 个回答：清晰度、适合程度、内容多少',
        '填一张"我喜欢哪种 AI 老师风格"的选择卡',
        '挑战：换一个问题，自己试另外两种问法',
      ].map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'rgba(15,23,42,0.5)', borderRadius: 10, marginBottom: 8 }}>
          <span style={{ color: accent, fontWeight: 800, fontSize: 18, minWidth: 24 }}>{i + 1}</span>
          <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{step}</span>
        </div>
      ))}
    </div>,

    /* 1. 你会学到什么 */
    <div>
      <SectionTitle accent={accent}>🧠 本课三件事</SectionTitle>
      {[
        { emoji: '🔍', title: 'AI 的回答风格不一样', body: '同一个 AI，问法不同，回答完全不同。清晰的问题 = 好的答案。' },
        { emoji: '🎯', title: '选"适合你"的回答，不是最复杂的', body: '不是越长越好。对初学者来说，"只给第一步"往往比"给完整代码"更有用。' },
        { emoji: '✨', title: '提示词是有技术含量的', body: '这节课的核心发现：你怎么问，直接决定你得到什么。这就是"提示词工程"的起点。' },
      ].map(item => (
        <div key={item.title} style={{
          display: 'flex', gap: 14, padding: '14px', background: 'rgba(15,23,42,0.5)',
          borderRadius: 12, marginBottom: 10, border: `1px solid ${accent}20`,
        }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{item.body}</div>
          </div>
        </div>
      ))}
      <InfoCard accent="#f59e0b">
        <p style={{ margin: 0, fontSize: 13, color: '#fef3c7', lineHeight: 1.7 }}>
          💡 <strong>顺便认识一个词</strong>：今天你用的就叫 <strong>Prompt（提示词）</strong>。
          全世界的工程师都在研究怎么写更好的 Prompt，这是真实世界里的热门技能。
        </p>
      </InfoCard>
    </div>,

    /* 2. 先看一个例子 */
    <div>
      <SectionTitle accent={accent}>👀 先看看：同一个问题，3种问法有多大区别</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { label: '❌ 太模糊', prompt: '"帮我做个网页"', result: 'AI 不知道你要什么风格、什么内容、用什么技术——可能给你一堆你用不上的代码。', bg: '#fef2f2', border: '#f87171', textColor: '#7f1d1d' },
          { label: '⚠️ 一般', prompt: '"我想做一个介绍自己爱好的网页，先做什么？"', result: 'AI 知道你的目标，会给你一些步骤，但不知道你的水平，可能建议太超前。', bg: '#fffbeb', border: '#fde68a', textColor: '#78350f' },
          { label: '✅ 清晰', prompt: '"我是10岁初学者，只会一点HTML，想做爱好介绍页。只告诉我第一步，用简单话。"', result: 'AI 知道你的背景、目标和期望，给你量身定制的第一步指导。', bg: '#f0fdf4', border: '#86efac', textColor: '#14532d' },
        ].map(item => (
          <div key={item.label} style={{
            background: item.bg, border: `1.5px solid ${item.border}`,
            borderRadius: 12, padding: '14px',
          }}>
            <div style={{ fontWeight: 700, color: item.textColor, marginBottom: 8 }}>{item.label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, background: 'rgba(255,255,255,0.8)', borderRadius: 6, padding: '6px 10px', marginBottom: 8, color: '#1e293b' }}>
              {item.prompt}
            </div>
            <div style={{ fontSize: 13, color: item.textColor, lineHeight: 1.6 }}>{item.result}</div>
          </div>
        ))}
      </div>
    </div>,

    /* 3. 自己动手做 */
    <div>
      <SectionTitle accent={accent}>🚀 用 3 种提问方式，亲自试一下！</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>
        点下面的按钮，让 AI 用每条提示词分别回答。等全部跑完，认真比较 3 个答案的差别。
      </p>
      <PromptCompareLab
        prompts={COMPARE_PROMPTS}
        subject="L30 同一问题问3个AI"
        accent={accent}
        hint="提问越清晰，回答越贴合你的需求。问法改变，答案完全不同！"
        intro="三条提示词，同一个 AI，同一个问题——点按钮看看结果有多不一样！"
        allowCustom={true}
        customLabel="✏️ 用你自己的方式再问一次"
        customPlaceholder="想想看：你会怎么向AI描述你想做的事？试着写出来，让AI回答看看..."
      />
    </div>,

    /* 4. 让AI帮你一次 */
    <div>
      <SectionTitle accent={accent}>🤝 换一个话题，再试一次</SectionTitle>
      <InfoCard accent={accent}>
        <p style={{ margin: 0, fontSize: 14, color: '#c7d2fe', lineHeight: 1.7 }}>
          刚才你问的是"介绍爱好的网页"。现在换一个话题，用你认为<strong>最好的问法</strong>再问 AI。
          试试这个话题：<strong style={{ color: '#f8fafc' }}>我想做一个单词卡复习工具</strong>。
        </p>
      </InfoCard>
      <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10, lineHeight: 1.6 }}>
        提示：记得告诉 AI 你的年龄、你的水平、你想要什么、你只需要哪一步。
      </div>
      <PromptCompareLab
        prompts={[
          {
            id: 'card1',
            label: '你自己想的好问法（修改下面的提示词试试）',
            text: '我是10岁的初学者，我想做一个可以复习英语单词的小工具网页。请只告诉我：我第一步应该做什么，用简单的中文说明，不需要代码。',
            tone: 'strong',
          },
        ]}
        subject="L30 换话题再练习"
        accent={accent}
        hint="你对比较时有什么发现？越清晰的问题，答案越有用！"
        intro="把下面的提示词改成你认为更好的版本，再让 AI 回答："
        allowCustom={true}
        customLabel="✏️ 用你自己的方式问这个问题"
        customPlaceholder="关于单词卡工具，你会怎么问AI？写在这里试试..."
      />
    </div>,

    /* 5. 常见问题 */
    <div>
      <SectionTitle accent={accent}>❓ 常见问题</SectionTitle>
      {[
        {
          q: '为什么同一个 AI 给出的回答会不一样？',
          a: 'AI 是根据你的问题来生成答案的。问题里信息越多、越具体，AI 给的答案就越准确。就像你给朋友的任务越清楚，朋友做出来的东西就越符合你想要的。',
        },
        {
          q: '哪种问法是"正确"的？',
          a: '没有唯一正确，只有"适合你当前需求"的。如果你已经很清楚想要什么，短问法没问题；但如果你是初学者，要多告诉 AI 你的背景和期望。',
        },
        {
          q: 'AI 有的时候说错了怎么办？',
          a: 'AI 不总是对的！遇到不对的时候，可以追问"你确定吗？"或者"用更简单的方式解释一下"。把 AI 当一个可以纠正的助手，而不是权威答案机器。',
        },
        {
          q: '今天的课和"提示词工程"有什么关系？',
          a: '"提示词工程"就是研究怎么写出能让 AI 给出最好回答的提示词。你今天已经入门了！',
        },
      ].map(item => (
        <div key={item.q} style={{ marginBottom: 12, background: 'rgba(15,23,42,0.5)', borderRadius: 12, padding: '14px' }}>
          <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: 14, marginBottom: 6 }}>Q: {item.q}</div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>A: {item.a}</div>
        </div>
      ))}
    </div>,

    /* 6. 挑战升级 */
    <div>
      <SectionTitle accent={accent}>⚡ 挑战升级</SectionTitle>
      <InfoCard accent="#f97316">
        <h4 style={{ color: '#fed7aa', margin: '0 0 8px' }}>挑战：让同一个 AI 给你两种不同风格的回答</h4>
        <p style={{ margin: 0, fontSize: 13, color: '#ffedd5', lineHeight: 1.7 }}>
          向 AI 提同一个问题，但分别加上这两句话：
        </p>
      </InfoCard>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[
          { label: '方式一：超简短', extra: '…用一句话回答就够了，不需要详细解释。', color: '#0ea5e9' },
          { label: '方式二：超详细', extra: '…请尽量详细地回答，给出所有步骤和例子。', color: '#8b5cf6' },
        ].map(item => (
          <div key={item.label} style={{
            border: `2px solid ${item.color}40`,
            background: `${item.color}10`,
            borderRadius: 12, padding: '12px',
          }}>
            <div style={{ fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
              "我想做一个网页，{item.extra}"
            </div>
          </div>
        ))}
      </div>
      <PromptCompareLab
        prompts={[
          { id: 'short_style', label: '加上"用一句话回答"', text: '我想做一个介绍自己爱好的网页，用一句话告诉我先做什么就够了。', tone: 'medium' },
          { id: 'long_style', label: '加上"请尽量详细"', text: '我想做一个介绍自己爱好的网页，请尽量详细地告诉我所有步骤和注意事项。', tone: 'strong' },
        ]}
        subject="L30 挑战升级"
        accent={accent}
        hint="同一个问题，回答的长度和风格完全不同——你学会控制 AI 的输出了！"
        intro="同一个问题，两种不同的"结尾指令"，看看 AI 怎么变化："
      />
    </div>,

    /* 7. 本课作品输出 */
    <div>
      <SectionTitle accent={accent}>🏆 本课作品：我的 AI 老师偏好卡</SectionTitle>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
        今天你试了 3 种问法，也看到了 AI 的不同回答风格。来填一张"我喜欢哪种 AI 老师"的选择卡吧！
      </p>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 10, fontSize: 14 }}>我更喜欢 AI 的哪种回答风格？</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {PREFERENCE_OPTIONS.map(o => (
            <button
              key={o.id}
              onClick={() => setPreferChoice(o.id)}
              style={{
                border: `2px solid ${preferChoice === o.id ? accent : 'rgba(148,163,184,0.2)'}`,
                background: preferChoice === o.id ? `${accent}20` : 'rgba(15,23,42,0.5)',
                borderRadius: 12, padding: '12px', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{o.emoji}</div>
              <div style={{ fontSize: 13, color: preferChoice === o.id ? '#c7d2fe' : '#94a3b8', fontWeight: preferChoice === o.id ? 700 : 400, lineHeight: 1.4 }}>
                {o.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 8, fontSize: 14 }}>为什么你选这个？（可选）</div>
        <textarea
          value={preferReason}
          onChange={e => setPreferReason(e.target.value)}
          placeholder="例如：因为我现在是初学者，太复杂的答案我看不懂……"
          style={{
            width: '100%', minHeight: 80, borderRadius: 10, border: `1.5px solid ${accent}40`,
            padding: '10px 12px', fontSize: 13, background: 'rgba(15,23,42,0.8)',
            color: '#f8fafc', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.6,
          }}
        />
      </div>

      <button
        onClick={saveCard}
        disabled={!preferChoice}
        style={{
          width: '100%', padding: '14px', borderRadius: 12, border: 'none',
          background: !preferChoice ? '#4b5563' : accent,
          color: '#fff', fontSize: 15, fontWeight: 700, cursor: preferChoice ? 'pointer' : 'default',
          marginBottom: 16,
        }}
      >
        💾 保存我的偏好卡
      </button>

      {cardSaved && (
        <OutputCard title="🎉 我的 AI 老师偏好卡" accent={accent}>
          <div style={{ fontSize: 15, color: '#f8fafc', marginBottom: 8 }}>
            {PREFERENCE_OPTIONS.find(o => o.id === preferChoice)?.emoji}{' '}
            {PREFERENCE_OPTIONS.find(o => o.id === preferChoice)?.label}
          </div>
          {preferReason && (
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>原因：{preferReason}</div>
          )}
          <div style={{ marginTop: 12, fontSize: 12, color: `${accent}`, lineHeight: 1.6 }}>
            ✓ 第30课完成！你掌握了提示词的核心逻辑——问得好，AI 才能帮得好。
          </div>
        </OutputCard>
      )}

      {!cardSaved && (
        <InfoCard accent="#6b7280">
          <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
            📌 <strong>下一课预告</strong>：你学会了比较 AI 的不同回答风格。
            下一课，你会学到如何让 AI <strong>把一个大任务拆成5步</strong>，而不是让它一次性帮你做完所有事。
          </p>
        </InfoCard>
      )}
    </div>,
  ]

  return (
    <LessonNewStructure
      onBack={onBack}
      accent={accent}
      module="模块 H · AI 编程搭档入门"
      lessonNum={30}
      title="同一问题，问 3 个 AI"
      subtitle="Ask 3 AI Teachers · 发现提示词的秘密"
      sections={sections}
    />
  )
}
