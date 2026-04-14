// ==UserScript==
// @name         Danbooru Quick Paste - New & Edit
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  dán template Create New Pool Edit Pool
// @author       thefoxne
// @match        *://*.donmai.us/pools*
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
        // Tìm nút Submit (có thể là "Update Pool" ở trang edit hoặc "Submit" ở trang new)
        const submitBtn = document.querySelector('input[type="submit"]');
        
        if (submitBtn && !document.getElementById('ne-quick-paste')) {
            // Tạo nút mới
            const btn = document.createElement('button');
            btn.id = 'ne-quick-paste';
            btn.type = 'button';
            btn.className = 'ui-button ui-widget ui-corner-all';
            btn.innerText = 'Paste Template';
            btn.style.marginLeft = '10px';
            btn.style.padding = '3px 10px';
            btn.style.cursor = 'pointer';

            btn.onclick = function() {
                // Trang New dùng #pool_description, trang Edit dùng .dtext-editor-input
                const textarea = document.querySelector('#pool_description, .dtext-editor-input, textarea[name="pool[description]"]');
                if (textarea) {
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    textarea.value = textarea.value.substring(0, start) + MY_TEXT + textarea.value.substring(end);
                    textarea.selectionStart = textarea.selectionEnd = start + MY_TEXT.length;
                    textarea.focus();
                } else {
                    console.error("Không tìm thấy ô nhập liệu!");
                }
            };

            // Chèn vào sau nút Submit
            submitBtn.parentNode.insertBefore(btn, submitBtn.nextSibling);
        }
    }

    // Kiểm tra liên tục để đảm bảo nút hiện ra ngay cả khi trang load động
    setInterval(injectButton, 1000);
})();
