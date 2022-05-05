// This returns all the component's properties as a Partial: { prop1?: string, ... } use it like ComponentProperties<MyComponent>
export type ComponentProperties<T extends { $set: (...args: any) => any }> = NonNullable<
  Parameters<T['$set']>[0]
>
