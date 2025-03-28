import axios from "axios";
import { useState } from "react";
import "../admincomponentsstyles/AdminForgotPassword.css"; // Import the CSS file
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const AdminForgotPassword = () => {
  const [adminId, setAdminId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put("http://localhost:9000/admin/updatePassword", {
        adminId: parseInt(adminId), // Convert to number
        newPassword: newPassword
      });

      alert(response.data); // Show success message
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <>
        <div className="forgot">
            <div className="forgot-password-container">
                <a href="/adminlogin">
                    <span className="span-container">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi-bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                    </span>
                </a>
                <h2>Admin Forgot Password</h2> 
                <input
                    type="text"
                    placeholder="Admin ID"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="input-field"
                />

                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field"
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className="password-container">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field"
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <button onClick={handlePasswordUpdate} className="update-button">Update Password</button>
            </div>
        </div>
    </>
  );
};

export default AdminForgotPassword;
