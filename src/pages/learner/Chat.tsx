import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MoreVertical, Phone, Video as VideoIcon, 
  Smile, Paperclip, Send, Mic, CheckCircle2, Image as ImageIcon
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

/* ============================================================
   MOCK DATA
   ============================================================ */
const contacts = [
  { id: '1', name: 'Sarah Chen', role: 'Instructor', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Great job on the assignment!', time: '10:42 AM', unread: 2, online: true },
  { id: '2', name: 'React Study Group', role: 'Group • 12 Members', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Has anyone finished module 4?', time: 'Yesterday', unread: 0, online: false },
  { id: '3', name: 'Marcus Johnson', role: 'Instructor', avatar: 'https://i.pravatar.cc/150?img=11', lastMessage: 'The new syllabus is up.', time: 'Tue', unread: 0, online: true },
  { id: '4', name: 'Emma Wilson', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Thanks for the help!', time: 'Mon', unread: 0, online: false },
];

const messages = [
  { id: 1, sender: 'Sarah Chen', senderId: '1', avatar: 'https://i.pravatar.cc/150?img=1', text: 'Hi Alex! I reviewed your recent submission for the Compound Components assignment.', time: '10:30 AM', isMe: false },
  { id: 2, sender: 'Alex Student', senderId: 'me', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Oh great, thanks! How did it look?', time: '10:32 AM', isMe: true },
  { id: 3, sender: 'Sarah Chen', senderId: '1', avatar: 'https://i.pravatar.cc/150?img=1', text: 'Your implementation of the Context API was spot on. Very clean architecture.', time: '10:35 AM', isMe: false },
  { id: 4, sender: 'Sarah Chen', senderId: '1', avatar: 'https://i.pravatar.cc/150?img=1', text: 'Great job on the assignment! Keep it up.', time: '10:42 AM', isMe: false },
];

export default function Chat() {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [inputText, setInputText] = useState('');

  return (
    <div className="h-[calc(100vh-64px-3rem)] -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 flex overflow-hidden bg-background">
      
      {/* Sidebar: Contacts List */}
      <div className="w-full max-w-[320px] shrink-0 border-r border-border bg-card flex flex-col hidden md:flex">
        {/* Header & Search */}
        <div className="p-4 border-b border-border space-y-4">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>
        
        {/* Contacts */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide space-y-1">
          {contacts.map((contact) => {
            const isActive = activeContact.id === contact.id;
            return (
              <button 
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                  isActive ? "bg-primary/10" : "hover:bg-muted/50"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar src={contact.avatar} className="h-12 w-12 border border-border" />
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn("font-bold text-sm truncate", isActive ? "text-primary" : "text-foreground")}>{contact.name}</span>
                    <span className={cn("text-[10px] whitespace-nowrap", isActive ? "text-primary/80 font-medium" : "text-text-secondary")}>{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs truncate", isActive ? "text-foreground font-medium" : "text-text-secondary")}>{contact.lastMessage}</span>
                    {contact.unread > 0 && (
                      <span className="h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 ml-2 shadow-sm">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        {/* Chat Header */}
        <div className="h-16 shrink-0 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar src={activeContact.avatar} className="h-10 w-10 border border-border" />
              {activeContact.online && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-success rounded-full border-2 border-card" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">{activeContact.name}</h3>
              <p className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">{activeContact.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="h-9 w-9 rounded-xl flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-muted transition-colors"><Phone className="h-4 w-4" /></button>
            <button className="h-9 w-9 rounded-xl flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-muted transition-colors"><VideoIcon className="h-4 w-4" /></button>
            <div className="w-px h-5 bg-border mx-1" />
            <button className="h-9 w-9 rounded-xl flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-muted transition-colors"><MoreVertical className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide">
          <div className="text-center">
            <span className="text-xs font-medium text-text-secondary bg-muted px-3 py-1 rounded-full border border-border">Today</span>
          </div>
          
          {messages.map((msg, i) => {
            const showAvatar = !msg.isMe && (i === 0 || messages[i-1].senderId !== msg.senderId);
            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn("flex gap-3", msg.isMe ? "justify-end" : "justify-start")}
              >
                {!msg.isMe && (
                  <div className="w-8 shrink-0">
                    {showAvatar && <Avatar src={msg.avatar} className="h-8 w-8" />}
                  </div>
                )}
                
                <div className={cn("flex flex-col", msg.isMe ? "items-end" : "items-start", "max-w-[75%]")}>
                  <div className={cn(
                    "px-4 py-2.5 rounded-2xl shadow-sm text-sm",
                    msg.isMe 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-card border border-border text-foreground rounded-tl-sm"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-text-secondary mt-1 font-medium px-1 flex items-center gap-1">
                    {msg.time} {msg.isMe && <CheckCircle2 className="h-3 w-3 text-primary" />}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-card border-t border-border">
          <div className="flex items-end gap-2 bg-muted/30 border border-border rounded-[24px] p-2 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all shadow-sm">
            <div className="flex gap-1 pb-1 px-1">
              <button className="h-8 w-8 rounded-full flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-muted transition-colors"><Paperclip className="h-4 w-4" /></button>
              <button className="h-8 w-8 rounded-full flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-muted transition-colors"><ImageIcon className="h-4 w-4" /></button>
            </div>
            
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-0 focus:ring-0 resize-none max-h-32 py-2.5 px-2 text-sm text-foreground placeholder-text-secondary"
              rows={1}
            />
            
            <div className="flex gap-1 pb-1 pr-1">
              <button className="h-8 w-8 rounded-full flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-muted transition-colors"><Smile className="h-4 w-4" /></button>
              {inputText.length > 0 ? (
                <button className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"><Send className="h-4 w-4" /></button>
              ) : (
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-text-secondary hover:text-foreground hover:bg-muted transition-colors"><Mic className="h-4 w-4" /></button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
