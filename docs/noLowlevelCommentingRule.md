# No Low-level Commenting

## Fails in the presence of low-level comments that are not part of JSDocs

A 'low-level' comment is defined as a comment, which does not document any public API, class, method, interface, property ect.  

### Allowed comments include

- Documenting classes
  ```TypeScript
  /**
  * This comment documents a class
  */
  class HttpRequester { ...
  ```

- Documenting interfaces
  ```TypeScript
  /**
  * This comment documents an interface
  */
  interface IResponse { ...
  ```

- Documenting enums
  ```TypeScript
  /**
  * This comment documents an enum
  */
  enum ActionTypes { ...
  ```

- Documenting public functions or methods
  ```TypeScript
  /**
  * This comment documents a function expression
  */
  const createAction = (options?: any) => ...

  /**
  * This comment documents a function declaration
  */
  function createAction = (options?: any) { ...

  /**
  * This comment documents a public method
  */
  public createAction(options?: any) { ...
  ```

### Disallowed comments include

- Any comment starting with `//`
- Comments starting with `/**` but which do not adhere to above conventions.

#### Example of a violation:
```TypeScript
function createStyle() {
  // First we calculate margin
  // TODO: Come up with better way to calculate
  const margin = elemRef.clientWidth / 2 - 375;

  // Then we add color depending on what is focused
  // Please don't change colors before talking to the lead of the design department
  const color = props.isFocused ? 'red' : 'yellow';

  // Create style or use default
  return props.isActive ? {
    marginLeft: margin,
    backgroundColor: color,
  } : this.defaultStyle;
}
```