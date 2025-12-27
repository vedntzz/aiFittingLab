'use client';

import { useState } from 'react';
import { useLabStore } from '@/stores/useLabStore';
import LabSidebar from './components/LabSidebar';
import LabCanvas from './components/LabCanvas';

export default function LabPage() {
  return (
    <div className="h-screen flex bg-canvas pt-20">
      <LabSidebar />
      <LabCanvas />
    </div>
  );
}
