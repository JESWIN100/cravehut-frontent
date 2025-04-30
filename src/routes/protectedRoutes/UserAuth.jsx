import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axisoInstance";

export const UserAuth = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get("/user/profile", {
            withCredentials: true,
          })

           
          
          setUser(response.data);
        } catch (error) {
          console.error("Error checking user:", error);
          setUser(null);
          navigate("/");
        } finally {
          setLoading(false); // Set loading to false after checking
        }
      }, 1000); // 2-second delay before API call
    };

    checkAdmin();
  }, [navigate]);

  console.log("auth", user);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/99cc9360636009.5a5478f09b256.gif"
          alt="Loading..."
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return user ? children : <div>Admin not authenticated</div>;
};
