import Link from "next/link";
import {
  EMAIL_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
} from "../constant/constant";

export const Footer = () => {
  return (
    <footer className="border-t relative bg-neutral-950 border-neutral-900">
      <div className="max-w-6xl px-4 text-white m-auto">
        <div className="border-b py-10 gap-10 md:gap-0 grid md:grid-cols-3 border-y-neutral-900">
          <div className="space-y-3">
            <h4 className="text-xl font-bold">Yeremia Chris Saragi</h4>
            <p className="text-xs text-neutral-500">
              Help you rebuild and redefine fundamental <br /> concepts through
              mental models.
            </p>
          </div>

          <div className="space-y-3 flex flex-col md:items-center">
            <ul className="space-y-3 text-sm">
              <li className="text-neutral-500 text-base">General</li>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/experience">Experience</Link>
              </li>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 flex flex-col md:items-center">
            <ul className="space-y-3 text-sm">
              <li className="text-neutral-500 text-base">Social</li>
              <li>
                <Link href={GITHUB_URL} target="_blank">
                  Github
                </Link>
              </li>
              <li>
                <Link href={LINKEDIN_URL} target="_blank">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href={EMAIL_URL} target="_blank">
                  Email
                </Link>
              </li>
              <li>
                <Link href={RESUME_URL} target="_blank">
                  Resume
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center text-neutral-700 py-10 text-sm">
        Copyright © {new Date().getFullYear()} Yeremia Chris Saragi. All rights
        reserved.
      </p>
    </footer>
  );
};
