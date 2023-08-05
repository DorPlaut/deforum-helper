'use client';
import React from 'react';
import Editor from './Editor';
import Form from './Form';
import Link from 'next/link';

const page = () => {
  return (
    <div>
      <Form />
      <Editor />
    </div>
  );
};

export default page;
