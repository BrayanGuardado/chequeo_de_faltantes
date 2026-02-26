import type { SelectMode } from "../../types/app";

type Props = {
  label: string;
  value: SelectMode;
};

const Option = ({ label, value }: Props) => {
  return <option value={value}>{label}</option>;
};

export default Option;
