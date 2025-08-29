import { 
  type User, 
  type InsertUser, 
  type Content, 
  type InsertContent,
  type MentorProfile,
  type InsertMentorProfile,
  type Conversation,
  type InsertConversation,
  type Message,
  type InsertMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Content operations
  getAllContent(): Promise<Content[]>;
  getContent(id: string): Promise<Content | undefined>;
  createContent(content: InsertContent): Promise<Content>;

  // Mentor operations
  getAllMentors(): Promise<(MentorProfile & { user: User })[]>;
  getMentorProfile(userId: string): Promise<MentorProfile | undefined>;
  createMentorProfile(profile: InsertMentorProfile): Promise<MentorProfile>;

  // Conversation operations
  getUserConversations(userId: string): Promise<(Conversation & { student: User; mentor: User; messages: Message[] })[]>;
  getConversation(id: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;

  // Message operations
  getConversationMessages(conversationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private content: Map<string, Content>;
  private mentorProfiles: Map<string, MentorProfile>;
  private conversations: Map<string, Conversation>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.content = new Map();
    this.mentorProfiles = new Map();
    this.conversations = new Map();
    this.messages = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      displayName: insertUser.displayName ?? null,
      photoURL: insertUser.photoURL ?? null,
      bio: insertUser.bio ?? null,
      skills: insertUser.skills ? insertUser.skills as string[] : null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Content operations
  async getAllContent(): Promise<Content[]> {
    return Array.from(this.content.values());
  }

  async getContent(id: string): Promise<Content | undefined> {
    return this.content.get(id);
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const id = randomUUID();
    const content: Content = {
      ...insertContent,
      id,
      fileUrl: insertContent.fileUrl ?? null,
      thumbnailUrl: insertContent.thumbnailUrl ?? null,
      hasSignLanguage: insertContent.hasSignLanguage ?? null,
      hasCaptions: insertContent.hasCaptions ?? null,
      hasTranscript: insertContent.hasTranscript ?? null,
      isHighContrast: insertContent.isHighContrast ?? null,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
    };
    this.content.set(id, content);
    return content;
  }

  // Mentor operations
  async getAllMentors(): Promise<(MentorProfile & { user: User })[]> {
    const mentors: (MentorProfile & { user: User })[] = [];
    
    for (const profile of Array.from(this.mentorProfiles.values())) {
      const user = this.users.get(profile.userId);
      if (user) {
        mentors.push({ ...profile, user });
      }
    }
    
    return mentors;
  }

  async getMentorProfile(userId: string): Promise<MentorProfile | undefined> {
    return Array.from(this.mentorProfiles.values()).find(profile => profile.userId === userId);
  }

  async createMentorProfile(insertProfile: InsertMentorProfile): Promise<MentorProfile> {
    const id = randomUUID();
    const profile: MentorProfile = {
      ...insertProfile,
      id,
      company: insertProfile.company ?? null,
      expertise: insertProfile.expertise ? insertProfile.expertise as string[] : null,
      isAvailable: insertProfile.isAvailable ?? null,
      rating: 50, // Default 5.0 rating
      reviewCount: 0,
      createdAt: new Date(),
    };
    this.mentorProfiles.set(id, profile);
    return profile;
  }

  // Conversation operations
  async getUserConversations(userId: string): Promise<(Conversation & { student: User; mentor: User; messages: Message[] })[]> {
    const userConversations: (Conversation & { student: User; mentor: User; messages: Message[] })[] = [];
    
    for (const conversation of Array.from(this.conversations.values())) {
      if (conversation.studentId === userId || conversation.mentorId === userId) {
        const student = this.users.get(conversation.studentId);
        const mentor = this.users.get(conversation.mentorId);
        const messages = Array.from(this.messages.values())
          .filter(msg => msg.conversationId === conversation.id)
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        
        if (student && mentor) {
          userConversations.push({ ...conversation, student, mentor, messages });
        }
      }
    }
    
    return userConversations;
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      ...insertConversation,
      id,
      lastMessageAt: new Date(),
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  // Message operations
  async getConversationMessages(conversationId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    
    // Update conversation's lastMessageAt
    const conversation = this.conversations.get(insertMessage.conversationId);
    if (conversation) {
      conversation.lastMessageAt = new Date();
      this.conversations.set(conversation.id, conversation);
    }
    
    return message;
  }
}

export const storage = new MemStorage();
