import { useState, useEffect } from "react";
import { useAuth } from "@/context";
import {
  me,
  updateSettings,
  signOut,
  deleteAccount,
  updatePassword,
} from "@/data";
import { toast } from "react-toastify";
import Modal from "@/components/general/Modal";
import { Sun, Moon } from "lucide-react";

const AccountSettings = () => {
  const { setIsAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isHeightModalOpen, setIsHeightModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const handleGenderChange = async (selectedGender) => {
    try {
      const res = await updateSettings({ gender: selectedGender });
      setUser(res);
      toast.success("Gender updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsGenderModalOpen(false);
    }
  };

  const handleWeightChange = async (selectedWeight) => {
    try {
      const res = await updateSettings({ weight: selectedWeight });
      setUser(res);
      toast.success("Weight updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsWeightModalOpen(false);
    }
  };

  const handleAgeChange = async (selectedAge) => {
    try {
      const res = await updateSettings({ age: selectedAge });
      setUser(res);
      toast.success("Age updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsAgeModalOpen(false);
    }
  };

  const handleHeightChange = async (selectedHeight) => {
    try {
      const res = await updateSettings({ height: selectedHeight });
      setUser(res);
      toast.success("Height updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsHeightModalOpen(false);
    }
  };

  const handleGoalChange = async (selectedGoal) => {
    try {
      const res = await updateSettings({ goal: selectedGoal });
      setUser(res);
      toast.success("Goal updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsGoalModalOpen(false);
    }
  };

  const handleUsernameChange = async (selectedUsername) => {
    try {
      const res = await updateSettings({ userName: selectedUsername });
      setUser(res);
      toast.success("Username updated");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setIsUsernameModalOpen(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const { currentPassword, newPassword } = passwordData;

      if (!currentPassword || !newPassword) {
        toast.error("Please enter both your current and new password.");
        return;
      }

      await updatePassword({ currentPassword, newPassword });

      setPasswordData({ currentPassword: "", newPassword: "" });
      setEditField(null);
      toast.success("✅ Password updated successfully.");
    } catch (err) {
      // Try to get a more specific error message from the server response
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";

      if (message.toLowerCase().includes("unauthorized")) {
        toast.error("❌ Current password is incorrect.");
      } else {
        toast.error(`⚠️ ${message}`);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await me();
      setUser(userData);
      setFormData(userData);
    };
    fetchData();
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const allowedFields = [
        "userName",
        "age",
        "gender",
        "weight",
        "height",
        "goal",
      ];
      const payload = Object.fromEntries(
        Object.entries(formData).filter(([key]) => allowedFields.includes(key))
      );

      const res = await updateSettings(payload);
      setUser(res);
      setEditField(null);
      toast.success("Settings updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsAuthenticated(false);
  };

  const handleDelete = async () => {
    await deleteAccount();
    setIsAuthenticated(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h2 className="text-xl font-semibold">Profile</h2>

      <div className="flex justify-end">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            className="toggle"
          />
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </label>
      </div>

      <div className="border p-4 rounded shadow">
        <h3 className="font-medium mb-2">Account</h3>

        {/* Username and Email */}
        {[
          { field: "userName", label: "Username" },
          { field: "email", label: "Email" },
          { field: "password", label: "Password" },
        ].map(({ field, label }) => (
          <div
            key={field}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{label}</span>
            {field === "password" ? (
              <span>••••••••</span>
            ) : (
              <span>{user[field]}</span>
            )}
            <button
              className="ml-2 text-sm text-blue-500"
              onClick={() =>
                field === "password"
                  ? setIsPasswordModalOpen(true)
                  : field === "userName"
                  ? setIsUsernameModalOpen(true)
                  : handleEdit(field)
              }
            >
              ✏️
            </button>
          </div>
        ))}
      </div>

      <div className="border p-4 rounded shadow">
        <h3 className="font-medium mb-2">User Settings</h3>

        {["age", "gender", "weight", "height", "goal"].map((field) => (
          <div
            key={field}
            className="flex justify-between items-center border-b py-2"
          >
            <span className="capitalize">{field}</span>

            {field === "gender" || field === "weight" ? (
              <span>
                {user[field] ?? "—"}{" "}
                {field === "weight" && user[field] ? "kg" : ""}
              </span>
            ) : (
              <span>{user[field] ?? "—"}</span>
            )}

            <button
              className="ml-2 text-sm text-blue-500"
              onClick={() => {
                if (field === "gender") {
                  setIsGenderModalOpen(true);
                } else if (field === "weight") {
                  setIsWeightModalOpen(true);
                } else if (field === "age") {
                  setIsAgeModalOpen(true);
                } else if (field === "height") {
                  setIsHeightModalOpen(true);
                } else if (field === "goal") {
                  setIsGoalModalOpen(true);
                } else {
                  handleEdit(field);
                }
              }}
            >
              ✏️
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        {editField === "password" ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handlePasswordUpdate}
          >
            Save Password
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}

        <button
          className="text-red-500 underline text-sm"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleLogout}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Log Out
        </button>
      </div>

      <Modal
        isOpen={isUsernameModalOpen}
        onClose={() => setIsUsernameModalOpen(false)}
      >
        <h3 className="text-lg font-bold mb-4">Update Username</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="userName"
            placeholder="Enter new username"
            value={formData.userName || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <div className="flex justify-end gap-2">
            <button
              className="btn"
              onClick={() => setIsUsernameModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleUsernameChange(formData.userName)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <h3 className="text-lg font-bold mb-4">Change Password</h3>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2">
            <button
              className="btn"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handlePasswordUpdate}>
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isGenderModalOpen}
        onClose={() => setIsGenderModalOpen(false)}
      >
        <h3 className="text-lg font-bold mb-4">Choose Gender</h3>
        <div className="flex justify-between gap-4">
          <button className="btn" onClick={() => handleGenderChange("male")}>
            Male
          </button>
          <button className="btn" onClick={() => handleGenderChange("female")}>
            Female
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
      >
        <h3 className="text-lg font-bold mb-4">Enter Your Weight (kg)</h3>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            min="30"
            max="150"
            step="1"
            className="input input-bordered w-full"
            value={formData.weight || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                weight: parseInt(e.target.value, 10),
              }))
            }
          />
          <div className="flex justify-end gap-2">
            <button className="btn" onClick={() => setIsWeightModalOpen(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleWeightChange(formData.weight)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isAgeModalOpen} onClose={() => setIsAgeModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Enter Your Age</h3>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            min="10"
            max="120"
            step="1"
            className="input input-bordered w-full"
            value={formData.age || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                age: parseInt(e.target.value, 10),
              }))
            }
          />
          <div className="flex justify-end gap-2">
            <button className="btn" onClick={() => setIsAgeModalOpen(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleAgeChange(formData.age)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isHeightModalOpen}
        onClose={() => setIsHeightModalOpen(false)}
      >
        <h3 className="text-lg font-bold mb-4">Enter Your Height (cm)</h3>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            min="100"
            max="250"
            step="1"
            className="input input-bordered w-full"
            value={formData.height || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                height: parseInt(e.target.value, 10),
              }))
            }
          />
          <div className="flex justify-end gap-2">
            <button className="btn" onClick={() => setIsHeightModalOpen(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleHeightChange(formData.height)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)}>
        <h3 className="text-lg font-bold mb-4">Select Your Goal</h3>
        <div className="flex flex-col gap-4">
          <select
            className="select select-bordered w-full"
            value={formData.goal || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                goal: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Select goal
            </option>
            <option value="lose weight">Lose Weight</option>
            <option value="gain muscle">Gain Muscle</option>
            <option value="maintain">Maintain</option>
          </select>

          <div className="flex justify-end gap-2">
            <button className="btn" onClick={() => setIsGoalModalOpen(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleGoalChange(formData.goal)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccountSettings;
