import React, { useEffect, useState } from "react";

const ProfilesApiComponent = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("https://mom-network-backend.herokuapp.com/profiles")
      .then((response) => response.json())
      .then((data) => {
        // Check if data has a "results" property
        const profilesData = data.results || [];

        // Set the "results" array to the profiles state
        setProfiles(profilesData);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.log(
          "Could not fetch the Mom Network API because of this error: ",
          error.message
        );
      });
  }, []);

  // Function to group profiles into columns
  const groupProfilesIntoColumns = (profiles, columnsCount) => {
    const profilesPerColumn = Math.ceil(profiles.length / columnsCount);
    const columns = [];

    for (let i = 0; i < columnsCount; i++) {
      const startIndex = i * profilesPerColumn;
      const endIndex = startIndex + profilesPerColumn;
      columns.push(profiles.slice(startIndex, endIndex));
    }

    return columns;
  };

  // Group profiles into three columns
  const columns = groupProfilesIntoColumns(profiles, 3);

  return (
    <div>
      <br />
      <br />
      <h2>Profiles</h2>
      <br />
      <br />

      <div className="row">
        {columns.map((column, columnIndex) => (
          <div className="col-md-4" key={columnIndex}>
            {column.map((profile) => (
              <div key={profile.id} style={{ marginBottom: "20px" }}>
                <h4>{profile.owner}</h4>
                {profile.image && (
                  <img
                    src={profile.image}
                    alt={`Profile of ${profile.owner}`}
                    style={{
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                    }}
                  />
                )}
                <p>Bio: {profile.bio}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilesApiComponent;