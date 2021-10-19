export interface NotificationState {
    isShowSnackbar: boolean,
    snackbarText: string,
    snackbarType: SnackBarType,
    snackbarTimeout: number,
    snackbarProps: SnackbarProps
}

interface SnackbarProps {
    [key: string]: SnackbarProp
}

interface SnackbarProp {
    btnColor: string,
    snackbarColor: string
}

export interface NotificationData {
    type: SnackBarType,
    msg: string,
    timeout?: number
}

export enum SnackBarType {
    INFO = 'info',
    SUCCESS = 'success',
    ERROR = 'error'
}