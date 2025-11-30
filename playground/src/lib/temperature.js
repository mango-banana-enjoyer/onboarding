import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../../config/defaults.json"), "utf-8")
);

export function convertTemperature(value, from, to) {
  const validUnits = ["C", "F", "K"];

  if (!validUnits.includes(from)) {
    throw new Error(`Unknown temperature unit: ${from}`);
  }
  if (!validUnits.includes(to)) {
    throw new Error(`Unknown temperature unit: ${to}`);
  }

  // Same-unit conversion
  if (from === to) return value;

  // Convert to Celsius (base unit)
  let celsius;
  if (from === "C") celsius = value;
  else if (from === "F") celsius = (value - 32) * (5 / 9);
  else if (from === "K") celsius = value - 273.15;

  // Convert from Celsius to target
  let result;
  if (to === "C") result = celsius;
  else if (to === "F") result = celsius * (9 / 5) + 32;
  else if (to === "K") result = celsius + 273.15;

  // Round result to configured precision
  return parseFloat(result.toFixed(defaults.precision));
}
