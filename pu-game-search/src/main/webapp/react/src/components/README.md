#### Component guide 
- When using `useSelector` it is crucial that the store parameter has type checking applied.  
For example:  `const value: number = useSelector((state: IStore) => state.value);`
