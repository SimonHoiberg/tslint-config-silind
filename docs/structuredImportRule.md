# Structured Import Rule

## Requires import statements to be structured based on content and origin

This rule fails, when the order of imports are violated.  
Imports should adhere to the following structure of order:

1. Import that comes from node_modules
2. Import of interfaces / enums
3. Import that comes from source
4. Import of styles (css / scss)
5. Import of other, unspecified type
6. Unnamed imports