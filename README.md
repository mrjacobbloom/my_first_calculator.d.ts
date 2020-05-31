Finally, you can do math in TypeScript! Works with numbers 0-50:

```typescript
type eight = MyFirstCalculator<3, '+', 5>;
type fourteen = MyFirstCalculator<50, '-', 36>;
type hundred = MyFirstCalculator<10, '*', 10>;
type two = MyFirstCalculator<10, '/', 5>;
type willProbablyBreak = MyFirstCalculator<10, '/', 0>;
```

Inspired by https://github.com/AceLewis/my_first_calculator.py