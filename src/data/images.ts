// 项目素材
import p1Poster from '../assets/projects/p1-poster.jpg'
import p1App from '../assets/projects/p1-app.jpg'
import p2EldenRing from '../assets/projects/p2-eldenring.jpg'
import p2Sekiro from '../assets/projects/p2-sekiro.jpg'
import p2HollowKnight from '../assets/projects/p2-hollowknight.jpg'
import p3Network from '../assets/projects/p3-network.png'
import p3Boji from '../assets/projects/p3-boji.png'
import p4SwordTomb from '../assets/projects/p4-swordtomb.jpg'

// 新展廊素材
import g1Suv from '../assets/gallery/g1-suv.jpg'
import g2Seaside from '../assets/gallery/g2-seaside.jpg'
import g3Gundam from '../assets/gallery/g3-gundam.jpg'
import g4Lake from '../assets/gallery/g4-lake.jpg'
import g5Night from '../assets/gallery/g5-night.jpg'
import g6TokyoTower from '../assets/gallery/g6-tokyotower.jpg'

// ===== 跑马灯：11 张真实横向图（项目横向图 + 新图）+ 10 张随机填充，共 21 张 =====
const REAL_MARQUEE: string[] = [
  p1Poster,
  p2Sekiro,
  p2HollowKnight,
  p3Network,
  p4SwordTomb,
  g1Suv,
  g2Seaside,
  g3Gundam,
  g4Lake,
  g5Night,
  g6TokyoTower,
]

const FILLER_MARQUEE: string[] = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/jiale-fill-${i + 1}/420/270`,
)

export const MARQUEE_IMAGES: string[] = [...REAL_MARQUEE, ...FILLER_MARQUEE]

export interface ProjectItem {
  number: string
  name: string
  tag?: string
  paragraphs: string[]
  images: string[]
}

export const PROJECTS: ProjectItem[] = [
  {
    number: '01',
    name: '校园跑腿小程序',
    tag: '已停更',
    paragraphs: [
      '大一的时候想做校园跑腿，花 800 找别人写了小程序。我自己搞定宣传、资质，挨个宿舍扫楼推广。',
      '最后发现一个很现实的问题：跑腿是双边市场，光有用户没用，还要有愿意接单的人；而且校内很多需求大家直接找同学帮忙，付费意愿很低。',
      '项目虽然没做起来，但也是我第一次真正把一个想法推到现实里，踩了非常多市场侧的坑。',
    ],
    images: [p1Poster, p1App],
  },
  {
    number: '02',
    name: '魂类游戏历程',
    paragraphs: [
      '大学期间玩了很多游戏，热衷于魂类游戏。',
      '艾尔登法环八周目，游戏时长 500h+；只狼三周目，游戏时长 100h+；空洞骑士神居除辐光外全福辉。',
    ],
    images: [p2EldenRing, p2Sekiro, p2HollowKnight],
  },
  {
    number: '03',
    name: 'Vibecoding 小工具',
    paragraphs: [
      '这段时期也试着用 AI 开发，但自己能力不足，加上 AI 工作模式还未推出，并无成效。',
      '大二下随着人工智能发展，开始真正的 vibecoding，用 AI 做一些小巧但能解决痛点的小玩意，比如桌面端校园网监控小插件。',
      'AI 让我可以开发自己能力做不到的东西，比如薄肌计划 App。',
    ],
    images: [p3Network, p3Boji],
  },
  {
    number: '04',
    name: '无声剑冢 & 在研项目',
    paragraphs: [
      '无声剑冢：一款 2D 像素、参考空洞骑士风格的游戏 Demo。',
      '现在正在开发以碰撞为主题的小游戏。',
      '主要开发工具：DSH、WorkBuddy、Codex。',
    ],
    images: [p4SwordTomb],
  },
]
