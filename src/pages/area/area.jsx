import React, { useEffect, useRef } from 'react'
import style from './index.less'

export default function area() {
  let mapRef = useRef()

  useEffect(() => {
    var map = new AMap.Map(mapRef.current)
  },[])

  return (
    <div>
      <div className={style.map} ref={mapRef}>
        即将渲染地图
      </div>
    </div>
  )
}
