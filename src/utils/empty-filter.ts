export type AnyObject = { [key: string]: any };

export default function filterUndefinedProperties(inputObject: AnyObject) {
  if (inputObject) {
    return Object.fromEntries(
      Object.entries(inputObject).filter(([key, value]) => value !== undefined),
    );
  }
}

