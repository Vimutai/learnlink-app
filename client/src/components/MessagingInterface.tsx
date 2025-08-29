import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Info } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Conversation, Message, User } from "@shared/schema";

type ConversationWithUsers = Conversation & {
  student: User;
  mentor: User;
  messages: Message[];
};

export function MessagingInterface() {
  const { userProfile } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { data: conversations = [] } = useQuery<ConversationWithUsers[]>({
    queryKey: ["/api/conversations"],
    enabled: !!userProfile,
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // TODO: Implement message sending
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  if (!userProfile) {
    return (
      <div className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to access messages</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Connect & Communicate</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our integrated messaging system makes it easy to connect with mentors, ask questions,
            and collaborate on learning projects.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-3 h-96">
            {/* Conversation List */}
            <div className="bg-muted/50 border-r border-border">
              <CardHeader className="border-b border-border">
                <h3 className="font-semibold">Messages</h3>
              </CardHeader>
              <div className="space-y-1">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No conversations yet
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const otherUser = userProfile.role === "student" ? conversation.mentor : conversation.student;
                    const lastMessage = conversation.messages[conversation.messages.length - 1];
                    
                    return (
                      <div
                        key={conversation.id}
                        className={`p-4 hover:bg-muted/80 cursor-pointer transition-colors ${
                          selectedConversation === conversation.id ? "border-l-4 border-primary" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                        data-testid={`conversation-${conversation.id}`}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={otherUser.photoURL || undefined} />
                            <AvatarFallback>
                              {otherUser.displayName?.charAt(0) || otherUser.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate" data-testid={`user-name-${conversation.id}`}>
                              {otherUser.displayName || otherUser.email}
                            </p>
                            {lastMessage && (
                              <p className="text-xs text-muted-foreground truncate" data-testid={`last-message-${conversation.id}`}>
                                {lastMessage.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="md:col-span-2 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage 
                            src={(userProfile.role === "student" ? selectedConv.mentor : selectedConv.student).photoURL || undefined} 
                          />
                          <AvatarFallback>
                            {(userProfile.role === "student" ? selectedConv.mentor : selectedConv.student).displayName?.charAt(0) || 
                             (userProfile.role === "student" ? selectedConv.mentor : selectedConv.student).email.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium" data-testid="selected-user-name">
                            {(userProfile.role === "student" ? selectedConv.mentor : selectedConv.student).displayName || 
                             (userProfile.role === "student" ? selectedConv.mentor : selectedConv.student).email}
                          </p>
                          <p className="text-xs text-muted-foreground">Online now</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" data-testid="button-user-info">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {selectedConv.messages.length === 0 ? (
                      <div className="text-center text-muted-foreground">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      selectedConv.messages.map((message) => {
                        const isMyMessage = message.senderId === userProfile.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex items-start space-x-3 ${isMyMessage ? "justify-end" : ""}`}
                            data-testid={`message-${message.id}`}
                          >
                            {!isMyMessage && (
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                  {(userProfile.role === "student" ? selectedConv.mentor : selectedConv.student).displayName?.charAt(0) || 
                                   (userProfile.role === "student" ? selectedConv.mentor : selectedConv.student).email.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`rounded-lg p-3 max-w-xs ${
                              isMyMessage 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            }`}>
                              <p className="text-sm" data-testid={`message-content-${message.id}`}>
                                {message.content}
                              </p>
                              <p className={`text-xs mt-2 ${
                                isMyMessage ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`} data-testid={`message-time-${message.id}`}>
                                {new Date(message.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                            {isMyMessage && (
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={userProfile.photoURL || undefined} />
                                <AvatarFallback>Me</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Message Input */}
                  <CardContent className="border-t border-border p-4">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                        data-testid="input-message"
                      />
                      <Button type="submit" size="sm" data-testid="button-send-message">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <p>Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
