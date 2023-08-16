'use client';
import Image from 'next/image';
import Link from 'next/link';
import Loading from './loading';
import { Canvas } from '@react-three/fiber';
import Scene from './livedemo/Scene';
import Background from './background/Background';

export default function Home() {
  return (
    <>
      <Background />
      <div className="page">
        <Image className="background-img" src="/background.jpg" fill />
        <div className="welcome-page">
          <br />
          <h3>welcome!</h3>
          <p>
            Deforum Timeline Helper is a tool designed to streamline the
            creation and visualization of animations settings for Stable
            Diffusion Deforum..
          </p>
          <br />
          <br />
          {/* feature list */}
          <div className="features-list">
            <h4>What can this app do?</h4>
            <ul>
              <li>- Generate visual timelines for your Deforum animations.</li>
              <li>
                - Set and calculate the duration and FPS of your Deforum
                project.
              </li>
              <li>
                - Effortlessly edit animated values using a dynamic editor.
              </li>
              <li>
                - Experience instant, real-time 3D visualization of your
                animations.
              </li>
              <li>- Utilize presets and other unique features.</li>
              <br />
              <li>
                <h5>On youtube:</h5>
              </li>
              <li>
                <iframe
                  width="100%"
                  height="auto"
                  src="https://www.youtube.com/embed/sskloFZXCLM"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </li>
            </ul>
          </div>
          <br />
          <br />
          <Link className="btn block-btn editor-link" href={'/editor'}>
            To The Editor
          </Link>
          <br />
        </div>
      </div>
    </>
  );
}
