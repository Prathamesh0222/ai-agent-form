interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {children}
    </label>
  );
};
