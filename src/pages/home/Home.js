import React from "react";
import Feed from "../../components/Feed";
import Create from "../../components/Create";
import Button from "@mui/material/Button";

function Home() {
  const uid = localStorage.getItem("uid");

  const [cats, setCats] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [openCreate, setOpenCreate] = React.useState(false);

  React.useEffect(() => {
    getData();
    getCurrentUser()
    return () => { };
  }, []);

  const handleLikeEvent = (event, index) => {
    getData();
  };

  const handleClickOpenDialog = () => {
    setOpenCreate(true);
  };

  const handleCloseDialog = () => {
    setOpenCreate(false);
    getData();
  };


  async function getCurrentUser() {
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUser(data);
    return data;
  }

  async function getData() {
    const response = await fetch("http://localhost:4000/api/cats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCats([...data]);
  }

  return (
    <div>

      {(user && user.role === "admin") ? (
        <Button variant="outlined" onClick={handleClickOpenDialog} sx={{ m: 1 }}>
          Create New Cat
        </Button>
      ) : null}

      {Array.from(cats).map((cat, index) => (
        <Feed data={cat} key={index} onLike={handleLikeEvent} />
      ))}

      <Create open={openCreate} handleClose={handleCloseDialog} />
    </div>
  );
}
export default Home;
