import * as toastr from "toastr";
export default defineNuxtPlugin((nuxtApp) => {
  const notify = (
    message: string,
    title: string,
    toastrOptions: Partial<ToastrOptions>
  ) => {
    toastr[toastrOptions.messageType || ToastrMessageType.Success](
      message,
      title,
      {
        positionClass: toastrOptions.position,
        timeOut: toastrOptions.timeOut || 3000,
      }
    );
  }

  return {
    provide: {
      notify,
    },
  };
});

export class ToastrOptions {
  messageType: ToastrMessageType = ToastrMessageType.Success;
  position: ToastrPosition = ToastrPosition.TopCenter;
  timeOut: number = 1;
}

export enum ToastrMessageType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export enum ToastrPosition {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center",
}
