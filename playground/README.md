# Tiny Unit Converter

Practice the core workflows from both onboarding guides inside this mini Node.js project. All exercises revolve around a unit conversion toolkit so you can practice building, testing, and documenting code using Cursor and Claude.

## Project Overview

This project is a conversion toolkit that consists of three number conversion modules (temperature, distance, weight) through a shared dispatcher and CLI.

## Project Structure

```
tiny-unit-converter/
├── package.json
├── README.md
├── config/
│   └── defaults.json
├── bin/
│   └── cli.js
├── src/
│   ├── index.js
│   ├── convert.js
│   └── lib/
│       ├── temperature.js
│       ├── distance.js
│       └── weight.js
└── tests/
    ├── precision.test.js
    ├── validation.test.js
    └── temperature.test.js
```

## Setup

```bash
npm install
```

## Usage

### Basic Conversions

```bash
npx convert temperature 100 C F
npx convert temperature 273.15 K C  # Kelvin support
npx convert distance 5 km mi
npx convert distance 1000 m km      # Meters support
npx convert weight 200 g oz
npx convert weight 1 lb g           # Pounds support
```

### Compare Values

Compare two values with different units:

```bash
npx convert compare 5 km 3 mi
# Output:
# 5 km is greater than 3 mi
#   5 km = 5000.00 m
#   3 mi = 4828.03 m
#   Difference: 171.97 m (3.56%)

npx convert compare 100 C 212 F
# Output:
# 100 C is equal to 212 F
#   100 C = 100.00 C
#   212 F = 100.00 C
#   Difference: 0.00 C (0.00%)

npx convert compare 1000 g 2 lb
# Output:
# 1000 g is greater than 2 lb
#   1000 g = 1000.00 g
#   2 lb = 907.18 g
#   Difference: 92.82 g (10.23%)
```

The compare command automatically:
- Detects the unit type (temperature, distance, or weight)
- Converts both values to a common base unit
- Shows which value is greater, less than, or equal
- Displays the difference in absolute and percentage terms
- Validates that both units are of the same type

## Run tests

```bash
npm test
```

> **Tip:** you will see failing tests when you run `npm test` -- this is part of the exercise.

## Claude Code Feature Tour

### 1. Codebase Exploration

1. Launch Claude Code from the playground directory:

   ```bash
   cd playground
   claude
   ```

2. Ask Claude Code to analyze the project structure and identify potential improvements:
   ```
   What does this codebase do? Point me to the CLI entry, the main dispatcher, and any failing tests.
   ```

> **Tip:** Run /resume to jump back into an old conversation anytime.

### 2. Quick Changes

The current `convert()` function accepts any input without validation: it will try to process invalid numbers like "abc" or unsupported units like "xyz".

Ask Claude to add input validation that rejects non-numeric values and unknown unit codes, then write tests for these validation cases.

> **Tip:** Hit Esc to quickly cancel a generation mid-stream.

### 3. New Features

For larger features, turn on **Plan Mode** before prompting:

1. The converter now supports extended units:

- Temperature: Celsius (C), Fahrenheit (F), Kelvin (K)
- Distance: kilometers (km), miles (mi), meters (m)
- Weight: grams (g), ounces (oz), pounds (lb)

  For example: "convert temperature 273.15 K C" or "convert distance 1000 m km" or "convert weight 1 lb oz".

2. Claude will generate a step-by-step plan. Review and adjust the steps as needed using `Ctrl-g`.

3. Claude will work through each step, marking items complete as it goes.

> **Tip:** Tap Tab to toggle Thinking mode on for reasoning.

## Cursor Feature Tour

### 1. Ask Questions

1. Open the **Ask** sidebar, and ask Cursor about the behavior around precision defaults.

   ```
   Can you walk me through how the converters decide what precision to use when formatting distance and weight values?
   ```

> **Tip:** Add context by dragging files/folders into the sidebar or referencing them with @ in chat.

### 2. Plan Features

1. Open the **Plan** sidebar and ask Cursor to help you add precision formatting to all converters (distance, weight, temperature).
2. Review the suggested tasks and edit them so they match how you want to implement the feature.
3. Approve the plan with the finalized tasks.

> **Tip:** Switch models by opening the chat and choosing a model instead of “Auto.”

### 3. Feature Implementation

1. Once the plan is approved, open **Agent** chat and ask it to add a "compare" CLI command that contrasts two values (for example: `convert compare 5 km 3 mi`).
2. Review the generated diff carefully before accepting changes.
3. If behavior isn’t quite right, iterate with follow-up prompts until everything passes.

> **Tip:** Use Cmd/Ctrl + K for fast in-line code edits.
