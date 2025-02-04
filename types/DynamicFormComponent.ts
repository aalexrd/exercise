import { FC } from "react";

export type ChangedData = {
  name: string;
  value: string;
};

export type DynamicFormComponentProps = {
  onChange: (value: ChangedData) => void;
};

export type DynamicFormComponent = FC<DynamicFormComponentProps>;

export enum DynamicFormComponents {
  "ADDRESS" = "ADDRESS",
  "BIRTHDATE" = "BIRTHDATE",
  "ABOUT_ME" = "ABOUT_ME",
}
