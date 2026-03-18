import { useState } from "react";
import ModeSelect from "../components/ModeSelect";
import ParentDashboard from "../components/ParentDashboard";

export default function Home() {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return <ModeSelect onSelect={setMode} />;
  }

  if (mode === "parent") {
    return <ParentDashboard />;
  }

  return <div>Child mode coming next</div>;
}
