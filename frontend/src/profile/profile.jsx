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
      setEditData({
        first_name: data.user.first_name || "",
        last_name: data.user.last_name || "",
        email: data.user.email || "",
      });
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/profile/", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditing(false);
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      setError("Network error occurred");
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

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
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
          <p className="loading-text">Завантаження профілю...</p>
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
          <p className="empty-text">Будь ласка, увійдіть, щоб переглянути свій профіль</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <span>{getInitials()}</span>
            </div>
            <div>
              <h1 className="profile-title">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="profile-input"
                      value={editData.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      placeholder="Ім'я"
                    />
                    <input
                      type="text"
                      className="profile-input"
                      value={editData.last_name}
                      onChange={(e) => handleInputChange("last_name", e.target.value)}
                      placeholder="Прізвище"
                    />
                  </>
                ) : (
                  `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username
                )}
              </h1>
              <p className="profile-username">@{user.username}</p>
            </div>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <>
                <button className="profile-button edit-button" onClick={handleEdit}>
                  ✏️ Редагувати профіль
                </button>
                <button className="profile-button logout-button" onClick={handleLogout}>
                  🚪 Вийти
                </button>
              </>
            ) : (
              <>
                <button className="profile-button save-button" onClick={handleSave}>
                  💾 Зберегти
                </button>
                <button className="profile-button cancel-button" onClick={handleCancel}>
                  ❌ Скасувати
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="profile-content">
          <h2 className="section-title">Особиста інформація</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon email-icon">📧</span>
              <div>
                <label className="info-label">Електронна пошта</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="full-width-input"
                    value={editData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Введіть адресу електронної пошти"
                  />
                ) : (
                  <p className="info-value">{user.email}</p>
                )}
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon username-icon">👤</span>
              <div>
                <label className="info-label">Ім'я користувача</label>
                <p className="info-value">{user.username}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon join-date-icon">📅</span>
              <div>
                <label className="info-label">Дата реєстрації</label>
                <p className="info-value">{formatDate(user.date_joined)}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon status-icon">🛡️</span>
              <div>
                <label className="info-label">Статус</label>
                <div className="status-indicator-container">
                  <span className={`status-dot ${user.is_active ? "active" : "inactive"}`}></span>
                  <p className="info-value">{user.is_active ? "Активний" : "Неактивний"}</p>
                </div>
              </div>
            </div>
          </div>

          {(user.is_staff || user.is_superuser) && (
            <div className="privileges">
              <h2 className="section-title">Привілеї акаунту</h2>
              <div className="privilege-badges">
                {user.is_staff && (
                  <div className="privilege-badge staff-badge">
                    🛡️ <span className="badge-text">Співробітник</span>
                  </div>
                )}
                {user.is_superuser && (
                  <div className="privilege-badge admin-badge">
                    🛡️ <span className="badge-text">Адміністратор</span>
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