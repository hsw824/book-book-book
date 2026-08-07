interface Props {
  htmlFor?: string;
  title: string;
  children: React.ReactNode;
  isRequired?: boolean;
}

export function FormField({ htmlFor, title, children, isRequired = false }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor={htmlFor}>{title}</label>
        {isRequired && <span className="text-red-600">*</span>}
      </div>
      {children}
    </div>
  );
}
