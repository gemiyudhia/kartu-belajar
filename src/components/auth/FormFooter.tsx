import Link from "next/link";

interface FormFooterProps {
  title: string;
  label: string;
  link: string;
}

const FormFooter = ({ label, title, link }: FormFooterProps) => {
  return (
    <div className="text-center">
      <span className="text-sm text-slate-600">
        {title} {""}
      </span>
      <Link
        href={link}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        {label}
      </Link>
    </div>
  );
};

export default FormFooter;
