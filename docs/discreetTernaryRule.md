# Discreet Ternary Rule

## Prevents overuse of the ternary operator

Overuse of the ternary operator includes using ternary for control flows, renering, in nested ternaries or - more generally - in contexts that are too complex, and where if-else is prefered.

### Allowed use of ternary
- Simple declaration or assignment of variables
  ```TypeScript
  const height = isToggled ? '100%' : 'auto';

  let width;
  width = isActive ? '650px' : '50px';
  ```

### Disallowed use of ternary include
- When used in return statement
  ```TypeScript
  function determineHeight() {
    return this.isToggled || this.isActive ? '100%' : 'auto';
  }
  ```

- When used without assigning or declaring
  ```TypeScript
  function determineHeight() {
    return this.isToggled || this.isActive ?
      this.setActiveHeight() :
      this.useNormalHeight();
  }
  ```

- When used to render JSX Elements
  ```JSX
  render() {
    return (
      <div>
       {this.isToggled ? this.getItems().map(item => {
         return (
           <div key={item.id}>{item.name}</div>
         )
       }) :
        (
          <div>Click item to show content</div>
        )
       }
      </div>
    );
  }
  ```

- When using nested ternaries
  ```TypeScript
  const height = this.isToggled ? this.isActive ? '50%' : '100%' : 'auto';
  ```

- When using ternaries in a context that is too complex
  ```TypeScript
  const height = this.isToggled
    ? this.allHeights.filter((h: number) => {
      if (h < 150) {
        return h;
      }
    }).slice(2, 2).sort()
    : this.allHeights
        .slice(2).sort();
  ```
