interface CustomWindow extends Window {
  ym: (id: number, action: string, name: string) => void;
}

declare let window: CustomWindow;
