import type { ReactNode } from "react";

const OptionPlaceholder = ({ children }: { children: ReactNode }) => {
  return (
    <option value="" disabled hidden data-is-placeholder="true">
      {children}
    </option>
  );
};

export default OptionPlaceholder;
