import { forwardRef } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    className?: string;
  }
  
  export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, error, className = "", required, ...props }, ref) => {
      return (
        <div className={`flex flex-col gap-1 ${className}`}>
          <label className="text-sm font-medium text-gray-200">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            ref={ref}
            {...props}
            className="px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && (
            <span className="text-sm text-red-500">{error}</span>
          )}
        </div>
      );
    }
  );
  
  TextField.displayName = 'TextField';