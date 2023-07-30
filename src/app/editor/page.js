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
      <div className="btn-container">
        <Link className="btn block-btn " href={'/livedemo'}>
          experimental live view with 3d
        </Link>
      </div>
    </div>
  );
};

export default page;
