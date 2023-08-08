import Image from 'next/image';
import Link from 'next/link';
import Loading from './loading';

export default function Home() {
  return (
    <>
      <div className="welcome-page">
        <br />
        <h3>welcome!</h3>
        <p>
          Deforum Timeline Helper is a tool for creating and visualizing
          timeline settings files for Stabe Diffusion Deforum.
        </p>
        <br />
        <h4>What dose this app do?</h4>
        <ul>
          <li>
            - Create a visual timeline with 6 channels: Translation X,
            Translation Y, Translation Z, Rotation X, Rotation Y, and Rotation
            Z.
          </li>
          <li>
            - Hover over the upper ruler to see the timestamp in minutes,
            seconds, and thousandths of a second (00:00:000).
          </li>
          <li>
            {' '}
            - Click on a channel to expand the timeline for that channel.
          </li>
          <li>
            - Activate/deactivate specific frames with on/off buttons inside
            each frame.
          </li>
          <li>
            - Adjust frame values using the up-down buttons inside the frame.
          </li>
          <li>
            - Copy button for each channel to easily copy the channel values,
            ready to paste into Deforum settings file or
            AUTOMATIC1111/stable-diffusion-webui interface input.
          </li>
          <li>
            - Control panel with copy and download buttons to get the full
            settings ready to go with Deforum.
          </li>
          <li>- Live 3D visualzetion to your animation</li>
        </ul>
        <br />
        <Link className="btn block-btn editor-link" href={'/editor'}>
          lets create a timeline
        </Link>
      </div>
    </>
  );
}
