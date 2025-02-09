export interface PromptOption {
  value: string;
  label: string;
}

export const artFormOptions: PromptOption[] = [
  { value: "disabled", label: "No preference" },
  { value: "photograph", label: "Photograph" },
  { value: "digital_art", label: "Digital Art" },
  { value: "oil_painting", label: "Oil Painting" },
  { value: "watercolor", label: "Watercolor" },
  { value: "sketch", label: "Sketch" }
];

export const photoTypeOptions: PromptOption[] = [
  { value: "disabled", label: "No preference" },
  { value: "portrait", label: "Portrait" },
  { value: "landscape", label: "Landscape" },
  { value: "macro", label: "Macro" },
  { value: "aerial", label: "Aerial" },
  { value: "street", label: "Street" }
];

export const lightingOptions: PromptOption[] = [
  { value: "disabled", label: "No preference" },
  { value: "natural", label: "Natural" },
  { value: "studio", label: "Studio" },
  { value: "dramatic", label: "Dramatic" },
  { value: "soft", label: "Soft" },
  { value: "backlit", label: "Backlit" }
];

export const compositionOptions: PromptOption[] = [
  { value: "disabled", label: "No preference" },
  { value: "rule_of_thirds", label: "Rule of Thirds" },
  { value: "symmetrical", label: "Symmetrical" },
  { value: "centered", label: "Centered" },
  { value: "diagonal", label: "Diagonal" },
  { value: "framed", label: "Framed" }
];

export const backgroundOptions: PromptOption[] = [
  { value: "disabled", label: "No preference" },
  { value: "solid", label: "Solid Color" },
  { value: "gradient", label: "Gradient" },
  { value: "blurred", label: "Blurred" },
  { value: "environmental", label: "Environmental" },
  { value: "studio", label: "Studio" }
]; 