export const deleteDoc = async (
  id: string,
  componentName: string
): Promise<boolean> => {
  try {
    if (!id) {
      console.error("No ID provided for deletion");
      return false;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage. No user logged in.");
      return false;
    }

    const auth = await fetch("http://localhost:3000/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!auth.ok) {
      localStorage.removeItem("token");
      return false;
    }

    let response = null;
    if (componentName === "Announcements") {
      console.log(`Delete request from component: ${componentName}`);
      response = await fetch(`http://localhost:3000/announcement/${id}`, {
        method: "DELETE",
      });
    } else if (componentName === "Events") {
      console.log(`Delete request from component: ${componentName}`);
      response = await fetch(`http://localhost:3000/event/${id}`, {
        method: "DELETE",
      });
    } else if (componentName === "Due Dates") {
      console.log(`Delete request from component: ${componentName}`);
      response = await fetch(`http://localhost:3000/duedate/${id}`, {
        method: "DELETE",
      });
    } else if (componentName === "Team") {
      console.log(`Delete request from component: ${componentName}`);
      response = await fetch(`http://localhost:3000/team/${id}`, {
        method: "DELETE",
      });
    }

    if (!response || !response.ok) {
      console.error("Failed to delete announcement");
      console.log(response);
      return false;
    }

    return true;
  } catch (error) {
    console.error("An error occurred while deleting the announcement", error);
    return false;
  }
};

export const editDoc = async (
  id: string,
  updatedDoc: any,
  componentName: string
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/${componentName}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDoc),
      }
    );

    if (!response.ok) {
      console.error("Failed to update document");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    return false;
  }
};
