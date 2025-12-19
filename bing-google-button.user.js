// ==UserScript==
// @name         Bing 搜索页添加 Google 按钮
// @namespace    https://github.com/cxin3813/bing-google-button
// @version      1.0.1
// @description  在 Bing 搜索框右侧添加 Google 按钮，支持自动更新
// @author       YourName
// @match        *://*.bing.com/search*
// @grant        none
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/cxin3813/bing-google-button/main/bing-google-button.user.js
// @downloadURL  https://raw.githubusercontent.com/cxin3813/bing-google-button/main/bing-google-button.user.js
// ==/UserScript==

(function() {
    'use strict';

    function injectButton() {
        if (document.getElementById('google-search-btn')) return;

        const form = document.querySelector('#sb_form');
        if (!form) return;

        const googleLink = document.createElement('a');
        googleLink.id = 'google-search-btn';
        googleLink.target = "_blank";
        googleLink.title = "使用 Google 搜索";

        Object.assign(googleLink.style, {
            position: 'absolute',
            right: '70px', 
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            zIndex: '10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            borderRadius: '50%',
            transition: 'background 0.2s'
        });

        const img = document.createElement('img');
        img.src = "https://www.google.com/favicon.ico";
        img.style.width = "18px";
        img.style.height = "18px";
        googleLink.appendChild(img);

        googleLink.onmouseover = () => googleLink.style.backgroundColor = 'rgba(0,0,0,0.05)';
        googleLink.onmouseout = () => googleLink.style.backgroundColor = 'transparent';

        googleLink.onclick = function() {
            const input = document.querySelector('#sb_form_q');
            const query = input ? input.value : "";
            this.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        };

        form.style.position = 'relative';
        form.appendChild(googleLink);
    }

    injectButton();
    const observer = new MutationObserver(() => injectButton());
    observer.observe(document.body, { childList: true, subtree: true });
    setInterval(injectButton, 1000);
})();