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

For Mac users, we recommend using a LaunchAgent to set environment variables. This method ensures that environment variables are correctly set at system startup and are available to all GUI applications.

Follow these steps to set the `OLLAMA_ORIGINS` environment variable:

1. Create a LaunchAgent configuration file:
   a. Open Terminal.
   b. Run the following command to create the necessary directory (if it doesn't already exist):
      ```
      mkdir -p ~/Library/LaunchAgents
      ```
   c. Use a text editor to create a file named `environment.plist` in the `~/Library/LaunchAgents/` directory. For example, using nano:
      ```
      nano ~/Library/LaunchAgents/environment.plist
      ```
   d. Copy the following content into the file:
      ```xml
   <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
      <plist version="1.0">
      <dict>
        <key>Label</key>
        <string>setenv.OLLAMA_ORIGINS</string>
        <key>ProgramArguments</key>
        <array>
          <string>/bin/launchctl</string>
          <string>setenv</string>
          <string>OLLAMA_ORIGINS</string>
          <string>*</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
      </dict>
   </plist>
      ```
   e. Save the file and exit the editor. If using nano, press `Ctrl+X`, then `Y`, and finally `Enter` to save and exit.

2. Load the LaunchAgent:
   Run the following command in Terminal to load the newly created LaunchAgent:
   ```
   launchctl load ~/Library/LaunchAgents/environment.plist
   ```

3. Verify the setting:
   You can verify if the environment variable is correctly set by using the following command:
   ```
   launchctl getenv OLLAMA_ORIGINS
   ```
   If set correctly, it should display `*`.

4. Restart the Ollama service.

Note: This method is more reliable than using the `launchctl setenv` command alone, as it ensures that the environment variable is correctly set at each system startup and is available to all applications.

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
