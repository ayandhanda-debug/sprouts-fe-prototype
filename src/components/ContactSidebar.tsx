import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Globe, Mail, Linkedin } from 'lucide-react';

export interface JobExperience {
  title: string;
  company: string;
  duration: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface ContactProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  companyLogo: string;
  website?: string;
  email?: string;
  linkedin?: string;
  about: string;
  experience: JobExperience[];
  education: Education[];
  skills: string[];
}

interface ContactSidebarProps {
  contacts: ContactProfile[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ContactSidebar({ contacts, currentIndex, onNavigate }: ContactSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('about');
  const contact = contacts[currentIndex];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className="w-[360px] flex-shrink-0 overflow-y-auto border-r"
      style={{ borderColor: '#e7e7e6', backgroundColor: '#ffffff' }}
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#e7e7e6' }}>
        <button
          onClick={() => onNavigate(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: '#706f69' }}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm font-medium" style={{ color: '#111928' }}>
          {currentIndex + 1} of {contacts.length}
        </span>
        <button
          onClick={() => onNavigate(Math.min(contacts.length - 1, currentIndex + 1))}
          disabled={currentIndex === contacts.length - 1}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: '#706f69' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Contact Card */}
      <div className="p-6 border-b" style={{ borderColor: '#e7e7e6' }}>
        <div className="flex flex-col items-center text-center">
          {/* Avatar with Badge */}
          <div className="relative mb-3">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-semibold text-white"
              style={{ backgroundColor: contact.avatar }}
            >
              {getInitials(contact.name)}
            </div>
            {/* Success Badge */}
            <div
              className="absolute top-0 right-0 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white"
              style={{ backgroundColor: '#10b981' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          {/* Contact Info */}
          <h2 className="text-lg font-semibold mb-1" style={{ color: '#111928' }}>
            {contact.name}
          </h2>
          <p className="text-sm mb-1" style={{ color: '#706f69' }}>
            {contact.title}
          </p>
          <div className="flex items-center gap-1 text-sm mb-4" style={{ color: '#706f69' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span>{contact.company}</span>
          </div>

          {/* Contact Icons */}
          <div className="flex items-center gap-3">
            {contact.website && (
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ backgroundColor: '#f9fafb' }}
                title="Visit website"
              >
                <Globe size={16} style={{ color: '#706f69' }} />
              </button>
            )}
            {contact.email && (
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ backgroundColor: '#f9fafb' }}
                title="Send email"
              >
                <Mail size={16} style={{ color: '#706f69' }} />
              </button>
            )}
            {contact.linkedin && (
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ backgroundColor: '#f9fafb' }}
                title="View LinkedIn"
              >
                <Linkedin size={16} style={{ color: '#706f69' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="divide-y" style={{ borderColor: '#e7e7e6' }}>
        {/* About Section */}
        <div>
          <button
            onClick={() => toggleSection('about')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="text-xs font-semibold tracking-wide" style={{ color: '#706f69' }}>
              ABOUT
            </span>
            {expandedSection === 'about' ? (
              <ChevronUp size={16} style={{ color: '#706f69' }} />
            ) : (
              <ChevronDown size={16} style={{ color: '#706f69' }} />
            )}
          </button>
          {expandedSection === 'about' && (
            <div className="px-4 pb-4">
              <p className="text-sm leading-relaxed" style={{ color: '#191918' }}>
                {contact.about}
              </p>
            </div>
          )}
        </div>

        {/* Job Experience Section */}
        <div>
          <button
            onClick={() => toggleSection('experience')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="text-xs font-semibold tracking-wide" style={{ color: '#706f69' }}>
              JOB EXPERIENCE
            </span>
            {expandedSection === 'experience' ? (
              <ChevronUp size={16} style={{ color: '#706f69' }} />
            ) : (
              <ChevronDown size={16} style={{ color: '#706f69' }} />
            )}
          </button>
          {expandedSection === 'experience' && (
            <div className="px-4 pb-4 space-y-3">
              {contact.experience.map((exp, index) => (
                <div key={index}>
                  <p className="text-sm font-medium" style={{ color: '#111928' }}>
                    {exp.title}
                  </p>
                  <p className="text-sm" style={{ color: '#706f69' }}>
                    {exp.company}
                  </p>
                  <p className="text-xs" style={{ color: '#706f69' }}>
                    {exp.duration}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Educational Experience Section */}
        <div>
          <button
            onClick={() => toggleSection('education')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="text-xs font-semibold tracking-wide" style={{ color: '#706f69' }}>
              EDUCATIONAL EXPERIENCE
            </span>
            {expandedSection === 'education' ? (
              <ChevronUp size={16} style={{ color: '#706f69' }} />
            ) : (
              <ChevronDown size={16} style={{ color: '#706f69' }} />
            )}
          </button>
          {expandedSection === 'education' && (
            <div className="px-4 pb-4 space-y-3">
              {contact.education.map((edu, index) => (
                <div key={index}>
                  <p className="text-sm font-medium" style={{ color: '#111928' }}>
                    {edu.degree}
                  </p>
                  <p className="text-sm" style={{ color: '#706f69' }}>
                    {edu.school}
                  </p>
                  <p className="text-xs" style={{ color: '#706f69' }}>
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <button
            onClick={() => toggleSection('skills')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="text-xs font-semibold tracking-wide" style={{ color: '#706f69' }}>
              SKILLS
            </span>
            {expandedSection === 'skills' ? (
              <ChevronUp size={16} style={{ color: '#706f69' }} />
            ) : (
              <ChevronDown size={16} style={{ color: '#706f69' }} />
            )}
          </button>
          {expandedSection === 'skills' && (
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {contact.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full"
                    style={{ backgroundColor: '#f9fafb', color: '#706f69' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
