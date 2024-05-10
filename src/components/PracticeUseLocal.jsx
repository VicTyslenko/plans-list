import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
const PracticeUseLocal = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <h1>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Change theme</button>
    </div>
  );
};

export default PracticeUseLocal;
