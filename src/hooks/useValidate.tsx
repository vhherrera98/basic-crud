import { FieldErrors, FieldValues } from 'react-hook-form'

export function useValidate<T extends FieldValues>(errors: FieldErrors<T>) {

 const validate = (field: keyof T) => {
  return {
   show: errors[field],
   message: errors[field]?.message ? `${errors[field]?.message}` : "",
   all: errors[field]
  }
 }

 return {
  validate
 }
}