import { FaGithub } from "react-icons/fa";

export default function GitHubConnectButton() {
  return (
    <a
      href="/api/github/authorize"
      className="inline-flex items-center gap-2 bg-black text-white font-semibold px-4 py-2 rounded-full text-sm shadow hover:opacity-90 transition"
    >
      <FaGithub className="w-4 h-4" />
      Connect GitHub
    </a>
  );
}
