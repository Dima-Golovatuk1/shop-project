import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Shield, Edit, Save, X } from 'lucide-react';
import './Profile.css'; // Import the CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/profile/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditData({
          first_name: data.user.first_name || '',
          last_name: data.user.last_name || '',
          email: data.user.email || '',
        });
      } else {
        setError('Failed to fetch user profile');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile/update/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditing(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="profile">
        <div className="container">
          <div className="profile__loading">
            <div className="loading-spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile">
        <div className="container">
          <div className="profile__error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile">
        <div className="container">
          <div className="profile__error">
            <p>Please log in to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = () => {
    const first = user.first_name || user.username;
    const last = user.last_name || '';
    return (first.charAt(0) + last.charAt(0)).toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile__card">
          <div className="profile__header">
            <div className="profile__avatar">
              <div className="profile__avatar-circle">
                {getInitials()}
              </div>
            </div>
            <div className="profile__header-info">
              <h1 className="profile__title">
                {isEditing ? (
                  <div className="profile__edit-name">
                    <input
                      type="text"
                      className="profile__input"
                      value={editData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      className="profile__input"
                      value={editData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      placeholder="Last name"
                    />
                  </div>
                ) : (
                  `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username
                )}
              </h1>
              <p className="profile__username">@{user.username}</p>
            </div>
            <div className="profile__actions">
              {!isEditing ? (
                <button className="profile__btn profile__btn--edit" onClick={handleEdit}>
                  <Edit size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="profile__edit-actions">
                  <button className="profile__btn profile__btn--save" onClick={handleSave}>
                    <Save size={18} />
                    Save
                  </button>
                  <button className="profile__btn profile__btn--cancel" onClick={handleCancel}>
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile__content">
            <div className="profile__section">
              <h2 className="profile__section-title">Personal Information</h2>
              <div className="profile__info-grid">
                <div className="profile__info-item">
                  <div className="profile__info-icon">
                    <Mail size={20} />
                  </div>
                  <div className="profile__info-content">
                    <label className="profile__info-label">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="profile__input"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                      />
                    ) : (
                      <p className="profile__info-value">{user.email}</p>
                    )}
                  </div>
                </div>

                <div className="profile__info-item">
                  <div className="profile__info-icon">
                    <User size={20} />
                  </div>
                  <div className="profile__info-content">
                    <label className="profile__info-label">Username</label>
                    <p className="profile__info-value">{user.username}</p>
                  </div>
                </div>

                <div className="profile__info-item">
                  <div className="profile__info-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="profile__info-content">
                    <label className="profile__info-label">Member Since</label>
                    <p className="profile__info-value">{formatDate(user.date_joined)}</p>
                  </div>
                </div>

                <div className="profile__info-item">
                  <div className="profile__info-icon">
                    <Shield size={20} />
                  </div>
                  <div className="profile__info-content">
                    <label className="profile__info-label">Account Status</label>
                    <p className="profile__info-value profile__status">
                      <span className={`profile__status-dot ${user.is_active ? 'profile__status-dot--active' : 'profile__status-dot--inactive'}`}></span>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {user.is_staff || user.is_superuser ? (
              <div className="profile__section">
                <h2 className="profile__section-title">Account Privileges</h2>
                <div className="profile__privileges">
                  {user.is_staff && (
                    <div className="profile__privilege">
                      <Shield size={16} />
                      Staff Member
                    </div>
                  )}
                  {user.is_superuser && (
                    <div className="profile__privilege profile__privilege--admin">
                      <Shield size={16} />
                      Administrator
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;