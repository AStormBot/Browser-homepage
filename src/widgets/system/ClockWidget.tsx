import React, { useEffect, useMemo, useState } from 'react';
import { toJalaali } from 'jalaali-js';
import type { WidgetRendererProps } from '../../types';

export function ClockWidget({size}:WidgetRendererProps){
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const id=setInterval(()=>setNow(new Date()),1000);return ()=>clearInterval(id);},[]);
  const jalali=useMemo(()=>{const j=toJalaali(now);return `${j.jy}/${j.jm}/${j.jd}`;},[now]);
  const big=size==='lg'||size==='xl';
  return <div className='widget-content'>
    <h4>Clock</h4>
    <div className={big?'clock-big':'clock-small'}>{now.toLocaleTimeString()}</div>
    <div>{now.toDateString()}</div><div>Persian: {jalali}</div>
  </div>;
}
