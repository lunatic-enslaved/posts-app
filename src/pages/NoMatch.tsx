import { useNavigate } from "react-router-dom";

import { Button } from "../components/UI/Button";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Страница не найдена</h1>
      <Button onClick={() => navigate("/")}>На главную</Button>
    </div>
  );
};

export default NoMatch;
