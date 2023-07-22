'use client';
import React, { useState } from 'react';
import Timeline from '@/components/Timeline';
import axios from 'axios';
import Editor from '@/components/Editor';
import Form from '@/components/Form';
import { useFramesStore } from '@/store/framesStore';

const page = () => {
  const { fps, frameCount } = useFramesStore((state) => state);
  return (
    <div>
      <Form />
      <Editor />
    </div>
  );
};

export default page;
