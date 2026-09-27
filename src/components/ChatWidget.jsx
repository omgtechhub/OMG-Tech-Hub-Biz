import { useState, useRef, useEffect, useCallback } from 'react';

const quickReplies = [
  'Our Services',
  'Pricing',
  'Timeline',
  'Get Started',
];

function getBotResponse(message) {
  const msg = message.toLowerCase().trim();

  if (/\b(hello|hi|hey|good morning|good afternoon|good evening|good day)\b/.test(msg)) {
    return "Hello! I'm here to help. Ask me about our services, pricing, process, or anything else!";
  }
  if (/\b(thank|thanks|thank you|appreciated)\b/.test(msg)) {
    return "You're welcome! Is there anything else I can help with?";
  }
  if (/\b(services?|what do you do|offer|what you do|what can you do)\b/.test(msg)) {
    return "We offer a full range of premium creative services:\n\n• Brand Identity Design\n• Graphic Design\n• UI/UX Design\n• Web Development\n• Video Editing\n• Motion Graphics\n• Animation\n• Digital Product Design\n• Creative Consulting\n\nWould you like to know more about any specific service?";
  }
  if (/\b(price|pricing|cost|how much|charge|budget|rate|rates|fee|fees|quote)\b/.test(msg)) {
    return "Here's a general guide to our pricing:\n\n• Graphic Design — from ₦80,000\n• UI/UX Design — from ₦150,000\n• Web Development — from ₦200,000\n• Motion Graphics — from ₦100,000\n\nFinal pricing depends on project scope and complexity. Visit our Pricing page for full details, or contact us for a custom quote!";
  }
  if (/\b(timeline|how long|time|duration|turnaround|deadline|when)\b/.test(msg)) {
    return "Typical project timelines:\n\n• Brand Identity — 2–4 weeks\n• Website Development — 4–8 weeks\n• UI/UX Design — 3–6 weeks\n• Motion Graphics — 2–3 weeks\n\nExact timelines depend on project scope and complexity. We'll provide a detailed timeline during the discovery phase.";
  }
  if (/\b(start|get started|begin|project|hire|work with|new project)\b/.test(msg)) {
    return "Great, let's get started! You can:\n\n1. Visit our Contact page to fill out the project form\n2. WhatsApp us directly at +234 708 432 1204\n3. Email us at omgtechhub@gmail.com\n\nWe respond within 24 hours and offer a free initial consultation!";
  }
  if (/\b(process|how do you work|workflow|steps|methodology|approach)\b/.test(msg)) {
    return "Our refined 7-step creative process:\n\n1. Discovery — Understanding your needs\n2. Strategy — Crafting the roadmap\n3. Design — Premium visual execution\n4. Development — Technical build\n5. Testing — Quality assurance\n6. Launch — Strategic deployment\n7. Support — Ongoing partnership\n\nVisit our Process page for full details!";
  }
  if (/\b(payment|deposit|pay|invoice|billing|installment)\b/.test(msg)) {
    return "Our payment terms:\n\n• 50% deposit to begin work\n• Remaining balance on project completion\n• We accept NGN, USD, and GBP\n• Milestone payments available for larger projects\n\nPayment details are included in your project invoice.";
  }
  if (/\b(location|where|based|address|office|city|country)\b/.test(msg)) {
    return "We're based in Benin City, Edo State, Nigeria. We serve clients globally and all collaboration is remote-friendly via Slack, Zoom, and Notion.";
  }
  if (/\b(contact|email|phone|whatsapp|reach|call)\b/.test(msg)) {
    return "You can reach us through:\n\n• Email: omgtechhub@gmail.com\n• WhatsApp: +234 708 432 1204\n• Or visit our Contact page\n\nWe typically respond within 24 hours!";
  }
  if (/\b(portfolio|work|projects|examples|case stud)\b/.test(msg)) {
    return "You can view our latest work on our Portfolio page! We've completed projects across brand identity, web development, UI/UX design, motion graphics, and more for clients in Nigeria, UK, USA, and Canada.";
  }
  if (/\b(revision|revisions|changes|edits|feedback)\b/.test(msg)) {
    return "Every project includes 2–3 structured revision rounds (depending on the package). Additional revisions beyond the agreed number can be accommodated at an extra cost. We work with you until you're 100% satisfied!";
  }

  return "I'd love to help with that! For detailed questions, please contact us directly at omgtechhub@gmail.com or WhatsApp +234 708 432 1204. We respond within 24 hours!";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hey! 👋 I'm OMG Assistant. How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showBadge, setShowBadge] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleSend = useCallback(
    (text) => {
      const userMessage = (text || inputValue).trim();
      if (!userMessage) return;

      setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
      setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        const response = getBotResponse(userMessage);
        setMessages((prev) => [...prev, { role: 'bot', text: response }]);
        setIsTyping(false);
      }, 800);
    },
    [inputValue]
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setShowBadge(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes chat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chat-badge-pop {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes chat-dot-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }

        @media (max-width: 640px) {
          .chat-panel {
            right: 8px !important;
            left: 8px !important;
            width: auto !important;
            max-width: calc(100vw - 16px) !important;
            bottom: 158px !important;
            max-height: calc(100svh - 180px) !important;
          }
        }
      `}</style>

      {isOpen && (
        <div
          className="chat-panel"
          style={{
            position: 'fixed',
            bottom: '156px',
            right: '24px',
            width: '380px',
            maxWidth: '380px',
            maxHeight: '520px',
            borderRadius: '20px',
            background: 'var(--t-surface)',
            border: '1px solid var(--t-border)',
            zIndex: 900,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chat-slide-up 0.3s ease forwards',
            boxShadow: '0 20px 60px var(--t-shadow)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <div
            style={{
              padding: '18px 20px',
              borderBottom: '1px solid var(--t-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--t-surface)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--t-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '11px',
                  color: 'var(--t-on-accent)',
                  flexShrink: 0,
                }}
              >
                OMG
              </div>
              <div>
                <div style={{ color: 'var(--t-text)', fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>
                  OMG Assistant
                </div>
                <div
                  style={{
                    color: 'var(--t-text-2)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '2px',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#25d366',
                      display: 'inline-block',
                    }}
                  />
                  Online &middot; Usually replies instantly
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              data-cursor="hover"
              aria-label="Close chat"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--t-text-5)',
                fontSize: '20px',
                cursor: 'none',
                padding: '4px 8px',
                borderRadius: '8px',
                transition: 'color 0.2s, background 0.2s',
                lineHeight: 1,
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--t-text)';
                e.currentTarget.style.background = 'var(--t-hover-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--t-text-5)';
                e.currentTarget.style.background = 'none';
              }}
            >
              &#x2715;
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius:
                      msg.role === 'user'
                        ? '16px 16px 4px 16px'
                        : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'var(--t-accent)' : 'var(--t-bg)',
                    color: msg.role === 'user' ? '#fff' : 'var(--t-text-3)',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--t-border-s)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 20px',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'var(--t-bg)',
                    border: '1px solid var(--t-border-s)',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--t-text-5)',
                        display: 'inline-block',
                        animation: `chat-dot-bounce 1.2s ${dot * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 1 && !isTyping && (
            <div
              style={{
                padding: '0 16px 12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  data-cursor="hover"
                  onClick={() => handleSend(qr)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: '1px solid var(--t-border-l)',
                    background: 'transparent',
                    color: 'var(--t-text-3)',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'none',
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--t-accent)';
                    e.currentTarget.style.color = 'var(--t-accent)';
                    e.currentTarget.style.background = 'var(--t-a-bg-s)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--t-border-l)';
                    e.currentTarget.style.color = 'var(--t-text-3)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          <div
            style={{
              padding: '14px 16px',
              borderTop: '1px solid var(--t-border)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              background: 'var(--t-surface)',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              data-cursor="hover"
              style={{
                flex: 1,
                background: 'var(--t-bg)',
                border: '1px solid var(--t-border)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: 'var(--t-text)',
                fontSize: '14px',
                outline: 'none',
                cursor: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--t-text-4)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--t-border)')}
            />
            <button
              onClick={() => handleSend()}
              data-cursor="hover"
              aria-label="Send message"
              disabled={!inputValue.trim()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: inputValue.trim() ? 'var(--t-accent)' : 'var(--t-border)',
                border: 'none',
                cursor: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, transform 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={inputValue.trim() ? '#fff' : 'var(--t-text-6)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleToggle}
        data-cursor="hover"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        style={{
          position: 'fixed',
          bottom: '92px',
          right: '24px',
          zIndex: 900,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: isOpen ? 'var(--t-border-l)' : 'var(--t-accent)',
          border: 'none',
          cursor: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.25s, transform 0.25s',
          boxShadow: '0 4px 20px var(--t-shadow-m)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {showBadge && !isOpen && (
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#25d366',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'chat-badge-pop 0.4s ease',
              border: '2px solid var(--t-bg)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            1
          </span>
        )}

        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
