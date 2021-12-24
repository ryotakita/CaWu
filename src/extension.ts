import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  //�p�l�����쐬����
  let panelGenerator = vscode.commands.registerCommand('cawu.start', () => {
    const panel = vscode.window.createWebviewPanel(
      'openPreview',
      'Preview test',
      vscode.ViewColumn.Two,
      {enableScripts: true}
    );

    //�G�f�B�^�̓��e���擾�A�p�l���ɔ��f
    const updateWebview = ()=>{
      panel.webview.html = generatePanelContent();
    };

    //�C�x���g���X�i
    let activeEditor = vscode.window.activeTextEditor;

    //�e�L�X�g���ϓ�������X�V
    vscode.workspace.onDidChangeTextDocument(event => {
      if (activeEditor && event.document === activeEditor.document){
        updateWebview();
      }
    });

    //�e�L�X�g���Z�[�u���ꂽ�Ƃ��X�V
    vscode.workspace.onDidSaveTextDocument( event => {
      if (activeEditor && event === activeEditor.document){
        updateWebview();
      }
    });

    //�J�[�\�����ړ�������X�V
    vscode.window.onDidChangeTextEditorSelection(event => {
      if (activeEditor && event.textEditor === activeEditor){
        updateWebview();
      }
    });

  });
  context.subscriptions.push(panelGenerator);
}

function generatePanelContent(){
  let activeEditor = vscode.window.activeTextEditor;
  let text :string = "";
  if (activeEditor){
    text = activeEditor.document.getText();
  }
  return `<!DOCTYPE html>
  <html lang="jp">
    <head>
      <title>Example Webview</title>
    </head>
    <body>
    ${text}
    </body>
  </html> `;
}

export function deactivate() {}