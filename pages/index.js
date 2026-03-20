import { useState } from "react";
import Onboarding from "../components/Onboarding";
import ParentDashboard from "../components/ParentDashboard";

export default function Home() {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return <Onboarding onSelect={setMode} />;
  }

  if (mode === "parent") {
    return <ParentDashboard />;
  }

  return <div>Child mode coming soon 👶</div>;
}
