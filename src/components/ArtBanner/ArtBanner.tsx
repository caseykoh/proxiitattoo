import "./ArtBanner.css";

function ArtBanner() {
  return (
    <>
      <main className="art-banner-container pt-20 mx-4">
        <img
          className="duration-500 animate-fadein opacity-0"
          src="/assets/proxii_butterfly.jpg"
          alt=""
        />
        <div className="my-2 tracking-tight leading-5">
          <p>proxii_dream</p>

          <p>235 MB</p>
          <a
            className="text-gray-400"
            href="https://www.instagram.com/proxii_dream/"
            target="_blank"
          >
            [instagram]
          </a>
        </div>
      </main>
    </>
  );
}

export default ArtBanner;
