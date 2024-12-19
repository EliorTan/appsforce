import React from 'react';

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const AlertDialog = ({ 
  open, 
  onOpenChange, 
  children 
}: AlertDialogProps) => {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center "
      onClick={() => onOpenChange?.(false)}
    >
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const AlertDialogContent = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className="w-full max-w-lg bg-gradient-to-b from-slate-800 to-slate-950 rounded-lg shadow-lg p-6 animate-in fade-in zoom-in duration-200"
    {...props}
  >
    {children}
  </div>
);

export const AlertDialogHeader = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className="flex flex-col space-y-2 text-center sm:text-left"
    {...props}
  >
    {children}
  </div>
);

export const AlertDialogFooter = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6"
    {...props}
  >
    {children}
  </div>
);

export const AlertDialogTitle = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className="text-lg font-semibold text-white"
    {...props}
  >
    {children}
  </h2>
);

export const AlertDialogDescription = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className="text-sm text-white"
    {...props}
  >
    {children}
  </p>
);

export const AlertDialogAction = ({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const AlertDialogCancel = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="mt-2 sm:mt-0 inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    {...props}
  >
    {children}
  </button>
);