import { DynamicFormComponents } from "./DynamicFormComponent";

export type StepComponent = {
  step_number: number;
  components: DynamicFormComponents[];
};
