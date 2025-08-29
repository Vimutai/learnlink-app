import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CloudUpload } from "lucide-react";
import { insertContentSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const uploadFormSchema = insertContentSchema.extend({
  files: z.any().optional(),
});

type UploadFormData = z.infer<typeof uploadFormSchema>;

export function ContentUpload() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState(false);

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "",
      contentType: "interactive",
      authorId: userProfile?.id || "",
      hasSignLanguage: false,
      hasCaptions: false,
      hasTranscript: false,
      isHighContrast: false,
    },
  });

  const onSubmit = async (data: UploadFormData) => {
    try {
      // TODO: Implement file upload to Firebase Storage and content creation
      console.log("Upload data:", data);
      toast({
        title: "Success",
        description: "Content uploaded successfully!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
    // TODO: Handle file upload
  };

  if (!userProfile || userProfile.role !== "mentor") {
    return (
      <div className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-muted-foreground">Only mentors can upload content.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Share Your Knowledge</h2>
          <p className="text-lg text-muted-foreground">
            Upload learning materials, create courses, and contribute to our growing knowledge base.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a descriptive title for your content..."
                          {...field}
                          data-testid="input-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Describe what learners will gain from this content..."
                          {...field}
                          data-testid="textarea-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select a category..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="data-science">Data Science</SelectItem>
                            <SelectItem value="sign-language">Sign Language</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-difficulty">
                              <SelectValue placeholder="Select difficulty..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-content-type">
                            <SelectValue placeholder="Select content type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="interactive">Interactive Content</SelectItem>
                          <SelectItem value="sign_language">Sign Language</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* File Upload */}
                <div className="space-y-4">
                  <Label>Upload Files</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    data-testid="dropzone-files"
                  >
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <CloudUpload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Drop files here or click to browse</p>
                        <p className="text-sm text-muted-foreground">Supports PDFs, videos, images, and documents</p>
                      </div>
                      <Button type="button" variant="outline" data-testid="button-browse-files">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Accessibility Options */}
                <div className="space-y-4">
                  <Label>Accessibility Features</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="hasSignLanguage"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-sign-language"
                            />
                          </FormControl>
                          <FormLabel className="text-sm cursor-pointer">
                            Include sign language interpretation
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasCaptions"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-captions"
                            />
                          </FormControl>
                          <FormLabel className="text-sm cursor-pointer">
                            Closed captions available
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasTranscript"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-transcript"
                            />
                          </FormControl>
                          <FormLabel className="text-sm cursor-pointer">
                            Transcript provided
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isHighContrast"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-high-contrast"
                            />
                          </FormControl>
                          <FormLabel className="text-sm cursor-pointer">
                            High contrast compatible
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    data-testid="button-save-draft"
                  >
                    Save as Draft
                  </Button>
                  <Button type="submit" className="flex-1" data-testid="button-publish-content">
                    Publish Content
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
