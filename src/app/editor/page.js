'use client';
import React from 'react';
import Editor from './Editor';
import SettingsPanel from './control-panel/Settings/SettingsPanel';

const page = () => {
  return (
    <div className="animation-fade-in">
      <SettingsPanel />
      <Editor />
    </div>
  );
};

export default page;
