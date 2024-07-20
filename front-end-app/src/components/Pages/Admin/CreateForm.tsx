import { TextField, Button, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

interface CreateFormProps {
  type: string;
  description?: string;
}

// type is either "Events", "Due Dates", "Announcements", or "Team"
const CreateForm = ({ type, description }: CreateFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  let secondDate = "";
  if (type === "Events") {
    secondDate = "DateOfEvent";
  } else if (type === "Due Dates") {
    secondDate = "Due Date";
  } else if (type === "Announcements") {
    secondDate = "Disappear Date";
  } else {
    secondDate = "";
  }

  let body = "";
  if (type === "Announcements" || type === "Events") {
    body = "Body";
  } else {
    body = "";
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Convert FormData to plain object
    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    if (selectedFile) {
      try {
        // get urls needed for file upload and for the file to be accessed in the database
        const { uploadUrl, fileUrl } = await fetch(
          "http://localhost:3000/s3Url"
        ).then((res) => res.json());

        console.log(`Secure URL: ${uploadUrl} Hehe`);

        // Upload file to S3
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: selectedFile,
        });

        formDataObject["Image"] = fileUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
        return; // Abort the form submission if file upload fails
      }
    }

    // Convert plain object to JSON
    const jsonString = JSON.stringify(formDataObject);
    console.log(jsonString); // For debugging

    try {
      const addressOfRequest =
        "http://localhost:3000/" + `${type.replace(/\s+/g, "").toLowerCase()}`;

      const response = await fetch(addressOfRequest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully", result);
    } catch (error) {
      console.error("Error submitting form", error);
    }

    const form = document.querySelector<HTMLFormElement>("#createForm");
    form?.reset();
  };

  return (
    <div className="admin-create-form">
      <h1>Create {type}</h1>
      <form onSubmit={handleSubmit} id="createForm">
        {type !== "Team" && (
          <TextField
            label="Title"
            name="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {type === "Team" && (
          <TextField
            label="Name"
            name="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {type !== "Team" && (
          <TextField
            label="Author"
            name="Author"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {type === "Team" && (
          <TextField
            label="Role"
            name="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {(type === "Events" || type === "Due Dates") && (
          <TextField
            label="Date Posted"
            name={type === "Due Dates" ? "Date Posted" : "DatePosted"}
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        )}
        {type === "Announcements" && (
          <TextField
            label="Date"
            name="Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        )}
        {secondDate && (
          <TextField
            label={secondDate}
            type="date"
            name={secondDate}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        )}
        {body && (
          <TextField
            label="Body"
            name="Body"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
        )}
        {(type === "Due Dates" || type === "Announcements") && (
          <TextField
            label="Keywords"
            name="Keywords"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {type === "Team" && (
          <TextField
            label="Bio"
            name="Bio"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {(type === "Due Dates" || type === "Events") && (
          <TextField
            label="Applicable to"
            name="Applicable to"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        )}
        {(type === "Events" || type === "Team") && (
          <FormControl fullWidth margin="normal">
            <InputLabel shrink={true} htmlFor="image"></InputLabel>
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {selectedFile && <p>{selectedFile.name}</p>}
          </FormControl>
        )}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
