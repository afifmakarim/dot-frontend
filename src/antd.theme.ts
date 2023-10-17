import { COLORS } from "./design.token";

export const antdConfig = {
  token: {
    colorTextBase: COLORS.black,
  },
  components: {
    Button: {
      colorPrimary: COLORS.primary,
      colorPrimaryBg: COLORS.primary,
      colorPrimaryHover: COLORS.black,
    },
    Select: {
      colorTextPlaceholder: COLORS["dark-grey"],
    },
  },
};
