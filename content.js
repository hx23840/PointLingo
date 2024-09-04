let targetLang = 'en';
let translationEnabled = true;
let extensionActive = true;
let hoverTimer = null;
let currentTooltip = null;
let lastTranslatedElement = null;
let lastHighlightColor = '';
const HOVER_DELAY = 1000; // 1秒延迟

function checkExtensionStatus() {
    try {
        chrome.runtime.getURL('');
        if (!extensionActive) {
            console.log('Extension reactivated');
            extensionActive = true;
        }
    } catch (e) {
        if (extensionActive) {
            console.log('Extension deactivated');
            extensionActive = false;
        }
    }
}

setInterval(checkExtensionStatus, 5000);

chrome.storage.sync.get(['targetLanguage', 'translationEnabled'], function(data) {
    if (chrome.runtime.lastError) {
        console.error('Error fetching storage:', chrome.runtime.lastError);
        return;
    }
    if (data.targetLanguage) targetLang = data.targetLanguage;
    if (data.translationEnabled !== undefined) translationEnabled = data.translationEnabled;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.targetLanguage) targetLang = changes.targetLanguage.newValue;
    if (changes.translationEnabled) translationEnabled = changes.translationEnabled.newValue;
});

function highlightText(element) {
    lastHighlightColor = window.getComputedStyle(element).backgroundColor;
    element.style.backgroundColor = '#e8e8e8';  // 浅灰色
}

function removeHighlight(element) {
    if (element) {
        element.style.backgroundColor = lastHighlightColor;
    }
}

function showTooltip(translatedText, x, y) {
    if (currentTooltip) {
        document.body.removeChild(currentTooltip);
    }
    let tooltip = document.createElement('div');
    tooltip.textContent = translatedText;
    tooltip.style.position = 'fixed';
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.border = '1px solid black';
    tooltip.style.padding = '5px';
    tooltip.style.zIndex = '10000';
    tooltip.style.maxWidth = '300px';
    tooltip.style.wordWrap = 'break-word';
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;
    return tooltip;
}

function removeTooltipAndHighlight() {
    if (currentTooltip) {
        document.body.removeChild(currentTooltip);
        currentTooltip = null;
    }
    if (lastTranslatedElement) {
        removeHighlight(lastTranslatedElement);
        lastTranslatedElement = null;
    }
}

function handleMouseOver(event) {
    if (!translationEnabled || !extensionActive) return;
    
    const targetElement = event.target;
    
    // 检查元素是否是文本节点的直接父元素，或者是叶子节点
    if (isLeafNode(targetElement) || hasDirectTextChild(targetElement)) {
        if (targetElement !== lastTranslatedElement) {
            // 移除之前的高亮和tooltip
            removeTooltipAndHighlight();
            
            if (hoverTimer) {
                clearTimeout(hoverTimer);
            }
            
            hoverTimer = setTimeout(() => {
                let text = targetElement.textContent.trim();
                if (text) {
                    highlightText(targetElement);
                    lastTranslatedElement = targetElement;
                    chrome.runtime.sendMessage({action: "translate", text, targetLang}, response => {
                        if (chrome.runtime.lastError) {
                            console.error('Runtime error:', chrome.runtime.lastError.message);
                            extensionActive = false;
                            showTooltip(`Error: ${chrome.runtime.lastError.message}. Please refresh the page.`, event.clientX, event.clientY + targetElement.offsetHeight);
                        } else if (response && response.error) {
                            console.error('Translation error:', response.error);
                            showTooltip(`Error: ${response.error}`, event.clientX, event.clientY + targetElement.offsetHeight);
                        } else if (response && response.result) {
                            showTooltip(response.result, event.clientX, event.clientY + targetElement.offsetHeight);
                        } else {
                            console.error('Unexpected response:', response);
                            showTooltip('Unexpected error occurred', event.clientX, event.clientY + targetElement.offsetHeight);
                        }
                    });
                }
            }, HOVER_DELAY);
        }
    }
}

// 检查元素是否是叶子节点（不包含其他元素）
function isLeafNode(element) {
    return element.children.length === 0;
}

// 检查元素是否直接包含文本节点
function hasDirectTextChild(element) {
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            return true;
        }
    }
    return false;
}

document.addEventListener('mouseover', handleMouseOver);

document.addEventListener('click', (event) => {
    if (currentTooltip && !currentTooltip.contains(event.target)) {
        removeTooltipAndHighlight();
    }
});