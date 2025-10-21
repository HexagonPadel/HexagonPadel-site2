export default function Video() {
    return (
      <div className="w-full h-full rounded-lg overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://dsxgxxqkrqbygivlbphr.supabase.co/storage/v1/object/public/photos-site//video-cadre.mov"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
    );
  }