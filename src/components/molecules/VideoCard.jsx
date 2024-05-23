import { forwardRef } from 'react';

const VideoCard = forwardRef(({ id, name, isIdle, isMuted }, ref) => {
  return (
    <article
      className={`flex flex-col justify-between gap-2 p-4 bg-gradient-to-r from-orange-600 to-orange-400 text-base-100 card ${
        isIdle ? 'max-w-[40rem] mx-auto' : 'w-full'
      }`}
    >
      <video ref={ref} autoPlay muted={isMuted} className="rounded-lg" />
      <div className="py-2">
        <p>
          <b>ID:</b> {id}
        </p>
        <p>
          <b>Name:</b> {name}
        </p>
      </div>
    </article>
  );
});

export default VideoCard;
