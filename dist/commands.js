/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
!function() {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./src/commands/commands.ts ***!
  \**********************************/


/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.action = void 0;
/* global Office */
Office.onReady(function () {
  // If needed, Office.js is ready to be called.
});
/**
 * Shows a notification when the add-in command is executed.
 * @param event
 */
function action(event) {
  var message = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true
  };
  // Show a notification message.
  Office.context.mailbox.item.notificationMessages.replaceAsync("ActionPerformanceNotification", message);
  // Be sure to indicate when the add-in command function is complete.
  event.completed();
}
exports.action = action;
// Register the function with Office.
Office.actions.associate("action", action);
}();
/******/ })()
;
//# sourceMappingURL=commands.js.map