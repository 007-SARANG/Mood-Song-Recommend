import React from 'react';

export function Button({ children, onClick, className = '', variant = 'default' }) {
  const base = 'px-4 py-2 rounded font-medium cursor-pointer';
  const styles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant] || ''} ${className}`}>
      {children}
    </button>
  );
}
