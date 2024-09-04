# PointLingo: Smart Hover Translation Plugin for Chrome

[English](./README.md) | [简体中文](./README_CN.md)

PointLingo is an innovative Chrome translation plugin that allows users to get instant translations by simply hovering their mouse over text. It utilizes the local Ollama service and the efficient Qwen 2.0 model to provide fast and accurate translations.

## Features

- Instant translation on mouse hover
- Supports Chinese, English, and Japanese
- Automatic text selection and highlighting
- Uses local Ollama service for privacy protection
- Customizable AI model selection

## Installation

1. Install the Chrome plugin (from provided .crx file)
2. Set up the Ollama service

### Installing Ollama

Please visit the [Ollama official website](https://ollama.ai/) and follow the instructions to install Ollama.

### Configuring Ollama

#### For Linux Users (including WSL)

1. Edit the Ollama service file:
   ```
   sudo vim /etc/systemd/system/ollama.service
   ```

2. Add the following environment variables:
   ```
   Environment="OLLAMA_HOST=0.0.0.0"
   Environment="OLLAMA_ORIGINS=*"
   ```
   Note: Pure Linux environments can ignore the `OLLAMA_HOST` setting.

3. Restart the Ollama service:
   ```
   sudo systemctl daemon-reload
   sudo systemctl restart ollama
   ```

#### For Mac Users

1. Set the environment variable:
   ```
   launchctl setenv OLLAMA_ORIGINS "*"
   ```

2. Restart the Ollama service

## Usage

1. Hover your mouse over the text you want to translate for about 1 second
2. The plugin will automatically translate and highlight the selected text
3. View the translation result

## Custom Settings

1. In the plugin settings, you can choose your preferred AI model
2. The default model is qwen2:0.5b, which offers a good balance between speed and effectiveness

## Contribution

We welcome any form of contribution, including but not limited to:
- Bug fixes
- New feature submissions
- Improvement suggestions
- Documentation enhancements

## License

This project is licensed under the [GNU General Public License v3.0](./LICENSE).

## Contact Us

If you have any questions or suggestions, please submit them via [issues](https://github.com/hx23840/PointLingo/issues), or [email](mailto:peter@lyrai.app) our development team.

Thank you for your attention and support! Let's build a smarter and more open future together.
