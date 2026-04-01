import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-wizard-step',
  imports: [],
  templateUrl: './wizard-step.html',
  styleUrl: './wizard-step.scss',
})
export class WizardStep {
  public currentStepIndex = 0;
  public actualStep = input.required();

  protected steps = signal<WirzardStep[]>([
    {
      id: "register",
      label: "Registro",
      isValid: false,
      icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    },
    {
      id: "personalData",
      label: "Dados Pessoais",
      isValid: false,
      icon: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    },
    {
      id: "activation",
      label: "Ativação",
      isValid: false,
      icon: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
    },
    // {
    //   id: "completed",
    //   label: "Concluído",
    //   isValid: false,
    //   icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    // }
  ]);
}

export interface WirzardStep {
  id: string;
  label: string;
  isValid: boolean;
  icon: string;
}