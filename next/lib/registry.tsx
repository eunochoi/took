'use client'

import React, { useState, useEffect } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

/**
 * styled-components SSR 설정
 * 서버에서 생성된 스타일을 HTML에 삽입해줌
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  // 서버에서 렌더링된 스타일을 HTML <head>에 삽입
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  // 클라이언트 hydration 완료되면 body 보이게 함 (globals.css 참고)
  useEffect(() => {
    document.documentElement.classList.add('hydrated')
  }, [])

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}