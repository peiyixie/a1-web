## Suggested Stack

> GraphQL

> Dva (React with high order function + React-Redux + Redux-saga + Redux-router)

> TypeScript

## Running Instruction

```bash
# install dependencies
npm install

# start project

yarn start
```

### Preview Your Component

client-application/src/routes/IndexPage.js

> Follow the instruction in the comment to replace Example with your own component for preview, please do not commit `IndexPage.js` at this stage

```javascript
import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import Example from "../components/Example"; //import your own component following this format
function IndexPage() {
  return (
    <div className={styles.normal}>
      <Example />
      {/*replace Example with your own component*/}
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
```

### Knowledge Map for Dva, JavaScript and React

https://dvajs.com/knowledgemap/

### Guide for Using Dva & React

https://dvajs.com/guide/

### High Level JavaScript

https://github.com/getify/You-Dont-Know-JS

### TypeScript

https://www.typescriptlang.org/
