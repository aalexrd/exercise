"use client";

import { Box, Button, Divider, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ChangeEventHandler, FC, useCallback, useState } from "react";

export const LogInForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setEmail(value),
    []
  );

  const handlePasswordChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(({ target: { value } }) => setPassword(value), []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        enqueueSnackbar(data.error, { variant: "error" });
        setLoading(false);
        return;
      }

      router.push(response.url);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
      setLoading(false);
    }
  }, [email, enqueueSnackbar, password, router]);

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Divider sx={{ width: 100 }} />
      <Button loading={loading} disabled={loading} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};
