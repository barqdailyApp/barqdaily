export function jsonToFormData(
  json: Record<string, any>,
  formData: FormData = new FormData(),
  parentKey: string = ""
): FormData {
  if (json && typeof json === "object" && !Array.isArray(json)) {
    // Loop through the object
    Object.keys(json).forEach((key) => {
      const value = json[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key; // Use dot notation here

      // If it's a file (or Blob), append it directly
      if (value instanceof File || value instanceof Blob) {
        formData.append(fullKey, value); // Append file or Blob
      } else {
        jsonToFormData(value, formData, fullKey); // Recursion for other nested objects
      }
    });
  } else if (Array.isArray(json)) {
    // Loop through the array and append array items
    json.forEach((item, index) => {
      const arrayKey = `${parentKey}[${index}]`; // Use index for array items
      jsonToFormData(item, formData, arrayKey); // Recursion for each array item
    });
  } else if (parentKey) {
    // Append the primitive value (string, number, etc.)
    formData.append(parentKey, json as string | Blob);
  }

  return formData;
}
