const usePermission = (requiredPermissions) => {
    // LocalStorage se admin data retrieve karo
    // const admin = localStorage.getItem("admin");
    let admin = {
        "_id": "67adcdd2491a378269fa815a",
        "name": "main",
        "email": "main@gmail.com",
        "role": "admin",
        "status": "active",
        "permissions": [
            "manage-permissions",
            "manage-admins",
            "manage-users",
            "create-operations",
            "read-operations",
            "update-operations",
            "delete-operations"
        ],
        "updatedAt": "2025-02-22T07:12:39.728Z",
        "updatedBy": "67adcdd2491a378269fa815a"

    }

    if (!admin) {
        return false; // Agar admin ka data nahi mila toh permission deny
    }

    try {
        const adminPermissions = admin?.permissions || []; // Agar permissions na milay toh empty array

        // Agar multiple permissions hain, toh unko check karega
        if (Array.isArray(requiredPermissions)) {
            return requiredPermissions.every((perm) => adminPermissions.includes(perm));
        }

        // Single permission check
        return adminPermissions.includes(requiredPermissions);
    } catch (error) {
        console.error("Error parsing admin data:", error);
        return false; // Agar parsing error aaye toh bhi permission deny
    }
};

export default usePermission;
