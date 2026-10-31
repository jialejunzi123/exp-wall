import { useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  vr: number
  life: number
  max: number
  hue: number
  seed: number
  burst: boolean
}

// 点击/拖动的霓虹墨水效果：透明 Canvas 浮层，不阻挡点击与滚动
export default function InkClickEffect() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:40;'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = []
    let hue = Math.floor(Math.random() * 360)
    let dragging = false
    let lastX = 0
    let lastY = 0

    // 点击炸开：0.5s 内扩散到约 200px，随后 2s 淡出
    const spawnBurst = (x: number, y: number) => {
      hue = Math.floor(Math.random() * 360)
      const count = 26
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2
        const speed = 2 + Math.random() * 7.5
        const offset = Math.random() * 14
        particles.push({
          x: x + Math.cos(ang) * offset,
          y: y + Math.sin(ang) * offset,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          r: 4 + Math.random() * 10,
          vr: 1.4 + Math.random() * 2.8,
          life: 0,
          max: 2.5,
          hue: hue + (Math.random() * 36 - 18),
          seed: Math.random() * 10,
          burst: true,
        })
      }
    }

    // 拖动轨迹：小颗粒扭动、缓慢消散
    const spawnTrail = (x: number, y: number) => {
      for (let i = 0; i < 2; i++) {
        const ang = Math.random() * Math.PI * 2
        particles.push({
          x: x + (Math.random() * 8 - 4),
          y: y + (Math.random() * 8 - 4),
          vx: Math.cos(ang) * 0.7,
          vy: Math.sin(ang) * 0.7,
          r: 3 + Math.random() * 7,
          vr: 0.7 + Math.random() * 1.1,
          life: 0,
          max: 1.5 + Math.random() * 0.6,
          hue: hue + (Math.random() * 24 - 12),
          seed: Math.random() * 10,
          burst: false,
        })
      }
    }

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      spawnBurst(e.clientX, e.clientY)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dist = Math.hypot(dx, dy)
      const steps = Math.max(1, Math.floor(dist / 6))
      for (let i = 0; i < steps; i++) {
        spawnTrail(lastX + (dx * i) / steps, lastY + (dy * i) / steps)
      }
      lastX = e.clientX
      lastY = e.clientY
    }
    const onUp = () => {
      dragging = false
    }

    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    let raf = 0
    let prev = performance.now()
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((now - prev) / 1000, 0.05)
      prev = now

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalCompositeOperation = 'screen'

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += dt
        if (p.life >= p.max) {
          particles.splice(i, 1)
          continue
        }

        // 自扭动：噪声扰动 + 阻尼
        p.vx += Math.sin(p.life * 3 + p.seed) * (p.burst ? 0.04 : 0.12)
        p.vy += Math.cos(p.life * 2.6 + p.seed) * (p.burst ? 0.04 : 0.12)
        p.vx *= p.burst ? 0.9 : 0.95
        p.vy *= p.burst ? 0.9 : 0.95
        p.x += p.vx
        p.y += p.vy
        p.r += p.vr

        const k = p.life / p.max
        let alpha: number
        const peak = p.burst ? 0.42 : 0.32
        if (k < 0.08) {
          alpha = (k / 0.08) * peak
        } else {
          alpha = peak * (1 - (k - 0.08) / 0.92)
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        grad.addColorStop(0, `hsla(${p.hue},100%,70%,${alpha})`)
        grad.addColorStop(0.55, `hsla(${p.hue},100%,56%,${alpha * 0.4})`)
        grad.addColorStop(1, `hsla(${p.hue},100%,50%,0)`)
        ctx.fillStyle = grad

        // 不规则墨滴边缘：随时间扭动的波浪圆
        ctx.beginPath()
        const segs = 12
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2
          const wobble =
            1 +
            Math.sin(a * 3 + p.seed + p.life * 2.4) * 0.16 +
            Math.cos(a * 5 + p.seed) * 0.08
          const rr = p.r * wobble
          const px = p.x + Math.cos(a) * rr
          const py = p.y + Math.sin(a) * rr
          if (s === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.fill()
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      canvas.remove()
    }
  }, [])

  return null
}
