import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(5, "km", "m"), 5000);
});

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(5000, "m", "km"), 5);
});

test("converts miles to meters", () => {
  strictEqual(convertDistance(1, "mi", "m"), 1609.34);
});

test("converts meters to miles", () => {
  strictEqual(convertDistance(1609.344, "m", "mi"), 1);
});

test("converts kilometers to miles", () => {
  strictEqual(convertDistance(1, "km", "mi"), 0.62);
});

test("converts miles to kilometers", () => {
  strictEqual(convertDistance(1, "mi", "km"), 1.61);
});

test("handles same-unit distance conversions", () => {
  strictEqual(convertDistance(100, "km", "km"), 100);
  strictEqual(convertDistance(100, "mi", "mi"), 100);
  strictEqual(convertDistance(100, "m", "m"), 100);
});
