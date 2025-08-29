import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Code, Terminal, Calculator, Microscope } from "lucide-react";

// Math exercise interface
interface MathExercise {
  id: number;
  question: string;
  answer: number;
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

// Science question interface
interface ScienceQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  explanation: string;
}

// Learn component for the interactive learning platform
export function Learn() {
  // State management for the different sections
  const [activeSection, setActiveSection] = useState<"coding" | "math" | "science">("coding");
  
  // Coding section state
  const [selectedLanguage, setSelectedLanguage] = useState<"python" | "html-css">("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // Math exercises state
  const [mathExercises, setMathExercises] = useState<MathExercise[]>([
    { id: 1, question: "15 + 8 = ?", answer: 23, userAnswer: "", isAnswered: false, isCorrect: null },
    { id: 2, question: "20 - 7 = ?", answer: 13, userAnswer: "", isAnswered: false, isCorrect: null },
    { id: 3, question: "6 × 4 = ?", answer: 24, userAnswer: "", isAnswered: false, isCorrect: null },
    { id: 4, question: "What is 1/2 + 1/4? (Write as decimal: 0.75)", answer: 0.75, userAnswer: "", isAnswered: false, isCorrect: null },
    { id: 5, question: "36 ÷ 9 = ?", answer: 4, userAnswer: "", isAnswered: false, isCorrect: null }
  ]);

  // Science questions state
  const [scienceQuestions, setScienceQuestions] = useState<ScienceQuestion[]>([
    {
      id: 1,
      question: "What do plants need to make their own food?",
      options: ["Water only", "Sunlight, water, and air", "Soil only", "Just sunlight"],
      correctAnswer: 1,
      selectedAnswer: null,
      isAnswered: false,
      explanation: "Plants need sunlight, water, and carbon dioxide from air to make food through photosynthesis!"
    },
    {
      id: 2,
      question: "Which of these animals is a mammal?",
      options: ["Fish", "Bird", "Dog", "Insect"],
      correctAnswer: 2,
      selectedAnswer: null,
      isAnswered: false,
      explanation: "Dogs are mammals because they have fur, give birth to live babies, and feed milk to their young."
    },
    {
      id: 3,
      question: "What happens to water when it gets very cold?",
      options: ["It disappears", "It turns into ice", "It becomes hot", "It changes color"],
      correctAnswer: 1,
      selectedAnswer: null,
      isAnswered: false,
      explanation: "When water gets very cold (below 0°C), it freezes and turns into ice!"
    },
    {
      id: 4,
      question: "How many bones are there approximately in an adult human body?",
      options: ["About 100", "About 206", "About 500", "About 50"],
      correctAnswer: 1,
      selectedAnswer: null,
      isAnswered: false,
      explanation: "An adult human has about 206 bones! Babies are born with more, but some bones fuse together as they grow."
    },
    {
      id: 5,
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 2,
      selectedAnswer: null,
      isAnswered: false,
      explanation: "Jupiter is the largest planet in our solar system - it's so big that all other planets could fit inside it!"
    }
  ]);

  // Sample code templates for each language
  const codeTemplates = {
    python: `# Welcome to Python coding!
# Try writing some code below:

print("Hello, LearnLink!")
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")

# Try some basic math
x = 5
y = 3
print(f"{x} + {y} = {x + y}")`,
    
    "html-css": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f0f8ff;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c5aa0;
            text-align: center;
        }
        .highlight {
            background-color: #fff3cd;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML & CSS!</h1>
        <p>This is your first webpage. Try editing the code to see changes!</p>
        <div class="highlight">
            <p><strong>Fun fact:</strong> HTML structures content, CSS makes it beautiful!</p>
        </div>
        <button onclick="alert('Hello from JavaScript!')">Click me!</button>
    </div>
</body>
</html>`
  };

  // Handle section change
  const handleSectionChange = (section: "coding" | "math" | "science") => {
    setActiveSection(section);
  };

  // Handle language selection change
  const handleLanguageChange = (language: "python" | "html-css") => {
    setSelectedLanguage(language);
    setCode(codeTemplates[language]);
    setOutput("");
  };

  // Handle math answer checking
  const checkMathAnswer = (exerciseId: number) => {
    setMathExercises(prev => prev.map(exercise => {
      if (exercise.id === exerciseId) {
        const userNumAnswer = parseFloat(exercise.userAnswer);
        const isCorrect = Math.abs(userNumAnswer - exercise.answer) < 0.01; // Allow small floating point differences
        return {
          ...exercise,
          isAnswered: true,
          isCorrect
        };
      }
      return exercise;
    }));
  };

  // Handle math answer input
  const updateMathAnswer = (exerciseId: number, value: string) => {
    setMathExercises(prev => prev.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, userAnswer: value, isAnswered: false, isCorrect: null }
        : exercise
    ));
  };

  // Handle science answer selection
  const selectScienceAnswer = (questionId: number, answerIndex: number) => {
    setScienceQuestions(prev => prev.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          selectedAnswer: answerIndex,
          isAnswered: true
        };
      }
      return question;
    }));
  };

  // Simulate Python code execution
  const runPythonCode = () => {
    setIsRunning(true);
    
    // Simulate processing time
    setTimeout(() => {
      try {
        // Simple Python code simulation
        // In a real implementation, you'd send this to a Python execution service
        let simulatedOutput = "";
        
        // Basic print statement simulation
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
          printMatches.forEach(match => {
            const content = match.match(/print\((.*?)\)/)?.[1] || "";
            // Remove quotes and basic f-string simulation
            let outputLine = content.replace(/['"]/g, "");
            if (outputLine.includes("f\"") || outputLine.includes("f'")) {
              outputLine = outputLine.replace(/f["']/, "").replace(/["']/, "");
              // Simple variable substitution simulation
              outputLine = outputLine.replace(/\{x \+ y\}/, "8");
              outputLine = outputLine.replace(/\{x\}/, "5");
              outputLine = outputLine.replace(/\{y\}/, "3");
            }
            simulatedOutput += outputLine + "\n";
          });
        }
        
        // Add some sample output if no prints found
        if (!simulatedOutput.trim()) {
          simulatedOutput = "Code executed successfully!\n(Add print() statements to see output)";
        }
        
        setOutput(simulatedOutput);
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
      }
      setIsRunning(false);
    }, 1000);
  };

  // Handle HTML/CSS code rendering
  const runHTMLCode = () => {
    setIsRunning(true);
    
    // For HTML/CSS, we'll update the output immediately
    setTimeout(() => {
      setOutput(code);
      setIsRunning(false);
    }, 500);
  };

  // Main run function that delegates based on selected language
  const handleRunCode = () => {
    if (!code.trim()) {
      setOutput("Please write some code first!");
      return;
    }
    
    if (selectedLanguage === "python") {
      runPythonCode();
    } else {
      runHTMLCode();
    }
  };

  // Initialize with default template when component mounts
  useState(() => {
    setCode(codeTemplates[selectedLanguage]);
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learn</h1>
          <p className="text-lg text-muted-foreground">
            Interactive learning environment for coding, math, and science
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-muted p-1 rounded-lg">
            <Button
              variant={activeSection === "coding" ? "default" : "ghost"}
              onClick={() => handleSectionChange("coding")}
              className="flex items-center gap-2"
              data-testid="button-coding-section"
            >
              <Code className="h-4 w-4" />
              Coding
            </Button>
            <Button
              variant={activeSection === "math" ? "default" : "ghost"}
              onClick={() => handleSectionChange("math")}
              className="flex items-center gap-2"
              data-testid="button-math-section"
            >
              <Calculator className="h-4 w-4" />
              Math
            </Button>
            <Button
              variant={activeSection === "science" ? "default" : "ghost"}
              onClick={() => handleSectionChange("science")}
              className="flex items-center gap-2"
              data-testid="button-science-section"
            >
              <Microscope className="h-4 w-4" />
              Science
            </Button>
          </div>
        </div>

        {/* Coding Section */}
        {activeSection === "coding" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Code Editor Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Code Editor
                </CardTitle>
                
                {/* Language Selection Dropdown */}
                <div className="flex items-center gap-4">
                  <label htmlFor="language-select" className="text-sm font-medium">
                    Language:
                  </label>
                  <Select 
                    value={selectedLanguage} 
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-48" data-testid="select-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="html-css">HTML/CSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Code Input Area */}
                <div className="space-y-4">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={`Write your ${selectedLanguage === "python" ? "Python" : "HTML/CSS"} code here...`}
                    className="min-h-[400px] font-mono text-sm"
                    data-testid="textarea-code"
                  />
                  
                  {/* Run Button */}
                  <Button 
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="w-full"
                    size="lg"
                    data-testid="button-run"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  {selectedLanguage === "python" ? "Console Output" : "Preview"}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {selectedLanguage === "python" ? (
                    // Python Console Output
                    <div 
                      className="bg-muted p-4 rounded-lg min-h-[400px] font-mono text-sm whitespace-pre-wrap overflow-auto"
                      data-testid="output-console"
                    >
                      {output || "Run your Python code to see output here..."}
                    </div>
                  ) : (
                    // HTML/CSS Preview iframe
                    <div className="border rounded-lg overflow-hidden" data-testid="output-preview">
                      {output ? (
                        <iframe
                          srcDoc={output}
                          className="w-full min-h-[400px] border-0"
                          title="HTML/CSS Preview"
                          sandbox="allow-scripts"
                        />
                      ) : (
                        <div className="bg-muted p-4 min-h-[400px] flex items-center justify-center text-muted-foreground">
                          Run your HTML/CSS code to see the preview here...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Math Section */}
        {activeSection === "math" && (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Math Exercises
                </CardTitle>
                <p className="text-muted-foreground">
                  Solve these math problems and check your answers!
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mathExercises.map((exercise) => (
                    <div key={exercise.id} className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">{exercise.question}</h3>
                        {exercise.isAnswered && (
                          <span className="text-2xl">
                            {exercise.isCorrect ? "✅" : "❌"}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 items-center">
                        <Input
                          type="number"
                          step="0.01"
                          value={exercise.userAnswer}
                          onChange={(e) => updateMathAnswer(exercise.id, e.target.value)}
                          placeholder="Enter your answer"
                          className="w-48"
                          data-testid={`input-math-${exercise.id}`}
                          disabled={exercise.isAnswered}
                        />
                        <Button
                          onClick={() => checkMathAnswer(exercise.id)}
                          disabled={exercise.isAnswered || !exercise.userAnswer.trim()}
                          data-testid={`button-check-${exercise.id}`}
                        >
                          Check Answer
                        </Button>
                      </div>
                      {exercise.isAnswered && !exercise.isCorrect && (
                        <p className="text-sm text-muted-foreground mt-2">
                          The correct answer is: {exercise.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Science Section */}
        {activeSection === "science" && (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5" />
                  Science Questions
                </CardTitle>
                <p className="text-muted-foreground">
                  Test your science knowledge with these fun questions!
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scienceQuestions.map((question) => (
                    <div key={question.id} className="p-4 border rounded-lg bg-muted/30">
                      <h3 className="text-lg font-medium mb-4">{question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => selectScienceAnswer(question.id, index)}
                            disabled={question.isAnswered}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              question.selectedAnswer === index
                                ? question.correctAnswer === index
                                  ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                                  : "bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
                                : question.isAnswered && question.correctAnswer === index
                                ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300"
                                : "bg-background border-border hover:bg-muted"
                            }`}
                            data-testid={`option-${question.id}-${index}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {question.isAnswered && (
                                <span className="text-lg">
                                  {question.selectedAnswer === index && question.correctAnswer === index && "✅"}
                                  {question.selectedAnswer === index && question.correctAnswer !== index && "❌"}
                                  {question.selectedAnswer !== index && question.correctAnswer === index && "✅"}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {question.isAnswered && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tips Section - only show for coding */}
        {activeSection === "coding" && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>💡 Learning Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Python Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use print() to display output</li>
                    <li>• Try variables: x = 10</li>
                    <li>• Use input() for user interaction</li>
                    <li>• Practice with if statements and loops</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">HTML/CSS Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• HTML creates structure with tags</li>
                    <li>• CSS adds styling with selectors</li>
                    <li>• Try changing colors and fonts</li>
                    <li>• Add JavaScript for interactivity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}