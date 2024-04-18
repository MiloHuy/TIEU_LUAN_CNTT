import { EPrivacyGroup } from "./enum-privacy";

export const OptionsPrivacyGroup = [
  {
    label: "Công khai (mặc định)",
    value: EPrivacyGroup.PUBLIC.toString(),
  },
  {
    label: "Riêng tư",
    value: EPrivacyGroup.PRIVATE.toString(),
  },
];
