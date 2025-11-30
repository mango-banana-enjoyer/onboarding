import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

// Unit type mappings
const UNIT_TYPES = {
  distance: ["km", "mi", "m"],
  temperature: ["C", "F", "K"],
  weight: ["g", "oz", "lb"]
};

function detectUnitType(unit) {
  for (const [type, units] of Object.entries(UNIT_TYPES)) {
    if (units.includes(unit)) {
      return type;
    }
  }
  throw new Error(`Unknown unit: ${unit}`);
}

export function convert(type, value, from, to) {
  // Validate numeric value
  // Allow strings that can be converted to numbers, but check the converted value
  let numericValue;
  if (typeof value === 'string') {
    if (value.trim() === '') {
      throw new Error(`Invalid numeric value: ${value}`);
    }
    numericValue = Number(value);
  } else if (typeof value !== 'number') {
    throw new Error(`Invalid numeric value: ${value}`);
  } else {
    numericValue = value;
  }

  if (!Number.isFinite(numericValue)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }

  switch (type) {
    case "temperature":
      return temperature.convertTemperature(
        numericValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
    case "distance":
      return distance.convertDistance(numericValue, from, to);
    case "weight":
      return weight.convertWeight(numericValue, from, to);
    default:
      throw new Error("Unknown type " + type);
  }
}

export function compare(value1, unit1, value2, unit2) {
  // Validate numeric values
  const numericValue1 = Number(value1);
  const numericValue2 = Number(value2);

  if (!Number.isFinite(numericValue1)) {
    throw new Error(`Invalid numeric value: ${value1}`);
  }
  if (!Number.isFinite(numericValue2)) {
    throw new Error(`Invalid numeric value: ${value2}`);
  }

  // Detect unit types
  const type1 = detectUnitType(unit1);
  const type2 = detectUnitType(unit2);

  // Ensure both units are of the same type
  if (type1 !== type2) {
    throw new Error(`Cannot compare different unit types: ${unit1} (${type1}) and ${unit2} (${type2})`);
  }

  // Define base units for each type
  const baseUnits = {
    distance: "m",
    temperature: "C",
    weight: "g"
  };

  const baseUnit = baseUnits[type1];

  // Convert both values to base unit
  let convertedValue1, convertedValue2;
  switch (type1) {
    case "temperature":
      convertedValue1 = temperature.convertTemperature(numericValue1, unit1, baseUnit);
      convertedValue2 = temperature.convertTemperature(numericValue2, unit2, baseUnit);
      break;
    case "distance":
      convertedValue1 = distance.convertDistance(numericValue1, unit1, baseUnit);
      convertedValue2 = distance.convertDistance(numericValue2, unit2, baseUnit);
      break;
    case "weight":
      convertedValue1 = weight.convertWeight(numericValue1, unit1, baseUnit);
      convertedValue2 = weight.convertWeight(numericValue2, unit2, baseUnit);
      break;
  }

  // Calculate difference
  const difference = Math.abs(convertedValue1 - convertedValue2);
  const percentDiff = convertedValue2 !== 0 
    ? ((convertedValue1 - convertedValue2) / convertedValue2 * 100) 
    : (convertedValue1 !== 0 ? Infinity : 0);

  // Determine comparison
  let comparison;
  if (convertedValue1 > convertedValue2) {
    comparison = "greater than";
  } else if (convertedValue1 < convertedValue2) {
    comparison = "less than";
  } else {
    comparison = "equal to";
  }

  // Format output
  return `${value1} ${unit1} is ${comparison} ${value2} ${unit2}
  ${value1} ${unit1} = ${convertedValue1.toFixed(defaults.precision)} ${baseUnit}
  ${value2} ${unit2} = ${convertedValue2.toFixed(defaults.precision)} ${baseUnit}
  Difference: ${difference.toFixed(defaults.precision)} ${baseUnit} (${Math.abs(percentDiff).toFixed(2)}%)`;
}
