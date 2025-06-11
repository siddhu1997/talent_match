"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import GithubConnectButton from "./GithubConnectButton";
import { FiX } from "react-icons/fi";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

export default function RepositorySelector() {
  const { user, fetchUser, loading } = useUser();
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [manualMode, setManualMode] = useState(false);
  const [manualRepo, setManualRepo] = useState("");

  // Fetch GitHub repos if connected
  useEffect(() => {
    async function loadRepos() {
      if (user?.github?.connected) {
        const res = await fetch("/api/github/repos");
        const data = await res.json();
        setRepos(data.repos || []);
      }
    }

    if (user && !loading) {
      loadRepos();
    }
  }, [user, loading]);

  const handleRepoSelect = async (e) => {
    const url = e.target.value;
    const selected = repos.find((r) => r.url === url);
    setSelectedRepo(url);

    if (!selected) return;

    const res = await fetch("/api/github/saveRepo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });

    if (res.ok) {
      toast.success("Repository saved");
      await fetchUser(); // Refresh user context
      setSelectedRepo("");
    } else {
      toast.error("Failed to save repository");
    }
  };

  const handleRepoDelete = async (url) => {
    const res = await fetch("/api/github/deleteRepo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      toast.success("Repository removed");
      await fetchUser();
    } else {
      toast.error("Failed to delete repository");
    }
  };

  const handleManualRepoSubmit = (e) => {
    e.preventDefault();
    // Open modal logic or validate manually later
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-black mb-1">
        GitHub Repositories
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        Select repositories to analyze your skills.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        {user?.github?.connected ? (
          <FormControl size="small" sx={{ width: 280 }}>
            <InputLabel id="repo-label">Select Repository</InputLabel>
            <Select
              labelId="repo-label"
              id="repo-select"
              value={selectedRepo}
              label="Select Repository"
              onChange={handleRepoSelect}
              sx={{ borderRadius: 2 }}
            >
              {repos.map((repo, index) => (
                <MenuItem key={index} value={repo.url}>
                  {repo.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <GithubConnectButton />
        )}
        <button
          onClick={() => setManualMode(!manualMode)}
          className="text-sm text-blue-600 underline whitespace-nowrap"
        >
          {manualMode ? "Cancel manual entry" : "Enter repo manually"}
        </button>
      </div>

      {manualMode && (
        <form onSubmit={handleManualRepoSubmit} className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="https://github.com/username/repo"
            value={manualRepo}
            onChange={(e) => setManualRepo(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Repo
          </button>
        </form>
      )}

      {user?.repositories?.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-black mb-2">
            Saved Repositories:
          </h4>
          <div className="flex flex-wrap gap-2">
            {user.repositories.map((repo, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1"
              >
                {repo.name}
                <FiX
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleRepoDelete(repo.url)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
