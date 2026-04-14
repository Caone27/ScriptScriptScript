// ==UserScript==
// @name         Danbooru Quick Paste
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  hehehe
// @author       Ne Thefox
// @match        https://danbooru.donmai.us/pools/*/edit
// @match        https://*.donmai.us/pools/*/edit
// @match        *://*.donmai.us/pools/*/edit
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const MY_TEXT = `<b>Artist:</b> [[artist request]]
<b>Original title:</b> text
<b>Series:</b> [[source request]]

[expand=text]
* "chap1":/posts/


[/expand]
[expand=Book text]

* "Chapter 1":/posts/

[/expand]`;

    function injectButton() {
        // Tìm nút "Update Pool" màu xám ở cuối trang
        const updateBtn = document.querySelector('input[value="Update Pool"]');

        if (updateBtn && !document.getElementById('ne-quick-paste')) {
            // Tạo nút mới với class của Danbooru để trông y hệt
            const btn = document.createElement('button');
            btn.id = 'ne-quick-paste';
            btn.type = 'button';
            // Sử dụng class chuẩn của Danbooru để có style đồng nhất
            btn.className = 'ui-button ui-widget ui-corner-all';
            btn.innerText = 'Paste Template';
            btn.style.marginLeft = '10px';
            btn.style.padding = '3px 10px';

            btn.onclick = function() {
                const textarea = document.querySelector('#pool_description, .dtext-editor-input');
                if (textarea) {
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    textarea.value = textarea.value.substring(0, start) + MY_TEXT + textarea.value.substring(end);
                    textarea.selectionStart = textarea.selectionEnd = start + MY_TEXT.length;
                    textarea.focus();
                }
            };

            // Chèn nút mới vào ngay sau nút Update Pool
            updateBtn.parentNode.insertBefore(btn, updateBtn.nextSibling);
        }
    }

    // Chạy kiểm tra liên tục để đảm bảo nút luôn hiện diện
    setInterval(injectButton, 1000);
})();
