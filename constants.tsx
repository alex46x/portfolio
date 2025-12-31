
import { Project, SkillGroup, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'expertise', label: 'EXPERTISE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' }
];

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'FULLSTACK_OMNI',
    category: 'Web Development',
    description: 'A comprehensive web ecosystem featuring real-time data synchronization and modular architecture. Part of a collection of 50+ experimental web builds.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    impact: 'Optimized state management to handle concurrent updates across multiple client instances with zero data loss.',
    link: 'https://github.com/alex46x'
  },
  {
    id: '02',
    title: 'SHELL_ARCH',
    category: 'System Experiment',
    description: 'A custom command-line utility designed to automate local environment setups and system-level task scheduling. Explores process management and file system I/O.',
    tech: ['C++', 'Bash', 'Makefile', 'Linux'],
    impact: 'Successfully automated 15+ repetitive development tasks, reducing environment setup time from minutes to seconds.',
    link: 'https://github.com/alex46x'
  },
  {
    id: '03',
    title: 'ALGO_CONQUEST',
    category: 'Competitive Programming',
    description: 'A repository of highly optimized algorithmic solutions for 100+ problems on Codeforces. Focuses on data structures and computational efficiency.',
    tech: ['C++', 'Algorithms', 'Data Structures', 'Git'],
    impact: 'Consistently achieved sub-millisecond execution times on complex dynamic programming and graph-based challenges.',
    link: 'https://github.com/alex46x'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'WEB_STACKS',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
    icon: 'Layers'
  },
  {
    name: 'SYSTEM_EXPLORATION',
    skills: ['C/C++', 'Linux Systems', 'Shell Scripting', 'Git', 'Competitive Programming'],
    icon: 'Terminal'
  },
  {
    name: 'HARDWARE_AI',
    skills: ['Robotics', 'Arduino/ESP32', 'Python', 'AI Experimentation', 'Hardware Prototyping'],
    icon: 'Cpu'
  },
  {
    name: 'SECURITY_LAB',
    skills: ['Network Research', 'Vulnerability Assessment', 'Educational Pentesting', 'CTF Training'],
    icon: 'Shield'
  }
];
