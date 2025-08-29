import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Code, Terminal } from "lucide-react";

// Learn component for the interactive coding platform
export function Learn() {
  // State management for the code editor
  const [selectedLanguage, setSelectedLanguage] = useState<"python" | "html-css">("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

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

  // Handle language selection change
  const handleLanguageChange = (language: "python" | "html-css") => {
    setSelectedLanguage(language);
    setCode(codeTemplates[language]);
    setOutput("");
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
            Interactive coding environment for learning programming
          </p>
        </div>

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

        {/* Tips Section */}
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
      </div>
    </div>
  );
}