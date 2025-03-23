import type { DetailedHTMLProps, Ref } from "react";

export interface Props
  extends DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  placeholder?: string;
  errorMessage?: string;
  ref: Ref<HTMLSelectElement>;
}
