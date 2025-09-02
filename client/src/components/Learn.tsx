import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Crown } from "lucide-react";

// Interfaces
interface MathExercise {
  id: number;
  question: string;
  answer: number;
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean | null;
  isPremium: boolean;
}

interface ScienceQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  explanation: string;
  isPremium: boolean;
}

// Learn component
export function Learn() {
  const [activeSection, setActiveSection] = useState<"coding" | "math" | "science">("coding");
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);

  // Coding
  const [selectedLanguage, setSelectedLanguage] = useState<"python" | "html-css" | "javascript">("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // Example math exercise
  const [mathExercises, setMathExercises] = useState<MathExercise[]>([
    { id: 1, question: "15 + 8 = ?", answer: 23, userAnswer: "", isAnswered: false, isCorrect: null, isPremium: false },
    { id: 6, question: "Solve 2x+5=15", answer: 5, userAnswer: "", isAnswered: false, isCorrect: null, isPremium: true },
  ]);

  // Handlers
  const handleUpgrade = () => setHasPremiumAccess(true);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learn</h1>
          <p className="text-lg text-muted-foreground">
            Interactive learning for coding, math, and science
          </p>

          {!hasPremiumAccess && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-amber-800">Unlock Premium Features</h3>
                  <p className="text-sm text-amber-700">
                    Access advanced content and JavaScript programming
                  </p>
                </div>
              </div>
              <Button
                onClick={handleUpgrade}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Upgrade
              </Button>
            </div>
          )}
        </div>

        {/* Section selection */}
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={() => setActiveSection("coding")}>Coding</Button>
          <Button onClick={() => setActiveSection("math")}>Math</Button>
          <Button onClick={() => setActiveSection("science")}>Science</Button>
        </div>

        {/* Coding Section */}
        {activeSection === "coding" && (
          <Card className="max-w-3xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Coding ({selectedLanguage})</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mb-4"
                rows={6}
              />
              <Button onClick={() => setOutput(code)}>Run Code</Button>
              {output && <p className="mt-2">Output: {output}</p>}
            </CardContent>
          </Card>
        )}

        {/* Math Section */}
        {activeSection === "math" && (
          <div className="max-w-3xl mx-auto space-y-4">
            {mathExercises
              .filter((ex) => !ex.isPremium || hasPremiumAccess)
              .map((ex) => (
                <Card key={ex.id}>
                  <CardContent>
                    <p>{ex.question}</p>
                    <Input
                      value={ex.userAnswer}
                      onChange={(e) =>
                        setMathExercises((prev) =>
                          prev.map((m) =>
                            m.id === ex.id ? { ...m, userAnswer: e.target.value } : m
                          )
                        )
                      }
                      className="my-2"
                    />
                    <Button
                      onClick={() =>
                        setMathExercises((prev) =>
                          prev.map((m) =>
                            m.id === ex.id
                              ? { ...m, isAnswered: true, isCorrect: parseFloat(m.userAnswer) === m.answer }
                              : m
                          )
                        )
                      }
                    >
                      Check Answer
                    </Button>
                    {ex.isAnswered && (
                      <p className="mt-1">{ex.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

      </div>
    </div>
  );
}
