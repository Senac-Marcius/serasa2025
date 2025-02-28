import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://esngyzvmtgvnhdydslez.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbmd5enZtdGd2bmhkeWRzbGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NDMwNTgsImV4cCI6MjA1NjAxOTA1OH0.O2jHscNv8lxsLaP9OvFVAdr_MKK4oQs-2cHLNENp_vY");

function App() {
  const [instruments, setInstruments] = useState<any[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("Launch").select('*');
    if (Array.isArray(data)) {
      setInstruments(data);
    } else {
      console.error('Erro ao buscar dados');
    }
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.id}</li>
      ))}
    </ul>
  );
}

export default App;