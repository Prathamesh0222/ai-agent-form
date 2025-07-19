import { FormData, FormField } from "../hooks/useFormChat";
import { Input } from "./Input";
import { Label } from "./Label";

interface FormInputProps {
  formData: FormData;
  currentFieldIndex: number;
  onUpdateField: (field: keyof FormData, value: string) => void;
}

const FORM_FIELDS: {
  field: FormField;
  label: string;
  placeholder: string;
  type?: "text" | "email";
}[] = [
  { field: "username", label: "Username", placeholder: "Enter your username" },
  {
    field: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    field: "linkedinUrl",
    label: "LinkedIn URL",
    placeholder: "Enter your LinkedIn URL",
  },
  {
    field: "githubUrl",
    label: "GitHub URL",
    placeholder: "Enter your GitHub URL",
  },
];

export const FormInput = ({
  formData,
  currentFieldIndex,
  onUpdateField,
}: FormInputProps) => {
  return (
    <div className="flex flex-col space-y-3 items-center">
      {FORM_FIELDS.map((fieldConfig, index) => (
        <div
          key={fieldConfig.field}
          className={`w-3/4 ${
            index === currentFieldIndex
              ? "ring-2 ring-blue-500 rounded-lg p-2"
              : ""
          }`}
        >
          <Label htmlFor={fieldConfig.field}>
            {fieldConfig.label}
            {index === currentFieldIndex && (
              <span className="ml-2 text-blue-500 text-xs">
                ← Currently filling
              </span>
            )}
          </Label>
          <Input
            value={formData[fieldConfig.field]}
            onChange={(e) => onUpdateField(fieldConfig.field, e.target.value)}
            placeholder={fieldConfig.placeholder}
            type={fieldConfig.type || "text"}
          />
        </div>
      ))}

      <button
        className="p-2 mt-2 border border-border/50 w-3/4 rounded-lg font-semibold bg-white text-black text-sm cursor-pointer hover:bg-white/80 duration-300"
        onClick={() => {
          console.log("Form submitted:", formData);
        }}
      >
        Submit
      </button>
    </div>
  );
};
