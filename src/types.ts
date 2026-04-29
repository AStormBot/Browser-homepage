export type WidgetSize = { w:number; h:number };
export type WidgetMeta = { id:string; name:string; min:WidgetSize; max:WidgetSize; permissions?:string[] };
export type WidgetInstance = { id:string; type:string; x:number; y:number; w:number; h:number; config:Record<string, unknown> };
export type WidgetCore<T=unknown>={ init:()=>void|(()=>void); getSnapshot:()=>T; subscribe:(fn:()=>void)=>()=>void };
export type WidgetRendererProps<T=unknown>={ instance:WidgetInstance; data:T; size:'sm'|'md'|'lg'|'xl'; updateConfig:(patch:Record<string,unknown>)=>void };
