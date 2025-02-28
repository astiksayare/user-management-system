import * as Mui from "@mui/material";
export const FieldLabel = ({
  children,
  label,
  error,
}: any) => {
  return (
    <Mui.Stack spacing={1} sx={{ width: "100%" }}>
      <Mui.FormLabel
        error={error}
      >
        {label}
      </Mui.FormLabel>
      {children}
    </Mui.Stack>
  );
};
