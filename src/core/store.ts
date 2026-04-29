import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WidgetInstance } from '../types';

type Group={id:string;name:string;widgets:WidgetInstance[]};
type State={groups:Group[];activeGroupId:string;theme:{blur:number;alpha:number;accent:string};setActive:(id:string)=>void;upsert:(w:WidgetInstance)=>void;setGroups:(g:Group[])=>void};

export const useBoardStore=create<State>()(persist((set,get)=>({
  groups:[{id:'default',name:'Default',widgets:[]},{id:'clean',name:'Clean',widgets:[]},{id:'controls',name:'Controls',widgets:[]}],
  activeGroupId:'default',
  theme:{blur:16,alpha:.45,accent:'#6ce5ff'},
  setActive:(id)=>set({activeGroupId:id}),
  setGroups:(groups)=>set({groups}),
  upsert:(w)=>set({groups:get().groups.map(g=>g.id!==get().activeGroupId?g:{...g,widgets:[...g.widgets.filter(i=>i.id!==w.id),w]})})
}),{name:'newtab-state'}));
