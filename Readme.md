## slonik-iterable

Helpers for query building with iterables. Ships with TS definitions.

### Motivation

I've been really enjoying [slonik](https://github.com/gajus/slonik) for all of my projects using Postgres. This is a collection of helper functions I have been passing around from project to project for operating on arrays and objects.

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

### `TranslateFn`

Methods that insert values into `sql` statements accept an optional `translate` argument as a function. You can use this as a callback to modify the value inserted into the statement. This allows making sure the value is handled with the proper

```ts
import { sql } from "slonik"
import { assignment } from "slonik-iterable"

const payload = {
  col1: "val1",
  col2: {
    nested1: "val2",
    nested2: "val3",
  },
}

function translateValue(col, val) {
  if (col === 'col2') {
    return sql.json(val)
  }

  return val
}

const query = sql`
  UPDATE table
  SET ${assignment.fromObject(payload, translateValue)}
`
```
