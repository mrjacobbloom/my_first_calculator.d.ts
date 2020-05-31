Finally, you can do math in the TypeScript type system!

A lot of people wanted this: https://github.com/microsoft/TypeScript/issues/26382 https://github.com/microsoft/TypeScript/issues/15645 https://github.com/microsoft/TypeScript/issues/15794

Works with numbers 0-50:

```typescript
type eight = MyFirstCalculator<3, '+', 5>;
type fourteen = MyFirstCalculator<50, '-', 36>;
type hundred = MyFirstCalculator<10, '*', 10>;
type two = MyFirstCalculator<10, '/', 5>;
type willProbablyBreak = MyFirstCalculator<10, '/', 0>;
```

Inspired by https://github.com/AceLewis/my_first_calculator.py