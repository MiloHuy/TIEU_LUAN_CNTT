import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";

const SelectRole = ({ options, values, className, onSubmit, handleChange }) => {
  const handleChangeSelect = async (e) => {
    handleChange && handleChange((prev) => ({ ...prev, role: e }));

    onSubmit && (await onSubmit(e));
  };

  return (
    <Select
      onValueChange={handleChangeSelect}
      value={values}
      id="role"
      name="role"
    >
      <SelectTrigger className={clsx("w-full h-full", className)}>
        <SelectValue placeholder="Chọn vai trò" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map((option, i) => {
            return (
              <SelectItem
                key={i}
                className="text-md gap-1 border-b border-black"
                value={option.value.toString()}
              >
                <div className="flex items-center w-full justify-between gap-2">
                  <p className="text-md font-quick_sans">{option.label}</p>
                  {option.icon}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectRole;
