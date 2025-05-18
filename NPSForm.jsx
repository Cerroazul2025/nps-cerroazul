
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const supabaseUrl = "https://akqlymrnocmgbjxdfxhf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcWx5bXJub2NtZ2JqeGRmeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1Nzk1NjEsImV4cCI6MjA2MzE1NTU2MX0.eho6f2x56dasqAjZFCou2NLzHvcenBL4MLxTVde3maw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function NPSForm() {
  const [suite, setSuite] = useState("");
  const [data, setData] = useState("");
  const [cafe, setCafe] = useState(null);
  const [almocoJantar, setAlmocoJantar] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (suite && data && cafe !== null && almocoJantar !== null && hotel !== null) {
      const { error } = await supabase.from("respostas_nps").insert([
        {
          suite,
          data,
          cafe,
          almoco_jantar: almocoJantar,
          hotel,
        },
      ]);
      if (!error) {
        setSubmitted(true);
      } else {
        alert("Erro ao enviar resposta. Tente novamente.");
        console.error(error);
      }
    }
  };

  const getColor = (value) => {
    const gradient = [
      "bg-red-600",    // 0
      "bg-red-500",    // 1
      "bg-orange-500", // 2
      "bg-orange-400", // 3
      "bg-yellow-500", // 4
      "bg-yellow-400", // 5
      "bg-yellow-300", // 6
      "bg-lime-400",   // 7
      "bg-lime-500",   // 8
      "bg-green-500",  // 9
      "bg-green-600"   // 10
    ];
    return gradient[value] || "bg-gray-400";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl p-6">
        <CardContent>
          {!submitted ? (
            step === 1 ? (
              <div className="space-y-4 text-center">
                <h2 className="text-xl font-bold">Por favor, informe o número da suíte e a data da pesquisa:</h2>
                <input
                  type="text"
                  placeholder="Número da suíte"
                  value={suite}
                  onChange={(e) => setSuite(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <Button onClick={() => setStep(2)} disabled={!suite || !data}>Próximo</Button>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div>
                  <h2 className="text-xl font-bold">NPS Café da Manhã</h2>
                  <div className="flex justify-center flex-wrap gap-2 mt-2">
                    {[...Array(11).keys()].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCafe(num)}
                        className={`w-10 h-10 rounded text-white font-semibold ${getColor(num)} ${cafe === num ? "ring-4 ring-black" : ""}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold">NPS Almoço e Jantar</h2>
                  <div className="flex justify-center flex-wrap gap-2 mt-2">
                    {[...Array(11).keys()].map((num) => (
                      <button
                        key={num}
                        onClick={() => setAlmocoJantar(num)}
                        className={`w-10 h-10 rounded text-white font-semibold ${getColor(num)} ${almocoJantar === num ? "ring-4 ring-black" : ""}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold">NPS do Hotel (você recomendaria para um amigo ou parente?)</h2>
                  <div className="flex justify-center flex-wrap gap-2 mt-2">
                    {[...Array(11).keys()].map((num) => (
                      <button
                        key={num}
                        onClick={() => setHotel(num)}
                        className={`w-10 h-10 rounded text-white font-semibold ${getColor(num)} ${hotel === num ? "ring-4 ring-black" : ""}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="mt-6"
                  disabled={cafe === null || almocoJantar === null || hotel === null}
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
              </div>
            )
          ) : (
            <div className="text-center text-green-600 text-lg font-medium">
              Obrigado por sua resposta! Sua opinião é muito importante para nós.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
