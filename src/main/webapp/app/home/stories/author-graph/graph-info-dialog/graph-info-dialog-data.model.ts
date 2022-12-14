export class GraphInfoDialogData {
  title: string;
  body: string;
  cancelButton: string;
  okButton: string;
  hasCancel: boolean;
  isStories: boolean;

  constructor(title: string, body: string, cancelButton?: string, okButton?: string, hasCancel?: boolean, isStories?: boolean) {
    this.title = title;
    this.body = body;
    this.cancelButton = cancelButton ? cancelButton : 'entity.action.cancel';
    this.okButton = okButton ? okButton : 'entity.action.ok';
    this.hasCancel = hasCancel === undefined ? true : hasCancel;
    this.isStories = isStories === undefined ? true : isStories;
  }
}
