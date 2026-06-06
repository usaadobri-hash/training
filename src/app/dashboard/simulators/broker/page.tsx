"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, PhoneCall, Bot, User, Send, StopCircle, RefreshCcw } from "lucide-react";

type Message = { role: "broker" | "user" | "system", text: string, time: string };

type BrokerState = 
  | "GREETING"
  | "ASK_MC"
  | "PITCH_RATE"
  | "NEGOTIATING"
  | "FINAL_OFFER"
  | "DOCUMENTS"
  | "BOOKED";

export default function BrokerSimulation() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", text: "Call connected. You are talking to Mike from TQL Logistics.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { role: "broker", text: "TQL Logistics, Mike speaking. Got an empty truck?", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [brokerState, setBrokerState] = useState<BrokerState>("GREETING");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getTime = () => new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");
    
    setMessages(prev => [...prev, { role: "user", text: userText, time: getTime() }]);
    setIsTyping(true);

    // Simulate broker typing delay
    setTimeout(() => {
      processBrokerLogic(userText);
      // eslint-disable-next-line
    }, 1500 + Math.random() * 1500);
  };

  const processBrokerLogic = (userText: string) => {
    setIsTyping(false);
    const lowerText = userText.toLowerCase();
    let reply = "";
    let nextState = brokerState;

    // Broker State Machine Logic
    switch (brokerState) {
      case "GREETING":
        if (lowerText.includes("yes") || lowerText.includes("truck") || lowerText.includes("empty") || lowerText.includes("have")) {
          reply = "Cool. Where's it empty at and what's your MC number so I can pull you up?";
          nextState = "ASK_MC";
        } else {
          reply = "I'm looking for empties man, you got a truck or not? What's your MC?";
          nextState = "ASK_MC";
        }
        break;

      case "ASK_MC":
        if (/\d/.test(lowerText) || lowerText.includes("mc")) {
          reply = "Alright, got it. Looks like you're approved. I got a load picking up in Chicago going down to Dallas, TX. 44k lbs, dry van. It's ready now. I can do $1,200 on it.";
          nextState = "PITCH_RATE";
        } else {
          reply = "I can't do anything without an MC number buddy. Just give me any 6 or 7 digit number to simulate it.";
        }
        break;

      case "PITCH_RATE":
        if (lowerText.includes("deal") || lowerText.includes("take it") || lowerText.includes("book") || lowerText.includes("yes") || lowerText.includes("ok")) {
          reply = "Awesome. We're booked at $1,200. Send over your COI and NOA and I'll shoot the rate con over. Email is mike@tql.com.";
          nextState = "DOCUMENTS";
        } else if (lowerText.includes("more") || lowerText.includes("low") || lowerText.includes("cheap") || lowerText.includes("$") || /\d/.test(lowerText)) {
          reply = "Look man, trucks are everywhere in Chicago today. Market is soft. I can maybe stretch it to $1,350 but that's all I got in it.";
          nextState = "NEGOTIATING";
        } else {
          reply = "So what do you think? $1,200. Are we doing this or should I post it back on the board?";
        }
        break;

      case "NEGOTIATING":
        if (lowerText.includes("deal") || lowerText.includes("take it") || lowerText.includes("book") || lowerText.includes("yes") || lowerText.includes("ok")) {
          reply = "Alright, booked at $1,350. Send me your COI and I'll get the rate con over to you.";
          nextState = "DOCUMENTS";
        } else if (lowerText.includes("more") || lowerText.includes("1500") || lowerText.includes("1400") || lowerText.includes("higher")) {
          reply = "Tell you what. $1,400. That is my absolute max. I'm literally losing money on this just to get it moved. Take it or I'm calling the next guy.";
          nextState = "FINAL_OFFER";
        } else {
          reply = "$1,350 is a fair rate today buddy. Take it or leave it.";
        }
        break;

      case "FINAL_OFFER":
        if (lowerText.includes("deal") || lowerText.includes("take it") || lowerText.includes("book") || lowerText.includes("yes") || lowerText.includes("ok")) {
          reply = "Perfect. $1,400 it is. Send the COI and NOA to my email and I'll send the rate con. Send 'sent' when you're done.";
          nextState = "DOCUMENTS";
        } else {
          reply = "I'm not going a penny over $1,400. Click. (He hangs up on you)";
          setMessages(prev => [...prev, 
            { role: "broker", text: reply, time: getTime() },
            { role: "system", text: "Call disconnected. You pushed too hard and lost the load.", time: getTime() }
          ]);
          return;
        }
        break;

      case "DOCUMENTS":
        if (lowerText.includes("sent") || lowerText.includes("done") || lowerText.includes("email") || lowerText.includes("coi") || lowerText.includes("noa")) {
          reply = "Got it. Your setup looks good. Rate con is in your inbox. Make sure your driver calls in for dispatch. Thanks buddy.";
          nextState = "BOOKED";
        } else {
          reply = "Waiting on those docs. COI and NOA to mike@tql.com.";
        }
        break;

      case "BOOKED":
        reply = "We're all set man. Call me when the driver is loaded.";
        break;
    }

    setBrokerState(nextState);
    setMessages(prev => [...prev, { role: "broker", text: reply, time: getTime() }]);
    
    if (nextState === "BOOKED" && brokerState !== "BOOKED") {
       setTimeout(() => {
         setMessages(prev => [...prev, { role: "system", text: "Call disconnected. Load successfully booked!", time: getTime() }]);
       }, 2000);
    }
  };

  const handleRestart = () => {
    setMessages([
      { role: "system", text: "Call connected. You are talking to Mike from TQL Logistics.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
      { role: "broker", text: "TQL Logistics, Mike speaking. Got an empty truck?", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    ]);
    setBrokerState("GREETING");
    setInputValue("");
    setIsTyping(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col pb-6">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/modules">
            <div className="h-10 w-10 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
            </div>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">AI Phone Call</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Live Rate Negotiation</h1>
          </div>
        </div>
        
        <Button onClick={handleRestart} variant="outline" className="bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-900 dark:text-white">
          <RefreshCcw className="w-4 h-4 mr-2" /> Restart Call
        </Button>
      </div>

      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 flex flex-col flex-1 overflow-hidden shadow-2xl relative">
        <CardHeader className="bg-zinc-50 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-white/5 py-4 shrink-0 flex flex-row items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30 relative">
              <Bot className="w-6 h-6 text-blue-400" />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-zinc-900 rounded-full animate-pulse"></span>
            </div>
            <div>
              <CardTitle className="text-zinc-900 dark:text-white text-lg flex items-center gap-2">
                Mike
                <Badge variant="outline" className="text-[10px] bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20">TQL BROKER</Badge>
              </CardTitle>
              <CardDescription className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-green-500 dark:text-green-400" /> Call in progress...
              </CardDescription>
            </div>
          </div>
          <Button variant="destructive" onClick={handleRestart} className="rounded-full px-6 font-bold shadow-lg shadow-red-500/20">
            <StopCircle className="w-4 h-4 mr-2" /> Hang Up
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col bg-zinc-100 dark:bg-[#1a1b1e]">
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-6 pb-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}>
                  
                  {msg.role === 'system' ? (
                    <div className="bg-white/60 dark:bg-black/30 border border-zinc-300 dark:border-white/5 px-4 py-2 rounded-full text-xs font-mono text-zinc-500 dark:text-zinc-400 shadow-sm dark:shadow-none">
                      {msg.text}
                    </div>
                  ) : (
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                        {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                      </div>
                      <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-5 py-3 rounded-2xl text-[15px] ${
                          msg.role === 'user' 
                            ? 'bg-purple-600 text-white rounded-tr-sm shadow-md' 
                            : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm border border-zinc-200 dark:border-zinc-700 leading-relaxed shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[11px] text-zinc-500 mt-1.5 px-1 font-medium">{msg.time}</span>
                      </div>
                    </div>
                  )}

                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%] flex-row">
                    <div className="h-10 w-10 rounded-full bg-blue-600/50 flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-white/50" />
                    </div>
                    <div className="px-5 py-4 rounded-2xl bg-white/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-tl-sm border border-zinc-200/50 dark:border-zinc-700/50 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-white/5 shrink-0">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your response to Mike..."
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 rounded-full py-4 pl-6 pr-14 text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-[15px] shadow-sm"
                disabled={isTyping || brokerState === "BOOKED"}
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping || brokerState === "BOOKED"}
                className="absolute right-2 h-10 w-10 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
