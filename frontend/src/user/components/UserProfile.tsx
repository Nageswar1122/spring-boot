import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../api/profileApi";
import { User } from "../types";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    getUserProfile(userId)
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setPhone(res.data.phone || "");
      })
      .catch(() => {
        setError("Failed to load profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    updateUserProfile(user.id, { name, phone })
      .then((res) => {
        setUser(res.data);
        alert("Profile updated successfully ✅");
      })
      .catch(() => {
        alert("Update failed ❌");
      });
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>User Profile</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>

      <hr />

      {user && (
        <div>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>Joined:</b> {user.createdAt}</p>
        </div>
      )}
    </div>
  );
}
