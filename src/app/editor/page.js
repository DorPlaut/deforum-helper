'use client';
import React, { useState } from 'react';
import Timeline from '@/components/Timeline';
import axios from 'axios';
import Editor from '@/components/Editor';
import Form from '@/components/Form';

const page = () => {
  return (
    <div>
      <Form />
      <Editor />
    </div>
  );
};

export default page;
