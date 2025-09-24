import React, { useState, useEffect } from "react";

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
    const response = await fetch("/user/profile/", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      let errMsg = "Failed to fetch user profile";
      try {
        const errData = await response.json();
        errMsg = errData.error || errMsg;
      } catch {
      }
      setError(errMsg);
      return;
    }

    const data = await response.json();
    setUser(data.user);
    console.log(data)
    console.log(data.user)
    setEditData({
      first_name: data.user.first_name || "",
      last_name: data.user.last_name || "",
      email: data.user.email || "",
    });
  } catch (err) {
    console.log(err)
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
      const response = await fetch("/user/profile/", {
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
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-red-600 mb-4 text-3xl">⚠️</div>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-gray-400 mb-4 text-3xl">👤</div>
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {getInitials()}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {isEditing ? (
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 rounded-lg px-4 py-2 border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                          value={editData.first_name}
                          onChange={(e) => handleInputChange("first_name", e.target.value)}
                          placeholder="First name"
                        />
                        <input
                          type="text"
                          className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 rounded-lg px-4 py-2 border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                          value={editData.last_name}
                          onChange={(e) => handleInputChange("last_name", e.target.value)}
                          placeholder="Last name"
                        />
                      </div>
                    ) : (
                      `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username
                    )}
                  </h1>
                  <p className="text-white text-opacity-90 text-lg">@{user.username}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200"
                    onClick={handleEdit}
                  >
                    ✏️ <span>Edit Profile</span>
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200"
                      onClick={handleSave}
                    >
                      💾 <span>Save</span>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200"
                      onClick={handleCancel}
                    >
                      ❌ <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 text-blue-600">📧</div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={editData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter email address"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 text-purple-600">👤</div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <p className="text-gray-900 font-medium">{user.username}</p>
                    </div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 text-green-600">📅</div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member Since
                      </label>
                      <p className="text-gray-900 font-medium">{formatDate(user.date_joined)}</p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 text-yellow-600">🛡️</div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Status
                      </label>
                      <div className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            user.is_active ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <p className="text-gray-900 font-medium">
                          {user.is_active ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Privileges */}
            {(user.is_staff || user.is_superuser) && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Privileges</h2>
                <div className="flex flex-wrap gap-4">
                  {user.is_staff && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center space-x-2">
                      🛡️ <span className="text-blue-800 font-medium">Staff Member</span>
                    </div>
                  )}
                  {user.is_superuser && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-center space-x-2">
                      🛡️ <span className="text-red-800 font-medium">Administrator</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;