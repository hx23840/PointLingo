let ollama_host = 'http://localhost:11434';

chrome.storage.sync.get('host_address', function(data) {
  if (data.host_address) ollama_host = data.host_address;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translate") {
    fetch(`${ollama_host}/api/generate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        model: "qwen2:0.5b",  // 更改这里
        prompt: `Translate the following text to ${request.targetLang}:\n\n${request.text}`,
        stream: false
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      sendResponse({result: data.response});
    })
    .catch(error => {
      console.error('Translation error:', error);
      sendResponse({error: error.message || 'Unknown error occurred'});
    });
    return true;  // 保持消息通道开放
  } else if (request.action === "setHostAddress") {
    ollama_host = request.hostAddress;
    chrome.storage.sync.set({host_address: ollama_host});
    sendResponse({status: "Host address updated"});
    return true;  // 保持消息通道开放
  } else if (request.action === "getOllamaModels") {
    fetch(`${request.hostAddress}/api/tags`)
      .then(response => response.json())
      .then(data => {
        const models = data.models.map(model => model.name);
        sendResponse({models: models});
      })
      .catch(error => {
        console.error('Error fetching Ollama models:', error);
        sendResponse({error: error.message});
      });
    return true; // 保持消息通道开放以进行异步响应
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed or updated');
});

chrome.runtime.onStartup.addListener(() => {
  console.log('Browser started, extension running');
});