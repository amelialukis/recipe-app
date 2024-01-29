import { Theme } from "react-select";

export const orangeTheme = (theme: Theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        neutral10: "#FEEBC8",
        neutral5: "#FEEBC8",
        neutral20: "#FEEBC8",
        neutral30: "#FBD38D",
        neutral40: "#F6AD55",
        neutral60: "#ED8936",
        neutral80: "#DD6B20",
        primary: "#F6AD55",
        primary25: "#FEEBC8",
    },
});