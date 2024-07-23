import SearchBy from "./SearchBy";
import GetAll from "./GetAll";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

interface SearchProps {
  type: string;
  searchPurpose: string;
}

const Search = ({ type, searchPurpose }: SearchProps) => {
  const [getAll, setGetAll] = useState(false);
  const [searchBy, setSearchBy] = useState(false);

  const [searchTypes, setSearchTypes] = useState("");

  useEffect(() => {
    setGetAll(false);
    setSearchBy(false);
    if (type === "Events") {
      setSearchTypes("Title, Author or Text");
    } else if (type === "Announcements") {
      setSearchTypes("Title, Author or Keywords");
    } else if (type === "Due Dates") {
      setSearchTypes("Title, Author or Keywords");
    } else {
      setSearchTypes("Name, Role or Bio");
    }
  }, [type]);

  const handleGetEverything = () => {
    setGetAll(true);
    setSearchBy(false);
  };
  return (
    <div className="search-form-container">
      <div className="search-form-buttons">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setSearchBy(true);
            setGetAll(false);
          }}
        >
          Search by {searchTypes}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGetEverything}
        >
          Get Everything
        </Button>
      </div>
      <div className="search-form-results">
        {getAll ? (
          <GetAll eventType={searchPurpose} docType={type} />
        ) : (
          searchBy && <SearchBy eventType={searchPurpose} docType={type} />
        )}
      </div>
    </div>
  );
};

export default Search;
