import React, { Suspense, useMemo } from 'react';
import { useBoardStore } from '../core/store';
import { widgetRegistry } from '../widgets/registry';
import type { WidgetInstance } from '../types';

const COLS=12; const ROWH=92;
const seed:WidgetInstance[]=[
{id:'clock-1',type:'clock',x:0,y:0,w:3,h:3,config:{}},
{id:'notes-1',type:'notes',x:3,y:0,w:3,h:2,config:{text:''}}
];

export function App(){
  const {groups,activeGroupId,setActive,upsert}=useBoardStore();
  const active=groups.find(g=>g.id===activeGroupId)!;
  const widgets=active.widgets.length?active.widgets:seed;
  return <div className='page'>
    <header>Widget→Core→Renderer New Tab</header>
    <main className='grid'>
      {widgets.map(w=><WidgetCard key={w.id} w={w} upsert={upsert}/>) }
    </main>
    <footer>{groups.map(g=><button key={g.id} onClick={()=>setActive(g.id)}>{g.name}</button>)}</footer>
  </div>
}

function WidgetCard({w,upsert}:{w:WidgetInstance;upsert:(w:WidgetInstance)=>void}){
  const size=useMemo(()=>(w.w*w.h<=2?'sm':w.w*w.h<=4?'md':w.w*w.h<=9?'lg':'xl'),[w]);
  const Lazy=React.lazy(widgetRegistry[w.type as keyof typeof widgetRegistry] ?? widgetRegistry.notes);
  return <section className='widget' style={{gridColumn:`${w.x+1} / span ${w.w}`,gridRow:`${w.y+1} / span ${w.h}`}}>
    <div className='resize' onClick={()=>upsert({...w,w:w.w===1?2:1,h:w.h===1?2:1})}>⤡</div>
    <Suspense fallback={'...'}><Lazy instance={w} data={{}} size={size as any} updateConfig={(patch)=>upsert({...w,config:{...w.config,...patch}})} /></Suspense>
  </section>
}
