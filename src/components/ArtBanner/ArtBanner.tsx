import { Link, NavLink } from "react-router-dom";
import { StoryStripe } from "../StoryStripe";
import "./ArtBanner.css";

function ArtBanner() {
  return (
    <>
      <main className="h-screen pt-20 mx-4">
        <img
          className="w-100 duration-500 animate-fadein opacity-0"
          src="/assets/proxii_butterfly.jpg"
          alt=""
        />
        <div className="my-2 tracking-tight flex flex-col leading-5 text-center">
          {/* <p>proxii_dream</p> */}

          <Link
            to="/booking"
            className="hover:text-lime-400 contents text-lg"
            // style={{ display: "inline-block" }}
          >
            [book now]
          </Link>
          {/* <a
            className="text-gray-400 hover:text-lime-400"
            href="https://www.instagram.com/proxii_dream/"
            target="_blank"
          >
            [ig: proxii_dream]
          </a> */}
        </div>
      </main>
      <StoryStripe />
    </>
  );
}

export default ArtBanner;
