import React from 'react'

// Define the props for the Card component
interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({children, className=''} : CardProps) {
// const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white shadow-xl border border-gray-200 rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  )
}
