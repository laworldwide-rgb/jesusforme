import { useState } from "react";
import ModeSelect from "../components/ModeSelect";

export default function Home() {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return <ModeSelect onSelect={setMode} />;
  }

  return <div>You picked: {mode}</div>;
}
