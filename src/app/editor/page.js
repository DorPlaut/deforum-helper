'use client';
import React, { useState } from 'react';
import Timeline from '@/app/editor/components/Timeline';
import axios from 'axios';
import Editor from '@/app/editor/components/Editor';
import Form from '@/app/editor/components/Form';

const page = () => {
  return (
    <div>
      <Form />
      <Editor />
    </div>
  );
};

export default page;
