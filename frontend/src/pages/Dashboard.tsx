import { Button } from "@mantine/core";
import axios from "axios";
import { useState } from "react";

export default function Dashboard() {
  const [response, setResponse] = useState("");

  const testAdonis = async () => {
    try {
      const { data } = await axios.post("http://localhost:3333/test", {
        withCredentials: true
      });
      console.log(data);
      setResponse(data);
    } catch (err) {
      console.log(err.response.data.message);
      setResponse(err.response.data);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        paddingTop: 60,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={testAdonis}>Test Adonis</Button>
      <br />
      <br />
      <p>{JSON.stringify(response)}</p>
    </div>
  );
}
