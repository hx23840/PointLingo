const DEFAULT_OLLAMA_HOST = 'http://localhost:11434';

document.addEventListener('DOMContentLoaded', function() {
  // 加载保存的设置
  chrome.storage.sync.get(['targetLanguage', 'translationEnabled', 'host_address'], function(data) {
    if (data.targetLanguage) {
      document.getElementById('languageSelect').value = data.targetLanguage;
    }
    if (data.translationEnabled !== undefined) {
      document.getElementById('translationToggle').checked = data.translationEnabled;
    }
    document.getElementById('hostAddress').value = data.host_address || DEFAULT_OLLAMA_HOST;
  });

  // 加载 Ollama 模型列表
  loadOllamaModels();

  // 翻译 UI 元素
  document.title = chrome.i18n.getMessage("extensionName");
  document.querySelector('h2:nth-of-type(1)').textContent = chrome.i18n.getMessage("ollamaHostAddress");
  document.querySelector('h2:nth-of-type(2)').textContent = chrome.i18n.getMessage("translationFunction");
  document.querySelector('h2:nth-of-type(3)').textContent = chrome.i18n.getMessage("selectTargetLanguage");
  document.querySelector('h2:nth-of-type(4)').textContent = chrome.i18n.getMessage("selectOllamaModel");
  document.getElementById('saveButton').textContent = chrome.i18n.getMessage("saveButton");

  // 翻译语言选项
  document.querySelector('#languageSelect option[value="zh"]').textContent = chrome.i18n.getMessage("chinese");
  document.querySelector('#languageSelect option[value="en"]').textContent = chrome.i18n.getMessage("english");
  document.querySelector('#languageSelect option[value="ja"]').textContent = chrome.i18n.getMessage("japanese");

  document.getElementById('saveButton').addEventListener('click', function() {
    let targetLanguage = document.getElementById('languageSelect').value;
    let translationEnabled = document.getElementById('translationToggle').checked;
    let hostAddress = document.getElementById('hostAddress').value;
    let selectedModel = document.getElementById('modelSelect').value;
    
    chrome.storage.sync.set({
      targetLanguage: targetLanguage,
      translationEnabled: translationEnabled,
      host_address: hostAddress,
      selectedModel: selectedModel
    }, function() {
      console.log('设置已保存：', {targetLanguage, translationEnabled, hostAddress, selectedModel});
      chrome.runtime.sendMessage({action: "setHostAddress", hostAddress: hostAddress});
      alert(chrome.i18n.getMessage("settingsSaved"));  // 使用国际化消息
    });
  });

  // 添加开关的即时更新
  document.getElementById('translationToggle').addEventListener('change', function() {
    let translationEnabled = this.checked;
    chrome.storage.sync.set({translationEnabled: translationEnabled}, function() {
      console.log('翻译功能状态已更新：', translationEnabled);
    });
  });
});

function loadOllamaModels() {
  const hostAddress = document.getElementById('hostAddress').value || DEFAULT_OLLAMA_HOST;
  const modelSelect = document.getElementById('modelSelect');

  chrome.runtime.sendMessage({action: "getOllamaModels", hostAddress: hostAddress}, function(response) {
    if (chrome.runtime.lastError) {
      console.error('Error:', chrome.runtime.lastError);
      modelSelect.innerHTML = `<option value="">${chrome.i18n.getMessage("errorLoadingModels")}</option>`;
      return;
    }

    if (response.error) {
      console.error('Error:', response.error);
      modelSelect.innerHTML = `<option value="">${chrome.i18n.getMessage("errorLoadingModels")}</option>`;
      return;
    }

    const models = response.models;
    modelSelect.innerHTML = models.map(model => `<option value="${model}">${model}</option>`).join('');

    // 加载保存的模型设置
    chrome.storage.sync.get(['selectedModel'], function(data) {
      if (data.selectedModel) {
        modelSelect.value = data.selectedModel;
      }
    });
  });
}