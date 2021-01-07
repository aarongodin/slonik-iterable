## slonik-iterable

[![CI](https://github.com/aarongodin/slonik-iterable/workflows/CI/badge.svg)](https://github.com/aarongodin/slonik-iterable/actions?query=workflow%3ACI)
[![npm](https://img.shields.io/npm/v/slonik-iterable)](https://npmjs.com/slonik-iterable)

Helpers for query building with iterables. Ships with TS definitions.

### Motivation

I've been really enjoying [slonik](https://github.com/gajus/slonik) for all of my projects using Postgres. This is a collection of helper functions I have been passing around from project to project for operating on arrays, plain objects, Maps, and Sets.

### Requirements

* Node 12 or higher. TS build target for [slonik-iterable](https://github.com/aarongodin/slonik-iterable) is ES2019.

## Docs & Examples

The module exports several objects that group types of functionality.

### `values`

Create a list of values from an object.

```ts
import { sql } from "slonik"
import { values } from "slonik-iterable"

const payload = {
  col1: "val1",
  col2: "val2",
}

const query = sql`
  INSERT INTO table (col1, col2)
  VALUES (${values.fromObject(payload)})
`
```

#### fromMap()

Convenience for passing a `Map<string, any>`.

```ts
import { sql } from "slonik"
import { values } from "slonik-iterable"

const payload = new Map([
  ["col1", "first value"],
  ["col2", 222],
])

const query = sql`
  INSERT INTO table (col1, col2)
  VALUES (${values.fromMap(payload)})
`
```

### `identifiers`

Create a set of identifiers from an array of strings.

```ts
import { sql } from "slonik"
import { identifiers } from "slonik-iterable"

const query = sql`
  SELECT ${identifiers.fromArray(['col1', 'col2'], 'table')}
  FROM table
`
```

Create a set of identifiers from an object.

```ts
import { sql } from "slonik"
import { identifiers } from "slonik-iterable"

const payload = {
  col1: "val1",
  col2: "val2",
}

const query = sql`
  SELECT ${identifiers.fromObject(payload, 'table')}
  FROM table
`
```

#### fromSet()

Convenience for passing a `Set<string>` (behaves the same as `fromArray()`).

```ts
import { values } from "slonik-iterable"

const PUBLIC_COLUMNS = values.fromSet(new Set(["col_1", "col_2", "col_3"]), "table")
```

### `assignment`

Create an assignment statement from an object for an update.

```ts
import { sql } from "slonik"
import { assignment } from "slonik-iterable"

const payload = {
  col1: "val1",
  col2: "val2",
}

const query = sql`
  UPDATE table SET ${assignment.fromObject(payload)}
`
```

#### fromMap()

Convenience for passing a `Map<string, any>`.

```ts
import { sql } from "slonik"
import { assignment } from "slonik-iterable"

const payload = new Map([
  ["col1", "first value"],
  ["col2", 222],
])

const query = sql`
  UPDATE table SET ${assignment.fromMap(payload)}
`
```

### `TranslateFn`

Methods that insert values into `sql` statements accept an optional `translate` argument as a function. You can use this as a callback to modify the value inserted into the statement. This allows making sure the value is handled with the proper `sql` query building helper.

```ts
import { sql } from "slonik"
import { assignment } from "slonik-iterable"

const payload = {
  col1: "val1",
  col2: {
    nested1: "val2",
    nested2: "val3",
  },
  col4: 'val4'
}

const expression = assignment.fromObject(payload, (col, val) => {
  switch (col) {
    case 'col2':
      return sql.json(val) // val is { nested1: "val2", nested2: "val3" }
    case 'col3':
      return sql.binary(Buffer.from(val)) // val is 'val4'
    default:
      return val
  }
})

const query = sql`
  UPDATE table
  SET ${expression}
`
```

#### Returning a Tuple

The `TranslateFn` function type also allows returning a Tuple with arity-2 where the first element is a `string` and the second element the translated value (any `ValueExpressionType` from slonik). This allows translation of the column name at the same time as value translation.

```ts
import { sql } from "slonik"
import { assignment } from "slonik-iterable"
import { snakeCase } from "lodash"

const payload = {
  myColumn: "val1",
  anotherColumn: "val2",
}

const expression = assignment.fromObject(payload, (col, val) => [snakeCase(col), val])

const query = sql`
  UPDATE table
  SET ${expression}
`
```
