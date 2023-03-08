export function cstmAlert(s) {
  let alertDialog = document.createElement("dialog");
  alertDialog.innerHTML = `
    <p>${s}</p>
    <div style="text-align: center">
    <button id="okBtn">Ok</button>
    </div>
    `;
  document.body.appendChild(alertDialog);

  alertDialog.querySelector("#okBtn").onclick = function () {
    alertDialog.close();
  };

  alertDialog.showModal();
}

export function cstmConfirm(s) {
  let confirmDialog = document.createElement("dialog");
  confirmDialog.innerHTML = `
    <p>${s}</p>
    <form method="dialog">
    <div>
    <button type="submit" id="cancelBtn" value="">Cancel</button>
    <button type="submit" id="okBtn" value="true">Ok</button>
    </div>
    </form>
    `;
  document.body.appendChild(confirmDialog);
  confirmDialog.showModal();
  return confirmDialog;
}

export function cstmPrompt(str) {
  let promptDialog = document.createElement("dialog");

  promptDialog.innerHTML = `
    <form method = "dialog">
    <div>
    <label>${str}</label>
    </div>
    <input type="text" id="promptResponse" value="" size="60"
    <div style="text-align: right">
    <button type="submit" id="cancelBtn" value="">Cancel</button>
    <button type="submit" id="okBtn" value="true">Ok</button>
    </div>
    </form>
    `;

  document.body.appendChild(promptDialog);
  promptDialog.showModal();
  return promptDialog;
}
