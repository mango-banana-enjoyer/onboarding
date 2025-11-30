import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

// Additional validation tests for unknown unit codes

test("rejects unknown temperature from unit", () => {
  throws(
    () => convert("temperature", 100, "R", "F"),
    /unknown.*temperature.*unit/i,
    "Should throw error for unknown temperature unit 'R'"
  );
});

test("rejects unknown temperature to unit", () => {
  throws(
    () => convert("temperature", 100, "C", "R"),
    /unknown.*temperature.*unit/i,
    "Should throw error for unknown temperature unit 'R'"
  );
});

test("rejects unknown distance from unit", () => {
  throws(
    () => convert("distance", 100, "ft", "mi"),
    /unknown.*distance.*unit/i,
    "Should throw error for unknown distance unit 'ft'"
  );
});

test("rejects unknown distance to unit", () => {
  throws(
    () => convert("distance", 100, "km", "ft"),
    /unknown.*distance.*unit/i,
    "Should throw error for unknown distance unit 'ft'"
  );
});

test("rejects unknown weight from unit", () => {
  throws(
    () => convert("weight", 100, "kg", "oz"),
    /unknown.*weight.*unit/i,
    "Should throw error for unknown weight unit 'kg'"
  );
});

test("rejects unknown weight to unit", () => {
  throws(
    () => convert("weight", 100, "g", "kg"),
    /unknown.*weight.*unit/i,
    "Should throw error for unknown weight unit 'kg'"
  );
});

test("rejects Infinity value", () => {
  throws(
    () => convert("temperature", Infinity, "C", "F"),
    /invalid.*numeric/i,
    "Should throw error for Infinity"
  );
});

test("rejects negative Infinity value", () => {
  throws(
    () => convert("temperature", -Infinity, "C", "F"),
    /invalid.*numeric/i,
    "Should throw error for -Infinity"
  );
});

test("rejects undefined value", () => {
  throws(
    () => convert("temperature", undefined, "C", "F"),
    /invalid.*numeric/i,
    "Should throw error for undefined"
  );
});

test("rejects null value", () => {
  throws(
    () => convert("temperature", null, "C", "F"),
    /invalid.*numeric/i,
    "Should throw error for null"
  );
});

test("rejects empty string value", () => {
  throws(
    () => convert("temperature", "", "C", "F"),
    /invalid.*numeric/i,
    "Should throw error for empty string"
  );
});

test("rejects object value", () => {
  throws(
    () => convert("temperature", {}, "C", "F"),
    /invalid.*numeric/i,
    "Should throw error for object"
  );
});

test("rejects array value", () => {
  throws(
    () => convert("temperature", [], "C", "F"),
    /invalid.*numeric/i,
    "Should throw error for array"
  );
});
