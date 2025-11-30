import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../../config/defaults.json"), "utf-8")
);

export function convertWeight(value, from, to) {
  const validUnits = ["g", "oz", "lb"];

  if (!validUnits.includes(from)) {
    throw new Error(`Unknown weight unit: ${from}`);
  }
  if (!validUnits.includes(to)) {
    throw new Error(`Unknown weight unit: ${to}`);
  }

  // Same-unit conversion
  if (from === to) return value;

  // Convert to grams (base unit)
  let grams;
  if (from === "g") grams = value;
  else if (from === "oz") grams = value * 28.3495;
  else if (from === "lb") grams = value * 453.592;

  // Convert from grams to target
  let result;
  if (to === "g") result = grams;
  else if (to === "oz") result = grams / 28.3495;
  else if (to === "lb") result = grams / 453.592;

  // Round result to configured precision
  return parseFloat(result.toFixed(defaults.precision));
}
