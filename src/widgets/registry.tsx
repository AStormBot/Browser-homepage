import React from 'react';
import { ClockWidget } from './system/ClockWidget';
import { NotesWidget } from './utility/NotesWidget';

export const widgetRegistry={
  clock: ()=>Promise.resolve({default:ClockWidget}),
  notes: ()=>Promise.resolve({default:NotesWidget})
} as const;
