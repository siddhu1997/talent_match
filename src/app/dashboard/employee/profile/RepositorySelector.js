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
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
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

  const handleAddSelected = async () => {
    const selectedReposData = repos.filter((r) =>
      selectedItems.includes(r.url)
    );

    try {
      const res = await fetch("/api/github/saveRepos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repositories: selectedReposData }),
      });

      if (res.ok) {
        toast.success("Repositories saved");
        await fetchUser();
      } else {
        toast.error("Failed to save repositories");
      }
    } catch (error) {
      console.error("Error saving repositories:", error.message);
      toast.error("An error occurred while saving repositories");
    } finally {
      setSelectedItems([]);
      setOpenDropdown(false);
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

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {user?.github?.connected ? (
          <FormControl fullWidth size="medium" sx={{ width: 300 }}>
            <div className="relative mt-1">
              {/* Dropdown trigger */}
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full border rounded-lg px-4 py-2 text-left text-sm text-black"
              >
                {selectedItems.length > 0
                  ? `${selectedItems.length} repo(s) selected`
                  : "Select Repositories"}
              </button>

              {/* Dropdown content */}
              {openDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow z-10">
                  {/* Scrollable checkbox list */}
                  <div className="max-h-52 overflow-y-auto px-4 py-3">
                    {repos.map((repo, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 text-sm text-black py-1"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(repo.url)}
                          onChange={() =>
                            setSelectedItems((prev) =>
                              prev.includes(repo.url)
                                ? prev.filter((url) => url !== repo.url)
                                : [...prev, repo.url]
                            )
                          }
                        />
                        {repo.name}
                      </label>
                    ))}
                  </div>

                  {/* Always-visible footer */}
                  <div className="border-t px-4 py-2 bg-gray-50 rounded-b-lg flex justify-end">
                    <button
                      onClick={handleAddSelected}
                      className="bg-blue-600 text-white text-sm px-4 py-2 rounded"
                    >
                      Add Selected
                    </button>
                  </div>
                </div>
              )}
            </div>
          </FormControl>
        ) : (
          <GithubConnectButton />
        )}
        {/* <button
          onClick={() => setManualMode(!manualMode)}
          className="text-sm text-blue-600 underline whitespace-nowrap"
        >
          {manualMode ? "Cancel manual entry" : "Enter repo manually"}
        </button> */}
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
