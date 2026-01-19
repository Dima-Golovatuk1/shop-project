import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const UserProfile = ({ setActivLoginForm }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/profile/", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        let errMsg = "Failed to fetch user profile";
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch {}
        setError(errMsg);
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/logout/", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setUser(null);
        navigate("/");
        if (setActivLoginForm) {
          setActivLoginForm(true);
        }
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Network error during logout:", error);
    }
  };

  const getInitials = () => {
    if (!user) return "";
    const first = user.first_name || user.username || "";
    const last = user.last_name || "";
    return (first.charAt(0) + last.charAt(0)).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="profile-container loading-state">
        <div className="profile-card">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container error-state">
        <div className="profile-card">
          <div className="error-icon">⚠️</div>
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container empty-state">
        <div className="profile-card">
          <div className="empty-icon">👤</div>
          <p className="empty-text">You need to login</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <span>{getInitials()}</span>
            </div>
            <div>
              <h1 className="profile-title">
              </h1>
              <p className="profile-username">@{user.username}</p>
            </div>
          </div>
          <div className="profile-actions">
              <>
                <button className="profile-button logout-button" onClick={handleLogout}>
                  🚪 Log out
                </button>
              </>
          </div>
        </div>

        <div className="profile-content">
          <h2 className="section-title">Personal info</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon email-icon">📧</span>
              <div>
                <label className="info-label">Email</label>
                <p className="info-value">{user.email}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon username-icon">👤</span>
              <div>
                <label className="info-label">Username</label>
                <p className="info-value">{user.username}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon join-date-icon">☎️</span>
              <div>
                <label className="info-label">Phone number</label>
                <p className="info-value">{user.phone_number}</p>
              </div>
            </div>
          </div>

          {(user.is_staff || user.is_superuser) && (
            <div className="privileges">
              <div className="privilege-badges">
                {user.is_superuser && (
                  <div className="privilege-badge admin-badge">
                    🛡️ <span className="badge-text">Admin</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;