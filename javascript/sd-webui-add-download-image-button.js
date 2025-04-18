// ================================================================================
// モーダル内の画像をダウンロードする関数
// @returns {void}
// ================================================================================
function downloadImage() {
    try {
        var modalImage = gradioApp().getElementById("modalImage");
        if (!modalImage || !modalImage.src) {
            console.warn("No image available for download");
            return;
        }

        // 画像のURLからファイル名を取得
        let filename = 'image.png';
        try {
            const url = new URL(modalImage.src);
            filename = url.pathname.split('/').pop() || filename;
        } catch (e) {
            console.warn("Failed to parse image URL:", e);
        }

        // 画像をダウンロードするためのリンクを作成
        const link = document.createElement('a');
        link.href = modalImage.src;
        link.download = filename;
        
        // リンクをクリックしてダウンロードを開始
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (e) {
        console.error("Failed to download image:", e);
    }
}

// ================================================================================
// モーダル内の画像ダウンロードイベントを処理する関数
// @param {Event} event - クリックイベント
// @returns {void}
// ================================================================================
function modalDownloadImage(event) {
    downloadImage();
    event.stopPropagation();
}

// ================================================================================
// モーダルにダウンロードボタンを追加する関数
// @returns {void}
// ================================================================================
function addDownloadButton() {
    // modal_save要素を先に取得
    const modalSave = gradioApp().getElementById("modal_save");
    console.log("modalSave element:", modalSave);
    
    if (!modalSave) {
        console.error("Warning: Do Not Found ElementById=modal_save");
        return;
    }

    // modal_saveの親要素をmodalControlsとして使用
    const modalControls = modalSave.parentNode;
    console.log("modalControls element:", modalControls);
    
    if (!modalControls) {
        console.error("Warning: Do Not Found modalControls parent");
        return;
    }

    // 既にダウンロードボタンが存在する場合は追加しない
    if (gradioApp().getElementById("modal_download")) {
        console.log("Download button already exists");
        return;
    }

    // ダウンロードボタンを作成
    const modalDownload = document.createElement("span");
    modalDownload.className = "modalDownload cursor";
    modalDownload.id = "modal_download";
    modalDownload.innerHTML = "&#x2B73;";
    modalDownload.addEventListener("click", modalDownloadImage, true);
    modalDownload.title = "Download Image";

    // modalSaveの後にダウンロードボタンを挿入
    modalSave.parentNode.insertBefore(modalDownload, modalSave.nextSibling);
}

// ================================================================================
// UIの読み込み完了時に実行される関数
// @returns {void}
// ================================================================================
onUiLoaded(function() {
    console.log("sd-webui-add-download-image-button onUiLoaded called");
    addDownloadButton();
});

// ================================================================================
