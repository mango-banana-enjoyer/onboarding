#!/usr/bin/env node
import { convert, compare } from "../src/convert.js";

const args = process.argv.slice(2);

// Check if first argument is "compare"
if (args[0] === "compare") {
  const [, value1, unit1, value2, unit2] = args;
  
  if (!value1 || !unit1 || !value2 || !unit2) {
    console.error("Usage: convert compare <value1> <unit1> <value2> <unit2>");
    console.error("Example: convert compare 5 km 3 mi");
    process.exit(1);
  }
  
  try {
    const result = compare(value1, unit1, value2, unit2);
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
} else {
  // Original convert command
  const [type, value, from, to] = args;
  
  if (!type || !value) {
    console.error("Usage: convert <type> <value> [from] [to]");
    console.error("   or: convert compare <value1> <unit1> <value2> <unit2>");
    process.exit(1);
  }
  
  try {
    const result = convert(type, Number(value), from, to);
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}
