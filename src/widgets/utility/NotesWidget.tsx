import React from 'react';
import type { WidgetRendererProps } from '../../types';
export function NotesWidget({instance,updateConfig}:WidgetRendererProps){
  return <div className='widget-content'><h4>Notes</h4><textarea value={(instance.config.text as string)||''} onChange={(e)=>updateConfig({text:e.target.value})} placeholder='Write...'/></div>;
}
