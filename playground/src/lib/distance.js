import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../../config/defaults.json"), "utf-8")
);

export function convertDistance(value, from, to) {
  const validUnits = ["km", "mi", "m"];

  if (!validUnits.includes(from)) {
    throw new Error(`Unknown distance unit: ${from}`);
  }
  if (!validUnits.includes(to)) {
    throw new Error(`Unknown distance unit: ${to}`);
  }

  // Same-unit conversion
  if (from === to) return value;

  // Convert to meters (base unit)
  let meters;
  if (from === "m") meters = value;
  else if (from === "km") meters = value * 1000;
  else if (from === "mi") meters = value * 1609.344;

  // Convert from meters to target
  let result;
  if (to === "m") result = meters;
  else if (to === "km") result = meters / 1000;
  else if (to === "mi") result = meters / 1609.344;

  // Round result to configured precision
  return parseFloat(result.toFixed(defaults.precision));
}
