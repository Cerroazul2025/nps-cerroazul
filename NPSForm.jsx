import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://akqlymrnocmgbjxdfxhf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcWx5bXJub2NtZ2JqeGRmeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1Nzk1NjEsImV4cCI6MjA2MzE1NTU2MX0.eho6f2x56dasqAjZFCou2NLzHvcenBL4MLxTVde3maw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function NPSForm() {
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (score !== null) {
      const { error } = await supabase.from("respostas_nps").insert([{ score }]);
      if (!error) {
        setSubmitted(true);
      } else {
        alert("Erro ao enviar resposta. Tente novamente.");
        console.error(error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {!submitted ? (
        <div style={{ textAlign: 'center' }}>
          <h2>De 0 a 10, quanto você recomendaria o Cerro Azul Hotel Fazenda?</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {[...Array(11).keys()].map((num) => (
              <button
                key={num}
                style={{
                  padding: '10px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: score === num ? '2px solid #000' : '1px solid #ccc',
                  backgroundColor: score === num ? '#ccc' : '#fff'
                }}
                onClick={() => setScore(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            style={{ marginTop: '30px', padding: '10px 20px' }}
            onClick={handleSubmit}
            disabled={score === null}
          >
            Enviar
          </button>
        </div>
      ) : (
        <div style={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>
          Obrigado por sua resposta! Sua opinião é muito importante para nós.
        </div>
      )}
    </div>
  );
}