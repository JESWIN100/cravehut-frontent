import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axisoInstance";

export const ResturantAuth = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get("resturent/check-resturant", {
            withCredentials: true,
          })

           
          
          setUser(response.data);
        } catch (error) {
          console.error("Error checking user:", error);
          setUser(null);
          navigate("/owner/login");
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
          src="https://cdn.dribbble.com/userupload/22690202/file/original-b10f1ea4b07bce2beb364c0890c802a7.gif"
          alt="Loading..."
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return user ? children : <div>Admin not authenticated</div>;
};
