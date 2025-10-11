import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Run only if userId exists
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/${userId}/profile`,
          { withCredentials: true }
        );

        // ✅ Check structure before dispatching
        if (res?.data?.success && res?.data?.user) {
          dispatch(setUserProfile(res.data.user));
        } else {
          console.warn("⚠️ Invalid user profile response:", res.data);
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, [userId, dispatch]); // ✅ include dispatch in dependency array
};

export default useGetUserProfile;
