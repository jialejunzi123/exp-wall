// 极光渐变弥散流光背景：深黑夜空 + 翡翠绿/青冰/柠金模糊色块
// 动画完全由 index.css 中的 @keyframes 驱动
export default function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden>
      <span className="aurora-blob aurora-blob-1" />
      <span className="aurora-blob aurora-blob-2" />
      <span className="aurora-blob aurora-blob-3" />
      <span className="aurora-blob aurora-blob-4" />
      <span className="aurora-blob aurora-blob-5" />
    </div>
  )
}
