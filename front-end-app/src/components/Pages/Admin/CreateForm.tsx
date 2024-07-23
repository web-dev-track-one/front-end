import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import DefaultPic from "../../../assets/default_pic.jpg";

interface CreateFormProps {
  type: string;
}

// type is either "Events", "Due Dates", "Announcements", or "Team"
const CreateForm = ({ type }: CreateFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customPic, setCustom] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

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

  useEffect(() => {
    setSelectedFile(null);
    setSuccess(false);
  }, [type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFail(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [fail]);

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

        if (!response.ok) {
          setFail(true);
          throw new Error("Failed to upload file");
        }

        formDataObject["Image"] = fileUrl;
      } catch (error) {
        setFail(true);
        console.error("Error uploading file:", error);
        return; // Abort the form submission if file upload fails
      }
    } else {
      formDataObject["Image"] = DefaultPic;
    }
    // Convert plain object to JSON
    const jsonString = JSON.stringify(formDataObject);

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
        setFail(true);
        throw new Error("Failed to submit form");
      }
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting form", error);
      setFail(true);
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
            value={new Date().toISOString().split("T")[0]}
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
            label={secondDate === "DateOfEvent" ? "Date Of Event" : secondDate}
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
          <div className="picture-input">
            <label htmlFor="image">
              <div className="pciture-choice">
                Choose a picture:{" "}
                <label>
                  <input
                    type="radio"
                    name="myRadio"
                    defaultChecked={true}
                    value="option1"
                    onClick={() => setCustom(false)}
                  />{" "}
                  Default
                </label>
                <label>
                  <input
                    type="radio"
                    name="myRadio"
                    value="option2"
                    onClick={() => setCustom(true)}
                  />{" "}
                  Custom
                </label>
              </div>
              {customPic && (
                <input
                  type="file"
                  id="image"
                  name="Image"
                  onChange={handleFileChange}
                />
              )}
            </label>
          </div>
        )}

        {!success && !fail && (
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          // This is done in order to prevent the user from submitting the form multiple times,
          // thus creating multiple pictures the s3 bucket
        )}

        {success && (
          <Button variant="contained" color="success">
            Success!
          </Button>
        )}
        {fail && (
          <Button variant="contained" color="error">
            Failed to submit form
          </Button>
        )}
      </form>
    </div>
  );
};

export default CreateForm;
