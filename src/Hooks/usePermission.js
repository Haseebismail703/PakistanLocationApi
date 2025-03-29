// usePermission.js
import { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

const usePermission = (requiredPermissions) => {
  const { admin } = useContext(AdminContext);
//  console.log(admin)
  try {
    const adminPermissions = admin?.data?.permissions || [];

    // Check for multiple required permissions
    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.every((perm) => adminPermissions.includes(perm));
    }

    // Check for a single permission
    return adminPermissions.includes(requiredPermissions);
  } catch (error) {
    console.error("Error checking permissions:", error);
    return false;
  }
};

export default usePermission;
