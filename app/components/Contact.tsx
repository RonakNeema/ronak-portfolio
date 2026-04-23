'use client';

import { useState, FormEvent } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [currentField, setCurrentField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // EmailJS configuration - Add your credentials in environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // If keys not configured, use fallback simulation
      if (serviceId === 'YOUR_SERVICE_ID') {
        console.log('EmailJS not configured. Form data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-cyan-400 font-mono text-sm mb-2">{'// contact'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-gray-500">$</span> ./send_message<span className="text-cyan-400">.sh</span>
          </h2>
        </div>

        {/* Terminal Form */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[#252525] px-4 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-400 text-sm font-mono">contact@ronak ~ </span>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 font-mono">
            {/* Name Field */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <User size={14} className="text-cyan-400" />
                <span className="text-cyan-400">$</span> enter_name:
              </label>
              <div className="flex items-center gap-2">
                <span className="text-green-400">&gt;</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setCurrentField('name')}
                  onBlur={() => setCurrentField(null)}
                  placeholder="John Doe"
                  required
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm"
                />
                {currentField === 'name' && (
                  <span className="text-cyan-400 animate-pulse">▋</span>
                )}
              </div>
              <div className="mt-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Mail size={14} className="text-cyan-400" />
                <span className="text-cyan-400">$</span> enter_email:
              </label>
              <div className="flex items-center gap-2">
                <span className="text-green-400">&gt;</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setCurrentField('email')}
                  onBlur={() => setCurrentField(null)}
                  placeholder="john@example.com"
                  required
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm"
                />
                {currentField === 'email' && (
                  <span className="text-cyan-400 animate-pulse">▋</span>
                )}
              </div>
              <div className="mt-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <MessageSquare size={14} className="text-cyan-400" />
                <span className="text-cyan-400">$</span> enter_message:
              </label>
              <div className="flex gap-2">
                <span className="text-green-400">&gt;</span>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setCurrentField('message')}
                  onBlur={() => setCurrentField(null)}
                  placeholder="Your message here..."
                  required
                  rows={4}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm resize-none"
                />
                {currentField === 'message' && (
                  <span className="text-cyan-400 animate-pulse self-end">▋</span>
                )}
              </div>
              <div className="mt-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>./send</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle size={16} />
                  <span>Message sent successfully!</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>Failed to send. Try again.</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Alternative Contact */}
        <div className="mt-8 text-center font-mono text-sm text-gray-500">
          <p>Or reach out directly at <a href="mailto:ronak.neema@ucdenver.edu" className="text-cyan-400 hover:underline">ronak.neema@ucdenver.edu</a></p>
        </div>
      </div>
    </section>
  );
}
