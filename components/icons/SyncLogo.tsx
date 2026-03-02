import React from 'react';

export const SyncLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/>
        <path d="M7 7H17V9H7V7Z" fill="white"/>
        <path d="M7 11H13V13H7V11Z" fill="white"/>
        <path d="M7 15H11V17H7V15Z" fill="white"/>
    </svg>
);