import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Header } from "./components/header";
import { StatusBar } from "./components/status-bar";
import { InputBar } from "./components/input-bar";
import { ToastProvider } from "./providers/toast";
import { KeyboardLayerProvider } from "./providers/keyboard-layer";
import { DiagnosticCategory } from "typescript";
import { DialogProvider } from "./providers/dialog";
import { ThemeProvider, useTheme } from "./providers/theme";

function ThemedRoot() {
  const { colors } = useTheme();
  return (
    <box
        alignItems="center"
        justifyContent="center"
        backgroundColor={colors.background}
        width="100%"
        height="100%"
        gap={2}
      >
        <Header/>
        <box width="100%" maxWidth={100} paddingX={2}>
          <InputBar onSubmit={()=>{}}/>
        </box>
    </box>
  )
}

function App() {
  return (
    <KeyboardLayerProvider>
      <ThemeProvider>
        <DialogProvider>
          <ToastProvider>
            <ThemedRoot/>
          </ToastProvider>
        </DialogProvider>
      </ThemeProvider>
    </KeyboardLayerProvider>
  );
}

const renderer = await createCliRenderer({
  targetFps: 60,
  exitOnCtrlC: false,
});
createRoot(renderer).render(<App />);
