import { Slot } from "expo-router";
import { ProcessProvider } from "../context/ProcessContext";

export default function Layout() {
  return (
    <ProcessProvider>
      <Slot />
    </ProcessProvider>
  );
}
