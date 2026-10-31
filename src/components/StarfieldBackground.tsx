import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Three.js r128 3D 星云星空背景
// 1200×1200×1200 立方体内约 6000 个蓝色点粒子
export default function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()

    // 相机置于 z=220
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      2000,
    )
    camera.position.z = 220

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    // 6000 个随机分布粒子
    const PARTICLE_COUNT = 6000
    const CUBE_SIZE = 1200
    const positions = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = Math.random() * CUBE_SIZE - CUBE_SIZE / 2
      positions[i * 3 + 1] = Math.random() * CUBE_SIZE - CUBE_SIZE / 2
      positions[i * 3 + 2] = Math.random() * CUBE_SIZE - CUBE_SIZE / 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    )

    // PointsMaterial：半透明、size≈1.4、蓝色
    const material = new THREE.PointsMaterial({
      color: 0x5b9dff,
      size: 1.4,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
    })

    const starField = new THREE.Points(geometry, material)
    scene.add(starField)

    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      // 整团粒子云绕 Y / X 轴极缓慢旋转
      starField.rotation.y += 0.0012
      starField.rotation.x += 0.0004
      renderer.render(scene, camera)
    }
    animate()

    // 窗口 resize 自适应
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    />
  )
}
