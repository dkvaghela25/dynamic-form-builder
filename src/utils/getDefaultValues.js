import { defaultValuesMap } from "../constants";

export const getDefaultValues = (formSchema) => {
  const defaultValues = {};

  formSchema.forEach(schema => {
    defaultValues[schema.name] = defaultValuesMap[schema.type];
  });

  return defaultValues;

}